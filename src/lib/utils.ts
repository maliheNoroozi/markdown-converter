import pptxgen from "pptxgenjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const processElement = (
  slide: pptxgen.Slide,
  element: Element,
  currentY: number
) => {
  const text = element.textContent?.trim() || "";
  if (!text) return;

  const tagName = element.tagName.toLowerCase();

  const defaultTextOptions: any = {
    x: 0.5,
    y: currentY,
    w: "90%",
    align: "left",
    color: "363636",
  };

  switch (tagName) {
    case "h1":
      slide.addText(text, {
        ...defaultTextOptions,
        fontSize: 34,
        bold: true,
        align: "center",
      });
      currentY += 0.7;
      break;

    case "h2":
      slide.addText(text, {
        ...defaultTextOptions,
        fontSize: 30,
        bold: true,
      });
      currentY += 0.6;
      break;

    case "h3":
      slide.addText(text, {
        ...defaultTextOptions,
        fontSize: 24,
        bold: true,
      });
      currentY += 0.5;
      break;

    case "h4":
      slide.addText(text, {
        ...defaultTextOptions,
        fontSize: 20,
        bold: true,
      });
      currentY += 0.5;
      break;

    case "h5":
      slide.addText(text, {
        ...defaultTextOptions,
        fontSize: 18,
        bold: true,
      });
      currentY += 0.5;
      break;

    case "h6":
      slide.addText(text, {
        ...defaultTextOptions,
        fontSize: 16,
        bold: true,
      });
      currentY += 0.5;
      break;

    case "ul":
    case "ol":
      const items = Array.from(element.children).map((li) => ({
        text: li.textContent?.trim() || "",
      }));
      slide.addText(items, {
        ...defaultTextOptions,
        fontSize: 16,
        bullet: { type: "bullet" },
        spacing: { line: 16 },
      });
      currentY += 0.3 * items.length;
      break;

    case "p":
      // Check for inline styles
      const hasStrong = element.querySelector("strong");
      const hasEm = element.querySelector("em");
      const hasLink = element.querySelector("a");

      slide.addText(text, {
        ...defaultTextOptions,
        fontSize: 16,
        bold: !!hasStrong,
        italic: !!hasEm,
        color: hasLink ? "0000FF" : "363636",
        underline: hasLink ? { style: "sng" } : undefined,
      });
      currentY += 0.4;
      break;

    default:
      slide.addText(text, {
        ...defaultTextOptions,
        fontSize: 16,
      });
      currentY += 0.3;
  }

  return currentY;
};
