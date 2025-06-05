import http from "@/lib/https"
import {
  CreateProductBodyType,
  ProductResType
} from "@/schemaValidations/product.schema"

const productApiRequest = {
  create: (data: CreateProductBodyType) =>
    http.post<ProductResType>("/products", data),
  uploadImage: (body: FormData) =>
    http.post<{ message: string; data: string }>("/media/upload", body)
}

export default productApiRequest
