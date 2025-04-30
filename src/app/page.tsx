import { Markdown } from "@/components/Markdown";
import { Preview } from "@/components/Preview";

export default function Home() {
  return (
    <main className=" h-screen flex flex-col p-4 md:p-6 lg:p-8">
      <header className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Markdown Converter
        </h1>
        <p className="text-sm md:text-base lg:text-lg mt-2">
          Convert your markdown to different formats like PDF, HTML, Word, and
          PowerPoint.
        </p>
      </header>

      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 min-h-[500px]">
        <Markdown />
        <Preview />
      </div>
    </main>
  );
}
