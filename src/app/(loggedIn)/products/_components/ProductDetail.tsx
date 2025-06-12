// app/products/[id]/page.tsx (hoặc trong components/ProductDetail.tsx tùy theo tổ chức)

"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import productApiRequest from "@/apiRequest/product"
import { ProductResType } from "@/schemaValidations/product.schema"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(price)
}

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<ProductResType["data"] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productApiRequest.getProductById(id as string)
        setProduct(res.payload.data)
      } catch {
        toast.error("Failed to load product.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>
  }

  if (!product) {
    return <p className="text-center mt-8 text-red-500">Product not found.</p>
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 mx-auto max-w-5xl p-4">
      {/* Image Section */}
      <div className="md:w-1/2 w-full">
        <Image
          src={product.image || "/placeholder.jpg"}
          alt={product.name}
          width={400}
          height={600}
          className="w-full h-96 object-cover rounded"
        />
      </div>

      {/* Info Section */}
      <div className="md:w-1/2 w-full flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <p className="text-green-600 text-2xl font-bold mt-5">
          {formatPrice(product.price)}
        </p>
        <Button
          variant="default"
          className="mt-8 hover:bg-yellow-500 hover:text-black"
        >
          Order now
        </Button>
      </div>
    </div>
  )
}

export default ProductDetail
