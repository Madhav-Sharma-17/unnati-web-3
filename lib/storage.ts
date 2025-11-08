export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  date: string
}

export interface Milestone {
  id: string
  year: number
  event: string
  milestone: string
}

export interface UpcomingEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  registrationLink?: string
}

function getLocalStorage(key: string, defaultValue: any) {
  if (typeof window === "undefined") {
    return defaultValue
  }
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

function setLocalStorage(key: string, value: any) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    console.error("Failed to save to localStorage")
  }
}

let articles: Article[] = getLocalStorage("articles", [
  {
    id: "1",
    title: "Youth Empowerment Initiative",
    excerpt: "Discover how we are empowering the next generation of leaders",
    content:
      "Our youth empowerment initiative focuses on providing skills, knowledge, and opportunities to young individuals...",
    category: "Leadership",
    image: "/youth-empowerment.jpg",
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Parliamentary Excellence Program",
    excerpt: "A comprehensive program designed to enhance parliamentary understanding",
    content:
      "The parliamentary excellence program brings together young minds to understand the nuances of democratic governance...",
    category: "Dialogue",
    image: "/parliament-building.png",
    date: "2024-01-10",
  },
])

let milestones: Milestone[] = getLocalStorage("milestones", [
  { id: "1", year: 2016, event: "Unnati Was Formed In 2016", milestone: "Formation" },
  { id: "2", year: 2018, event: "Uthan Youth Parliament Edition 1", milestone: "Our First Event" },
  { id: "3", year: 2018, event: "First Parliamentary Visit", milestone: "Visits" },
  { id: "4", year: 2020, event: "Mahapanchayat MUN Edition 1", milestone: "MUN" },
])

let upcomingEvents: UpcomingEvent[] = getLocalStorage("upcomingEvents", [
  {
    id: "1",
    title: "Leadership Summit 2025",
    description: "Join us for an inspiring leadership summit featuring industry experts and thought leaders",
    date: "2025-03-15",
    time: "09:00 AM",
    location: "New Delhi Convention Center",
    category: "Leadership",
    registrationLink: "#",
  },
])

// Articles functions
export function getArticles(): Article[] {
  return articles
}

export function addArticle(article: Omit<Article, "id" | "date">): Article {
  const newArticle: Article = {
    ...article,
    id: Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString().split("T")[0],
  }
  articles.push(newArticle)
  setLocalStorage("articles", articles)
  return newArticle
}

export function deleteArticle(id: string): boolean {
  articles = articles.filter((a) => a.id !== id)
  setLocalStorage("articles", articles)
  return true
}

// Milestones functions
export function getMilestones(): Milestone[] {
  return milestones.sort((a, b) => a.year - b.year)
}

export function addMilestone(milestone: Omit<Milestone, "id">): Milestone {
  const newMilestone: Milestone = {
    ...milestone,
    id: Math.random().toString(36).substr(2, 9),
  }
  milestones.push(newMilestone)
  setLocalStorage("milestones", milestones)
  return newMilestone
}

export function deleteMilestone(id: string): boolean {
  milestones = milestones.filter((m) => m.id !== id)
  setLocalStorage("milestones", milestones)
  return true
}

// Upcoming Events functions
export function getUpcomingEvents(): UpcomingEvent[] {
  return upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function addUpcomingEvent(event: Omit<UpcomingEvent, "id">): UpcomingEvent {
  const newEvent: UpcomingEvent = {
    ...event,
    id: Math.random().toString(36).substr(2, 9),
  }
  upcomingEvents.push(newEvent)
  setLocalStorage("upcomingEvents", upcomingEvents)
  return newEvent
}

export function deleteUpcomingEvent(id: string): boolean {
  upcomingEvents = upcomingEvents.filter((e) => e.id !== id)
  setLocalStorage("upcomingEvents", upcomingEvents)
  return true
}
