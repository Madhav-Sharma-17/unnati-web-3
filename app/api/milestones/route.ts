import { getMilestones, addMilestone, deleteMilestone } from "@/lib/storage"

export async function GET() {
  return Response.json(getMilestones())
}

export async function POST(request: Request) {
  const body = await request.json()
  const newMilestone = addMilestone(body)
  return Response.json(newMilestone, { status: 201 })
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  deleteMilestone(id)
  return Response.json({ success: true })
}
