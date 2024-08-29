"use client"

import { createConnector } from "@/actions/connectors"
import React from "react"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export type SignupCardProps = {
  code: string
}

export function SignupCard({ code }: SignupCardProps) {
  const [accountId, setAccountId] = React.useState("")

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="leading-tight">Almost there.</CardTitle>
        <CardDescription className="space-y-4">
          Awesome. Now that we have your HighLevel information, let&apos;s
          connect your GPTBot account.
          <br />
          <br />
          Grab your GPTBot Account ID (you can find this under the account
          profile), and paste it below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="accountId">Account ID</Label>
          <Input
            type="text"
            id="accountId"
            placeholder="Chat Bot Builder Account ID"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={!accountId || accountId.length < 5}
          onClick={() => createConnector(code, accountId)}
        >
          Connect
        </Button>
      </CardFooter>
    </Card>
  )
}
