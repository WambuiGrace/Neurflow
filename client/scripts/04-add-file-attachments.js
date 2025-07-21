// Additional MongoDB collections for file management
// Run this script to add file attachment support

const db = require("./db") // Assuming db is imported from a module

// Create Files Collection
db.createCollection("files", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["filename", "url", "uploadedBy", "createdAt"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        filename: {
          bsonType: "string",
          description: "original filename",
        },
        url: {
          bsonType: "string",
          description: "file URL (Cloudinary or storage service)",
        },
        publicId: {
          bsonType: "string",
          description: "Cloudinary public ID for deletion",
        },
        mimetype: {
          bsonType: "string",
          description: "file MIME type",
        },
        size: {
          bsonType: "int",
          description: "file size in bytes",
        },
        type: {
          bsonType: "string",
          enum: ["avatar", "project", "task", "general"],
          description: "file category",
        },
        projectId: {
          bsonType: "objectId",
          description: "associated project ID",
        },
        taskId: {
          bsonType: "objectId",
          description: "associated task ID",
        },
        uploadedBy: {
          bsonType: "objectId",
          description: "user who uploaded the file",
        },
        createdAt: {
          bsonType: "date",
        },
      },
    },
  },
})

// Create indexes for files collection
db.files.createIndex({ uploadedBy: 1 })
db.files.createIndex({ projectId: 1 })
db.files.createIndex({ taskId: 1 })
db.files.createIndex({ type: 1 })
db.files.createIndex({ createdAt: -1 })

// Create Activity Logs Collection for audit trail
db.createCollection("activityLogs", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "action", "resource", "createdAt"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        userId: {
          bsonType: "objectId",
          description: "user who performed the action",
        },
        action: {
          bsonType: "string",
          enum: [
            "created",
            "updated",
            "deleted",
            "assigned",
            "completed",
            "commented",
            "uploaded",
            "downloaded",
            "invited",
            "joined",
            "left",
          ],
          description: "action performed",
        },
        resource: {
          bsonType: "string",
          enum: ["project", "task", "team", "user", "file", "comment"],
          description: "resource type",
        },
        resourceId: {
          bsonType: "objectId",
          description: "ID of the affected resource",
        },
        details: {
          bsonType: "object",
          description: "additional action details",
        },
        ipAddress: {
          bsonType: "string",
          description: "user IP address",
        },
        userAgent: {
          bsonType: "string",
          description: "user browser/device info",
        },
        createdAt: {
          bsonType: "date",
        },
      },
    },
  },
})

// Create indexes for activity logs
db.activityLogs.createIndex({ userId: 1 })
db.activityLogs.createIndex({ resource: 1, resourceId: 1 })
db.activityLogs.createIndex({ createdAt: -1 })
db.activityLogs.createIndex({ userId: 1, createdAt: -1 })

console.log("File management collections created successfully!")
