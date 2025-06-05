import type { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[1920px] mx-auto">
      <div className="flex h-screen items-center justify-center overflow-scroll ">
        <div className="container">{children}</div>
      </div>
    </div>
  )
}
