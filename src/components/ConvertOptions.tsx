import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConvertOptionsType, ConvertType } from "@/types/convert";

interface Props {
  type: ConvertType;
  handleTypeChange: (newType: ConvertType) => void;
}

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

export function ConvertOptions({ type, handleTypeChange }: Props) {
  return (
    <Select value={type} onValueChange={handleTypeChange}>
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
