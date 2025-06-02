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
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import { toast } from "sonner"
import authApiRequest from "@/apiRequest/auth"
import { useRouter } from "next/navigation"
import { handleErrorApi } from "@/lib/utils"
import { useState } from "react"

const PageInner = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (values: LoginBodyType) => {
    if (loading) return
    try {
      setLoading(true)
      const res: any = await authApiRequest.login(values)

      toast.success("Welcome to Nudo Application", {
        description: res.payload.message || "Login successful"
      })
      // Gửi đến API nội bộ
      await authApiRequest.auth({
        sessionToken: res.payload.data.token
      })
      router.push("/")
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
      <h2 className="text-2xl font-bold mb-4">Login Account</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Please fill in the form below to login.
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Input Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-8" disabled={loading}>
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default PageInner
