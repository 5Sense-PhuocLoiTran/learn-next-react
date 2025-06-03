/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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
  AccountResType,
  UpdateMeBody,
  UpdateMeBodyType
} from "@/schemaValidations/account.schema"
import accountApiRequest from "@/apiRequest/account"
import { useRouter } from "next/navigation"

type Profile = AccountResType["data"]

const ProfileForm = ({ profile }: { profile: Profile }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: profile.name || ""
    }
  })

  const onSubmit = async (values: UpdateMeBodyType) => {
    if (loading) return
    try {
      setLoading(true)
      const res: any = await accountApiRequest.updateProfile(values)

      toast.success("Profile updated successfully", {
        description: res.payload.message || "Profile updated successfully"
      })
      router.refresh()
    } catch (error: any) {
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
      <h2 className="text-xl font-bold mb-4">Account Info</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Please fill in the form below to update your account information.
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        noValidate
      >
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input value={profile.email} type="email" readOnly disabled />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Input Name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-8" disabled={loading}>
          Update
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm
