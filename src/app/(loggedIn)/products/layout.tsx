import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="max-w-[1920px] mx-auto"> {children}</div>
}
