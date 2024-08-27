import { logout } from "@/actions/sessions"

export { handler as GET }

async function handler() {
  await logout()
}
