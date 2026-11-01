/**
 * components/layout/Layout.jsx 
 * Shell: responsive sidebar + top navbar + main content outlet.
 */

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


export default function Layout() {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black/40 lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main area */}
        <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
          <Navbar onMenuClick={() =>  setSidebarOpen(true)} />

            <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8 animate-fade-in">
              <Outlet />
            </main>
        </div>
      </div>
    </>
  )
}
