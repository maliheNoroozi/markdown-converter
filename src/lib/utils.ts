import pptxgen from "pptxgenjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Paragraph, TextRun } from "docx";
import { marked } from "marked";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const elements = {
  h1: {
    fontSize: 34,
    bold: true,
  },
  h2: {
    fontSize: 30,
    bold: true,
  },
  h3: {
    fontSize: 24,
    bold: true,
  },
  h4: {
    fontSize: 20,
    bold: true,
  },
  h5: {
    fontSize: 18,
    bold: true,
  },
  h6: {
    fontSize: 16,
    bold: true,
  },
  ul: {
    fontSize: 16,
    bullet: { type: "bullet" },
    spacing: { line: 16 },
  },
  p: {
    fontSize: 16,
  },
};

export const processSlideElement = (
  slide: pptxgen.Slide,
  element: Element,
  currentY: number
) => {
  const text = element.textContent?.trim() || "";
  if (!text) return;

  const tagName = element.tagName.toLowerCase();

  const defaultTextOptions: any = {
    x: 0.5,
    y: currentY,
    w: "90%",
    align: "left",
    color: "363636",
  };

  switch (tagName) {
    case "h1":
      slide.addText(text, {
        ...defaultTextOptions,
        align: "center",
        ...elements.h1,
      });
      currentY += 0.7;
      break;

    case "h2":
      slide.addText(text, {
        ...defaultTextOptions,
        ...elements.h2,
      });
      currentY += 0.6;
      break;

    case "h3":
      slide.addText(text, {
        ...defaultTextOptions,
        ...elements.h3,
      });
      currentY += 0.5;
      break;

    case "h4":
      slide.addText(text, {
        ...defaultTextOptions,
        ...elements.h4,
      });
      currentY += 0.5;
      break;

    case "h5":
      slide.addText(text, {
        ...defaultTextOptions,
        ...elements.h5,
      });
      currentY += 0.5;
      break;

    case "h6":
      slide.addText(text, {
        ...defaultTextOptions,
        ...elements.h6,
      });
      currentY += 0.5;
      break;

    case "ul":
    case "ol":
      const items = Array.from(element.children).map((li) => ({
        text: li.textContent?.trim() || "",
      }));
      slide.addText(items, {
        ...defaultTextOptions,
        ...elements.ul,
      });
      currentY += 0.3 * items.length;
      break;

    case "p":
      // Check for inline styles
      const hasStrong = element.querySelector("strong");
      const hasEm = element.querySelector("em");
      const hasLink = element.querySelector("a");

      slide.addText(text, {
        ...defaultTextOptions,
        fontSize: 16,
        bold: !!hasStrong,
        italic: !!hasEm,
        color: hasLink ? "0000FF" : "363636",
        underline: hasLink ? { style: "sng" } : undefined,
      });
      currentY += 0.4;
      break;

    default:
      slide.addText(text, {
        ...defaultTextOptions,
        fontSize: 16,
      });
      currentY += 0.3;
  }

  return currentY;
};

export const processWordElement = (children: Paragraph[], element: Element) => {
  const text = element.textContent?.trim() || "";
  if (!text) return;

  const tagName = element.tagName.toLowerCase();

  switch (tagName) {
    case "h1":
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text, ...elements.h1, size: elements.h1.fontSize }),
          ],
          spacing: { after: 200 },
        })
      );
      break;

    case "h2":
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text, ...elements.h2, size: elements.h2.fontSize }),
          ],
          spacing: { after: 160 },
        })
      );
      break;

    case "h3":
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text, ...elements.h3, size: elements.h3.fontSize }),
          ],
          spacing: { after: 160 },
        })
      );
      break;

    case "h4":
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text, ...elements.h4, size: elements.h4.fontSize }),
          ],
          spacing: { after: 160 },
        })
      );
      break;

    case "h5":
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text, ...elements.h5, size: elements.h5.fontSize }),
          ],
          spacing: { after: 160 },
        })
      );
      break;

    case "h6":
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text, ...elements.h6, size: elements.h6.fontSize }),
          ],
          spacing: { after: 160 },
        })
      );
      break;

    case "ul":
    case "ol":
      Array.from(element.children).forEach((li) => {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: li.textContent || "" })],
            bullet: { level: 0 },
            spacing: { after: 80 },
          })
        );
      });
      break;

    case "p":
      const runs: TextRun[] = [];
      Array.from(element.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          runs.push(new TextRun({ text: node.textContent || "" }));
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as Element;
          switch (el.tagName.toLowerCase()) {
            case "strong":
              runs.push(
                new TextRun({ text: el.textContent || "", bold: true })
              );
              break;
            case "em":
              runs.push(
                new TextRun({ text: el.textContent || "", italics: true })
              );
              break;
            case "a":
              runs.push(
                new TextRun({
                  text: el.textContent || "",
                  color: "0000FF",
                  underline: {},
                })
              );
              break;
          }
        }
      });
      children.push(new Paragraph({ children: runs, spacing: { after: 120 } }));
      break;
  }

  return children;
};

export const convertMarkdownToHtml = async (
  markdown: string
): Promise<string> => {
  return marked.parse(markdown);
};

export const splitMarkdownIntoSections = (markdown: string): string[] => {
  return markdown
    .split(/^# /gm)
    .filter(Boolean)
    .map((s) => "# " + s.trim());
};
