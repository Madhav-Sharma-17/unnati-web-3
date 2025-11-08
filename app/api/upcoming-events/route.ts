import { getUpcomingEvents, addUpcomingEvent, deleteUpcomingEvent } from "@/lib/storage"

export async function GET() {
  return Response.json(getUpcomingEvents())
}

export async function POST(request: Request) {
  const body = await request.json()
  const newEvent = addUpcomingEvent(body)
  return Response.json(newEvent, { status: 201 })
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  deleteUpcomingEvent(id)
  return Response.json({ success: true })
}
