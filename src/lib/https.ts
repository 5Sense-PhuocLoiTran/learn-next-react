/* eslint-disable @typescript-eslint/no-explicit-any */
import envConfig from "@/config"
import { LoginResType } from "@/schemaValidations/auth.schema"
import { normalizePathname } from "./utils"

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined
}

const ENTITY_ERROR_STATUS = 422
// const AUTHENTICATION_ERROR_STATUS = 401

type EntityErrorPayload = {
  message: string
  errors: {
    field: string
    message: string
  }[]
}

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error")
    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  status: number
  payload: EntityErrorPayload
  constructor({
    status,
    payload
  }: {
    status: number
    payload: EntityErrorPayload
  }) {
    super({
      status,
      payload
    })
    this.status = status
    this.payload = payload
  }
}

class SessionToken {
  private token = ""
  get value() {
    return this.token
  }
  set value(token: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === "undefined") {
      console.warn("⚠️ Trying to set session token on server, ignored:", token)
      return
    }

    this.token = token
  }
}

export const clientSessionToken = new SessionToken()

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body
    ? options?.body instanceof FormData
      ? options.body
      : JSON.stringify(options.body)
    : undefined

  const baseHeaders =
    options?.body instanceof FormData
      ? {
          Authorization: clientSessionToken.value
            ? `Bearer ${clientSessionToken.value}`
            : ""
        }
      : {
          "Content-Type": "application/json",
          Authorization: clientSessionToken.value
            ? `Bearer ${clientSessionToken.value}`
            : ""
        }

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl
  const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`
  const res = await fetch(fullUrl, {
    ...options,
    cache: "no-store",
    headers: {
      ...baseHeaders,
      ...options?.headers
    } as any,
    body,
    method
  })
  const payload: Response = await res.json()
  const data = {
    status: res.status,
    payload
  }
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError({
        status: ENTITY_ERROR_STATUS,
        payload: payload as EntityErrorPayload
      })
    } else {
      throw new HttpError({
        status: res.status,
        payload: payload as { message: string; [key: string]: any }
      })
    }
  }
  if (typeof window === "undefined") {
    if (
      ["/auth/login", "/auth/register"].some(
        (item) => item === normalizePathname(url)
      )
    ) {
      clientSessionToken.value = (payload as LoginResType).data.token
    } else if ("/auth/logout" === normalizePathname(url)) {
      clientSessionToken.value = ""
    }
  }
  return data
}

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options)
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body })
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body })
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options })
  }
}

export default http
