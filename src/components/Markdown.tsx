"use client";

import { Textarea } from "@/components/ui/textarea";
import { useConverter } from "@/hooks/useConverter";

export function Markdown() {
  const { markdown, setMarkdown } = useConverter();

  return (
    <div className="flex flex-col flex-1 gap-4 overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Markdown Editor</h2>
      </div>
      <Textarea
        placeholder="Write your markdown"
        className="flex-grow resize-none"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
    </div>
  );
}
