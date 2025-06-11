// components/ProductCard.tsx

import { Button } from "@/components/ui/button"
import { ProductSchema } from "@/schemaValidations/product.schema"
import Image from "next/image"
import Link from "next/link"
import { z } from "zod"

type Product = z.infer<typeof ProductSchema>

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="flex flex-col justify-between h-full">
        <div className="">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-48 object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-green-600 font-bold">{product.price} VND</p>
        </div>
        <div className="flex items-center mt-4">
          <Link
            href={`/products/${product.id}`}
            className="text-blue-500 hover:underline px-4 py-2 bg-blue-100 rounded"
          >
            Edit
          </Link>
          <Button variant="destructive" className=" ml-2">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
