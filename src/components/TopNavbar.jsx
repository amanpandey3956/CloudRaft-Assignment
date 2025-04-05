import React, { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const TopNavbar = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <div className="flex justify-end items-center bg-white shadow-md px-3 py-2 h-[50px] md:h-[58px] lg:px-6 lg:py-2 lg:pr-12 lg:h-[62px]">
      <div className="flex items-center space-x-3 md:space-x-4">

        {/* Notifications */}
        <div className="relative mr-4 md:mr-6 lg:mr-6">
          <FaBell className="text-gray-600 text-xl lg:text-lg md:text-xl cursor-pointer" />
        </div>

        {/* Admin Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center md:space-x-1 lg:space-x-1"
          >
            <FaUserCircle className="text-xl md:text-xl lg:text-2xl text-gray-600" />
            <MdKeyboardArrowDown className="text-sm md:text-base" />
          </button>

          {/* Profile Dropdown */}
          {isProfileDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-32 md:w-40 bg-white shadow-md rounded-md py-2 z-10">
              <button className="block w-full text-left px-3 py-1.5 md:px-4 md:py-2 hover:bg-gray-100 text-sm md:text-base">
                Profile
              </button>
              <button className="block w-full text-left px-3 py-1.5 md:px-4 md:py-2 hover:bg-gray-100 text-sm md:text-base">
                Login logs
              </button>
              <button className="block w-full text-left px-3 py-1.5 md:px-4 md:py-2 hover:bg-gray-100 text-sm md:text-base">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
