export const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    role: "admin",
    teams: ["1", "2"],
    preferences: {
      theme: "light",
      notifications: true,
    },
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    role: "member",
    teams: ["1"],
    preferences: {
      theme: "dark",
      notifications: true,
    },
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    role: "member",
    teams: ["2"],
    preferences: {
      theme: "light",
      notifications: false,
    },
  },
]

export const mockTeams = [
  {
    id: "1",
    name: "Design Team",
    description: "Creative minds working on user experience and visual design",
    status: "active",
    projects: 8,
    members: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
        role: "admin",
        status: "online",
        joinedAt: "2023-01-15",
      },
      {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        role: "member",
        status: "away",
        joinedAt: "2023-02-20",
      },
      {
        id: "4",
        name: "Emily Davis",
        email: "emily@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
        role: "member",
        status: "online",
        joinedAt: "2023-03-10",
      },
    ],
  },
  {
    id: "2",
    name: "Development Team",
    description: "Full-stack developers building amazing products",
    status: "active",
    projects: 12,
    members: [
      {
        id: "3",
        name: "Mike Chen",
        email: "mike@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
        role: "admin",
        status: "online",
        joinedAt: "2023-01-10",
      },
      {
        id: "5",
        name: "Alex Wilson",
        email: "alex@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
        role: "member",
        status: "busy",
        joinedAt: "2023-02-15",
      },
    ],
  },
  {
    id: "3",
    name: "Marketing Team",
    description: "Growth hackers and content creators",
    status: "active",
    projects: 6,
    members: [
      {
        id: "6",
        name: "Lisa Brown",
        email: "lisa@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
        role: "admin",
        status: "online",
        joinedAt: "2023-01-20",
      },
    ],
  },
]

export const mockProjects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design",
    status: "active",
    progress: 75,
    team: "Design Team",
    dueDate: "2024-02-15",
    createdAt: "2023-12-01",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native iOS and Android app for customer engagement",
    status: "active",
    progress: 45,
    team: "Development Team",
    dueDate: "2024-03-30",
    createdAt: "2023-11-15",
  },
  {
    id: "3",
    name: "Marketing Campaign Q1",
    description: "Comprehensive marketing strategy for Q1 2024",
    status: "planning",
    progress: 20,
    team: "Marketing Team",
    dueDate: "2024-01-31",
    createdAt: "2023-12-10",
  },
  {
    id: "4",
    name: "API Integration",
    description: "Third-party API integrations for enhanced functionality",
    status: "active",
    progress: 60,
    team: "Development Team",
    dueDate: "2024-02-28",
    createdAt: "2023-11-20",
  },
  {
    id: "5",
    name: "User Research Study",
    description: "Comprehensive user research for product improvements",
    status: "on-hold",
    progress: 10,
    team: "Design Team",
    dueDate: "2024-04-15",
    createdAt: "2023-12-05",
  },
  {
    id: "6",
    name: "Database Optimization",
    description: "Performance improvements and database restructuring",
    status: "active",
    progress: 85,
    team: "Development Team",
    dueDate: "2024-01-20",
    createdAt: "2023-11-01",
  },
]

