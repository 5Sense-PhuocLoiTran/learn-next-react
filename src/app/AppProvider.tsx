"use client"

import { clientSessionToken } from "@/lib/https"
import { createContext, useContext, useEffect, useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import { AccountResType } from "@/schemaValidations/account.schema"

type User = AccountResType["data"]

const AppContext = createContext<{
  user: User | null
  setUser?: (user: User | null) => void
}>({
  user: null,
  setUser: () => {}
})

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}

export default function AppProvider({
  children,
  initialSessionToken = "",
  user = null // ✅ Default to null
}: {
  children: React.ReactNode
  initialSessionToken?: string
  user?: User | null
}) {
  const [tokenReady, setTokenReady] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(user)

  useEffect(() => {
    if (typeof window !== "undefined") {
      clientSessionToken.value = initialSessionToken
      setTokenReady(true)
    }
  }, [initialSessionToken])

  if (!tokenReady) {
    return null
  }

  return (
    <AppContext.Provider value={{ user: currentUser, setUser: setCurrentUser }}>
      <Toaster richColors />
      {children}
    </AppContext.Provider>
  )
}
