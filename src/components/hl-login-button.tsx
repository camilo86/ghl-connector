"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export default function HighLevelLoginButton() {
  const router = useRouter()

  const handleLogin = () => {
    const oauthUrl = new URL(
      "https://marketplace.gohighlevel.com/oauth/chooselocation"
    )

    oauthUrl.searchParams.append("response_type", "code")
    oauthUrl.searchParams.append(
      "redirect_uri",
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/gh/auth`
    )
    oauthUrl.searchParams.append(
      "client_id",
      process.env.NEXT_PUBLIC_HIGH_LEVEL_CLIENT_ID
    )
    oauthUrl.searchParams.append("scope", "locations.readonly contacts.write")

    router.push(oauthUrl.toString())
  }

  return (
    <Button className="w-full" onClick={handleLogin}>
      Login with HighLevel
    </Button>
  )
}
