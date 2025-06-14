"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { handleErrorApi } from "@/lib/utils"
import { useRef, useState } from "react"
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductResType,
  UpdateProductBodyType
} from "@/schemaValidations/product.schema"
import productApiRequest from "@/apiRequest/product"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
type Product = ProductResType["data"]

const ProductAddForm = ({ product }: { product?: Product }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      image: product?.image || ""
    }
  })

  const image = form.watch("image")
  const createProduct = async (values: CreateProductBodyType) => {
    try {
      const formData = new FormData()
      if (imageFile) {
        formData.append("file", imageFile)
        const uploadRes = await productApiRequest.uploadImage(formData)
        if (uploadRes.status !== 200) {
          throw new Error("Image upload failed")
        }
        values.image = uploadRes.payload.data // Assuming the response contains the image URL
      } else {
        values.image = "" // Clear the image field if no file is selected
      }
      const res = await productApiRequest.create(values)

      toast.success("Product added successfully", {
        description: res.payload.message || "Product added successfully"
      })

      router.push("/products")
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
        duration: 5000
      })
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (_values: UpdateProductBodyType) => {
    if (!product) {
      toast.error("No product to update")
      return
    }
    let values = _values as CreateProductBodyType
    try {
      if (imageFile) {
        const formData = new FormData()
        formData.append("file", imageFile)
        const uploadRes = await productApiRequest.uploadImage(formData)
        if (uploadRes.status !== 200) {
          throw new Error("Image upload failed")
        }
        const imageUrl = uploadRes.payload.data // Assuming the response contains the image URL

        values = { ...values, image: imageUrl }
      }

      const res = await productApiRequest.updateProduct(product.id, values)

      toast.success("Product updated successfully", {
        description: res.payload.message || "Product updated successfully"
      })
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
        duration: 5000
      })
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (values: CreateProductBodyType) => {
    if (loading) return
    setLoading(true)
    if (product) {
      await updateProduct(values as UpdateProductBodyType)
    } else {
      await createProduct(values)
    }
    setLoading(false)
  }

  return (
    <Form {...form}>
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4">Add new product</h2>
        <p className="text-sm text-muted-foreground mb-8">
          Please fill in the form below to add a new product.
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) => {
            console.error("Form submission error:", error)
            toast.error("Failed to submit the form. Please try again.")
          })}
          className="space-y-8"
          noValidate
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Input Name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Input Price" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Input Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Upload</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    name={field.name}
                    onBlur={field.onBlur}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setImageFile(file)
                        field.onChange("http://localhost:3000/" + file.name)
                      } else {
                        setImageFile(null)
                        field.onChange(null)
                        e.target.value = ""
                        e.target.files = null
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {(imageFile || image) && (
            <div className="mt-4">
              <Image
                src={imageFile ? URL.createObjectURL(imageFile) : image || ""}
                alt="Product Image"
                width={200}
                height={200}
                className="object-cover rounded-md"
              />
              <Button
                variant={"destructive"}
                type="button"
                className="mt-2"
                onClick={() => {
                  setImageFile(null)
                  form.setValue("image", "")
                  if (inputRef.current) inputRef.current.value = ""
                }}
              >
                Remove
              </Button>
            </div>
          )}
          <Button type="submit" className="w-full mt-8">
            {product ? "Update Product" : "Add Product"}
          </Button>
        </form>
      </div>
    </Form>
  )
}

export default ProductAddForm
