import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="leading-tight">Almost there.</CardTitle>
          <CardDescription className="space-y-4">
            Awesome. Now that we have your HighLevel information, let&apos;s
            connect your Chat Bot Builder AI account.
            <br />
            <br />
            Grab your Chat Bot Builder AI Account ID (you can find this under
            the account profile), and paste it below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="accountId">Account ID</Label>
            <Input
              type="text"
              id="accountId"
              placeholder="Chat Bot Builder Account ID"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Connect</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
