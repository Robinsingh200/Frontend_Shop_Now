import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/SideBar";

export const Dashboardlayout = () => {
  return (
    <section className="flex h-screen overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-64 sticky top-0 h-screen mt-5 border-t-2 ">
        <Sidebar />
      </aside>

      {/* CONTENT AREA (ONLY THIS SCROLLS) */}
      <main className="flex-1 overflow-y-auto p-4 mt-2 bg-gray-50 rounded-xl">
        <Outlet />
      </main>

    </section>
  );
};
