import { Header } from "../components/Header";
import { LayoutProps } from "./types";

export const PrivateLayout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Header />
      <div className="container pt-4 pb-4 mx-auto">{children}</div>
    </div>
  );
};
