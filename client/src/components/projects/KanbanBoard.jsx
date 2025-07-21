"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Plus, MoreHorizontal, Calendar, User } from "lucide-react"
import Card from "../ui/Card"
import Button from "../ui/Button"
import TaskModal from "./TaskModal"
import { useProjects } from "../../contexts/ProjectContext"

const KanbanBoard = ({ project }) => {
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState("todo")

  const { tasks, updateTask, createTask, getTasksByStatus } = useProjects()

  const columns = [
    { id: "todo", title: "To Do", color: "bg-gray-100 dark:bg-gray-800" },
    { id: "in-progress", title: "In Progress", color: "bg-blue-100 dark:bg-blue-900" },
    { id: "review", title: "Review", color: "bg-yellow-100 dark:bg-yellow-900" },
    { id: "done", title: "Done", color: "bg-green-100 dark:bg-green-900" },
  ]

  const onDragEnd = (result) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result

    if (source.droppableId !== destination.droppableId) {
      updateTask(draggableId, { status: destination.droppableId })
    }
  }

  const handleCreateTask = (taskData) => {
    createTask({
      ...taskData,
      project: project.name,
      status: selectedColumn,
    })
    setShowTaskModal(false)
  }

  const handleUpdateTask = (taskData) => {
    updateTask(taskData.id, taskData)
    setEditingTask(null)
    setShowTaskModal(false)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setShowTaskModal(true)
  }

  const handleAddTask = (columnId) => {
    setSelectedColumn(columnId)
    setShowTaskModal(true)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(project.name, column.id)

            return (
              <div key={column.id} className="flex-shrink-0 w-80">
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[600px] rounded-lg p-4 ${snapshot.isDraggingOver ? "drag-over" : column.color}`}
                    >
                      {/* Column Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{column.title}</h3>
                          <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                            {columnTasks.length}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleAddTask(column.id)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Tasks */}
                      <div className="space-y-3">
                        {columnTasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`task-card ${snapshot.isDragging ? "rotate-3 scale-105" : ""}`}
                              >
                                <Card className="p-4 cursor-pointer" onClick={() => handleEditTask(task)}>
                                  <div className="flex items-start justify-between mb-3">
                                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                  </div>

                                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">{task.title}</h4>

                                  {task.description && (
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                                      {task.description}
                                    </p>
                                  )}

                                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center space-x-2">
                                      <Calendar className="w-3 h-3" />
                                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                    </div>

                                    {task.assignee && (
                                      <div className="flex items-center space-x-1">
                                        <User className="w-3 h-3" />
                                        <img
                                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignee}`}
                                          alt={task.assignee}
                                          className="w-5 h-5 rounded-full"
                                        />
                                      </div>
                                    )}
                                  </div>

                                  {task.tags && task.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-3">
                                      {task.tags.map((tag, tagIndex) => (
                                        <span
                                          key={tagIndex}
                                          className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            )
          })}
        </div>
      </DragDropContext>

      {/* Task Modal */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false)
          setEditingTask(null)
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
        projectId={project.name}
      />
    </>
  )
}

export default KanbanBoard
