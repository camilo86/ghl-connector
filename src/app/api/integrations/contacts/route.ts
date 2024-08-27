import db from "@/lib/db"
import { executeConnectorAction } from "@/lib/utils"
import { createHighLevelContact } from "@/services/highLevel"

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

  let payload: CreateContactRequestBody

  try {
    payload = (await req.json()) as CreateContactRequestBody
  } catch (e) {
    console.log(
      `Contact info is missing from request. ConnectorId=${connectorId}`
    )

    return Response.json(
      {
        message: "Contact info is required. Maybe your request body is empty?",
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
      createHighLevelContact(connector.id, connector.highLevelAccessToken, {
        locationId: connector.highLevelLocationId,
        firstName: payload.first_name,
        lastName: payload.last_name,
        email: payload.email,
        gender: payload.gender,
        phone: payload.phone,
        address1: payload.address1,
        city: payload.city,
        state: payload.state,
        postalCode: payload.postalCode,
        website: payload.website,
        timezone: payload.timezone,
      })
    )
  } catch (e) {
    console.error(`Failed to create HighLevel contact. Error=${e}`)

    return Response.json(
      {
        message: "Failed to create HighLevel contact.",
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

type CreateContactRequestBody = {
  first_name?: string
  last_name?: string
  email?: string
  gender?: string
  phone?: string
  address1?: string
  city?: string
  state?: string
  postalCode?: string
  website?: string
  timezone?: string
}
