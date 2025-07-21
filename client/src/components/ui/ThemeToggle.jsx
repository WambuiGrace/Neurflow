"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "../../contexts/ThemeContext"

const ThemeToggle = ({ variant = "default" }) => {
    const { theme, toggleTheme } = useTheme()

    if (variant === "homepage") {
        return (
            <button
                onClick={toggleTheme}
                className="relative p-2 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 group"
                aria-label="Toggle theme"
            >
                <div className="relative w-6 h-6">
                    <Sun
                        className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-300 ${theme === "light" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
                            }`}
                    />
                    <Moon
                        className={`absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-300 ${theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
                            }`}
                    />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
        )
    }

    // Default variant for other pages
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
        </button>
    )
}

export default ThemeToggle
