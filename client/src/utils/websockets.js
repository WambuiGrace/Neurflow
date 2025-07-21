// WebSocket utility for real-time features
// TODO: Implement WebSocket connection for real-time updates

class WebSocketManager {
  constructor() {
    this.ws = null
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectInterval = 1000
    this.listeners = new Map()
  }

  connect(userId) {
    // Implement WebSocket connection
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8080';
    const token = localStorage.getItem('token');
    
    if (!token || !userId) {
      console.warn('WebSocket connection failed: Missing token or userId');
      return;
    }
    
    try {
      this.ws = new WebSocket(`${wsUrl}?token=${token}&userId=${userId}`);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.emit('connected', { status: 'Connected to Neuroflow server' });
      };
      
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.emit(data.type, data.payload);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };
      
      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.emit('disconnected', { status: 'Disconnected from server' });
        this.attemptReconnect(userId);
      };
      
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', { error: 'WebSocket connection error' });
      };
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  attemptReconnect(userId) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
        this.connect(userId)
      }, this.reconnectInterval * this.reconnectAttempts)
    }
  }

  send(type, payload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }))
    } else {
      console.warn("WebSocket is not connected")
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event).push(callback)
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event)
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((callback) => callback(data))
    }
  }
}

export const webSocketManager = new WebSocketManager()

// WebSocket event types
export const WS_EVENTS = {
  // Connection events
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
  ERROR: "error",

  // Task events
  TASK_CREATED: "taskCreated",
  TASK_UPDATED: "taskUpdated",
  TASK_DELETED: "taskDeleted",
  TASK_ASSIGNED: "taskAssigned",

  // Project events
  PROJECT_CREATED: "projectCreated",
  PROJECT_UPDATED: "projectUpdated",
  PROJECT_DELETED: "projectDeleted",

  // Team events
  TEAM_MEMBER_ADDED: "teamMemberAdded",
  TEAM_MEMBER_REMOVED: "teamMemberRemoved",
  TEAM_UPDATED: "teamUpdated",

  // Notification events
  NOTIFICATION_RECEIVED: "notificationReceived",

  // User events
  USER_STATUS_CHANGED: "userStatusChanged",
  USER_TYPING: "userTyping",

  // Real-time collaboration
  CURSOR_MOVED: "cursorMoved",
  DOCUMENT_EDITED: "documentEdited",
}
