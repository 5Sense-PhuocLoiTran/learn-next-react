"use client"

import { Button } from "@/components/ui/button"
import { ProductResType } from "@/schemaValidations/product.schema"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import productApiRequest from "@/apiRequest/product"
import { handleErrorApi } from "@/lib/utils"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
export default function DeleteProductButton({
  product
}: {
  product: ProductResType["data"]
}) {
  const router = useRouter()

  const handleDeleteProduct = async () => {
    // Logic to delete the product
    try {
      const result = await productApiRequest.deleteProduct(product.id)
      toast.success(result.payload.message)
      router.refresh()
    } catch (error) {
      handleErrorApi({ error })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this product?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product
            <span className="font-bold"> {product.name} </span> from your store.
            <br />
            Please confirm if you want to proceed with the deletion.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProduct}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
