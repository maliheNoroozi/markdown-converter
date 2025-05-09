import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import pptxgen from "pptxgenjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConverterRef } from "@/types/convert";
import {
  convertMarkdownToHtml,
  processSlideElement,
  splitMarkdownIntoSections,
} from "@/lib/utils";
import { ConverterLayout } from "@/components/layouts/ConverterLayout";

export const PowerpointConverter = forwardRef<
  ConverterRef,
  { markdown: string }
>(({ markdown }, ref) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<string[]>([]);

  useEffect(() => {
    const createParsedSlides = async () => {
      const slidesContent = splitMarkdownIntoSections(markdown);

      const parsedSlides = await Promise.all(
        slidesContent.map(convertMarkdownToHtml)
      );

      setSlides(parsedSlides);
    };

    createParsedSlides();
  }, [markdown]);

  const convertToPPTX = async () => {
    const pptx = new pptxgen();

    for (const slideHtml of slides) {
      const slide = pptx.addSlide();
      const temp = document.createElement("div");
      temp.innerHTML = slideHtml;

      let currentY = 0.5;
      Array.from(temp.children).forEach((element) => {
        currentY =
          processSlideElement(slide, element, currentY) ?? currentY + 0.5;
      });
    }

    return await pptx.write({ outputType: "arraybuffer" });
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
    <ConverterLayout className="h-full">
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
    </ConverterLayout>
  );
});
