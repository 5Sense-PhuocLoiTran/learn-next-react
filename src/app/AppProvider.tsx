"use client"
import { clientSessionToken } from "@/lib/https"
import { useEffect, useState } from "react"
import { Toaster } from "@/components/ui/sonner"

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
      clientSessionToken.value = initialSessionToken
      setTokenReady(true)
    }
  }, [initialSessionToken])

  if (!tokenReady) {
    // Optionally show a loading spinner or nothing
    return null
  }

  return (
    <>
      <Toaster richColors />
      {children}
    </>
  )
}
