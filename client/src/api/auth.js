// Authentication API endpoints

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

// Auth API functions
export const authAPI = {
  // POST /api/auth/login
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    
    const data = await response.json();
    
    // Store JWT token
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    
    return data;
  },

  // POST /api/auth/register
  register: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
    
    const data = await response.json();
    
    // Store JWT token
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    
    return data;
  },

  // POST /api/auth/logout
  logout: async () => {
    const token = localStorage.getItem('token');
    
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } finally {
      // Clear local storage even if the API call fails
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("neuroflow-user")
    }
  },

  // POST /api/auth/refresh
  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Token refresh failed');
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    
    return data;
  },

  // GET /api/auth/google
  googleAuth: () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  },

  // GET /api/auth/github
  githubAuth: () => {
    window.location.href = `${API_BASE_URL}/auth/github`;
  },

  // POST /api/auth/forgot-password
  forgotPassword: async (email) => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to process forgot password request');
    }
    
    return response.json();
  },

  // POST /api/auth/reset-password
  resetPassword: async (token, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to reset password');
    }
    
    return response.json();
  },

  // POST /api/auth/verify-email
  verifyEmail: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to verify email');
    }
    
    return response.json();
  },
}
