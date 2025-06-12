"use client"

import authApiRequest from "@/apiRequest/auth"
import { handleErrorApi } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function ButtonLogout() {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer()
      router.refresh()
      router.push("/login")
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
