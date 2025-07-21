"use client"

import { useEffect, useRef } from "react"
import { webSocketService } from "../utils/mockData"

export const useWebSocket = () => {
  const serviceRef = useRef(webSocketService)

  useEffect(() => {
    const service = serviceRef.current
    service.connect()

    return () => {
      service.disconnect()
    }
  }, [])

  return serviceRef.current
}
