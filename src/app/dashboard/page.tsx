import { getSessionLocation } from "@/actions/sessions"
import { UserNav } from "@/components/user-nav"

export default async function DashboardPage() {
  const location = await getSessionLocation()

  return (
    <div className="h-16 w-full border-b">
      <div className="container flex h-full items-center justify-between">
        <span className="inline-block font-bold">High Level Connector</span>
        <UserNav location={location} />
      </div>
    </div>
  )
}
