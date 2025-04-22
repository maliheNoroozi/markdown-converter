export type ConvertType = "html" | "pdf" | "powerpoint" | "word";

export type ConverterType = {
  [key in ConvertType]: React.FC<{ markdown: string }>;
};

export type ConvertOptionsType = {
  value: ConvertType;
  label: string;
}[];
