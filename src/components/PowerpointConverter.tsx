import { forwardRef, useImperativeHandle, useRef } from "react";
import ReactMarkdown from "react-markdown";
import pptxgen from "pptxgenjs";
import { ConverterRef } from "@/types/convert";

export const PowerpointConverter = forwardRef<
  ConverterRef,
  { markdown: string }
>(({ markdown }, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    export: async () => {
      if (!contentRef.current) return;

      const pptx = new pptxgen();

      // Set presentation properties
      pptx.title = "Markdown Presentation";
      pptx.subject = "Generated from Markdown";
      pptx.author = "Your App";
      pptx.layout = "LAYOUT_16x9";

      // Get the rendered markdown content
      const container = contentRef.current;

      // Process headings to create slides
      const headings = container.querySelectorAll("h1, h2, h3");

      if (headings.length === 0) {
        // If no headings, create a single slide with all content
        const slide = pptx.addSlide();
        slide.addText("Markdown Content", {
          x: 0.5,
          y: 0.5,
          fontSize: 36,
          bold: true,
          color: "363636",
        });
        slide.addText(container.textContent || "No content", {
          x: 0.5,
          y: 1.5,
          w: 9,
          h: 4.5,
          fontSize: 18,
          valign: "top",
        });
      } else {
        // Create slides based on headings
        let sections: { title: HTMLElement; content: HTMLElement[] }[] = [];

        // Group content between headings
        let currentHeading: HTMLElement | null = null;
        let currentContent: HTMLElement[] = [];

        // Function to process children and build content sections
        const processChildren = (element: HTMLElement) => {
          const children = Array.from(element.children) as HTMLElement[];

          for (const child of children) {
            // Check if this is a heading that should start a new slide
            if (
              child.tagName === "H1" ||
              child.tagName === "H2" ||
              child.tagName === "H3"
            ) {
              // If we already have a heading, save the current section
              if (currentHeading) {
                sections.push({
                  title: currentHeading,
                  content: currentContent,
                });
                currentContent = [];
              }

              currentHeading = child;
            } else {
              // Not a heading, add to current content
              if (currentHeading) {
                currentContent.push(child);
              }

              // Process children recursively
              if (child.children.length > 0) {
                processChildren(child);
              }
            }
          }
        };

        // Process the entire container
        processChildren(container);

        // Add the last section if it exists
        if (currentHeading && currentContent.length > 0) {
          sections.push({
            title: currentHeading,
            content: currentContent,
          });
        }

        // Create slides for each section
        for (const section of sections) {
          const slide = pptx.addSlide();

          // Add the title
          slide.addText(section.title.textContent || "Slide Title", {
            x: 0.5,
            y: 0.5,
            fontSize: 36,
            bold: true,
            color: "363636",
          });

          // Process content items
          const textItems: any[] = [];

          // Helper function to convert HTML elements to text items
          const processContentElement = (element: HTMLElement) => {
            const tagName = element.tagName.toLowerCase();

            switch (tagName) {
              case "p":
                textItems.push({
                  text: element.textContent || "",
                  options: { fontSize: 18, breakLine: true },
                });
                break;

              case "ul":
              case "ol":
                const items = Array.from(element.querySelectorAll("li"));
                items.forEach((item) => {
                  textItems.push({
                    text: item.textContent || "",
                    options: {
                      fontSize: 18,
                      breakLine: true,
                      bullet: tagName === "ul",
                      paraSpaceBefore: 2,
                    },
                  });
                });
                break;

              case "pre":
              case "code":
                textItems.push({
                  text: element.textContent || "",
                  options: {
                    fontSize: 16,
                    fontFace: "Courier New",
                    color: "666666",
                    breakLine: true,
                  },
                });
                break;

              case "img":
                // We'd need to handle images separately, it's more complex
                // For now, we'll just note where images would appear
                textItems.push({
                  text: "[Image placeholder]",
                  options: {
                    fontSize: 14,
                    italic: true,
                    color: "999999",
                    breakLine: true,
                  },
                });
                break;

              default:
                // Process any other elements generically
                if (element.textContent && element.textContent.trim()) {
                  textItems.push({
                    text: element.textContent,
                    options: { fontSize: 18, breakLine: true },
                  });
                }
            }
          };

          // Process each content element
          for (const element of section.content) {
            processContentElement(element);
          }

          // Add the content to the slide
          if (textItems.length > 0) {
            slide.addText(textItems, {
              x: 0.5,
              y: 1.5,
              w: 9,
              h: 4.5,
              valign: "top",
            });
          }
        }
      }

      // Save the PowerPoint file
      pptx.writeFile({ fileName: "markdown-presentation.pptx" });
    },
  }));

  return (
    <div
      className="flex-grow overflow-auto p-4 bg-gray-100 rounded-md"
      ref={contentRef}
    >
      <ReactMarkdown className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
        {markdown}
      </ReactMarkdown>
    </div>
  );
});
