import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Welcome to Our Store</h1>
        <p className="text-lg text-gray-600">
          Discover the best products at unbeatable prices.
        </p>
        <Link href="/products" className="hover:underline w-full">
          <Button
            variant="secondary"
            className="w-full mt-4 bg-yellow-500 text-black hover:bg-gray-800 hover:text-white transition-colors duration-300"
          >
            View Products
          </Button>
        </Link>
      </main>
    </div>
  )
}
