import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdSettings } from "react-icons/md";

// Dummy data for recent chats
const recentChats = [
  "React Folder Structure for Gemini Clone",
  "Finding Royalty-Free Icons Online",
  "VS Code AI Model Comparison",
];

const Sidebar = () => {
  // Collapsed state — initialize from localStorage
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved === "true"; // convert stored string to boolean
  });

  // Update localStorage whenever collapsed changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  // Toggle function
  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={`flex flex-col h-full ${
        collapsed ? "w-20" : "w-64"
      } bg-gray-800 border-r border-gray-700 transition-all duration-300`}
    >
      {/* Top Section */}
      <div className="flex flex-col gap-4 p-4 border-b border-gray-700">
        {/* Menu Icon */}
        <button
          onClick={toggleSidebar}
          className="flex items-center text-2xl font-bold mb-2 rounded-full hover:bg-gray-700 transition w-10 p-2"
        >
          <AiOutlineMenu className="text-2xl" />
        </button>

        {/* New Chat Button */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-full text-white font-2xl transition hover:bg-gray-700">
          <FaRegEdit className="text-xl" />
          {!collapsed && <span>New chat</span>}
        </button>
      </div>

      {/* Middle Section: Recent Chats */}
      {!collapsed && (
  <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <h2 className="text-gray-400 text-xs mb-2 uppercase tracking-wider">
            Recent
          </h2>
          <ul className="space-y-1">
            {recentChats.map((chat, idx) => (
              <li key={idx}>
                <button className="w-full text-left px-2 py-2 rounded hover:bg-gray-700 transition text-sm">
                  {chat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-700 flex flex-col gap-2 mt-auto">
        <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-700 transition text-gray-200">
          <MdSettings className="text-lg" />
          {!collapsed && <span>Settings & Help</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
