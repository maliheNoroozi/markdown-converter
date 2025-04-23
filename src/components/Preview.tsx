"use client";

import { Converter, ConvertOptions } from "@/components";
import { useConverter } from "@/hooks/useConverter";

export function Preview() {
  const { type, markdown } = useConverter();
  const Component = Converter[type];

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Preview</h2>
        <ConvertOptions />
      </div>
      <Component markdown={markdown} />
    </div>
  );
}
