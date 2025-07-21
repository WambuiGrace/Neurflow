// File Upload API endpoints

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const getAuthHeaders = () => {
  const token = localStorage.getItem("token")
  return {
    Authorization: `Bearer ${token}`,
  }
}

export const filesAPI = {
  // POST /api/files/upload
  uploadFile: async (file, type = "general", projectId = null, taskId = null, teamId = null) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    if (projectId) formData.append('projectId', projectId);
    if (taskId) formData.append('taskId', taskId);
    if (teamId) formData.append('teamId', teamId);
    
    const response = await fetch(`${API_BASE_URL}/files/upload`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload file');
    }
    
    return response.json();
  },

  // POST /api/files/upload-multiple
  uploadMultipleFiles: async (files, type = "general", projectId = null, taskId = null, teamId = null) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    formData.append('type', type);
    
    if (projectId) formData.append('projectId', projectId);
    if (taskId) formData.append('taskId', taskId);
    if (teamId) formData.append('teamId', teamId);
    
    const response = await fetch(`${API_BASE_URL}/files/upload-multiple`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload files');
    }
    
    return response.json();
  },

  // DELETE /api/files/:id
  deleteFile: async (fileId) => {
    const response = await fetch(`${API_BASE_URL}/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete file');
    }
    
    return response.json();
  },

  // GET /api/files/project/:projectId
  getProjectFiles: async (projectId) => {
    const response = await fetch(`${API_BASE_URL}/files?project=${projectId}`, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch project files');
    }
    
    return response.json();
  },
}
