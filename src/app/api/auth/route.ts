export async function POST(request: Request) {
  const { sessionToken } = await request.json()

  if (!sessionToken) {
    return Response.json({ error: "Session token is missing" }, { status: 400 })
  }

  return Response.json(
    { message: "Session token set successfully" },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Strict`
      }
    }
  )
}
