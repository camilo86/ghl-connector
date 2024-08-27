export type HighLevelAuthToken = {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
  userType: string
  companyId: string
  locationId: string
  userId: string
}

export type HighLevelLocation = {
  id: string
  name: string
  email: string
  logoUrl: string
}

type CreateHighLevelContact = {
  firstName?: string
  lastName?: string
  email?: string
  gender?: string
  phone?: string
  address1?: string
  city?: string
  state?: string
  postalCode?: string
  website?: string
  timezone?: string
  locationId: string
}

type CreateHighLevelNote = {
  userId?: string
  body: string
}

export async function getHighLevelAuthToken(code: string) {
  if (!code) {
    throw new Error("HighLevel code is required to retrieve auth token.")
  }

  const headers = new Headers()
  headers.append("Content-Type", "application/x-www-form-urlencoded")

  const response = await fetch(
    "https://services.leadconnectorhq.com/oauth/token",
    {
      method: "POST",
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_HIGH_LEVEL_CLIENT_ID,
        client_secret: process.env.HIGH_LEVEL_SECRET,
        grant_type: "authorization_code",
        user_type: "Location",
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/gh/auth`,
      }),
      headers,
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch HighLevel auth token.")
  }

  return (await response.json()) as HighLevelAuthToken
}

export async function refreshHighLevelAccessToken(refreshToken: string) {
  if (!refreshToken) {
    throw new Error("RefreshToken is required to refresh HighLevel auth token.")
  }

  const headers = new Headers()
  headers.append("Content-Type", "application/x-www-form-urlencoded")

  const response = await fetch(
    "https://services.leadconnectorhq.com/oauth/token",
    {
      method: "POST",
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: process.env.NEXT_PUBLIC_HIGH_LEVEL_CLIENT_ID,
        client_secret: process.env.HIGH_LEVEL_SECRET,
        grant_type: "refresh_token",
        user_type: "Location",
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/gh/auth`,
      }),
    }
  )

  if (!response.ok) {
    console.error(await response.text())
    throw new Error(`Failed to refresh HighLevel auth token.`)
  }

  return (await response.json()) as HighLevelAuthToken
}

export async function getHighLevelLocation(
  locationId: string,
  accessToken: string
) {
  if (!locationId) {
    throw new Error("locationId is required to fetch HighLevel location.")
  }

  if (!accessToken) {
    throw new Error("accessToken is required to fetch HighLevel location.")
  }

  const headers = new Headers()
  headers.append("Authorization", `Bearer ${accessToken}`)
  headers.append("Content-Type", "application/json")
  headers.append("Version", "2021-07-28")

  const response = await fetch(
    `https://services.leadconnectorhq.com/locations/${locationId}`,
    {
      headers,
    }
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch location. LocationId=${locationId} Status=${response.statusText}`
    )
  }

  return (await response.json())?.location as HighLevelLocation
}

export async function createHighLevelContact(
  locationId: string,
  accessToken: string,
  contact: CreateHighLevelContact
) {
  if (!locationId) {
    throw new Error("locationId is required to create HighLevel contact.")
  }

  if (!accessToken) {
    throw new Error("accessToken is required to create HighLevel contact.")
  }

  if (!contact) {
    throw new Error("contact info is required to create HighLevel contact.")
  }

  const headers = new Headers()
  headers.append("Authorization", `Bearer ${accessToken}`)
  headers.append("Content-Type", "application/json")
  headers.append("Version", "2021-07-28")

  const response = await fetch(
    `https://services.leadconnectorhq.com/contacts/upsert`,
    {
      method: "POST",
      body: JSON.stringify(contact),
      headers,
    }
  )

  if (!response.ok) {
    throw new Error(
      `Failed to create contact. LocationId=${locationId} Status=${response.statusText}`
    )
  }
}

export async function createHighLevelNote(
  locationId: string,
  accessToken: string,
  contactId: string,
  note: CreateHighLevelNote
) {
  if (!locationId) {
    throw new Error("locationId is required to create HighLevel note.")
  }

  if (!accessToken) {
    throw new Error("accessToken is required to create HighLevel note.")
  }

  if (!note) {
    throw new Error("note info is required to create HighLevel note.")
  }

  const headers = new Headers()
  headers.append("Authorization", `Bearer ${accessToken}`)
  headers.append("Content-Type", "application/json")
  headers.append("Version", "2021-07-28")

  const response = await fetch(
    `https://services.leadconnectorhq.com/contacts/${contactId}/notes`,
    {
      method: "POST",
      body: JSON.stringify(note),
      headers,
    }
  )

  if (!response.ok) {
    throw new Error(
      `Failed to create note. LocationId=${locationId} Status=${response.statusText}`
    )
  }
}
