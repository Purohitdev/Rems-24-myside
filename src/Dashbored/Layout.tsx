import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="flex h-screen bg-[#f8f8f8]">
      <Sidebar />

      <main className="flex-1 p-6 overflow-y-auto overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}
