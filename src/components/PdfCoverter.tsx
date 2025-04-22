export function PdfCoverter({ markdown }: { markdown: string }) {
  return (
    <div className="flex-grow overflow-auto p-4 bg-gray-100 rounded-md">
      {markdown}
    </div>
  );
}
