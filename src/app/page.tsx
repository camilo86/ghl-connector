import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="leading-tight">
            HighLevel Connector for ChatBotBuilder.AI
          </CardTitle>
          <CardDescription className="space-y-4">
            <p>
              Create HighLevel contacts, notes and more from within your Chat
              Bot Builder AI flows.
            </p>
            <p>
              To get started, make sure you have access to both your HighLevel
              and Chat Bot Builder AI account. Once ready, start by logging in
              to your HighLevel account below.
            </p>
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full">Login with HighLevel</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
