import http from "@/lib/https"
import {
  LoginBodyType,
  RegisterBodyType
} from "@/schemaValidations/auth.schema"
import { MessageResType } from "@/schemaValidations/common.schema"

const authApiRequest = {
  login: (data: LoginBodyType) => http.post<LoginBodyType>("/auth/login", data),
  register: (data: RegisterBodyType) =>
    http.post<RegisterBodyType>("/auth/register", data),
  auth: (data: { sessionToken: string }) =>
    http.post("/api/auth", data, {
      baseUrl: ""
    }),
  logoutFromNextServerToServer: (sessionToken: string) =>
    http.post<MessageResType>(
      "/auth/logout",
      {},
      {
        headers: { Authorization: `Bearer ${sessionToken}` }
      }
    ),
  logoutFromNextClientToNextServer: () =>
    http.post<MessageResType>(
      "/api/auth/logout",
      {},
      {
        baseUrl: ""
      }
    )
}

export default authApiRequest
