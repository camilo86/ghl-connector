import db from "@/lib/db"
import { executeConnectorAction } from "@/lib/utils"
import { createHighLevelNote } from "@/services/highLevel"

export { handler as POST }

async function handler(req: Request) {
  const connectorId = req.headers.get("Connector")

  if (!connectorId) {
    console.error("Request is missing Connector header.")

    return Response.json(
      {
        message: "Header `Connector` is required.",
      },
      {
        status: 400,
      }
    )
  }

  let payload: CreateNoteRequestBody

  try {
    payload = (await req.json()) as CreateNoteRequestBody
  } catch (e) {
    console.log(`Note info is missing from request. ConnectorId=${connectorId}`)

    return Response.json(
      {
        message: "Note info is required. Maybe your request body is empty?",
      },
      {
        status: 400,
      }
    )
  }

  const connector = await db.connector.findUnique({
    where: {
      id: connectorId,
    },
  })

  if (!connector) {
    console.log(`Cannot find connector. ConnectorId=${connectorId}`)

    return Response.json(
      {
        message: "Connector not found.",
      },
      {
        status: 404,
      }
    )
  }

  try {
    await executeConnectorAction(connector, (accessToken) =>
      createHighLevelNote(
        connector.highLevelLocationId,
        accessToken,
        payload.contactId,
        {
          body: payload.body,
          userId: payload.userId,
        }
      )
    )
  } catch (e) {
    console.error(`Failed to create HighLevel note. Error=${e}`)

    return Response.json(
      {
        message: "Failed to create HighLevel note.",
      },
      {
        status: 400,
      }
    )
  }

  return new Response(null, {
    status: 204,
  })
}

type CreateNoteRequestBody = {
  contactId: string
  body: string
  userId?: string
}
