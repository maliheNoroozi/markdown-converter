import ReactMarkdown from "react-markdown";

export function HtmlConverter({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown className="flex-grow overflow-auto p-4 bg-gray-100 rounded-md">
      {markdown}
    </ReactMarkdown>
  );
}
