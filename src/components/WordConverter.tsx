"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { Document, Packer, Paragraph } from "docx";
import ReactMarkdown from "react-markdown";
import { ConverterRef } from "@/types/convert";
import { processWordElement } from "@/lib/utils";

export const WordConverter = forwardRef<ConverterRef, { markdown: string }>(
  ({ markdown }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const convertToWord = async () => {
      const markdownContent = contentRef.current?.querySelector(".prose");
      if (!markdownContent) return;

      const temp = document.createElement("div");
      temp.innerHTML = markdownContent.innerHTML;

      let children: Paragraph[] = [];
      Array.from(temp.children).forEach((element) => {
        children = processWordElement(children, element) ?? children;
      });

      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 1000,
                  right: 1000,
                  bottom: 1000,
                  left: 1000,
                },
              },
            },
            children,
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "markdown-document.docx";
      a.click();
      URL.revokeObjectURL(url);
    };

    useImperativeHandle(ref, () => ({
      export: convertToWord,
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
  }
);
