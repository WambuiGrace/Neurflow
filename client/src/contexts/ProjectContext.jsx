"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { projectsAPI } from "../api/projects"

const ProjectContext = createContext()

export const useProjects = () => {
    const context = useContext(ProjectContext)
    if (!context) {
        throw new Error("useProjects must be used within a ProjectProvider")
    }
    return context
}

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true)
            try {
                // Load from API
                const projectsData = await projectsAPI.getProjects()
                setProjects(projectsData.data || [])
                
                // For each project, fetch its tasks
                let allTasks = []
                for (const project of projectsData.data || []) {
                    try {
                        const tasksData = await projectsAPI.getProjectTasks(project.id)
                        allTasks = [...allTasks, ...(tasksData.data || [])]
                    } catch (error) {
                        console.error(`Error fetching tasks for project ${project.id}:`, error)
                    }
                }
                setTasks(allTasks)
            } catch (error) {
                console.error("Error fetching projects:", error)
                // No fallback to localStorage - we want to use only real data
                setProjects([])
                setTasks([])
            } finally {
                setLoading(false)
            }
        }
        
        fetchProjects()
    }, [])

    // We no longer save to localStorage to avoid persisting any data locally

    const createProject = async (projectData) => {
        setLoading(true)
        try {
            const response = await projectsAPI.createProject(projectData)
            const newProject = response.data
            setProjects((prev) => [...prev, newProject])
            return newProject
        } catch (error) {
            console.error("Error creating project:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const updateProject = async (projectId, updates) => {
        setLoading(true)
        try {
            const response = await projectsAPI.updateProject(projectId, updates)
            const updatedProject = response.data
            setProjects((prev) =>
                prev.map((project) => (project.id === projectId ? updatedProject : project))
            )
            return updatedProject
        } catch (error) {
            console.error("Error updating project:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const deleteProject = async (projectId) => {
        setLoading(true)
        try {
            await projectsAPI.deleteProject(projectId)
            setProjects((prev) => prev.filter((project) => project.id !== projectId))
            setTasks((prev) => prev.filter((task) => task.project !== projectId))
        } catch (error) {
            console.error("Error deleting project:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const createTask = async (taskData) => {
        setLoading(true)
        try {
            const response = await projectsAPI.createTask(taskData.project, taskData)
            const newTask = response.data
            setTasks((prev) => [...prev, newTask])
            return newTask
        } catch (error) {
            console.error("Error creating task:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const updateTask = async (taskId, updates) => {
        setLoading(true)
        try {
            const response = await projectsAPI.updateTask(taskId, updates)
            const updatedTask = response.data
            setTasks((prev) =>
                prev.map((task) => (task.id === taskId ? updatedTask : task))
            )
            return updatedTask
        } catch (error) {
            console.error("Error updating task:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const deleteTask = async (taskId) => {
        setLoading(true)
        try {
            await projectsAPI.deleteTask(taskId)
            setTasks((prev) => prev.filter((task) => task.id !== taskId))
        } catch (error) {
            console.error("Error deleting task:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const getProjectTasks = (projectName) => {
        return tasks.filter((task) => task.project === projectName)
    }

    const getTasksByStatus = (projectName, status) => {
        return tasks.filter((task) => task.project === projectName && task.status === status)
    }

    return (
        <ProjectContext.Provider
            value={{
                projects,
                tasks,
                loading,
                createProject,
                updateProject,
                deleteProject,
                createTask,
                updateTask,
                deleteTask,
                getProjectTasks,
                getTasksByStatus,
            }}
        >
            {children}
        </ProjectContext.Provider>
    )
}
