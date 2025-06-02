"use client"
import { clientSessionToken } from "@/lib/https"
import { useEffect, useState } from "react"

export default function AppProvider({
  children,
  initialSessionToken = ""
}: {
  children: React.ReactNode
  initialSessionToken?: string
}) {
  const [tokenReady, setTokenReady] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Setting initial session token:", initialSessionToken)
      clientSessionToken.value = initialSessionToken
      setTokenReady(true)
    }
  }, [initialSessionToken])

  if (!tokenReady) {
    // Optionally show a loading spinner or nothing
    return null
  }

  return <>{children}</>
}
