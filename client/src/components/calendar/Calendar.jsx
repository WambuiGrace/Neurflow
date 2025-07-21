"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, CalendarIcon, Clock } from "lucide-react"
import Button from "../ui/Button"
import Card from "../ui/Card"
import { mockEvents } from "../../utils/mockData"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState("month")

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentMonth + direction)
    setCurrentDate(newDate)
  }

  const getEventsForDate = (date) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`
    return mockEvents.filter((event) => event.date === dateStr)
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const isToday =
        today.getDate() === date && today.getMonth() === currentMonth && today.getFullYear() === currentYear
      const events = getEventsForDate(date)

      days.push(
        <div
          key={date}
          className={`p-2 min-h-[100px] border border-gray-200 dark:border-gray-700 ${
            isToday ? "bg-indigo-50 dark:bg-indigo-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
        >
          <div
            className={`text-sm font-medium mb-1 ${
              isToday ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-white"
            }`}
          >
            {date}
          </div>
          <div className="space-y-1">
            {events.slice(0, 3).map((event, index) => (
              <div
                key={index}
                className={`text-xs p-1 rounded truncate ${
                  event.type === "meeting"
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : event.type === "deadline"
                      ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                      : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                }`}
              >
                {event.title}
              </div>
            ))}
            {events.length > 3 && (
              <div className="text-xs text-gray-500 dark:text-gray-400">+{events.length - 3} more</div>
            )}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your schedule and track important dates</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Event
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {monthNames[currentMonth]} {currentYear}
                </h2>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth(-1)}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Today
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => navigateMonth(1)}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                {["month", "week", "day"].map((viewType) => (
                  <button
                    key={viewType}
                    onClick={() => setView(viewType)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize ${
                      view === viewType
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {viewType}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              {/* Day Headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="p-3 bg-gray-50 dark:bg-gray-800 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {renderCalendarDays()}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Navigation</h3>
            <div className="text-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {monthNames[today.getMonth()]} {today.getFullYear()}
              </div>
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{today.getDate()}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {today.toLocaleDateString("en-US", { weekday: "long" })}
              </div>
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {mockEvents.slice(0, 5).map((event, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 ${
                      event.type === "meeting"
                        ? "bg-blue-500"
                        : event.type === "deadline"
                          ? "bg-red-500"
                          : "bg-green-500"
                    }`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{event.title}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <CalendarIcon className="w-3 h-3" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      {event.time && (
                        <>
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Event Types */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Event Types</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Meetings</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Deadlines</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Tasks</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Calendar
