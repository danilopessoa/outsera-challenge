import { useState } from "react";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import * as React from "react";

export const Template: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header
        onMenuClick={() => {
          setSidebarOpen(true);
        }}
      />

      <div className="flex flex-1 overflow-hidden w-full">
        <Sidebar
          open={sidebarOpen}
          onClose={() => {
            setSidebarOpen(false);
          }}
        />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
