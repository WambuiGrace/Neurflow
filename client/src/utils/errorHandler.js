// Global error handling utility
// TODO: Implement comprehensive error handling

export class APIError extends Error {
  constructor(message, status = 500, code = null) {
    super(message)
    this.name = "APIError"
    this.status = status
    this.code = code
  }
}

export const handleAPIError = (error) => {
  console.error("API Error:", error)

  // TODO: Send error to monitoring service (Sentry)
  /*
  if (import.meta.env.MODE === 'production') {
    Sentry.captureException(error);
  }
  */

  // Return user-friendly error message
  if (error.status === 401) {
    return "Please log in to continue"
  } else if (error.status === 403) {
    return "You don't have permission to perform this action"
  } else if (error.status === 404) {
    return "The requested resource was not found"
  } else if (error.status === 429) {
    return "Too many requests. Please try again later"
  } else if (error.status >= 500) {
    return "Something went wrong on our end. Please try again"
  } else {
    return error.message || "An unexpected error occurred"
  }
}

export const withErrorHandling = (apiFunction) => {
  return async (...args) => {
    try {
      return await apiFunction(...args)
    } catch (error) {
      throw new APIError(handleAPIError(error), error.status, error.code)
    }
  }
}

// Network error handling
export const handleNetworkError = (error) => {
  if (!navigator.onLine) {
    return "You appear to be offline. Please check your connection"
  }

  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return "Unable to connect to the server. Please try again"
  }

  return "Network error occurred. Please try again"
}
