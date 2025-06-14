import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import AppProvider from "@/app/AppProvider"
import { cookies } from "next/headers"
import accountApiRequest from "@/apiRequest/account"
import { AccountResType } from "@/schemaValidations/account.schema"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("sessionToken")?.value || undefined
  const isAuthenticated = Boolean(sessionToken)
  let user: AccountResType["data"] | null = null
  try {
    if (sessionToken) {
      const data = await accountApiRequest.profile(sessionToken || "")
      user = data.payload.data
    }
  } catch (error) {
    console.error("Error fetching profile:", error)
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider
          initialSessionToken={sessionToken}
          user={user}
          isAuthenticated={isAuthenticated}
        >
          <Header user={user} />
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
