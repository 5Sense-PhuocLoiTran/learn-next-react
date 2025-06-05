import http from "@/lib/https"
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType
} from "@/schemaValidations/product.schema"

const productApiRequest = {
  create: (data: CreateProductBodyType) =>
    http.post<ProductResType>("/products", data),
  uploadImage: (body: FormData) =>
    http.post<{ message: string; data: string }>("/media/upload", body),
  getListProducts: () => http.get<ProductListResType>("/products"),
  getProductById: (id: string) => http.get<ProductResType>(`/products/${id}`),
  updateProduct: (id: string, data: CreateProductBodyType) =>
    http.put<ProductResType>(`/products/${id}`, data)
}

export default productApiRequest
