import { getSession } from "@/lib/sessions"
import { redirect } from "next/navigation"

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = getSession()

  if (!session) {
    redirect("/")
  }

  return children
}
