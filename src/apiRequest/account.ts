import http from "@/lib/https"
import {
  AccountResType,
  UpdateMeBodyType
} from "@/schemaValidations/account.schema"

const accountApiRequest = {
  profile: (sessionToken: string) =>
    http.get<AccountResType>("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    }),
  profileClient: () => http.get<AccountResType>("/account/me"),
  updateProfile: (body: UpdateMeBodyType) =>
    http.put<AccountResType>("/account/me", body)
}

export default accountApiRequest
