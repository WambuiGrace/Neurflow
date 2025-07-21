"use client"

import { useState } from "react"
import { User, Shield, Bell, Palette, Key, Download, Trash2 } from "lucide-react"
import Button from "../ui/Button"
import Card from "../ui/Card"
import Input from "../ui/Input"
import { useAuth } from "../../contexts/AuthContext"
import { useTheme } from "../../contexts/ThemeContext"
import { useNotifications } from "../../contexts/NotificationContext"
import { usersAPI } from "../../api/users"

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const { user, updateUser } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { addNotification } = useNotifications()

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    weeklyReports: false,
    teamUpdates: true,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "security", label: "Security", icon: Shield },
    { id: "data", label: "Data & Privacy", icon: Key },
  ]

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      const result = await updateUser(profileData)
      if (result.success) {
        addNotification({
          type: "success",
          title: "Profile updated",
          message: "Your profile has been successfully updated.",
        })
      } else {
        addNotification({
          type: "error",
          title: "Update failed",
          message: result.error || "Failed to update profile.",
        })
      }
    } catch (error) {
      addNotification({
        type: "error",
        title: "Update failed",
        message: error.message || "An error occurred while updating your profile.",
      })
    }
  }

  const handleNotificationUpdate = () => {
    addNotification({
      type: "success",
      title: "Settings saved",
      message: "Your notification preferences have been updated.",
    })
  }

  const handlePasswordChange = async () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addNotification({
        type: "error",
        title: "Password mismatch",
        message: "New password and confirmation do not match.",
      })
      return
    }

    if (passwordData.newPassword.length < 6) {
      addNotification({
        type: "error",
        title: "Password too short",
        message: "Password must be at least 6 characters long.",
      })
      return
    }

    try {
      const result = await usersAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })

      if (result.success) {
        // Reset password fields
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })

        addNotification({
          type: "success",
          title: "Password updated",
          message: "Your password has been successfully changed.",
        })
      } else {
        addNotification({
          type: "error",
          title: "Update failed",
          message: result.error || "Failed to update password.",
        })
      }
    } catch (error) {
      addNotification({
        type: "error",
        title: "Update failed",
        message: error.message || "An error occurred while updating your password.",
      })
    }
  }

  const handleEnableTwoFactor = async () => {
    try {
      const result = await usersAPI.enableTwoFactor()
      
      if (result.success) {
        // Update user state with two-factor enabled
        updateUser({ ...user, twoFactorEnabled: true })
        
        addNotification({
          type: "success",
          title: "Two-Factor Authentication Enabled",
          message: "Two-factor authentication has been successfully enabled for your account.",
        })
      } else {
        addNotification({
          type: "error",
          title: "Failed to Enable 2FA",
          message: result.error || "Failed to enable two-factor authentication.",
        })
      }
    } catch (error) {
      addNotification({
        type: "error",
        title: "Failed to Enable 2FA",
        message: error.message || "An error occurred while enabling two-factor authentication.",
      })
    }
  }

  const handleDisableTwoFactor = async () => {
    try {
      const result = await usersAPI.disableTwoFactor()
      
      if (result.success) {
        // Update user state with two-factor disabled
        updateUser({ ...user, twoFactorEnabled: false })
        
        addNotification({
          type: "success",
          title: "Two-Factor Authentication Disabled",
          message: "Two-factor authentication has been successfully disabled for your account.",
        })
      } else {
        addNotification({
          type: "error",
          title: "Failed to Disable 2FA",
          message: result.error || "Failed to disable two-factor authentication.",
        })
      }
    } catch (error) {
      addNotification({
        type: "error",
        title: "Failed to Disable 2FA",
        message: error.message || "An error occurred while disabling two-factor authentication.",
      })
    }
  }

  const handleExportData = async () => {
    try {
      const result = await usersAPI.exportData()
      
      if (result.success) {
        // Handle the exported data - typically this would be a download
        // For example, if the API returns a download URL:
        if (result.downloadUrl) {
          window.open(result.downloadUrl, '_blank')
        }
        
        addNotification({
          type: "success",
          title: "Data Export Started",
          message: "Your data export has been initiated. You will be notified when it's ready for download.",
        })
      } else {
        addNotification({
          type: "error",
          title: "Export Failed",
          message: result.error || "Failed to export your data.",
        })
      }
    } catch (error) {
      addNotification({
        type: "error",
        title: "Export Failed",
        message: error.message || "An error occurred while exporting your data.",
      })
    }
  }

  const handleDeleteAccount = async () => {
    // Confirm before deletion
    if (!window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
      return
    }
    
    try {
      const result = await usersAPI.deleteAccount()
      
      if (result.success) {
        // Log the user out after successful deletion
        localStorage.removeItem("neuroflow-user")
        localStorage.removeItem("token")
        window.location.href = "/login"
        
        addNotification({
          type: "success",
          title: "Account Deleted",
          message: "Your account has been permanently deleted.",
        })
      } else {
        addNotification({
          type: "error",
          title: "Deletion Failed",
          message: result.error || "Failed to delete your account.",
        })
      }
    } catch (error) {
      addNotification({
        type: "error",
        title: "Deletion Failed",
        message: error.message || "An error occurred while deleting your account.",
      })
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h3>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="flex items-center space-x-6">
                  <img
                    src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                    alt="Profile"
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={profileData.name}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <Input
                  label="Bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Location"
                    value={profileData.location}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="City, Country"
                  />
                  <Input
                    label="Website"
                    value={profileData.website}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, website: e.target.value }))}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <Button type="submit">Save Changes</Button>
              </form>
            </div>
          </div>
        )

      case "notifications":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {key === "emailNotifications" && "Receive notifications via email"}
                        {key === "pushNotifications" && "Receive push notifications in browser"}
                        {key === "taskReminders" && "Get reminded about upcoming task deadlines"}
                        {key === "weeklyReports" && "Receive weekly productivity reports"}
                        {key === "teamUpdates" && "Get notified about team activity"}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setNotificationSettings((prev) => ({
                            ...prev,
                            [key]: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>
              <Button onClick={handleNotificationUpdate} className="mt-4">
                Save Preferences
              </Button>
            </div>
          </div>
        )

      case "appearance":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Theme</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                      <button
                        onClick={() => theme === "dark" && toggleTheme()}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          theme === "light"
                            ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        Light
                      </button>
                      <button
                        onClick={() => theme === "light" && toggleTheme()}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          theme === "dark"
                            ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        Dark
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Language</h4>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Timezone</h4>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>UTC-8 (Pacific Time)</option>
                    <option>UTC-5 (Eastern Time)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+1 (Central European Time)</option>
                    <option>UTC+9 (Japan Standard Time)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Change Password</h4>
                  <div className="space-y-3">
                    <Input 
                      type="password" 
                      placeholder="Current password" 
                      className="w-full" 
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    />
                    <Input 
                      type="password" 
                      placeholder="New password" 
                      className="w-full" 
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    />
                    <Input 
                      type="password" 
                      placeholder="Confirm new password" 
                      className="w-full" 
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    />
                    <Button size="sm" onClick={handlePasswordChange}>Update Password</Button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    {user?.twoFactorEnabled ? (
                      <Button variant="outline" size="sm" onClick={handleDisableTwoFactor}>
                        Disable 2FA
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={handleEnableTwoFactor}>
                        Enable 2FA
                      </Button>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Active Sessions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Current Session</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Chrome on macOS • San Francisco, CA</p>
                      </div>
                      <span className="text-xs text-green-600 dark:text-green-400">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Mobile App</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">iPhone • Last seen 2 hours ago</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "data":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data & Privacy</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Export Data</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Download a copy of your data</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleExportData}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Data Usage</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Projects</span>
                      <span className="text-gray-900 dark:text-white">12 items</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Tasks</span>
                      <span className="text-gray-900 dark:text-white">248 items</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Files</span>
                      <span className="text-gray-900 dark:text-white">1.2 GB</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-900 dark:text-red-300">Delete Account</h4>
                      <p className="text-sm text-red-700 dark:text-red-400">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                      onClick={handleDeleteAccount}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">{renderTabContent()}</Card>
        </div>
      </div>
    </div>
  )
}

export default Settings
