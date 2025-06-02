import { z } from "zod"

// Zod schema cho dữ liệu profile trong response
export const AccountRes = z
  .object({
    data: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string()
    }),
    message: z.string()
  })
  .strict()

// Zod schema cho body khi cập nhật profile
export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256)
})

// === TypeScript types từ Zod schema ===

// Full response từ profile API
export type AccountResType = z.TypeOf<typeof AccountRes>

// Chỉ phần data bên trong
export type ProfileData = AccountResType["data"]

// Alias cho response profile
export type ProfileResponse = AccountResType

// Body khi cập nhật thông tin cá nhân
export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>
