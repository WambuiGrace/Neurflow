// Users API endpoints

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

export const usersAPI = {
  // GET /api/users/profile
  getProfile: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch user profile');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // PUT /api/users/profile
  updateProfile: async (profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update user profile');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // POST /api/users/avatar
  uploadAvatar: async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await fetch(`${API_BASE_URL}/users/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to upload avatar');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  },

  // PUT /api/users/preferences
  updatePreferences: async (preferences) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/preferences`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(preferences),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update preferences');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  },

  // POST /api/users/change-password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/password`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to change password');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },

  // POST /api/users/enable-2fa
  enableTwoFactor: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/enable-2fa`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to enable 2FA');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error enabling 2FA:', error);
      throw error;
    }
  },

  // POST /api/users/disable-2fa
  disableTwoFactor: async (code) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/disable-2fa`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ code }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to disable 2FA');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      throw error;
    }
  },

  // GET /api/users/search
  searchUsers: async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/search?q=${encodeURIComponent(query)}`, {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to search users');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  },

  // DELETE /api/users/account
  deleteAccount: async (password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/account`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({ password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete account');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  },

  // GET /api/users/export-data
  exportData: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/export-data`, {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to export data');
      }
      
      // Return blob for download
      return response.blob();
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  },
}
