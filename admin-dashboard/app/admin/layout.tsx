import React, { ReactNode } from "react";

import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";


const Layout = async ({ children }: { children: ReactNode }) => {

  return (
    <main className="flex min-h-screen w-full flex-col">
      <div className="flex min-h-screen w-full flex-row ">
        <Sidebar />
        {/* <p>Sidebar</p> */}

        <div className="admin-container">
          {/* <p>Header</p> */}
          <Header />
          {children}
        </div>
      </div>
      <Footer />
    </main>
  );
};
export default Layout;