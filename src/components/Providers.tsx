import { ReactNode } from "react";
import { ConverterProvider } from "@/hooks/useConverter";
import { IsClientProvider } from "@/hooks/useIsClient";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <IsClientProvider>
      <ConverterProvider>{children}</ConverterProvider>
    </IsClientProvider>
  );
}
