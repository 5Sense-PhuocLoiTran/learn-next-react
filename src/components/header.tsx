import Link from "next/link"
import ButtonLogout from "./button-logout"

const header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Nudo Application</h1>
        <nav className="mt-2">
          <ul className="flex space-x-4">
            {/* <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li> */}
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
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
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
        </nav>
      </div>
    </header>
  )
}
export default header
