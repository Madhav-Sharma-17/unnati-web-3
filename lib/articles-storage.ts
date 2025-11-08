// In-memory storage for articles (persists during session)
// In production, you'd use a database
const articlesStorage: Array<{
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  date: string
}> = [
  {
    id: "1",
    title: "Understanding Parliamentary Democracy in India",
    excerpt:
      "A deep dive into the structure and functioning of the Indian Parliament and its significance in democracy.",
    content:
      "Parliamentary democracy in India is built on the foundation of democratic values enshrined in the Constitution. The Parliament consists of two houses - the Lok Sabha and the Rajya Sabha. The Indian Parliament plays a crucial role in legislation, representation, and accountability. Understanding how it functions is essential for every citizen who wishes to contribute to nation-building.",
    category: "Education",
    image: "/parliament-building.png",
    date: "2024-03-15",
  },
  {
    id: "2",
    title: "Youth Leadership in Nation Building",
    excerpt: "How young leaders can contribute meaningfully to social and political change in their communities.",
    content:
      "Young leaders have unique perspectives and energy that can drive transformative change. By engaging in meaningful dialogue, taking initiative in community projects, and staying informed about national issues, youth can make significant contributions to nation-building. The future of our nation depends on the active participation and leadership of young citizens.",
    category: "Leadership",
    image: "/youth-leadership.jpg",
    date: "2024-03-10",
  },
]

export function getArticles() {
  return articlesStorage
}

export function getArticleById(id: string) {
  return articlesStorage.find((article) => article.id === id)
}

export function addArticle(article: Omit<(typeof articlesStorage)[0], "id">) {
  const newArticle = {
    ...article,
    id: Date.now().toString(),
  }
  articlesStorage.push(newArticle)
  return newArticle
}

export function updateArticle(id: string, updates: Partial<Omit<(typeof articlesStorage)[0], "id">>) {
  const index = articlesStorage.findIndex((article) => article.id === id)
  if (index !== -1) {
    articlesStorage[index] = { ...articlesStorage[index], ...updates }
    return articlesStorage[index]
  }
  return null
}

export function deleteArticle(id: string) {
  const index = articlesStorage.findIndex((article) => article.id === id)
  if (index !== -1) {
    articlesStorage.splice(index, 1)
    return true
  }
  return false
}
