"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import ReactMarkdown from "react-markdown";
import { ConverterRef } from "@/types/convert";
import { ConverterLayout } from "@/components/layouts/ConverterLayout";

export const PdfConverter = forwardRef<ConverterRef, { markdown: string }>(
  ({ markdown }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      export: async () => {
        if (!contentRef.current) return;

        const element = contentRef.current;
        const canvas = await html2canvas(element, {
          scale: 2,
          logging: false,
          useCORS: true,
        });

        const pdf = new jsPDF("p", "mm", "a4");
        const imgData = canvas.toDataURL("image/png");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("document.pdf");
      },
    }));

    return (
      <ConverterLayout>
        <div
          className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white"
          ref={contentRef}
        >
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </ConverterLayout>
    );
  }
);
