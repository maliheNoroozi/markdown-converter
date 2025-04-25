import { JSX } from "react";

export type ConvertType = "html" | "pdf" | "powerpoint" | "word";

export type ConverterType = {
  [key in ConvertType]: ({ markdown }: { markdown: string }) => JSX.Element;
};

export type ConvertOptionsType = {
  value: ConvertType;
  label: string;
}[];
