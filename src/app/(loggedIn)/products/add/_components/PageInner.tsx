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
import { useState } from "react"
import {
  CreateProductBody,
  CreateProductBodyType
} from "@/schemaValidations/product.schema"
import productApiRequest from "@/apiRequest/product"
import { Textarea } from "@/components/ui/textarea"
// import { useRouter } from "next/navigation"

const PageInner = () => {
  // const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: ""
    }
  })

  const onSubmit = async (values: CreateProductBodyType) => {
    console.log("Form values:", values)
    if (loading) return
    setLoading(true)
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
      // router.push("/products")
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

  return (
    <Form {...form}>
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
                <Input
                  placeholder="Input Price"
                  type="number"
                  {...field}
                  // onChange={(e) => field.onChange(Number(e.target.value))}
                />
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
                  ref={field.ref}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setImageFile(file)
                      field.onChange("http://localhost:3000/" + file.name)
                    } else {
                      setImageFile(null)
                      field.onChange(null) // or ""
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {imageFile && (
          <div className="mt-4">
            <Image
              src={URL.createObjectURL(imageFile)}
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
                form.setValue("image", "") // Clear the form value
              }}
            >
              Remove
            </Button>
          </div>
        )}
        <Button type="submit" className="w-full mt-8">
          Add Product
          {loading && (
            <span className="ml-2 animate-spin">
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.93A8.003 8.003 0 0112 20v-4a4.002 4.002 0 00-3.07-3.93l-1.07 4zM20 12a8.003 8.003 0 01-3.07 6.93l1.07 4A12.001 12.001 0 0024 12h-4zM12 20a8.003 8.003 0 01-6.93-3.07l-4 1.07A12.001 12.001 0 0012 24v-4z"
                ></path>
              </svg>
            </span>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default PageInner
