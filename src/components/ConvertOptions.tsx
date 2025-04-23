"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConverter } from "@/hooks/useConverter";
import { ConvertOptionsType } from "@/types/convert";

const options: ConvertOptionsType = [
  {
    value: "pdf",
    label: "Pdf",
  },
  {
    value: "html",
    label: "Html",
  },
  { value: "powerpoint", label: "Powerpoint" },
  {
    value: "word",
    label: "Word",
  },
];

export function ConvertOptions() {
  const { type, setType } = useConverter();

  return (
    <Select value={type} onValueChange={setType}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select convertion type" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
