// components/ProductCard.tsx
import { ProductSchema } from "@/schemaValidations/product.schema"
import Image from "next/image"
import Link from "next/link"
import { z } from "zod"
import DeleteProductButton from "./DeleteProductButton"

type Product = z.infer<typeof ProductSchema>

type Props = {
  product: Product
  isAuthenticated: boolean
  productCardType?: "view" | "edit"
}

const ProductCard = ({
  product,
  isAuthenticated,
  productCardType = "view"
}: Props) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(price)

  const showLink =
    productCardType === "view" && isAuthenticated
      ? `/products/${product.id}/edit`
      : `/products/${product.id}`

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="flex flex-col justify-between h-full">
        <div>
          {productCardType === "view" ? (
            <Link href={showLink}>
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover mb-4 rounded"
              />
            </Link>
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-48 object-cover mb-4 rounded"
            />
          )}
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-green-600 text-2xl font-bold mt-2 mb-4">
            {formatPrice(product.price)}
          </p>
        </div>

        {isAuthenticated && (
          <div className="flex items-center mt-4 space-x-2">
            <Link
              href={`/products/${product.id}/edit`}
              className="text-blue-500 hover:underline px-4 py-2 bg-blue-100 rounded-md text-sm"
            >
              Edit
            </Link>
            <DeleteProductButton product={product} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
