import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
interface LayoutProps {
  children: ReactNode;
  title: string;
}
export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {" "}
      <Sidebar />
      <div
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: "var(--sidebar-width, 224px)" }}
      >
        {" "}
        <Header title={title} /> <main className="p-6"> {children} </main>{" "}
      </div>{" "}
    </div>
  );
};
