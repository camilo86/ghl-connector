import HighLevelLoginButton from "@/components/hl-login-button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="leading-tight">
            HighLevel Connector for GPTBot
          </CardTitle>
          <CardDescription className="space-y-4">
            Create HighLevel contacts, notes and more from within your Chat Bot
            Builder AI flows.
            <br />
            <br />
            To get started, make sure you have access to both your HighLevel and
            GPTBot account. Once ready, start by logging in to your HighLevel
            account below.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <HighLevelLoginButton />
        </CardFooter>
      </Card>
    </div>
  )
}
