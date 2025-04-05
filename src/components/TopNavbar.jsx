import React, { useState } from "react";
import { FaBell, FaUserCircle, FaUniversity } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const TopNavbar = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isCampusDropdownOpen, setCampusDropdownOpen] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState("Thapar University");

  const campuses = ["Thapar University", "BITS Pilani", "Punjabi University"];

  return (
    <div className="flex justify-end items-center bg-white shadow-md px-3 py-2 h-[50px] md:h-[58px] lg:px-6 lg:py-2 lg:pr-12 lg:h-[62px]">
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Campus Switcher */}
        <div className="relative mr-4 md:mr-6 lg:mr-12">
          <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-2">
            <span className="hidden sm:block text-sm md:text-base font-bold">
              Switch Campus:
            </span>
            <button
              onClick={() => setCampusDropdownOpen(!isCampusDropdownOpen)}
              className="flex items-center border border-gray-300 px-2 py-1.5 md:px-3 md:py-1.5 rounded-md bg-white lg:px-4 lg:py-1.5"
            >
              <span className="text-xs lg:text-base md:text-sm font-medium">
                {selectedCampus.length > 18
                  ? selectedCampus.slice(0, 18) + "..."
                  : selectedCampus}
              </span>
              <MdKeyboardArrowDown className="ml-1 lg:ml-2" />
            </button>
          </div>

          {/* Dropdown List */}
          {isCampusDropdownOpen && (
            <div className="absolute left-0 top-full mt-1 w-40 md:w-48 bg-white shadow-lg rounded-md py-2 border z-10 lg:mt-1 lg:w-56 lg:py-2">
              {campuses.map((campus) => (
                <button
                  key={campus}
                  onClick={() => {
                    setSelectedCampus(campus);
                    setCampusDropdownOpen(false);
                  }}
                  className={`flex items-center px-2 py-1.5 md:px-3 md:py-2 lg:px-4 lg:py-2 w-full text-left ${
                    selectedCampus === campus ? "font-bold" : ""
                  } hover:bg-gray-100`}
                >
                  <FaUniversity className="mr-1 md:mr-2 text-gray-500 text-sm md:text-base lg:mr-2 lg:text-base" />
                  <span className="text-xs lg:text-base md:text-sm">{campus}</span>
                </button>
              ))}
            </div>
          )}
        </div>

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
