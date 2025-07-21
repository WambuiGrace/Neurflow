// Analytics API endpoints

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

export const analyticsAPI = {
  // GET /api/analytics/dashboard
  getDashboardStats: async (dateRange = "30d") => {
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard?range=${dateRange}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }
    
    return response.json();
  },

  // GET /api/analytics/productivity
  getProductivityData: async (dateRange = "7d") => {
    const response = await fetch(`${API_BASE_URL}/analytics/productivity?range=${dateRange}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch productivity data');
    }
    
    return response.json();
  },

  // GET /api/analytics/team-performance
  getTeamPerformance: async (teamId, dateRange = "30d") => {
    const response = await fetch(`${API_BASE_URL}/analytics/team-performance/${teamId}?range=${dateRange}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch team performance data');
    }
    
    return response.json();
  },

  // GET /api/analytics/task-distribution
  getTaskDistribution: async (projectId = null) => {
    const url = projectId 
      ? `${API_BASE_URL}/analytics/task-distribution?projectId=${projectId}`
      : `${API_BASE_URL}/analytics/task-distribution`;
      
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch task distribution data');
    }
    
    return response.json();
  },

  // GET /api/analytics/time-tracking
  getTimeTrackingData: async (userId = null, dateRange = "30d") => {
    const url = userId 
      ? `${API_BASE_URL}/analytics/time-tracking?userId=${userId}&range=${dateRange}`
      : `${API_BASE_URL}/analytics/time-tracking?range=${dateRange}`;
      
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch time tracking data');
    }
    
    return response.json();
  },
}
