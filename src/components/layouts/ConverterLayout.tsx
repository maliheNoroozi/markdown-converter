import { ReactNode } from "react";

interface ConverterLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ConverterLayout({ children, className }: ConverterLayoutProps) {
  return (
    <div
      className={`flex-grow overflow-auto p-4 bg-gray-100 rounded-md ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}
