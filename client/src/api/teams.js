// Teams API endpoints

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

export const teamsAPI = {
  // GET /api/teams
  getTeams: async () => {
    const response = await fetch(`${API_BASE_URL}/teams`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch teams');
    }
    
    return response.json();
  },

  // GET /api/teams/:id
  getTeam: async (id) => {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch team');
    }
    
    return response.json();
  },

  // POST /api/teams
  createTeam: async (teamData) => {
    const response = await fetch(`${API_BASE_URL}/teams`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(teamData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create team');
    }
    
    return response.json();
  },

  // PUT /api/teams/:id
  updateTeam: async (id, teamData) => {
    const response = await fetch(`${API_BASE_URL}/teams/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(teamData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update team');
    }
    
    return response.json();
  },

  // POST /api/teams/:id/members
  addTeamMember: async (teamId, memberData) => {
    const response = await fetch(`${API_BASE_URL}/teams/${teamId}/members`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(memberData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add team member');
    }
    
    return response.json();
  },

  // DELETE /api/teams/:id/members/:userId
  removeTeamMember: async (teamId, userId) => {
    const response = await fetch(`${API_BASE_URL}/teams/${teamId}/members/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to remove team member');
    }
    
    return response.json();
  },

  // PUT /api/teams/:id/members/:userId
  updateMemberRole: async (teamId, userId, role) => {
    const response = await fetch(`${API_BASE_URL}/teams/${teamId}/members/${userId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ role }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update member role');
    }
    
    return response.json();
  },
}
