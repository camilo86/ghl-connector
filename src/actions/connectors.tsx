"use server"

import { redirect } from "next/navigation"

export async function createConnector(code: string, accountId: string) {
  console.log("code", code)
  console.log("accountId", accountId)

  redirect("/dashboard")
}
