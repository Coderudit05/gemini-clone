import React from "react";
import { BsStack } from "react-icons/bs";
import profilePic from "../../assets/profile-pic.png";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-gray-900">
      {/* Left Section (blank for now) */}
      <div className="flex-1 flex items-center">
        <h1 className="text-lg font-bold cursor-pointer">Gemini</h1>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-end gap-2">
        {/* Studio Sidebar Button */}
        <button
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-700 transition"
          title="Files in this chat"
        >
          <BsStack />
        </button>
        {/* PRO Pill Button (disabled) */}
        <div className="px-4 py-1 rounded-full bg-gray-800 text-yellow-400 font-semibold text-xs cursor-pointer opacity-60">
          PRO
        </div>
  <div className="p-0.5 rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-red-500">
          <img
            className="w-9 h-9 rounded-full bg-white object-cover cursor-pointer"
            src={profilePic}
            alt=""
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
