import http from "@/lib/https"
import { AccountResType } from "@/schemaValidations/account.schema"

const accountApiRequest = {
  profile: (sessionToken: string) =>
    http.get<AccountResType>("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    }),
  profileClient: () => http.get<AccountResType>("/account/me")
}

export default accountApiRequest
