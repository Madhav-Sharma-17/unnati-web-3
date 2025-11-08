import { getArticles, addArticle } from "@/lib/articles-storage"

export async function GET() {
  return Response.json(getArticles())
}

export async function POST(request: Request) {
  const body = await request.json()
  const newArticle = addArticle(body)
  return Response.json(newArticle, { status: 201 })
}
