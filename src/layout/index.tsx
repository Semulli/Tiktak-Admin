import React from "react";
import type { ReactNode } from "react";
import Navbar from "../components/custom/Navbar";
import Sidebar from "../components/custom/Sidebar";

type Props = {
  children: ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F6F5FB] ">
      <div className="mx-auto  ">
        <Navbar />
        {/* Main Content */}
        <div className="flex gap-2 pt-6  container">
          <Sidebar />
          <main  >{children}</main>
        </div>
      </div>
    </div>
  );
};