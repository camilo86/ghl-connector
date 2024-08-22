"use server"

import db from "@/lib/db"
import { createSession } from "@/lib/sessions"
import { getHighLevelAuthToken } from "@/services/highLevel"
import { redirect } from "next/navigation"

export async function createConnector(code: string, accountId: string) {
  let nextPage = "/dashboard"

  try {
    const authToken = await getHighLevelAuthToken(code)

    const connector = await db.connector.create({
      data: {
        ChatBotBuilderAccountId: accountId,
        highLevelLocationId: authToken.locationId,
        highLevelAccessToken: authToken.access_token,
        highLevelRefreshToken: authToken.refresh_token,
      },
    })

    createSession(connector)
  } catch (e) {
    console.error(
      `Failed creating connector. AccountId=${accountId}. Error=${e}`
    )

    // TODO: We probably want to pass an error message back to the user.
    nextPage = "/"
  } finally {
    redirect(nextPage)
  }
}
