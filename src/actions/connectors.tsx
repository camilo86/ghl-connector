"use server"

import db from "@/lib/db"
import { createSession } from "@/lib/sessions"
import { HighLevelAuthToken } from "@/services/highLevel"
import { redirect } from "next/navigation"

export async function createConnector(code: string, accountId: string) {
  let nextPage = "/dashboard"

  try {
    const authToken = JSON.parse(atob(code)) as HighLevelAuthToken

    const highLevelAccountExists = await db.connector.findFirst({
      where: {
        highLevelLocationId: authToken.locationId,
      },
    })

    // App only supports linking 1 High Level account to Chat Bot Builder.
    // If connector for a High Level account already exists, then start a session
    // for that connector and move user to it's dashboard.
    if (!!highLevelAccountExists) {
      createSession(highLevelAccountExists)
      return
    }

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
