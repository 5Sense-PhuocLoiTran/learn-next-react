import http from "@/lib/https"
import { MessageResType } from "@/schemaValidations/common.schema"
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
  UpdateProductBodyType
} from "@/schemaValidations/product.schema"

const productApiRequest = {
  create: (data: CreateProductBodyType) =>
    http.post<ProductResType>("/products", data),
  uploadImage: (body: FormData) =>
    http.post<{ message: string; data: string }>("/media/upload", body),
  getListProducts: () => http.get<ProductListResType>("/products"),
  getProductById: (id: string) => http.get<ProductResType>(`/products/${id}`),
  updateProduct: (id: number, data: UpdateProductBodyType) =>
    http.put<ProductResType>(`/products/${id}`, data),
  deleteProduct: (id: number) => http.delete<MessageResType>(`/products/${id}`)
}

export default productApiRequest
