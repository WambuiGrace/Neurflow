"use client"
import { NavLink, useLocation } from "react-router-dom"
import {
  Brain,
  LayoutDashboard,
  FolderKanban,
  Users,
  Calendar,
  BarChart3,
  Bell,
  Settings,
  ChevronLeft,
} from "lucide-react"

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation()

  const navigation = [
    { name: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/app/projects", icon: FolderKanban },
    { name: "Teams", href: "/app/teams", icon: Users },
    { name: "Calendar", href: "/app/calendar", icon: Calendar },
    { name: "Analytics", href: "/app/analytics", icon: BarChart3 },
    { name: "Notifications", href: "/app/notifications", icon: Bell },
    { name: "Settings", href: "/app/settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 
        bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300 ease-in-out sidebar-transition
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${!isOpen ? "lg:w-16" : "lg:w-64"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-indigo-600 flex-shrink-0" />
              {(isOpen || window.innerWidth < 1024) && (
                <span className="text-xl font-bold text-gray-800 dark:text-white">Neuroflow</span>
              )}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hidden lg:block p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className={`w-5 h-5 text-gray-500 transition-transform ${!isOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-thin">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }
                    ${!isOpen ? "lg:justify-center lg:px-2" : ""}
                  `}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${!isOpen ? "" : "mr-3"}`} />
                  {(isOpen || window.innerWidth < 1024) && <span className="truncate">{item.name}</span>}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Sidebar
