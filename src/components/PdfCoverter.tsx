"use client";

import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import ReactMarkdown from "react-markdown";
import { DownloadIcon } from "lucide-react";

export function PdfCoverter({ markdown }: { markdown: string }) {
  const contentRef = useRef<HTMLDivElement>(null);
  // const isClient = useIsClient();

  const exportToPdf = async () => {
    // if(contentRef.current && isClient)
    if (contentRef.current) {
      // const html2pdfModule = await import("html2pdf.js");
      // const html2pdf = html2pdfModule.default || html2pdfModule;

      // const element = contentRef.current;
      // const opt = {
      //   margin: 1,
      //   filename: "document.pdf",
      //   image: { type: "jpeg", quality: 0.98 },
      //   html2canvas: { scale: 2 },
      //   jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      // };

      // // html2pdf().set(opt).from(element).save();

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
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-4 relative">
      <div className="absolute top-4 right-4 z-10">
        <DownloadIcon
          className="cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={exportToPdf}
        />
      </div>
      <div
        className="flex-grow overflow-auto p-4 bg-gray-100 rounded-md"
        ref={contentRef}
      >
        <ReactMarkdown className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
