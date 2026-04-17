import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// ─── Types ───────────────────────────────────────────────────
export interface ContactPayload {
  name: string
  email: string
  subject?: string
  message: string
}

export interface Project {
  id: string
  title: string
  description: string
  description_fr?: string
  description_rw?: string
  image_url?: string
  live_url?: string
  github_url?: string
  tags: string[]
  featured: boolean
  order: number
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  title_fr?: string
  title_rw?: string
  excerpt: string
  excerpt_fr?: string
  excerpt_rw?: string
  cover_image?: string
  tags: string[]
  published: boolean
  slug: string
  created_at: string
}

export interface VisitCount {
  total_visits: number
}

// ─── Contact ─────────────────────────────────────────────────
export const sendContact = async (payload: ContactPayload) => {
  const { data } = await api.post('/api/contact/', payload)
  return data as { success: boolean; message: string }
}

// ─── Visits ──────────────────────────────────────────────────
export const recordVisit = async () => {
  const { data } = await api.post('/api/visits/')
  return data as VisitCount
}

export const getVisits = async () => {
  const { data } = await api.get('/api/visits/')
  return data as VisitCount
}

// ─── Projects ────────────────────────────────────────────────
export const getProjects = async (featured = false) => {
  const { data } = await api.get('/api/projects/', { params: { featured } })
  return data as Project[]
}

// ─── Blog ────────────────────────────────────────────────────
export const getBlogPosts = async () => {
  const { data } = await api.get('/api/blog/')
  return data as BlogPost[]
}
