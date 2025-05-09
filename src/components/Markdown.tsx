"use client";

import { Textarea } from "@/components/ui/textarea";
import { useConverter } from "@/hooks/useConverter";

export function Markdown() {
  const { markdown, setMarkdown } = useConverter();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Markdown Editor</h2>
      </div>
      <Textarea
        placeholder="Write your markdown"
        className="h-full resize-none overflow-auto"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
    </div>
  );
}
