"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useConverter } from "@/hooks/useConverter";

export function Markdown() {
  const { markdown, setMarkdown } = useConverter();

  const handleConvert = () => {
    // Handle conversion logic here
    console.log("Converting markdown to", markdown);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Markdown Editor</h2>
        <Button
          variant="default"
          onClick={handleConvert}
          className="cursor-pointer"
        >
          Convert
        </Button>
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
