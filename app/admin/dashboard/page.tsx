"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Plus, X } from "lucide-react"

interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  date: string
}

interface Milestone {
  id: string
  year: number
  event: string
  milestone: string
}

interface UpcomingEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  registrationLink?: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState<"articles" | "milestones" | "events">("articles")

  // Articles state
  const [articles, setArticles] = useState<Article[]>([])
  const [showArticleForm, setShowArticleForm] = useState(false)
  const [articleFormData, setArticleFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Education",
    image: "",
  })
  const [pastedImage, setPastedImage] = useState<string>("")

  // Milestones state
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [showMilestoneForm, setShowMilestoneForm] = useState(false)
  const [milestoneFormData, setMilestoneFormData] = useState({
    year: new Date().getFullYear(),
    event: "",
    milestone: "",
  })

  // Events state
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([])
  const [showEventForm, setShowEventForm] = useState(false)
  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "Leadership",
    registrationLink: "",
  })

  const [loading, setLoading] = useState(true)

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = sessionStorage.getItem("admin_authenticated")
      if (!isAuth) {
        router.push("/admin")
      } else {
        setIsLoggedIn(true)
        fetchAllData()
      }
    }

    checkAuth()
  }, [router])

  const fetchAllData = async () => {
    try {
      const [articlesRes, milestonesRes, eventsRes] = await Promise.all([
        fetch("/api/articles"),
        fetch("/api/milestones"),
        fetch("/api/upcoming-events"),
      ])

      setArticles(await articlesRes.json())
      setMilestones(await milestonesRes.json())
      setUpcomingEvents(await eventsRes.json())
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleImagePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (const item of items) {
      if (item.kind === "file" && item.type.startsWith("image/")) {
        e.preventDefault()
        const file = item.getAsFile()
        if (file) {
          const reader = new FileReader()
          reader.onload = (event) => {
            const base64Image = event.target?.result as string
            setPastedImage(base64Image)
            setArticleFormData({ ...articleFormData, image: base64Image })
          }
          reader.readAsDataURL(file)
        }
      }
    }
  }

  // Articles handlers
  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!articleFormData.title || !articleFormData.excerpt || !articleFormData.content) {
      alert("Please fill in all required fields")
      return
    }

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleFormData),
      })

      const article = await response.json()
      setArticles([...articles, article])
      setArticleFormData({ title: "", excerpt: "", content: "", category: "Education", image: "" })
      setPastedImage("")
      setShowArticleForm(false)
    } catch (error) {
      console.error("Failed to add article:", error)
    }
  }

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return

    try {
      await fetch(`/api/articles/${id}`, { method: "DELETE" })
      setArticles(articles.filter((a) => a.id !== id))
    } catch (error) {
      console.error("Failed to delete article:", error)
    }
  }

  // Milestones handlers
  const handleAddMilestone = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!milestoneFormData.event || !milestoneFormData.milestone) {
      alert("Please fill in all required fields")
      return
    }

    try {
      const response = await fetch("/api/milestones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(milestoneFormData),
      })

      const milestone = await response.json()
      setMilestones([...milestones, milestone].sort((a, b) => a.year - b.year))
      setMilestoneFormData({ year: new Date().getFullYear(), event: "", milestone: "" })
      setShowMilestoneForm(false)
    } catch (error) {
      console.error("Failed to add milestone:", error)
    }
  }

  const handleDeleteMilestone = async (id: string) => {
    if (!confirm("Are you sure you want to delete this milestone?")) return

    try {
      await fetch("/api/milestones", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      setMilestones(milestones.filter((m) => m.id !== id))
    } catch (error) {
      console.error("Failed to delete milestone:", error)
    }
  }

  // Events handlers
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!eventFormData.title || !eventFormData.date || !eventFormData.time || !eventFormData.location) {
      alert("Please fill in all required fields")
      return
    }

    try {
      const response = await fetch("/api/upcoming-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventFormData),
      })

      const event = await response.json()
      setUpcomingEvents([...upcomingEvents, event])
      setEventFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "Leadership",
        registrationLink: "",
      })
      setShowEventForm(false)
    } catch (error) {
      console.error("Failed to add event:", error)
    }
  }

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      await fetch("/api/upcoming-events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      setUpcomingEvents(upcomingEvents.filter((e) => e.id !== id))
    } catch (error) {
      console.error("Failed to delete event:", error)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated")
    router.push("/admin")
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your articles, milestones, and events</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-4 py-3 font-semibold transition-colors ${
              activeTab === "articles"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Articles
          </button>
          <button
            onClick={() => setActiveTab("milestones")}
            className={`px-4 py-3 font-semibold transition-colors ${
              activeTab === "milestones"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Milestones
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-3 font-semibold transition-colors ${
              activeTab === "events"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Upcoming Events
          </button>
        </div>

        {/* ARTICLES TAB */}
        {activeTab === "articles" && (
          <>
            <div className="mb-8">
              <button
                onClick={() => setShowArticleForm(!showArticleForm)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                <Plus size={20} />
                Add New Article
              </button>
            </div>

            {showArticleForm && (
              <div className="bg-white rounded-lg border border-border p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Add New Article</h2>
                  <button
                    onClick={() => {
                      setShowArticleForm(false)
                      setPastedImage("")
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAddArticle} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Article Heading *</label>
                    <input
                      type="text"
                      value={articleFormData.title}
                      onChange={(e) => setArticleFormData({ ...articleFormData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter article heading"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Article Overview Statement *
                    </label>
                    <textarea
                      value={articleFormData.excerpt}
                      onChange={(e) => setArticleFormData({ ...articleFormData, excerpt: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-20"
                      placeholder="Enter a brief overview of the article"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Article Content *</label>
                    <textarea
                      value={articleFormData.content}
                      onChange={(e) => setArticleFormData({ ...articleFormData, content: e.target.value })}
                      onPaste={handleImagePaste}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-48"
                      placeholder="Enter the full article content (you can paste images here)"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Tip: You can paste images directly into this field
                    </p>
                  </div>

                  {pastedImage && (
                    <div className="border border-border rounded-lg p-4 bg-muted">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-foreground">Pasted Image Preview</p>
                        <button
                          type="button"
                          onClick={() => {
                            setPastedImage("")
                            setArticleFormData({ ...articleFormData, image: "" })
                          }}
                          className="text-xs text-destructive hover:text-destructive/80"
                        >
                          Remove
                        </button>
                      </div>
                      <img
                        src={pastedImage || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                      <select
                        value={articleFormData.category}
                        onChange={(e) => setArticleFormData({ ...articleFormData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option>Education</option>
                        <option>Leadership</option>
                        <option>Dialogue</option>
                        <option>Civic</option>
                        <option>Impact</option>
                        <option>Global</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Image URL (or use paste)</label>
                      <input
                        type="text"
                        value={articleFormData.image}
                        onChange={(e) => setArticleFormData({ ...articleFormData, image: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter image URL or paste image"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
                  >
                    Add Article
                  </button>
                </form>
              </div>
            )}

            {/* Articles List */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">Loading articles...</div>
              ) : articles.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No articles yet. Create your first article!</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted border-b border-border">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((article) => (
                        <tr key={article.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-foreground">{article.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{article.excerpt}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                              {article.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">
                            {new Date(article.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteArticle(article.id)}
                              className="text-destructive hover:text-destructive/80 transition-colors p-2"
                              title="Delete article"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* MILESTONES TAB */}
        {activeTab === "milestones" && (
          <>
            <div className="mb-8">
              <button
                onClick={() => setShowMilestoneForm(!showMilestoneForm)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                <Plus size={20} />
                Add New Milestone
              </button>
            </div>

            {showMilestoneForm && (
              <div className="bg-white rounded-lg border border-border p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Add New Milestone</h2>
                  <button
                    onClick={() => setShowMilestoneForm(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAddMilestone} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Year *</label>
                      <input
                        type="number"
                        value={milestoneFormData.year}
                        onChange={(e) =>
                          setMilestoneFormData({ ...milestoneFormData, year: Number.parseInt(e.target.value) })
                        }
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Milestone Title *</label>
                      <input
                        type="text"
                        value={milestoneFormData.milestone}
                        onChange={(e) => setMilestoneFormData({ ...milestoneFormData, milestone: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., Formation, Our First Event"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Event Description *</label>
                    <textarea
                      value={milestoneFormData.event}
                      onChange={(e) => setMilestoneFormData({ ...milestoneFormData, event: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
                      placeholder="Describe the event or milestone"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
                  >
                    Add Milestone
                  </button>
                </form>
              </div>
            )}

            {/* Milestones List */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">Loading milestones...</div>
              ) : milestones.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No milestones yet. Create your first milestone!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted border-b border-border">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Year</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Milestone</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Event</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {milestones.map((milestone) => (
                        <tr key={milestone.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold">
                              {milestone.year}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-medium text-foreground">{milestone.milestone}</td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-muted-foreground line-clamp-2">{milestone.event}</p>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteMilestone(milestone.id)}
                              className="text-destructive hover:text-destructive/80 transition-colors p-2"
                              title="Delete milestone"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* EVENTS TAB */}
        {activeTab === "events" && (
          <>
            <div className="mb-8">
              <button
                onClick={() => setShowEventForm(!showEventForm)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
              >
                <Plus size={20} />
                Add Upcoming Event
              </button>
            </div>

            {showEventForm && (
              <div className="bg-white rounded-lg border border-border p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Add Upcoming Event</h2>
                  <button
                    onClick={() => setShowEventForm(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAddEvent} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Event Title *</label>
                    <input
                      type="text"
                      value={eventFormData.title}
                      onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter event title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Event Description</label>
                    <textarea
                      value={eventFormData.description}
                      onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
                      placeholder="Describe the event"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Date *</label>
                      <input
                        type="date"
                        value={eventFormData.date}
                        onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Time *</label>
                      <input
                        type="time"
                        value={eventFormData.time}
                        onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
                    <input
                      type="text"
                      value={eventFormData.location}
                      onChange={(e) => setEventFormData({ ...eventFormData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter event location"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                      <select
                        value={eventFormData.category}
                        onChange={(e) => setEventFormData({ ...eventFormData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option>Leadership</option>
                        <option>Education</option>
                        <option>Dialogue</option>
                        <option>Civic</option>
                        <option>Global</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Registration Link</label>
                      <input
                        type="text"
                        value={eventFormData.registrationLink}
                        onChange={(e) => setEventFormData({ ...eventFormData, registrationLink: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
                  >
                    Add Event
                  </button>
                </form>
              </div>
            )}

            {/* Events List */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">Loading events...</div>
              ) : upcomingEvents.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No upcoming events yet. Create your first event!
                </div>
              ) : (
                <div className="space-y-4 p-6">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-foreground">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-destructive hover:text-destructive/80 transition-colors p-2"
                          title="Delete event"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-3">
                        <div>
                          <p className="text-muted-foreground font-medium">Date</p>
                          <p className="text-foreground">{new Date(event.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-medium">Time</p>
                          <p className="text-foreground">{event.time}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-medium">Location</p>
                          <p className="text-foreground">{event.location}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground font-medium">Category</p>
                          <p className="text-foreground">{event.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
