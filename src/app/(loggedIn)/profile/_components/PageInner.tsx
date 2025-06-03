import accountApiRequest from "@/apiRequest/account"
import { cookies } from "next/headers"
import ProfileForm from "./ProfileForm"

export default async function PageInner() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("sessionToken")
  const result = await accountApiRequest.profile(sessionToken?.value ?? "")

  return (
    <div>
      {result && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Welcome, {result.payload.data.name}
          </h2>
          <ProfileForm profile={result.payload.data} />
        </div>
      )}
    </div>
  )
}
