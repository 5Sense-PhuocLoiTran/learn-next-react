import Link from "next/link"
import ButtonLogout from "./ButtonLogout"
import ProductMenu from "./ProductMenu"
import { AccountResType } from "@/schemaValidations/account.schema"

export default async function Header({
  user
}: {
  user: AccountResType["data"] | null
}) {
  const isLoggedIn = !!user
  const userProfile = isLoggedIn ? user : null

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
                  <Link
                    href="/profile"
                    className="hover:underline hover:text-yellow-400"
                  >
                    <span className="font-semibold text-yellow-400">
                      Welcome, {userProfile.name || userProfile.email}!
                    </span>
                  </Link>
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
                <Link href="/products" className="hover:underline">
                  Products
                </Link>
              </li>
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
