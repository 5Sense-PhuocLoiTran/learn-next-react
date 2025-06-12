"use client"

import authApiRequest from "@/apiRequest/auth"
import { useAppContext } from "@/app/AppProvider"
import { clientSessionToken } from "@/lib/https"
import { handleErrorApi } from "@/lib/utils"

export default function ButtonLogout() {
  const { setUser } = useAppContext()
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer()
      if (setUser) setUser(null)
      clientSessionToken.value = ""
      window.location.href = "/login"
    } catch (error) {
      handleErrorApi({
        error
      })
    }
  }
  return (
    <button
      onClick={handleLogout}
      className="text-[16px] font-normal outline-none focus:outline-none hover:text-red-500"
    >
      Logout
    </button>
  )
}
