"use client";

import { useRef, useState } from "react";
import { DownloadIcon, LoaderCircle } from "lucide-react";
import { Converter, ConvertOptions } from "@/components";
import { useConverter } from "@/hooks/useConverter";
import { ConverterRef } from "@/types/convert";
import { EditorLayout } from "./layouts/EditorLayout";

export function Preview() {
  const converterRef = useRef<ConverterRef>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const { type, markdown } = useConverter();

  const handleExport = async () => {
    if (!converterRef.current || isExporting) return;

    try {
      setIsExporting(true);
      await converterRef.current.export();
    } catch (error) {
      console.error(`Error exporting to ${type}:`, error);
    } finally {
      setIsExporting(false);
    }
  };

  const Component = Converter[type];

  return (
    <EditorLayout>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Preview</h2>
        <ConvertOptions />
      </div>
      <div className="flex-1 min-h-0 relative">
        <div className="absolute top-4 right-4 z-10">
          {isExporting ? (
            <LoaderCircle className="text-gray-500 animate-spin" />
          ) : (
            type !== "html" && (
              <DownloadIcon
                className={`cursor-pointer text-gray-500 hover:text-gray-700`}
                onClick={handleExport}
              />
            )
          )}
        </div>
        <div className="h-full overflow-auto">
          <Component ref={converterRef} markdown={markdown} />
        </div>
      </div>
    </EditorLayout>
  );
}
