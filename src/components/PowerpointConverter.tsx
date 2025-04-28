import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import pptxgen from "pptxgenjs";
import { marked } from "marked";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConverterRef } from "@/types/convert";

export const PowerpointConverter = forwardRef<
  ConverterRef,
  { markdown: string }
>(({ markdown }, ref) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<string[]>([]);

  useEffect(() => {
    const createParsedSlides = async () => {
      const slideContents = markdown
        .trim()
        .split(/^# /gm)
        .filter(Boolean)
        .map((s) => "# " + s.trim());

      const parsedSlides = await Promise.all(
        slideContents.map((slide) => marked.parse(slide))
      );
      setSlides(parsedSlides);
    };

    createParsedSlides();
  }, [markdown]);

  const convertToPPTX = async () => {
    const pptx = new pptxgen();
    slides.forEach((slideMarkdown) => {
      const [title, ...content] = slideMarkdown.split("\n");
      const slide = pptx.addSlide();
      slide.addText(title, { x: 0.5, y: 0.5, fontSize: 24 });
      slide.addText(content.join("\n"), { x: 0.5, y: 1.5, fontSize: 16 });
    });
    const buffer = await pptx.write({ outputType: "arraybuffer" });
    return buffer;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  useImperativeHandle(ref, () => ({
    export: async () => {
      const buffer = await convertToPPTX();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "markdown-presentation.pptx";
      a.click();
      URL.revokeObjectURL(url);
    },
  }));

  return (
    <div className="flex-grow overflow-auto p-4 bg-gray-100 rounded-md">
      <div className="relative h-full flex items-center justify-center">
        <Button
          size="icon"
          variant="ghost"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10"
        >
          <ChevronLeft className="size-8" />
        </Button>
        <div
          className="prose max-w-none px-10 py-2 w-full h-full overflow-y-auto"
          style={{ minHeight: 0 }}
          dangerouslySetInnerHTML={{ __html: slides[currentSlide] || "" }}
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10"
        >
          <ChevronRight className="size-8" />
        </Button>
      </div>
    </div>
  );
});
