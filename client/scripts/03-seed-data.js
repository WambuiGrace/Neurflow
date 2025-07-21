// MongoDB Seed Data Script
// Run this script to populate the database with sample data

const { ObjectId } = require("mongodb")
const db = require("./db") // Assuming db is imported from a module

// Insert sample users
const users = [
  {
    _id: ObjectId(),
    email: "john@example.com",
    name: "John Doe",
    password: "$2b$10$hashedpassword1", // This should be properly hashed
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    role: "admin",
    bio: "Full-stack developer with 5+ years of experience",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    preferences: {
      theme: "light",
      notifications: true,
      language: "en",
      timezone: "America/Los_Angeles",
    },
    teams: [],
    lastLogin: new Date(),
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId(),
    email: "sarah@example.com",
    name: "Sarah Johnson",
    password: "$2b$10$hashedpassword2",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    role: "member",
    bio: "UX/UI Designer passionate about creating beautiful user experiences",
    location: "New York, NY",
    preferences: {
      theme: "dark",
      notifications: true,
      language: "en",
      timezone: "America/New_York",
    },
    teams: [],
    lastLogin: new Date(Date.now() - 3600000), // 1 hour ago
    isActive: true,
    emailVerified: true,
    twoFactorEnabled: true,
    createdAt: new Date(Date.now() - 86400000 * 30), // 30 days ago
    updatedAt: new Date(),
  },
]

db.users.insertMany(users)

// Insert sample teams
const teams = [
  {
    _id: ObjectId(),
    name: "Design Team",
    description: "Creative minds working on user experience and visual design",
    status: "active",
    members: [
      {
        userId: users[0]._id,
        role: "admin",
        joinedAt: new Date(Date.now() - 86400000 * 30),
      },
      {
        userId: users[1]._id,
        role: "member",
        joinedAt: new Date(Date.now() - 86400000 * 25),
      },
    ],
    createdBy: users[0]._id,
    createdAt: new Date(Date.now() - 86400000 * 30),
    updatedAt: new Date(),
  },
]

db.teams.insertMany(teams)

// Insert sample projects
const projects = [
  {
    _id: ObjectId(),
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design",
    status: "active",
    priority: "high",
    progress: 75,
    teamId: teams[0]._id,
    assignees: [users[0]._id, users[1]._id],
    tags: ["design", "frontend", "ui/ux"],
    startDate: new Date(Date.now() - 86400000 * 20),
    dueDate: new Date(Date.now() + 86400000 * 10),
    createdBy: users[0]._id,
    createdAt: new Date(Date.now() - 86400000 * 20),
    updatedAt: new Date(),
  },
]

db.projects.insertMany(projects)

// Insert sample tasks
const tasks = [
  {
    _id: ObjectId(),
    title: "Design homepage mockup",
    description: "Create high-fidelity mockups for the new homepage design",
    status: "in-progress",
    priority: "high",
    projectId: projects[0]._id,
    assigneeId: users[1]._id,
    tags: ["design", "ui/ux"],
    estimatedHours: 8,
    actualHours: 5,
    dueDate: new Date(Date.now() + 86400000 * 3),
    createdBy: users[0]._id,
    createdAt: new Date(Date.now() - 86400000 * 5),
    updatedAt: new Date(),
  },
]

db.tasks.insertMany(tasks)

console.log("Sample data inserted successfully!")
