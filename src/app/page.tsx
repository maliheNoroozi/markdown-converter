import { Markdown } from "@/components/Markdown";
import { Preview } from "@/components/Preview";

export default function Home() {
  return (
    <main className="flex flex-col p-8 md:p-12 lg:p-8">
      <header className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Markdown Converter
        </h1>
        <p className="text-sm md:text-base lg:text-lg mt-2">
          Convert your markdown to different formats like PDF, HTML, Word, and
          PowerPoint.
        </p>
      </header>

      <div className="flex flex-col gap-16 md:flex-row md:gap-6">
        <div className="h-[600px] md:h-[750px] md:flex-1">
          <Markdown />
        </div>
        <div className="h-[600px] md:h-[750px] md:flex-1">
          <Preview />
        </div>
      </div>
    </main>
  );
}
