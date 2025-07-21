// Calendar API endpoints

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

export const calendarAPI = {
  // GET /api/events
  getEvents: async (startDate, endDate) => {
    const response = await fetch(`${API_BASE_URL}/events?start=${startDate}&end=${endDate}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    
    return response.json();
  },

  // POST /api/events
  createEvent: async (eventData) => {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create event');
    }
    
    return response.json();
  },

  // PUT /api/events/:id
  updateEvent: async (id, eventData) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update event');
    }
    
    return response.json();
  },

  // DELETE /api/events/:id
  deleteEvent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
    
    return response.json();
  },

  // GET /api/events/upcoming
  getUpcomingEvents: async (limit = 5) => {
    const response = await fetch(`${API_BASE_URL}/events/upcoming?limit=${limit}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch upcoming events');
    }
    
    return response.json();
  },
}
