"use client";

import { useRef, useState } from "react";
import { DownloadIcon, LoaderCircle } from "lucide-react";
import { Converter, ConvertOptions } from "@/components";
import { useConverter } from "@/hooks/useConverter";
import { ConverterRef } from "@/types/convert";

export function Preview() {
  const converterRef = useRef<ConverterRef>(null);
  const { type, markdown } = useConverter();
  const [isExporting, setIsExporting] = useState<boolean>(false);

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
    <div className="flex flex-col flex-1 min-h-0 gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Preview</h2>
        <ConvertOptions />
      </div>
      <div className="flex flex-col flex-1 min-h-0 gap-4 relative">
        <div className="absolute top-4 right-4 z-10">
          {isExporting ? (
            <LoaderCircle className="text-gray-500 animate-spin" />
          ) : (
            <DownloadIcon
              className={`cursor-pointer text-gray-500 hover:text-gray-700`}
              onClick={handleExport}
            />
          )}
        </div>
        <Component ref={converterRef} markdown={markdown} />
      </div>
    </div>
  );
}
