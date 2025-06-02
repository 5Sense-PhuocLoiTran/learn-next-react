"use client"

import authApiRequest from "@/apiRequest/auth"
import { handleErrorApi } from "@/lib/utils"

export default function ButtonLogout() {
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer()
      window.location.href = "/login"
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }
  return (
    <button onClick={handleLogout} className="text-red-500">
      Logout
    </button>
  )
}
