// MongoDB Collection Creation Script
// Run this script in MongoDB shell or MongoDB Compass

const db = db.getSiblingDB("yourDatabaseName") // Declare the db variable

// Create Users Collection
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "name", "createdAt"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "must be a valid email address",
        },
        name: {
          bsonType: "string",
          minLength: 1,
          maxLength: 100,
          description: "must be a string between 1-100 characters",
        },
        password: {
          bsonType: "string",
          description: "hashed password",
        },
        avatar: {
          bsonType: "string",
          description: "URL to user avatar image",
        },
        role: {
          bsonType: "string",
          enum: ["admin", "member", "viewer"],
          description: "user role in the system",
        },
        bio: {
          bsonType: "string",
          maxLength: 500,
          description: "user biography",
        },
        location: {
          bsonType: "string",
          maxLength: 100,
          description: "user location",
        },
        website: {
          bsonType: "string",
          description: "user website URL",
        },
        preferences: {
          bsonType: "object",
          properties: {
            theme: {
              bsonType: "string",
              enum: ["light", "dark"],
              description: "user theme preference",
            },
            notifications: {
              bsonType: "bool",
              description: "notification preferences",
            },
            language: {
              bsonType: "string",
              description: "preferred language",
            },
            timezone: {
              bsonType: "string",
              description: "user timezone",
            },
          },
        },
        socialAuth: {
          bsonType: "object",
          properties: {
            googleId: {
              bsonType: "string",
              description: "Google OAuth ID",
            },
            githubId: {
              bsonType: "string",
              description: "GitHub OAuth ID",
            },
          },
        },
        teams: {
          bsonType: "array",
          items: {
            bsonType: "objectId",
          },
          description: "array of team IDs user belongs to",
        },
        lastLogin: {
          bsonType: "date",
          description: "last login timestamp",
        },
        isActive: {
          bsonType: "bool",
          description: "whether user account is active",
        },
        emailVerified: {
          bsonType: "bool",
          description: "whether email is verified",
        },
        twoFactorEnabled: {
          bsonType: "bool",
          description: "whether 2FA is enabled",
        },
        createdAt: {
          bsonType: "date",
          description: "account creation timestamp",
        },
        updatedAt: {
          bsonType: "date",
          description: "last update timestamp",
        },
      },
    },
  },
})

// Create Teams Collection
db.createCollection("teams", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "createdBy", "createdAt"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        name: {
          bsonType: "string",
          minLength: 1,
          maxLength: 100,
          description: "team name",
        },
        description: {
          bsonType: "string",
          maxLength: 500,
          description: "team description",
        },
        avatar: {
          bsonType: "string",
          description: "team avatar URL",
        },
        status: {
          bsonType: "string",
          enum: ["active", "inactive", "archived"],
          description: "team status",
        },
        members: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["userId", "role", "joinedAt"],
            properties: {
              userId: {
                bsonType: "objectId",
                description: "reference to user",
              },
              role: {
                bsonType: "string",
                enum: ["admin", "member", "viewer"],
                description: "user role in team",
              },
              joinedAt: {
                bsonType: "date",
                description: "when user joined team",
              },
            },
          },
        },
        createdBy: {
          bsonType: "objectId",
          description: "user who created the team",
        },
        createdAt: {
          bsonType: "date",
        },
        updatedAt: {
          bsonType: "date",
        },
      },
    },
  },
})

// Create Projects Collection
db.createCollection("projects", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "teamId", "createdBy", "createdAt"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        name: {
          bsonType: "string",
          minLength: 1,
          maxLength: 100,
        },
        description: {
          bsonType: "string",
          maxLength: 1000,
        },
        status: {
          bsonType: "string",
          enum: ["planning", "active", "on-hold", "completed", "archived"],
        },
        priority: {
          bsonType: "string",
          enum: ["low", "medium", "high", "urgent"],
        },
        progress: {
          bsonType: "int",
          minimum: 0,
          maximum: 100,
        },
        teamId: {
          bsonType: "objectId",
        },
        assignees: {
          bsonType: "array",
          items: {
            bsonType: "objectId",
          },
        },
        tags: {
          bsonType: "array",
          items: {
            bsonType: "string",
          },
        },
        startDate: {
          bsonType: "date",
        },
        dueDate: {
          bsonType: "date",
        },
        completedAt: {
          bsonType: "date",
        },
        createdBy: {
          bsonType: "objectId",
        },
        createdAt: {
          bsonType: "date",
        },
        updatedAt: {
          bsonType: "date",
        },
      },
    },
  },
})

// Create Tasks Collection
db.createCollection("tasks", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "projectId", "createdBy", "createdAt"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        title: {
          bsonType: "string",
          minLength: 1,
          maxLength: 200,
        },
        description: {
          bsonType: "string",
          maxLength: 2000,
        },
        status: {
          bsonType: "string",
          enum: ["todo", "in-progress", "review", "done"],
        },
        priority: {
          bsonType: "string",
          enum: ["low", "medium", "high", "urgent"],
        },
        projectId: {
          bsonType: "objectId",
        },
        assigneeId: {
          bsonType: "objectId",
        },
        tags: {
          bsonType: "array",
          items: {
            bsonType: "string",
          },
        },
        estimatedHours: {
          bsonType: "int",
          minimum: 0,
        },
        actualHours: {
          bsonType: "int",
          minimum: 0,
        },
        dueDate: {
          bsonType: "date",
        },
        completedAt: {
          bsonType: "date",
        },
        createdBy: {
          bsonType: "objectId",
        },
        createdAt: {
          bsonType: "date",
        },
        updatedAt: {
          bsonType: "date",
        },
      },
    },
  },
})

// Create Notifications Collection
db.createCollection("notifications", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "type", "title", "message", "createdAt"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        userId: {
          bsonType: "objectId",
        },
        type: {
          bsonType: "string",
          enum: ["task", "team", "deadline", "meeting", "system"],
        },
        title: {
          bsonType: "string",
          maxLength: 100,
        },
        message: {
          bsonType: "string",
          maxLength: 500,
        },
        read: {
          bsonType: "bool",
        },
        actionUrl: {
          bsonType: "string",
        },
        metadata: {
          bsonType: "object",
        },
        createdAt: {
          bsonType: "date",
        },
      },
    },
  },
})

// Create Events Collection (for Calendar)
db.createCollection("events", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "date", "createdBy", "createdAt"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        title: {
          bsonType: "string",
          minLength: 1,
          maxLength: 200,
        },
        description: {
          bsonType: "string",
          maxLength: 1000,
        },
        date: {
          bsonType: "date",
        },
        time: {
          bsonType: "string",
        },
        type: {
          bsonType: "string",
          enum: ["meeting", "deadline", "task", "reminder"],
        },
        attendees: {
          bsonType: "array",
          items: {
            bsonType: "objectId",
          },
        },
        projectId: {
          bsonType: "objectId",
        },
        teamId: {
          bsonType: "objectId",
        },
        createdBy: {
          bsonType: "objectId",
        },
        createdAt: {
          bsonType: "date",
        },
        updatedAt: {
          bsonType: "date",
        },
      },
    },
  },
})

console.log("Collections created successfully!")
