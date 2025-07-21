"use client"

import { useState } from "react"
import { Users, User, Plus, TrendingUp, Clock, CheckCircle } from "lucide-react"
import Button from "../ui/Button"
import Card from "../ui/Card"
import { mockProjects, mockTasks } from "../../utils/mockData"

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("team")

  const stats = {
    team: [
      { label: "Active Projects", value: "12", icon: TrendingUp, color: "text-blue-600" },
      { label: "Team Members", value: "24", icon: Users, color: "text-green-600" },
      { label: "Tasks Completed", value: "156", icon: CheckCircle, color: "text-purple-600" },
      { label: "Hours Tracked", value: "1,240", icon: Clock, color: "text-orange-600" },
    ],
    personal: [
      { label: "My Tasks", value: "8", icon: CheckCircle, color: "text-blue-600" },
      { label: "Completed Today", value: "3", icon: TrendingUp, color: "text-green-600" },
      { label: "Hours Today", value: "6.5", icon: Clock, color: "text-purple-600" },
      { label: "Productivity", value: "92%", icon: TrendingUp, color: "text-orange-600" },
    ],
  }

  const recentProjects = mockProjects.slice(0, 6)
  const recentTasks = mockTasks.filter((task) => task.status !== "done").slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("team")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === "team"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          Team Dashboard
        </button>
        <button
          onClick={() => setActiveTab("personal")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === "personal"
              ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
              : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <User className="w-4 h-4 inline mr-2" />
          Personal Dashboard
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats[activeTab].map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {activeTab === "team" ? "Team Projects" : "My Projects"}
            </h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      project.status === "active"
                        ? "bg-green-500"
                        : project.status === "planning"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{project.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{project.team}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full progress-bar"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{project.progress}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity / Tasks */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {activeTab === "team" ? "Recent Activity" : "My Tasks"}
            </h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div
                  className={`w-2 h-2 rounded-full ${
                    task.priority === "high"
                      ? "bg-red-500"
                      : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {task.project} • Due {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    task.status === "todo"
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      : task.status === "in-progress"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                        : "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300"
                  }`}
                >
                  {task.status.replace("-", " ")}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
