// Shared types for the application

export interface JobOpening {
  id: string
  title: string
  description: string
  location: string
  type: string // e.g., Full-time, Part-time, Contract, Internship
  salary: string | null
  postedAt: string
  updatedAt: string
}

export interface NewsArticle {
  id: string
  title: string
  content: string
  author: string
  imageUrl: string | null
  publishedAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "USER" | "ADMIN"
  createdAt: string
}

export interface Application {
  id: string
  jobOpeningId: string
  userId: string
  resumeUrl: string | null
  coverLetter: string | null
  status: string
  appliedAt: string
  updatedAt: string
  jobOpening: {
    title: string
    location: string
  }
  user: {
    name: string
    email: string
  }
}

export interface Message {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  read: boolean
  createdAt: string
  userId: string | null
  user: {
    name: string
    email: string
  } | null
}
