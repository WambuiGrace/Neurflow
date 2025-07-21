"use client"

import { useState } from "react"
import { Bell, Check, X, Filter, MoreHorizontal, Users, Calendar, AlertCircle, CheckCircle, Info } from "lucide-react"
import Button from "../ui/Button"
import Card from "../ui/Card"

const Notifications = () => {
    const [filter, setFilter] = useState("all")
    const [notifications, setNotifications] = useState([
        {
            id: "1",
            type: "task",
            title: "Task assigned to you",
            message: "You have been assigned to 'Design homepage mockup' in Website Redesign project",
            timestamp: "2 minutes ago",
            read: false,
            icon: CheckCircle,
            color: "text-blue-600",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
        },
        {
            id: "2",
            type: "team",
            title: "New team member",
            message: "Sarah Johnson joined the Design Team",
            timestamp: "1 hour ago",
            read: false,
            icon: Users,
            color: "text-green-600",
            bgColor: "bg-green-50 dark:bg-green-900/20",
        },
        {
            id: "3",
            type: "deadline",
            title: "Deadline approaching",
            message: "Website Redesign project deadline is in 3 days",
            timestamp: "3 hours ago",
            read: true,
            icon: AlertCircle,
            color: "text-orange-600",
            bgColor: "bg-orange-50 dark:bg-orange-900/20",
        },
        {
            id: "4",
            type: "meeting",
            title: "Meeting reminder",
            message: "Team standup meeting starts in 30 minutes",
            timestamp: "4 hours ago",
            read: true,
            icon: Calendar,
            color: "text-purple-600",
            bgColor: "bg-purple-50 dark:bg-purple-900/20",
        },
        {
            id: "5",
            type: "system",
            title: "System update",
            message: "Neuroflow has been updated with new features and improvements",
            timestamp: "1 day ago",
            read: true,
            icon: Info,
            color: "text-indigo-600",
            bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
        },
        {
            id: "6",
            type: "task",
            title: "Task completed",
            message: "Mike Chen completed 'Implement user authentication' task",
            timestamp: "1 day ago",
            read: true,
            icon: CheckCircle,
            color: "text-green-600",
            bgColor: "bg-green-50 dark:bg-green-900/20",
        },
        {
            id: "7",
            type: "team",
            title: "Project milestone reached",
            message: "Mobile App Development project reached 50% completion",
            timestamp: "2 days ago",
            read: true,
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
        },
        {
            id: "8",
            type: "deadline",
            title: "Task overdue",
            message: "Database optimization task is now overdue",
            timestamp: "3 days ago",
            read: true,
            icon: AlertCircle,
            color: "text-red-600",
            bgColor: "bg-red-50 dark:bg-red-900/20",
        },
    ])

    const filterOptions = [
        { value: "all", label: "All", count: notifications.length },
        { value: "unread", label: "Unread", count: notifications.filter((n) => !n.read).length },
        { value: "task", label: "Tasks", count: notifications.filter((n) => n.type === "task").length },
        { value: "team", label: "Team", count: notifications.filter((n) => n.type === "team").length },
        { value: "deadline", label: "Deadlines", count: notifications.filter((n) => n.type === "deadline").length },
        { value: "meeting", label: "Meetings", count: notifications.filter((n) => n.type === "meeting").length },
    ]

    const filteredNotifications = notifications.filter((notification) => {
        if (filter === "all") return true
        if (filter === "unread") return !notification.read
        return notification.type === filter
    })

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
        )
    }

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    }

    const deleteNotification = (id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    }

    const unreadCount = notifications.filter((n) => !n.read).length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center space-x-3">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                        {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">{unreadCount}</span>
                        )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">Stay updated with your team and projects</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
                        <Check className="w-4 h-4 mr-2" />
                        Mark All Read
                    </Button>
                    <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Settings
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
                {/* Filter Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="p-4">
                        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Filter</h2>
                        <div className="space-y-2">
                            {filterOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setFilter(option.value)}
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${filter === option.value
                                            ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    <span className="font-medium">{option.label}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{option.count}</span>
                                </button>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Notifications List */}
                <div className="lg:col-span-3">
                    <Card className="p-6">
                        <div className="space-y-4">
                            {filteredNotifications.length === 0 ? (
                                <div className="text-center py-12">
                                    <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notifications</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {filter === "all"
                                            ? "You're all caught up! No new notifications."
                                            : `No ${filter} notifications found.`}
                                    </p>
                                </div>
                            ) : (
                                filteredNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`flex items-start space-x-4 p-4 rounded-lg border transition-colors ${notification.read
                                                ? "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                                : `${notification.bgColor} border-gray-300 dark:border-gray-600`
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg ${notification.bgColor}`}>
                                            <notification.icon className={`w-5 h-5 ${notification.color}`} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4
                                                        className={`font-medium ${notification.read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-white"
                                                            }`}
                                                    >
                                                        {notification.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{notification.timestamp}</p>
                                                </div>

                                                <div className="flex items-center space-x-2 ml-4">
                                                    {!notification.read && (
                                                        <button
                                                            onClick={() => markAsRead(notification.id)}
                                                            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                                            title="Mark as read"
                                                        >
                                                            <Check className="w-4 h-4 text-gray-500" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                                        title="Delete notification"
                                                    >
                                                        <X className="w-4 h-4 text-gray-500" />
                                                    </button>
                                                    <button className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                                                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Notifications
