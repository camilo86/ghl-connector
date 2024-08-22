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
