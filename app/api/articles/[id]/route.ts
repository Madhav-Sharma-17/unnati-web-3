import { getArticleById, updateArticle, deleteArticle } from "@/lib/articles-storage"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = getArticleById(id)
  if (!article) {
    return Response.json({ error: "Article not found" }, { status: 404 })
  }
  return Response.json(article)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const article = updateArticle(id, body)
  if (!article) {
    return Response.json({ error: "Article not found" }, { status: 404 })
  }
  return Response.json(article)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const deleted = deleteArticle(id)
  if (!deleted) {
    return Response.json({ error: "Article not found" }, { status: 404 })
  }
  return Response.json({ success: true })
}
