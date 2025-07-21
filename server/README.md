# NeuroFlow API Server

This is the backend API server for the NeuroFlow project management application. It provides RESTful API endpoints for managing users, teams, projects, tasks, events, files, and analytics.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads

## Setup Instructions
### Installation

1. Clone the repository
2. Navigate to the server directory
3. Install dependencies:

```bash
pnpm install
```

4. Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
JWT_REFRESH_EXPIRE=90d
NODE_ENV=development
```

### Running the Server

#### Development Mode

```bash
pnpm run dev
```

#### Production Mode

```bash
pnpm start
```

## API Documentation

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout a user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh-token` - Refresh JWT token

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/password` - Update user password
- `POST /api/users/avatar` - Upload user avatar
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)

### Teams

- `GET /api/teams` - Get all teams
- `POST /api/teams` - Create a new team
- `GET /api/teams/:id` - Get team by ID
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team
- `POST /api/teams/:id/members` - Add team member
- `DELETE /api/teams/:id/members/:userId` - Remove team member

### Projects

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/:projectId/tasks` - Get tasks for a project
- `POST /api/projects/:projectId/tasks` - Create a task for a project

### Tasks

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Calendar Events

- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event
- `GET /api/events/:id` - Get event by ID
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `PUT /api/events/:id/attendees/:userId` - Update attendee status

### Notifications

- `GET /api/notifications` - Get all notifications
- `POST /api/notifications` - Create a new notification
- `PUT /api/notifications/:id` - Mark notification as read
- `PUT /api/notifications/mark-all-read` - Mark all notifications as read
- `DELETE /api/notifications/:id` - Delete notification

### Files

- `GET /api/files` - Get all files
- `POST /api/files/upload` - Upload a file
- `POST /api/files/upload-multiple` - Upload multiple files
- `DELETE /api/files/:id` - Delete file

### Analytics

- `GET /api/analytics/dashboard` - Get dashboard statistics
- `GET /api/analytics/productivity` - Get productivity data
- `GET /api/analytics/team-performance/:teamId` - Get team performance data

## Error Handling

The API uses a standardized error response format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information (development mode only)"
}
```

## Authentication

All routes except for authentication routes require a valid JWT token in the Authorization header:

```

## License

MIT