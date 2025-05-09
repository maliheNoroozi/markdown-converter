# Markdown Converter

A powerful web application that converts Markdown content into various formats including PDF, PowerPoint, Word, and HTML. Built with Next.js and TypeScript, this application provides a seamless experience for converting your markdown documents into professional formats.

## Features

- **Multiple Format Support**

  - Convert to PDF
  - Convert to PowerPoint presentations
  - Convert to Word documents
  - View as HTML

- **Real-time Preview**

  - Live preview of your markdown content
  - Split-screen editor and preview
  - Responsive design for all screen sizes

- **PowerPoint Features**

  - Automatic slide creation based on headings
  - Maintains formatting and styling
  - Supports images and links
  - Navigation controls for preview

- **PDF Features**

  - High-quality PDF generation
  - Preserves all formatting and styling
  - Optimized for printing

- **Word Features**
  - Clean document conversion
  - Maintains heading hierarchy
  - Preserves text formatting

## Tech Stack

- **Frontend Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Markdown Processing**:
  - `marked` for markdown parsing
  - `react-markdown` for preview rendering
- **Conversion Libraries**:
  - `pptxgenjs` for PowerPoint generation
  - `jspdf` and `html2canvas` for PDF generation
  - `docx` for Word document generation

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/markdown-converter.git
   ```

2. Install dependencies:

   ```bash
   cd markdown-converter
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Write or paste your markdown content in the editor
2. Use the preview panel to see how your content looks
3. Choose your desired output format (PDF, PowerPoint, Word, or HTML)
4. Click the download button to save your converted document

### Markdown Tips

- Use `#` for headings (creates new slides in PowerPoint)
- Use `**bold**` for bold text
- Use `*italic*` for italic text
- Use `-` or `*` for bullet points
- Use `[link text](url)` for links

## Project Structure

```
src/
├── components/
│   ├── layouts/         # Shared layout components
│   ├── PdfConverter.tsx
│   ├── WordConverter.tsx
│   ├── PowerpointConverter.tsx
│   └── HtmlConverter.tsx
├── lib/
│   └── utils.ts        # Utility functions
├── types/
│   └── convert.ts      # TypeScript types
└── app/
    └── page.tsx        # Main application page
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
