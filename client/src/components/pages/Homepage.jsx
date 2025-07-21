"use client"
import { Link } from "react-router-dom"
import { Brain, Users, BarChart3, Calendar, ArrowRight, CheckCircle } from "lucide-react"
import Button from "../ui/Button"
import CursorEffect from "../ui/CursorEffect"
import Footer from "../ui/Footer"
import ThemeToggle from "../ui/ThemeToggle"

const Homepage = () => {
  const features = [
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work seamlessly with your team members in real-time",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track progress and performance with detailed analytics",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Intelligent calendar integration and task scheduling",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-light to-cream-dark dark:from-gray-900 dark:to-gray-800 noise-texture relative">
      <CursorEffect />

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white">Neuroflow</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle variant="homepage" />
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-800 dark:text-white mb-6">
              Project Management
              <span className="block text-indigo-600">Reimagined</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the future of team collaboration with Neuroflow's intelligent project management platform.
              Streamline workflows, boost productivity, and achieve your goals faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="group">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Everything you need to succeed</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Powerful features designed for modern teams</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-morphism rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
              >
                <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">Why teams choose Neuroflow</h2>
              <div className="space-y-4">
                {[
                  "Intuitive drag-and-drop interface",
                  "Real-time collaboration tools",
                  "Advanced analytics and reporting",
                  "Seamless integrations",
                  "Mobile-first design",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-morphism rounded-2xl p-8">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                <p className="mb-6">Join thousands of teams already using Neuroflow</p>
                <Link to="/signup">
                  <Button variant="secondary" className="w-full">
                    Create Free Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Homepage
