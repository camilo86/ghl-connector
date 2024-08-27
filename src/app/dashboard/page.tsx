import { getSessionConnector, getSessionLocation } from "@/actions/sessions"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

export default async function DashboardPage() {
  const [location, connector] = await Promise.all([
    getSessionLocation(),
    getSessionConnector(),
  ])

  // Example data for requests
  const requests = [
    {
      action: "Create Contact",
      url: "/api/actions/contacts",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Connector: connector?.id,
      },
      body: {
        first_name: "optional - first name of contact",
        last_name: "optional - last name of contact",
        email: "required - email of contact",
        gender: "optional - gender of contact (binary only)",
        phone: "optional - phone of contact",
        address1: "optional - address of contact",
        city: "optional - city of contact",
        state: "optional - state of contact",
        postalCode: "optional - postal code of contact",
        website: "optional - website of contact",
        timezone: "optional - timezone of contact",
      },
    },
    {
      action: "Create Note",
      url: "/api/actions/notes",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: connector?.id,
      },
      body: {
        contactId: "required - id of the recepient",
        body: "required - text of the note",
        userId: "optional - id of the author",
      },
    },
  ]

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between">
        <h1 className="mb-6 text-3xl font-bold">
          User Guide - {location?.name}
        </h1>
        <Link href="/api/gh/logout">Log Out</Link>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-6">
        <div className="col-span-3">
          <h2 className="mb-4 text-2xl font-semibold">Actions</h2>
          <Accordion type="single" collapsible>
            {requests.map((request, index) => (
              <AccordionItem value={`action${index + 1}`} key={index}>
                <AccordionTrigger>{request.action}</AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-lg bg-gray-900 p-4">
                    <h3 className="text-lg font-medium">Request Details</h3>
                    <div className="mt-2">
                      <p>
                        <strong>URL:</strong> {request.url}
                      </p>
                      <p>
                        <strong>Method:</strong> {request.method}
                      </p>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-md font-semibold">Headers:</h4>
                      <ul className="list-disc pl-4">
                        {Object.entries(request.headers).map(([key, value]) => (
                          <li key={key}>
                            <strong>{key}:</strong> {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-md font-semibold">Body:</h4>
                      <ul className="list-disc pl-4">
                        {Object.entries(request.body).map(([key, value]) => (
                          <li key={key}>
                            <strong>{key}:</strong> {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
