import React from "react";
import Sidebar from "./Sidebar"; // Sidebar component import karo
import Header from "./Header"; // Header component import karo
import ChatInterface from "../feature/chat_Interface/ChatInterface"; // ChatInterface import karo
// LayoutWrapper: App ka main layout container
const LayoutWrapper = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar ko yahan render karo */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 flex flex-col">
        {/* Header ko yahan render karo */}
        <Header />
        <ChatInterface />
      </main>
    </div>
  );
};

export default LayoutWrapper;
