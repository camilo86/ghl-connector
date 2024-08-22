"use server"

import { clearSession } from "@/lib/sessions"
import { redirect } from "next/navigation"

export async function logout() {
  clearSession()
  redirect("/")
}
