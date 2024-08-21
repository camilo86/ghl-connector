import { SignupCard } from "@/components/signup-card"
import { redirect } from "next/navigation"

type SignupPageProps = {
  searchParams: {
    code: string
  }
}

export default function SignupPage({ searchParams }: SignupPageProps) {
  const { code } = searchParams

  if (!code) {
    redirect("/")
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <SignupCard code={code} />
    </div>
  )
}
