import { LayoutProps } from "./types";

export const PublicLayout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container pt-4 pb-4 mx-auto">{children}</div>
    </div>
  );
};
