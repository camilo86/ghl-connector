"use client"

import { logout } from "@/actions/sessions"
import { HighLevelLocation } from "@/services/highLevel"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export type UserNavProps = {
  location: HighLevelLocation | null | undefined
}

export function UserNav({ location }: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={location?.logoUrl || ""}
              alt="User"
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>{abbreviateName(location?.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {location?.name || "--"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {location?.email || "--"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Docs</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function abbreviateName(name?: string) {
  if (!name || name.length == 0) {
    return "--"
  }

  let abbreviation = ""
  const segements = name.split(" ").map((segement) => segement.trim())

  if (segements.length < 2) {
    abbreviation = segements[0][0]
  } else {
    abbreviation = segements[0][0] + segements[1][0]
  }

  return abbreviation.toUpperCase()
}
