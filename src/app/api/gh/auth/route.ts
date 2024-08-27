import db from "@/lib/db"
import { createSession } from "@/lib/sessions"
import { getHighLevelAuthToken } from "@/services/highLevel"
import { redirect } from "next/navigation"

export { handler as GET }

async function handler(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")

  let nextPage = "/dashboard"

  try {
    if (!code) {
      throw new Error("No oauth code provided")
    }

    const authToken = await getHighLevelAuthToken(code)

    const connectorExists = await db.connector.findFirst({
      where: {
        highLevelLocationId: authToken.locationId,
      },
    })

    if (!connectorExists) {
      const code = btoa(JSON.stringify(authToken))
      nextPage = `/signup?code=${code}`
      return
    }

    createSession(connectorExists)
  } catch (e) {
    console.error(e)
    nextPage = "/"
  } finally {
    redirect(nextPage)
  }
}
