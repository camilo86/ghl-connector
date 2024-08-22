import { UserNav } from "@/components/user-nav"

export default function DashboardPage() {
  return (
    <div className="h-16 w-full border-b">
      <div className="container flex h-full items-center justify-between">
        <span className="inline-block font-bold">High Level Connector</span>
        <UserNav />
      </div>
    </div>
  )
}
