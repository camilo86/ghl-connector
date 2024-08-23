import { refreshHighLevelAccessToken } from "@/services/highLevel"
import { Connector } from "@prisma/client"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import db from "./db"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function executeConnectorAction<T>(
  connector: Connector,
  action: (accessToken: string) => Promise<T>,
  hasRefreshedToken = false
) {
  if (!connector) {
    throw new Error("Connector is required to execute connector action.")
  }

  if (!action) {
    throw new Error("Action is required to execute connector action.")
  }

  try {
    return await action(connector.highLevelAccessToken)
  } catch (e) {
    if (hasRefreshedToken) {
      throw new Error(
        `Failed to run action for connector after refreshing token. ConnectorId=${connector.id}`
      )
    }

    const refreshedToken = await refreshHighLevelAccessToken(
      connector.highLevelRefreshToken
    )

    const refreshedConnector = await db.connector.update({
      where: {
        id: connector.id,
      },
      data: {
        highLevelAccessToken: refreshedToken.access_token,
        highLevelRefreshToken: refreshedToken.refresh_token,
      },
    })

    return await executeConnectorAction(refreshedConnector, action, true)
  }
}
