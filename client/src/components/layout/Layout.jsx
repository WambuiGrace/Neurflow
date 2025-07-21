"use client"

import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import NotificationContainer from "../ui/NotificationContainer"

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light to-cream-dark dark:from-gray-900 dark:to-gray-800 noise-texture">
      <div className="flex h-screen">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-auto p-6">
            <div className="page-transition">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <NotificationContainer />
    </div>
  )
}

export default Layout
