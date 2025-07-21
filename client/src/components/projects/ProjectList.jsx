"use client"

import { useState } from "react"
import { MoreHorizontal, Calendar, Users, TrendingUp } from "lucide-react"
import Card from "../ui/Card"
import Button from "../ui/Button"

const ProjectList = ({ projects, searchTerm }) => {
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]

    if (sortBy === "progress") {
      aValue = Number.parseInt(aValue)
      bValue = Number.parseInt(bValue)
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
      case "planning":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
      case "on-hold":
        return "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      {/* Table Header */}
      <Card className="p-4">
        <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-600 dark:text-gray-300">
          <div className="col-span-4">
            <button
              onClick={() => handleSort("name")}
              className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white"
            >
              <span>Project Name</span>
              {sortBy === "name" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
            </button>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => handleSort("status")}
              className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white"
            >
              <span>Status</span>
              {sortBy === "status" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
            </button>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => handleSort("team")}
              className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white"
            >
              <span>Team</span>
              {sortBy === "team" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
            </button>
          </div>
          <div className="col-span-2">
            <button
              onClick={() => handleSort("progress")}
              className="flex items-center space-x-1 hover:text-gray-900 dark:hover:text-white"
            >
              <span>Progress</span>
              {sortBy === "progress" && <span className="text-xs">{sortOrder === "asc" ? "↑" : "↓"}</span>}
            </button>
          </div>
          <div className="col-span-2">
            <span>Due Date</span>
          </div>
        </div>
      </Card>

      {/* Project Rows */}
      <div className="space-y-2">
        {sortedProjects.map((project) => (
          <Card key={project.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Project Name */}
              <div className="col-span-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      project.status === "active"
                        ? "bg-green-500"
                        : project.status === "planning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  ></div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{project.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{project.description}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                  {project.status.replace("-", " ")}
                </span>
              </div>

              {/* Team */}
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{project.team}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full progress-bar"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 w-10">{project.progress}%</span>
                </div>
              </div>

              {/* Due Date */}
              <div className="col-span-1">
                <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex justify-end">
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {sortedProjects.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search terms or create a new project.</p>
        </div>
      )}
    </div>
  )
}

export default ProjectList
