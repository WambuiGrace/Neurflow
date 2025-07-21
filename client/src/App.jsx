"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AuthProvider } from "./contexts/AuthContext"
import { NotificationProvider } from "./contexts/NotificationContext"
import { ProjectProvider } from "./contexts/ProjectContext"
import SplashScreen from "./components/layout/SplashScreen"
import Homepage from "./components/pages/Homepage"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Dashboard from "./components/dashboard/Dashboard"
import Projects from "./components/projects/Projects"
import Teams from "./components/teams/Teams"
import Calendar from "./components/calendar/Calendar"
import Analytics from "./components/analytics/Analytics"
import Notifications from "./components/notifications/Notifications"
import Settings from "./components/settings/Settings"
import Layout from "./components/layout/Layout"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import AnimatedBackground from "./components/ui/AnimatedBackground"

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <ProjectProvider>
            <Router>
              <div className="relative min-h-screen">
                <AnimatedBackground />
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/app"
                    element={
                      <ProtectedRoute>
                        <Layout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="/app/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="teams" element={<Teams />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                </Routes>
              </div>
            </Router>
          </ProjectProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
