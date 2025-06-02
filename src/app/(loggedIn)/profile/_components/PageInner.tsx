"use client"
import accountApiRequest from "@/apiRequest/account"
import { ProfileResponse } from "@/schemaValidations/account.schema"
import { useEffect, useState } from "react"

export default function PageInner() {
  const [profile, setProfile] = useState<ProfileResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await accountApiRequest.profileClient()
        if (res?.payload) {
          setProfile(res.payload)
        } else {
          setProfile(null)
        }
        console.log("Profile Data:", res)
      } catch (error) {
        console.error("Error fetching profile data:", error)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      {profile && (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Welcome, {profile.data.name}
          </h2>
          <p>Email: {profile.data.email}</p>
        </div>
      )}
    </div>
  )
}
