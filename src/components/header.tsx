import Link from "next/link"
import ButtonLogout from "./ButtonLogout"
import { cookies } from "next/headers"
import ProductMenu from "./ProductMenu"
import accountApiRequest from "@/apiRequest/account"

export default async function Header() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("sessionToken")
  const isLoggedIn = !!sessionToken
  let userProfile = null
  try {
    if (isLoggedIn) {
      const data = await accountApiRequest.profile(sessionToken?.value || "")
      userProfile = data.payload.data
    }
  } catch (error) {
    console.error("Error fetching profile:", error)
    // Handle error if needed, e.g., redirect to login
    // window.location.href = "/login"
  }

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold ">Nudo Application</h1>
        </Link>
        <nav className="mt-2">
          {isLoggedIn && (
            <ul className="flex space-x-4">
              {userProfile && (
                <li>
                  <span className="font-semibold text-yellow-400">
                    Welcome, {userProfile.name || userProfile.email}!
                  </span>
                </li>
              )}
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <ProductMenu />
              </li>
              <li>
                <Link href="/profile" className="hover:underline">
                  Profile
                </Link>
              </li>
              <li>
                <ButtonLogout />
              </li>
            </ul>
          )}
          {!isLoggedIn && (
            <ul className="flex space-x-4">
              <li>
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:underline">
                  Register
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  )
}
