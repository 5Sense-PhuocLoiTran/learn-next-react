import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

type MenuItem =
  | {
      type: "checkbox"
      label: string
      checked: boolean
      onCheckedChange: (checked: boolean) => void
      disabled?: boolean
    }
  | {
      type: "link"
      label: string
      href: string
      disabled?: boolean
    }
  | {
      type: "separator"
    }

type DropdownMenuProps = {
  items: MenuItem[]
  label?: string
  buttonLabel?: string
}

export default function DropdownMenuFlexible({
  items,
  label = "Options",
  buttonLabel = "Open"
}: DropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="!text-white border-none bg-transparent hover:underline hover:bg-transparent shadow-none h-auto !p-0 text-[16px] font-normal"
        >
          {buttonLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {items.map((item, index) => {
          if (item.type === "separator") {
            return <DropdownMenuSeparator key={`separator-${index}`} />
          }
          if (item.type === "checkbox") {
            return (
              <DropdownMenuCheckboxItem
                key={`checkbox-${index}`}
                checked={item.checked}
                onCheckedChange={item.onCheckedChange}
                disabled={item.disabled}
              >
                {item.label}
              </DropdownMenuCheckboxItem>
            )
          }
          if (item.type === "link") {
            return (
              <DropdownMenuItem
                asChild
                disabled={item.disabled}
                key={`link-${index}`}
              >
                <Link href={item.href} className="w-full">
                  {item.label}
                </Link>
              </DropdownMenuItem>
            )
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
