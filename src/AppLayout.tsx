import { Header } from "./components/Header";

interface AppLayoutProps {
  children?: React.ReactNode;
  isPublic?: boolean;
  isPrivate?: boolean;
}

export const AppLayout = ({ children, isPrivate }: AppLayoutProps) => {
  return (
    <div className="bg-slate-100 min-h-screen">
      {isPrivate && <Header />}
      <div className="container pt-4 pb-4 mx-auto">{children}</div>
    </div>
  );
};
