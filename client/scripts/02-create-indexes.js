// MongoDB Indexes Creation Script
// Run this script to create performance indexes

const db = require("./db") // Assuming db is imported from a module

// Users Collection Indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ "socialAuth.googleId": 1 }, { sparse: true })
db.users.createIndex({ "socialAuth.githubId": 1 }, { sparse: true })
db.users.createIndex({ createdAt: -1 })
db.users.createIndex({ lastLogin: -1 })
db.users.createIndex({ isActive: 1 })

// Teams Collection Indexes
db.teams.createIndex({ name: 1 })
db.teams.createIndex({ createdBy: 1 })
db.teams.createIndex({ "members.userId": 1 })
db.teams.createIndex({ status: 1 })
db.teams.createIndex({ createdAt: -1 })

// Projects Collection Indexes
db.projects.createIndex({ name: 1 })
db.projects.createIndex({ teamId: 1 })
db.projects.createIndex({ status: 1 })
db.projects.createIndex({ createdBy: 1 })
db.projects.createIndex({ assignees: 1 })
db.projects.createIndex({ dueDate: 1 })
db.projects.createIndex({ createdAt: -1 })
db.projects.createIndex({ tags: 1 })

// Tasks Collection Indexes
db.tasks.createIndex({ title: "text", description: "text" })
db.tasks.createIndex({ projectId: 1 })
db.tasks.createIndex({ assigneeId: 1 })
db.tasks.createIndex({ status: 1 })
db.tasks.createIndex({ priority: 1 })
db.tasks.createIndex({ dueDate: 1 })
db.tasks.createIndex({ createdBy: 1 })
db.tasks.createIndex({ createdAt: -1 })
db.tasks.createIndex({ tags: 1 })

// Notifications Collection Indexes
db.notifications.createIndex({ userId: 1 })
db.notifications.createIndex({ read: 1 })
db.notifications.createIndex({ type: 1 })
db.notifications.createIndex({ createdAt: -1 })
db.notifications.createIndex({ userId: 1, read: 1, createdAt: -1 })

// Events Collection Indexes
db.events.createIndex({ date: 1 })
db.events.createIndex({ createdBy: 1 })
db.events.createIndex({ attendees: 1 })
db.events.createIndex({ projectId: 1 })
db.events.createIndex({ teamId: 1 })
db.events.createIndex({ type: 1 })
db.events.createIndex({ createdAt: -1 })

console.log("Indexes created successfully!")
