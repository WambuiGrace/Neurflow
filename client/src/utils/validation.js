// Form validation utilities
// TODO: Implement comprehensive validation

export const validators = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return "Email is required"
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return null
  },

  password: (password) => {
    if (!password) return "Password is required"
    if (password.length < 8) return "Password must be at least 8 characters long"
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter"
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter"
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number"
    if (!/(?=.*[@$!%*?&])/.test(password)) return "Password must contain at least one special character"
    return null
  },

  name: (name) => {
    if (!name) return "Name is required"
    if (name.length < 2) return "Name must be at least 2 characters long"
    if (name.length > 50) return "Name must be less than 50 characters"
    return null
  },

  projectName: (name) => {
    if (!name) return "Project name is required"
    if (name.length < 3) return "Project name must be at least 3 characters long"
    if (name.length > 100) return "Project name must be less than 100 characters"
    return null
  },

  taskTitle: (title) => {
    if (!title) return "Task title is required"
    if (title.length < 3) return "Task title must be at least 3 characters long"
    if (title.length > 200) return "Task title must be less than 200 characters"
    return null
  },

  url: (url) => {
    if (!url) return null // URL is optional
    try {
      new URL(url)
      return null
    } catch {
      return "Please enter a valid URL"
    }
  },

  phone: (phone) => {
    if (!phone) return null // Phone is optional
    const phoneRegex = /^\+?[\d\s\-$$$$]+$/
    if (!phoneRegex.test(phone)) return "Please enter a valid phone number"
    return null
  },

  file: (file, maxSize = 5 * 1024 * 1024, allowedTypes = []) => {
    if (!file) return "File is required"
    if (file.size > maxSize) return `File size must be less than ${maxSize / 1024 / 1024}MB`
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return `File type must be one of: ${allowedTypes.join(", ")}`
    }
    return null
  },
}

export const validateForm = (data, rules) => {
  const errors = {}
  let isValid = true

  Object.keys(rules).forEach((field) => {
    const rule = rules[field]
    const value = data[field]

    if (typeof rule === "function") {
      const error = rule(value)
      if (error) {
        errors[field] = error
        isValid = false
      }
    } else if (Array.isArray(rule)) {
      // Multiple validation rules
      for (const validator of rule) {
        const error = validator(value)
        if (error) {
          errors[field] = error
          isValid = false
          break
        }
      }
    }
  })

  return { isValid, errors }
}
