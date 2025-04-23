import ReactMarkdown from "react-markdown";

export function HtmlConverter({ markdown }: { markdown: string }) {
  return (
    <div className="flex-grow overflow-auto p-4 bg-gray-100 rounded-md">
      <ReactMarkdown className="prose prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
