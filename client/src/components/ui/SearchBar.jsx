"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"

const SearchBar = ({ onSearch, placeholder = "Search...", className = "" }) => {
    const [query, setQuery] = useState("")
    const [isFocused, setIsFocused] = useState(false)

    const handleSearch = (value) => {
        setQuery(value)
        onSearch(value)
    }

    const clearSearch = () => {
        setQuery("")
        onSearch("")
    }

    return (
        <div className={`relative ${className}`}>
            <div
                className={`relative flex items-center transition-all duration-200 ${isFocused ? "ring-2 ring-indigo-500" : ""
                    }`}
            >
                <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-transparent"
                />
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                        <X className="w-3 h-3 text-gray-400" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default SearchBar
