"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, Users, Clock, CheckCircle, Download } from "lucide-react"
import Button from "../ui/Button"
import Card from "../ui/Card"

const Analytics = () => {
  const [dateRange, setDateRange] = useState("30d")
  const [chartType, setChartType] = useState("pie")

  const taskDistributionData = [
    { name: "To Do", value: 35, color: "#6B7280" },
    { name: "In Progress", value: 25, color: "#3B82F6" },
    { name: "Review", value: 20, color: "#F59E0B" },
    { name: "Done", value: 20, color: "#10B981" },
  ]

  const productivityData = [
    { name: "Mon", tasks: 12, hours: 8 },
    { name: "Tue", tasks: 15, hours: 7.5 },
    { name: "Wed", tasks: 8, hours: 6 },
    { name: "Thu", tasks: 18, hours: 9 },
    { name: "Fri", tasks: 14, hours: 8.5 },
    { name: "Sat", tasks: 6, hours: 4 },
    { name: "Sun", tasks: 3, hours: 2 },
  ]

  const teamPerformanceData = [
    { name: "Design Team", completed: 45, total: 60 },
    { name: "Development", completed: 38, total: 45 },
    { name: "Marketing", completed: 28, total: 35 },
    { name: "Sales", completed: 22, total: 30 },
  ]

  const stats = [
    {
      label: "Total Tasks",
      value: "248",
      change: "+12%",
      changeType: "positive",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Active Projects",
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      label: "Team Members",
      value: "24",
      change: "+3",
      changeType: "positive",
      icon: Users,
      color: "text-purple-600",
    },
    {
      label: "Hours Tracked",
      value: "1,240",
      change: "+8%",
      changeType: "positive",
      icon: Clock,
      color: "text-orange-600",
    },
  ]

  const renderChart = () => {
    switch (chartType) {
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskDistributionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {taskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#4F46E5" />
              <Bar dataKey="total" fill="#E5E7EB" />
            </BarChart>
          </ResponsiveContainer>
        )
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tasks" stroke="#4F46E5" strokeWidth={2} />
              <Line type="monotone" dataKey="hours" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Track your team's performance and productivity</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Date Range Selector */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change} from last period
                </p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {chartType === "pie"
                  ? "Task Distribution"
                  : chartType === "bar"
                    ? "Team Performance"
                    : "Productivity Trends"}
              </h2>
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <button
                  onClick={() => setChartType("pie")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    chartType === "pie"
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Pie
                </button>
                <button
                  onClick={() => setChartType("bar")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    chartType === "bar"
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Bar
                </button>
                <button
                  onClick={() => setChartType("line")}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    chartType === "line"
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  Line
                </button>
              </div>
            </div>
            {renderChart()}
          </Card>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* Top Performers */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Top Performers</h3>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", tasks: 24, avatar: "sarah" },
                { name: "Mike Chen", tasks: 21, avatar: "mike" },
                { name: "Emily Davis", tasks: 19, avatar: "emily" },
                { name: "Alex Wilson", tasks: 17, avatar: "alex" },
              ].map((performer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${performer.avatar}`}
                      alt={performer.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{performer.name}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{performer.tasks} tasks</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: "Task completed", project: "Website Redesign", time: "2 hours ago" },
                { action: "New project created", project: "Mobile App", time: "4 hours ago" },
                { action: "Team member added", project: "Marketing Campaign", time: "6 hours ago" },
                { action: "Milestone reached", project: "API Development", time: "1 day ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.project} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Completion Rate</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Avg. Task Time</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">2.4 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Overdue Tasks</span>
                <span className="text-sm font-medium text-red-600">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Team Efficiency</span>
                <span className="text-sm font-medium text-green-600">92%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Analytics
