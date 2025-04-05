import React from "react";
import UserSidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="lg:flex lg:h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Dashboard Main Content */}
        <div className="h-screen overflow-auto lg:p-2 p-4 lg:ml-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
