"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authAPI } from "../api/auth"
import { usersAPI } from "../api/users"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("neuroflow-user")
    const token = localStorage.getItem("token")
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser))
    } else {
      // Clear any inconsistent state
      localStorage.removeItem("neuroflow-user")
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password)
      if (response.token && response.user) {
        setUser(response.user)
        localStorage.setItem("neuroflow-user", JSON.stringify(response.user))
        // Token is already stored in localStorage by authAPI.login
        return { success: true }
      }
      return { success: false, error: "Invalid credentials" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: error.message || "An error occurred during login" }
    }
  }

  const signup = async (name, email, password) => {
    try {
      const response = await authAPI.register(name, email, password)
      if (response.token && response.user) {
        setUser(response.user)
        localStorage.setItem("neuroflow-user", JSON.stringify(response.user))
        // Token is already stored in localStorage by authAPI.register
        return { success: true }
      }
      return { success: false, error: response.error || "Registration failed" }
    } catch (error) {
      console.error("Signup error:", error)
      return { success: false, error: error.message || "An error occurred during registration" }
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
      setUser(null)
      localStorage.removeItem("neuroflow-user")
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
    } catch (error) {
      console.error("Logout error:", error)
      // Still remove user from state even if API call fails
      setUser(null)
      localStorage.removeItem("neuroflow-user")
      localStorage.removeItem("token")
      localStorage.removeItem("refreshToken")
    }
  }

  const updateUser = async (updates) => {
    try {
      // Call the API to update the user profile
      const response = await usersAPI.updateProfile(updates)
      if (response.success) {
        const updatedUser = { ...user, ...response.data }
        setUser(updatedUser)
        localStorage.setItem("neuroflow-user", JSON.stringify(updatedUser))
        return { success: true }
      }
      return { success: false, error: response.error || "Failed to update profile" }
    } catch (error) {
      console.error("Update profile error:", error)
      return { success: false, error: error.message || "An error occurred while updating profile" }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
