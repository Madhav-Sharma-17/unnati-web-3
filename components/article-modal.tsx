"use client"

import { X } from "lucide-react"

interface ArticleModalProps {
  article: {
    id: string
    title: string
    excerpt: string
    content: string
    category: string
    image: string
    date: string
  } | null
  onClose: () => void
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  if (!article) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-border flex items-center justify-between p-6">
          <h2 className="text-2xl font-bold text-foreground">{article.title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {article.image && (
            <img
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
              {article.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {new Date(article.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground mb-4 italic">{article.excerpt}</p>
            <div className="text-foreground whitespace-pre-wrap leading-relaxed">{article.content}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
