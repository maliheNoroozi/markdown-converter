import {
  HtmlConverter,
  PdfCoverter,
  PowerpointCoverter,
  WordCoverter,
} from "@/components";
import { ConverterType } from "@/types/convert";

export const Converter: ConverterType = {
  html: HtmlConverter,
  pdf: PdfCoverter,
  powerpoint: PowerpointCoverter,
  word: WordCoverter,
};
