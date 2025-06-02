import authApiRequest from "@/apiRequest/auth"
import { cookies } from "next/headers"

export async function POST() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("sessionToken")?.value || undefined

  if (!sessionToken) {
    return Response.json({ error: "Session token is missing" }, { status: 401 })
  }

  try {
    const result = await authApiRequest.logoutFromNextServerToServer(
      sessionToken
    )
    return Response.json(result.payload, {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Secure; SameSite=Strict`
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 403 })
    } else {
      return Response.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      )
    }
  }
}
