const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ??
  'https://ggaigevrxdccleliaiae.supabase.co'

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnYWlnZXZyeGRjY2xlbGlhaWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNTUyMTgsImV4cCI6MjA5MTgzMTIxOH0.-j_W3miQOWyc4NUqcyENdUGYxdYrmR7-Cp7ZORIioUs'

const REST_URL = `${SUPABASE_URL}/rest/v1`
const RPC_URL = `${SUPABASE_URL}/rest/v1/rpc`

const defaultHeaders: HeadersInit = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...defaultHeaders,
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed with ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

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

export const sendContact = async (payload: ContactPayload) => {
  await request(
    `${REST_URL}/contact_messages`,
    {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        subject: payload.subject ?? null,
        message: payload.message,
      }),
    },
  )

  return {
    success: true,
    message: "Your message has been received! I'll get back to you soon.",
  }
}

export const recordVisit = async () => {
  try {
    const data = await request<number | null>(`${RPC_URL}/increment_visits`, {
      method: 'POST',
      body: JSON.stringify({}),
    })

    return { total_visits: typeof data === 'number' ? data : 0 } as VisitCount
  } catch {
    return getVisits()
  }
}

export const getVisits = async () => {
  const data = await request<Array<{ count: number }>>(
    `${REST_URL}/visit_counter?select=count&id=eq.1&limit=1`,
  )

  return {
    total_visits: data[0]?.count ?? 0,
  } as VisitCount
}

export const getProjects = async (featured = false) => {
  const featuredFilter = featured ? '&featured=eq.true' : ''
  const data = await request<Project[]>(
    `${REST_URL}/projects?select=*&order=order.asc${featuredFilter}`,
  )

  return data
}

export const getBlogPosts = async () => {
  const data = await request<BlogPost[]>(
    `${REST_URL}/blog_posts?select=*&published=eq.true&order=created_at.desc`,
  )

  return data
}
