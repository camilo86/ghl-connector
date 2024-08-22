"use server"

import db from "@/lib/db"
import { clearSession, getSession } from "@/lib/sessions"
import { getHighLevelLocation } from "@/services/highLevel"
import { redirect } from "next/navigation"

export async function logout() {
  clearSession()
  redirect("/")
}

export async function getSessionConnector() {
  const session = getSession()

  if (!session) {
    return null
  }

  const connector = await db.connector.findUnique({
    where: {
      id: session.connectorId,
    },
  })

  return connector
}

export async function getSessionLocation() {
  const connector = await getSessionConnector()

  if (!connector) {
    return null
  }

  try {
    return await getHighLevelLocation(
      connector.highLevelLocationId,
      connector.highLevelAccessToken
    )
  } catch (e) {
    console.error(`Failed to get HighLevel location. Error=${e}`)

    return null
  }
}
