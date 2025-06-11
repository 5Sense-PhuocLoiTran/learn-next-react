import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-[768px] mx-auto p-5"> {children}</div>
}
