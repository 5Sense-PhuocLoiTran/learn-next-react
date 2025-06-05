"use client"

import DropdownMenuFlexible from "@/components/dropdown"
import * as React from "react"

export default function ProductMenu() {
  const items = [
    {
      type: "link" as const,
      label: "All Products",
      href: "/products"
    },
    {
      type: "link" as const,
      label: "New Products",
      href: "/products/add"
    }
  ]

  return <DropdownMenuFlexible items={items} label="" buttonLabel="Products" />
}
