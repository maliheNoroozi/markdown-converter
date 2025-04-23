import { ReactNode } from "react";
import { ConverterProvider } from "@/hooks/useConverter";

export function Providers({ children }: { children: ReactNode }) {
  return <ConverterProvider>{children}</ConverterProvider>;
}
