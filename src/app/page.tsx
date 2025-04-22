"use client";

import { Converter } from "@/components/Converter";
import { ConvertOptions } from "@/components/ConvertOptions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ConvertType } from "@/types/convert";
import { useState } from "react";

const defaultMarkdown = `
# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
`;

// use react hook form to manage form state
// use zustand or react context to manage global state
export default function Home() {
  const [type, setType] = useState<ConvertType>("html");
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const Component = Converter[type];

  const handleTypeChange = (newType: ConvertType) => {
    setType(newType);
  };

  const handleConvert = () => {};

  return (
    <div className="flex flex-col h-screen p-4 md:p-8 lg:p-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Markdown Converter</h1>
        <p className="text-lg mt-2">
          Convert your markdown to different formats like PDF, HTML, Word, and
          PowerPoint.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 flex-grow overflow-hidden mt-6">
        <div className="flex flex-col flex-1 min-h-0 gap-4">
          <h2 className="text-2xl font-bold">Markdown Editor</h2>
          <Textarea
            placeholder="Write your markdown"
            className="flex-grow resize-none"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
          <Button variant="default" onClick={handleConvert}>
            Convert
          </Button>
        </div>

        <div className="flex flex-col flex-1 min-h-0 gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Preview</h2>
            <ConvertOptions type={type} handleTypeChange={handleTypeChange} />
          </div>
          <Component markdown={markdown} />
        </div>
      </div>
    </div>
  );
}
