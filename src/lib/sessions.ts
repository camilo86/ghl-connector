import { Connector } from "@prisma/client"
import { cookies } from "next/headers"
import db from "./db"

const COOKIE_NAME = "GHLCONNECTOR"

export type AppSession = {
  connectorId: string
}

export function createSession(connector: Connector) {
  if (!connector) {
    throw new Error("Connector is required to start a session.")
  }

  const payload = JSON.stringify({ connectorId: connector.id })
  const oneDay = 24 * 60 * 60

  cookies().set(COOKIE_NAME, payload, {
    httpOnly: true,
    expires: Date.now() + oneDay,
  })
}

export function getSession() {
  const sessionCookie = cookies().get(COOKIE_NAME)

  if (!sessionCookie) {
    return null
  }

  return JSON.parse(sessionCookie.value) as AppSession
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
