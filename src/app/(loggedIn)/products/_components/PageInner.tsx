import productApiRequest from "@/apiRequest/product"
import ProductCard from "./ProductCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const PageInner = async () => {
  const { payload } = await productApiRequest.getListProducts()

  const productsList = payload.data
  return (
    <div>
      <h1 className="text-2xl mb-4 font-bold">Products page</h1>
      <Link href="/products/add">
        <Button variant={"default"} className="mb-4">
          Add new product
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productsList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default PageInner
