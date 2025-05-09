import { ReactNode } from "react";

interface EditorLayoutProps {
  children: ReactNode;
  className?: string;
}

export function EditorLayout({ children, className }: EditorLayoutProps) {
  return (
    <div className={`h-full flex flex-col ${className || ""}`}>{children}</div>
  );
}
