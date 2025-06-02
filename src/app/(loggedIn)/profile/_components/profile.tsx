"use client"

import accountApiRequest from "@/apiRequest/account"
import { useEffect } from "react"

export default function Profile() {
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.profileClient()
      console.log(result)
    }
    fetchRequest()
  }, [])
  return <div>profile component</div>
}
