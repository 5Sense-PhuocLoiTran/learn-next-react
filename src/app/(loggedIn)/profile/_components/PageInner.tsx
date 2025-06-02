import accountApiRequest from "@/apiRequest/account"
import { cookies } from "next/headers"
import Profile from "./profile"

export default async function PageInner() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("sessionToken")
  const result = await accountApiRequest.profile(sessionToken?.value ?? "")

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>

      {result && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Welcome, {result.payload.data.name}
          </h2>
          <Profile />
        </div>
      )}
    </div>
  )
}
