import React from "react";
import Sidebar from "./components/Sidebar";

function App() {
  // Hooks
  
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      {/* Content area */}
      <div className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
        <p className="mt-4">This is your content area.</p>
      </div>
    </div>
  );
}

export default App;
