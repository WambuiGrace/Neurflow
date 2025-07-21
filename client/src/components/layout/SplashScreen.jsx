"use client"
import { Brain } from "lucide-react"

const SplashScreen = () => {
  return (
    <div className="fixed inset-0  w-screen h-screen bg-gradient-to-br from-cream-light to-cream-dark dark:from-gray-900 dark:to-gray-800 flex items-center justify-center noise-texture z-50">
      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Brain className="w-16 h-16 text-indigo-600 animate-pulse" />
            <div className="absolute inset-0 w-16 h-16 border-2 border-indigo-300 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Neuroflow</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Intelligent Project Management</p>
        <div className="mt-8">
          <div className="w-32 h-1 bg-indigo-200 dark:bg-indigo-800 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full animate-pulse"
              style={{
                animation: "loading 2s ease-in-out infinite",
              }}
            ></div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}

export default SplashScreen
