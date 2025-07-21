// Permission and role management utilities
// TODO: Implement role-based access control

export const ROLES = {
  ADMIN: "admin",
  MEMBER: "member",
  VIEWER: "viewer",
}

export const PERMISSIONS = {
  // Project permissions
  CREATE_PROJECT: "create_project",
  UPDATE_PROJECT: "update_project",
  DELETE_PROJECT: "delete_project",
  VIEW_PROJECT: "view_project",

  // Task permissions
  CREATE_TASK: "create_task",
  UPDATE_TASK: "update_task",
  DELETE_TASK: "delete_task",
  ASSIGN_TASK: "assign_task",

  // Team permissions
  CREATE_TEAM: "create_team",
  UPDATE_TEAM: "update_team",
  DELETE_TEAM: "delete_team",
  INVITE_MEMBER: "invite_member",
  REMOVE_MEMBER: "remove_member",
  UPDATE_MEMBER_ROLE: "update_member_role",

  // File permissions
  UPLOAD_FILE: "upload_file",
  DELETE_FILE: "delete_file",

  // Analytics permissions
  VIEW_ANALYTICS: "view_analytics",
  VIEW_TEAM_ANALYTICS: "view_team_analytics",
}

const rolePermissions = {
  [ROLES.ADMIN]: [
    PERMISSIONS.CREATE_PROJECT,
    PERMISSIONS.UPDATE_PROJECT,
    PERMISSIONS.DELETE_PROJECT,
    PERMISSIONS.VIEW_PROJECT,
    PERMISSIONS.CREATE_TASK,
    PERMISSIONS.UPDATE_TASK,
    PERMISSIONS.DELETE_TASK,
    PERMISSIONS.ASSIGN_TASK,
    PERMISSIONS.CREATE_TEAM,
    PERMISSIONS.UPDATE_TEAM,
    PERMISSIONS.DELETE_TEAM,
    PERMISSIONS.INVITE_MEMBER,
    PERMISSIONS.REMOVE_MEMBER,
    PERMISSIONS.UPDATE_MEMBER_ROLE,
    PERMISSIONS.UPLOAD_FILE,
    PERMISSIONS.DELETE_FILE,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_TEAM_ANALYTICS,
  ],
  [ROLES.MEMBER]: [
    PERMISSIONS.VIEW_PROJECT,
    PERMISSIONS.CREATE_TASK,
    PERMISSIONS.UPDATE_TASK,
    PERMISSIONS.ASSIGN_TASK,
    PERMISSIONS.UPLOAD_FILE,
    PERMISSIONS.VIEW_ANALYTICS,
  ],
  [ROLES.VIEWER]: [PERMISSIONS.VIEW_PROJECT, PERMISSIONS.VIEW_ANALYTICS],
}

export const hasPermission = (userRole, permission) => {
  const permissions = rolePermissions[userRole] || []
  return permissions.includes(permission)
}

export const canUserPerformAction = (user, action, resource = null) => {
  // TODO: Implement more complex permission logic
  /*
  // Check if user has the required permission
  if (!hasPermission(user.role, action)) {
    return false;
  }
  
  // Additional checks based on resource ownership
  if (resource) {
    // Check if user owns the resource or is part of the team
    if (resource.createdBy === user.id) {
      return true;
    }
    
    if (resource.teamId && user.teams.includes(resource.teamId)) {
      return true;
    }
    
    return false;
  }
  
  return true;
  */

  // Simplified check for now
  return hasPermission(user.role, action)
}

export const filterByPermission = (items, user, permission) => {
  return items.filter((item) => canUserPerformAction(user, permission, item))
}
