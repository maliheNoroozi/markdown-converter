"use client";

import { createContext, useContext, useState } from "react";
import { ConvertType } from "@/types/convert";

const defaultMarkdown = `
# Sample Markdown

This is a paragraph with **bold text** and *italic text*.

## Subheading

- List item 1
- List item 2
- List item 3

[A link](https://example.com)

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
`;

const ConverterContext = createContext({
  type: "html" as ConvertType,
  setType: (type: ConvertType) => {},
  markdown: "",
  setMarkdown: (markdown: string) => {},
  handleConvert: (markdown: string) => {},
});

export const ConverterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [type, setType] = useState<ConvertType>("html");
  const [markdown, setMarkdown] = useState<string>(defaultMarkdown);

  const handleConvert = (markdown: string) => {
    // Handle conversion logic here
    console.log("Converting markdown to", markdown);
  };

  return (
    <ConverterContext.Provider
      value={{ type, setType, markdown, setMarkdown, handleConvert }}
    >
      {children}
    </ConverterContext.Provider>
  );
};

export const useConverter = () => {
  const context = useContext(ConverterContext);
  if (!context) {
    throw new Error("useConverter must be used within a ConverterProvider");
  }
  return context;
};