export const mockTasks = [
  {
    id: "1",
    title: "Design homepage mockup",
    description: "Create high-fidelity mockups for the new homepage design",
    status: "todo",
    priority: "high",
    project: "Website Redesign",
    assignee: "Sarah Johnson",
    dueDate: "2024-01-25",
    tags: ["design", "ui/ux"],
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Set up secure user login and registration system",
    status: "in-progress",
    priority: "high",
    project: "Mobile App Development",
    assignee: "Mike Chen",
    dueDate: "2024-01-30",
    tags: ["backend", "security"],
    createdAt: "2024-01-08",
  },
  {
    id: "3",
    title: "Write blog post about new features",
    description: "Create engaging content highlighting our latest product updates",
    status: "review",
    priority: "medium",
    project: "Marketing Campaign Q1",
    assignee: "Lisa Brown",
    dueDate: "2024-01-28",
    tags: ["content", "marketing"],
    createdAt: "2024-01-12",
  },
  {
    id: "4",
    title: "Set up CI/CD pipeline",
    description: "Configure automated testing and deployment workflows",
    status: "todo",
    priority: "medium",
    project: "API Integration",
    assignee: "Alex Wilson",
    dueDate: "2024-02-05",
    tags: ["devops", "automation"],
    createdAt: "2024-01-15",
  },
  {
    id: "5",
    title: "Conduct user interviews",
    description: "Interview 10 users about their experience with the current product",
    status: "done",
    priority: "low",
    project: "User Research Study",
    assignee: "Emily Davis",
    dueDate: "2024-01-20",
    tags: ["research", "user-experience"],
    createdAt: "2024-01-05",
  },
  {
    id: "6",
    title: "Optimize database queries",
    description: "Improve performance of slow-running database queries",
    status: "in-progress",
    priority: "high",
    project: "Database Optimization",
    assignee: "Mike Chen",
    dueDate: "2024-01-22",
    tags: ["database", "performance"],
    createdAt: "2024-01-18",
  },
  {
    id: "7",
    title: "Create component library",
    description: "Build reusable UI components for consistent design",
    status: "todo",
    priority: "medium",
    project: "Website Redesign",
    assignee: "Sarah Johnson",
    dueDate: "2024-02-10",
    tags: ["design-system", "components"],
    createdAt: "2024-01-20",
  },
  {
    id: "8",
    title: "Social media strategy",
    description: "Develop comprehensive social media marketing strategy",
    status: "review",
    priority: "low",
    project: "Marketing Campaign Q1",
    assignee: "Lisa Brown",
    dueDate: "2024-02-01",
    tags: ["social-media", "strategy"],
    createdAt: "2024-01-16",
  },
]

export const mockEvents = [
  {
    id: "1",
    title: "Team Standup",
    date: "2024-01-22",
    time: "09:00",
    type: "meeting",
    description: "Daily team synchronization meeting",
  },
  {
    id: "2",
    title: "Project Deadline",
    date: "2024-01-25",
    type: "deadline",
    description: "Website redesign milestone due",
  },
  {
    id: "3",
    title: "Client Presentation",
    date: "2024-01-26",
    time: "14:00",
    type: "meeting",
    description: "Present Q1 marketing strategy to client",
  },
  {
    id: "4",
    title: "Code Review",
    date: "2024-01-23",
    time: "15:30",
    type: "task",
    description: "Review authentication implementation",
  },
  {
    id: "5",
    title: "Sprint Planning",
    date: "2024-01-29",
    time: "10:00",
    type: "meeting",
    description: "Plan tasks for next sprint",
  },
  {
    id: "6",
    title: "Database Migration",
    date: "2024-01-24",
    type: "deadline",
    description: "Complete database optimization tasks",
  },
  {
    id: "7",
    title: "Design Review",
    date: "2024-01-27",
    time: "11:00",
    type: "meeting",
    description: "Review homepage mockups with stakeholders",
  },
  {
    id: "8",
    title: "User Testing Session",
    date: "2024-01-30",
    time: "13:00",
    type: "task",
    description: "Conduct usability testing with beta users",
  },
]

// Mock WebSocket service
export class MockWebSocketService {
  constructor() {
    this.listeners = new Map()
    this.connected = false
  }

  connect() {
    // TODO: Replace with actual WebSocket connection
    // const ws = new WebSocket('ws://localhost:8080');

    // Simulate connection
    setTimeout(() => {
      this.connected = true
      this.emit("connected", { status: "Connected to Neuroflow server" })
    }, 1000)

    // Simulate periodic updates
    setInterval(() => {
      if (this.connected) {
        this.emit("taskUpdate", {
          taskId: Math.random().toString(),
          status: "updated",
          timestamp: new Date().toISOString(),
        })
      }
    }, 30000)
  }

  disconnect() {
    this.connected = false
    this.emit("disconnected", { status: "Disconnected from server" })
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event).push(callback)
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event)
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((callback) => callback(data))
    }
  }

  send(data) {
    // TODO: Replace with actual WebSocket send
    // this.ws.send(JSON.stringify(data));
    console.log("Mock WebSocket send:", data)
  }
}

export const webSocketService = new MockWebSocketService()
