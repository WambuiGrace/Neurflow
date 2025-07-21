"use client"

import { useState } from "react"
import { Plus, Users, Crown, Shield, Eye, MoreHorizontal, Search } from "lucide-react"
import Button from "../ui/Button"
import Card from "../ui/Card"
import { mockTeams } from "../../utils/mockData"

const Teams = () => {
  const [selectedTeam, setSelectedTeam] = useState(mockTeams[0])
  const [searchTerm, setSearchTerm] = useState("")

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Crown className="w-4 h-4 text-yellow-500" />
      case "member":
        return <Shield className="w-4 h-4 text-blue-500" />
      case "viewer":
        return <Eye className="w-4 h-4 text-gray-500" />
      default:
        return <Users className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const filteredMembers = selectedTeam.members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teams</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your teams and collaborate with members</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Invite Members
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Team
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Team List */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Your Teams</h2>
            <div className="space-y-2">
              {mockTeams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedTeam.id === team.id
                      ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{team.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{team.members.length} members</p>
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full ${team.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                    ></div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Team Details */}
        <div className="lg:col-span-3 space-y-6">
          {/* Team Header */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{selectedTeam.name.charAt(0)}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedTeam.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{selectedTeam.description}</p>
                </div>
              </div>
              <Button variant="outline">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedTeam.members.length}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedTeam.projects}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedTeam.members.filter((m) => m.status === "online").length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
              </div>
            </div>
          </Card>

          {/* Members */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(member.status)}`}
                      ></div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{member.name}</h4>
                        {getRoleIcon(member.role)}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">
                        {member.status} • {member.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Joined {new Date(member.joinedAt).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No members found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search terms.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Teams
