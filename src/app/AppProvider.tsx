"use client"
import { clientSessionToken } from "@/lib/https"
import { useState } from "react"

export default function AppProvider({
  children,
  initialSessionToken = ""
}: {
  children: React.ReactNode
  initialSessionToken?: string
}) {
  useState(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken
    }
  })

  return <>{children}</>
}
