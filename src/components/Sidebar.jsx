import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaChartBar, FaClipboardList, FaTimesCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";

const UserSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <>
      {/* Hamburger Icon for small screens */}
      {!mobileSidebarOpen && (
        <div className="lg:hidden absolute top-0 left-0.5 z-50">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="text-gray-700 text-2xl p-2 rounded"
          >
            ☰ 
          </button>
        </div>
      )}

      {/* Overlay for small screens */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full bg-[#212B36] text-white transform transition-transform duration-500 ease-in-out
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative lg:block lg:transition-none
        `}
      >
        {/* Close Button for Mobile */}
        <div className="absolute top-2 right-4 lg:hidden z-50">
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <Sidebar
          collapsed={collapsed}
          className="h-screen"
          rootStyles={{
            [`.${sidebarClasses.container}`]: {
              backgroundColor: "transparent",
              height: "100vh",
            },
          }}
        >
          {/* Collapse Button for Large Screens */}
          <div className="hidden lg:flex justify-end p-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-white focus:outline-none"
            >
              {collapsed ? "➡️" : "⬅️"}
            </button>
          </div>

          {/* Sidebar Menu */}
          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                color: "#FFFFFF",
                backgroundColor: active ? "#374151" : "transparent",
                "&:hover": {
                  backgroundColor: "#374151",
                  color: "#FFFFFF",
                },
              }),
            }}
          >
            <MenuItem icon={<FaChartBar />} component={<Link to="/dashboard" />}>
              Dashboard
            </MenuItem>
            <MenuItem icon={<FaClipboardList />} component={<Link to="/job-list" />}>
              Job List 
            </MenuItem>
            <MenuItem icon={<FaTimesCircle />} component={<Link to="/failed-jobs" />}>
              Failed Jobs 
            </MenuItem>
            <MenuItem icon={<FiSettings />} component={<Link to="/settings" />}>
              Settings 
            </MenuItem>           
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default UserSidebar;
