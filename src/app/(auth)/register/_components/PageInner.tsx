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
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema"
import authApiRequest from "@/apiRequest/auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { handleErrorApi } from "@/lib/utils"

const PageInner = () => {
  const router = useRouter()
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async (values: RegisterBodyType) => {
    try {
      const res: any = await authApiRequest.register(values)

      toast.success(res.payload.message)
      form.reset()
      router.push("/login")
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
        duration: 5000
      })
    }
  }

  return (
    <Form {...form}>
      <h2 className="text-2xl font-bold mb-4">Register Account</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Please fill in the form below to create an account.
      </p>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Input Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Input Confirm Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-8">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default PageInner
