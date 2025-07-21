"use client"

import { useEffect, useState } from "react"

const CursorEffect = () => {
  const [trail, setTrail] = useState([])

  useEffect(() => {
    let animationId

    const handleMouseMove = (e) => {
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      }

      setTrail((prev) => [...prev.slice(-8), newPoint])
    }

    const animate = () => {
      setTrail((prev) =>
        prev.map((point, index) => ({
          ...point,
          opacity: ((index + 1) / prev.length) * 0.6,
        })),
      )
      animationId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 bg-indigo-400 rounded-full transition-opacity duration-150"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: point.opacity || 0,
            transform: `scale(${0.3 + (index / trail.length) * 0.7})`,
          }}
        />
      ))}
    </div>
  )
}

export default CursorEffect
