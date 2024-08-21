import { redirect } from "next/navigation"

export { handler as GET }

async function handler(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")

  if (!code) {
    throw new Error("No oauth code provided")
  }

  redirect(`/signup?code=${code}`)
}
