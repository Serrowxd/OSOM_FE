import React from "react";

function Sidebar() {
  return (
    <div className="flex flex-col w-64 h-full bg-gray-800">
      <div className="flex items-center justify-center px-4 py-8 text-white text-2xl font-bold bg-gray-900">
        Good Morning!
      </div>
      <nav className="flex flex-col flex-1 text-2xl items-center space-y-1">
        <a
          href="#"
          className="flex w-full justify-center items-center px-4 py-2 mt-5 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <span className="">Home</span>
        </a>
        <a
          href="#"
          className="flex w-full justify-center px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <span className="">Notes</span>
        </a>
        <a
          href="#"
          className="flex w-full justify-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <span className="">Calendar</span>
        </a>
        <a
          href="#"
          className="flex w-full justify-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <span className="">Profile</span>
        </a>
        <a
          href="#"
          className="flex w-full justify-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <span className="">Settings</span>
        </a>
        <a
          href="#"
          className="flex w-full justify-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <span className="">Logout</span>
        </a>
      </nav>
      
      <div className="flex items-center justify-center px-4 py-8 text-white text-lg">
        <p className="font-light text-sm text-gray-500">
          Copyright 2024 OSOM Project
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
