"use client"

import { useState } from "react"
import { Plus, Grid, List, Filter } from "lucide-react"
import Button from "../ui/Button"
import SearchBar from "../ui/SearchBar"
import KanbanBoard from "./KanbanBoard"
import ProjectList from "./ProjectList"
import ProjectModal from "./ProjectModal"
import { useProjects } from "../../contexts/ProjectContext"
import { useNotifications } from "../../contexts/NotificationContext"

const Projects = () => {
  const [view, setView] = useState("kanban")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProject, setSelectedProject] = useState(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)

  const { projects, createProject, updateProject } = useProjects()
  const { addNotification } = useNotifications()

  // Set default selected project
  useState(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0])
    }
  }, [projects])

  const handleCreateProject = (projectData) => {
    createProject(projectData)
    setShowProjectModal(false)
  }

  const handleUpdateProject = (projectData) => {
    updateProject(projectData.id, projectData)
    setEditingProject(null)
    setShowProjectModal(false)
  }

  const handleEditProject = (project) => {
    setEditingProject(project)
    setShowProjectModal(true)
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your projects and track progress</p>
        </div>
        <Button className="flex items-center space-x-2" onClick={() => setShowProjectModal(true)}>
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <SearchBar onSearch={setSearchTerm} placeholder="Search projects..." className="w-64" />

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setView("kanban")}
            className={`p-2 rounded-md transition-colors ${view === "kanban"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-md transition-colors ${view === "list"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Project Selector for Kanban View */}
      {view === "kanban" && (
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedProject?.id === project.id
                  ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              {project.name}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="min-h-[600px]">
        {view === "kanban" ? (
          selectedProject ? (
            <KanbanBoard project={selectedProject} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-400">Create your first project to get started.</p>
            </div>
          )
        ) : (
          <ProjectList projects={filteredProjects} onEditProject={handleEditProject} />
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={showProjectModal}
        onClose={() => {
          setShowProjectModal(false)
          setEditingProject(null)
        }}
        onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
        project={editingProject}
      />
    </div>
  )
}

export default Projects
