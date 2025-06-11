import productApiRequest from "@/apiRequest/product"
import ProductAddForm from "../../_components/ProductAddForm"

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  try {
    const resolvedParams = await params // Await the params Promise
    const { payload } = await productApiRequest.getProductById(
      resolvedParams.id
    )

    if (!payload?.data) {
      return <div className="text-red-500">Product not found</div>
    }

    const productDetail = payload.data

    return (
      <div>
        <ProductAddForm product={productDetail} />
      </div>
    )
  } catch (error) {
    console.error("Error fetching product details:", error)
    return <div className="text-red-500">Error fetching product details</div>
  }
}
