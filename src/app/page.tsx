import { Markdown } from "@/components/Markdown";
import { Preview } from "@/components/Preview";

export default function Home() {
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
        <Markdown />
        <Preview />
      </div>
    </div>
  );
}
