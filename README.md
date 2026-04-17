# 🚀 Uwamwezi Phionah — Portfolio

> A premium full-stack personal portfolio built with **React.js**, **FastAPI**, and **Supabase**.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start (Local Dev)](#quick-start-local-dev)
- [Supabase Setup](#supabase-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Deployment](#deployment)
- [Features](#features)
- [Environment Variables Reference](#environment-variables-reference)

---

## 🛠 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, TypeScript, Vite          |
| Styling   | Tailwind CSS, Framer Motion         |
| i18n      | react-i18next (EN / FR / RW)        |
| Backend   | FastAPI (Python 3.12)               |
| Database  | Supabase (PostgreSQL)               |
| Auth      | Supabase RLS + Service Role Key     |
| Email     | Resend (optional)                   |
| Deploy    | Vercel (frontend) + Railway (API)   |

---

## 📁 Project Structure

```
portfolio/
├── frontend/                  # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/        # Navbar, Footer
│   │   │   ├── sections/      # Hero, About, Skills, Projects...
│   │   │   └── ui/            # ScrollProgress, shared UI
│   │   ├── context/           # ThemeContext (dark/light)
│   │   ├── hooks/             # useScrollReveal
│   │   ├── services/          # api.ts (Axios API client)
│   │   ├── i18n.ts            # Translations: EN, FR, Kinyarwanda
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── vercel.json
│   └── package.json
│
├── backend/                   # FastAPI app
│   ├── core/
│   │   ├── config.py          # Settings (pydantic-settings)
│   │   └── supabase.py        # Supabase client singleton
│   ├── models/
│   │   └── schemas.py         # Pydantic request/response models
│   ├── routers/
│   │   ├── contact.py         # POST /api/contact/
│   │   ├── visits.py          # POST/GET /api/visits/
│   │   ├── projects.py        # GET /api/projects/
│   │   └── blog.py            # GET /api/blog/
│   ├── main.py                # App entry point + CORS
│   ├── requirements.txt
│   ├── Dockerfile
│   └── railway.toml
│
├── supabase_schema.sql        # ← Run this in Supabase SQL Editor
├── docker-compose.yml
└── README.md
```

---

## ⚡ Quick Start (Local Dev)

### Prerequisites
- Node.js 20+
- Python 3.12+
- A free [Supabase](https://supabase.com) account

---

## 🗄 Supabase Setup

### Step 1 — Create a project
1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **New Project** → fill in name, password, region
3. Wait for the project to be ready (~1 min)

### Step 2 — Run the schema
1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Paste the entire contents of `supabase_schema.sql`
4. Click **Run** (▶)

This creates:
- `visit_counter` — tracks total page visits
- `contact_messages` — stores form submissions
- `projects` — portfolio projects (pre-seeded with 2 projects)
- `blog_posts` — blog content
- All RLS policies and helper functions

### Step 3 — Get your API keys
1. Go to **Project Settings → API**
2. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon / public key** → `SUPABASE_KEY`
   - **service_role / secret key** → `SUPABASE_SERVICE_KEY`

---

## 🐍 Backend Setup

```bash
cd portfolio/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# → Edit .env and fill in your Supabase keys

# Start the server
uvicorn main:app --reload --port 8000
```

The API will be available at: **http://localhost:8000**

Interactive docs: **http://localhost:8000/docs**

### API Endpoints

| Method | Endpoint            | Description               |
|--------|---------------------|---------------------------|
| GET    | `/`                 | Health check              |
| GET    | `/health`           | Health check              |
| POST   | `/api/contact/`     | Submit contact form       |
| GET    | `/api/contact/`     | List messages (admin)     |
| POST   | `/api/visits/`      | Record + return count     |
| GET    | `/api/visits/`      | Get visit count           |
| GET    | `/api/projects/`    | List all projects         |
| GET    | `/api/projects/?featured=true` | Featured only  |
| GET    | `/api/blog/`        | List published posts      |
| GET    | `/api/blog/{slug}`  | Single post by slug       |

---

## ⚛️ Frontend Setup

```bash
cd portfolio/frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# → Set VITE_API_URL=http://localhost:8000

# Start dev server
npm run dev
```

The app will be available at: **http://localhost:3000**

### Build for production
```bash
npm run build
# Output is in: dist/
```

---

## 🌐 Deployment

### Frontend → Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   - `VITE_API_URL` = your Railway API URL (e.g. `https://portfolio-api.railway.app`)
5. Click **Deploy**

### Backend → Railway

1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub**
2. Select your repo, set **Root Directory** to `backend`
3. Railway will auto-detect the Dockerfile
4. Add environment variables in Railway dashboard:

```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
CONTACT_EMAIL=uwaphiona11@gmail.com
ALLOWED_ORIGINS=["https://your-vercel-app.vercel.app"]
```

5. Deploy → copy the generated URL → paste into Vercel's `VITE_API_URL`

### Alternative: Docker Compose (self-hosted)

```bash
# From the portfolio/ root
cp backend/.env.example .env
# → Edit .env with your Supabase keys

docker-compose up --build
```

---

## ✨ Features

| Feature                  | Status  | Details                                          |
|--------------------------|---------|--------------------------------------------------|
| 🌙 Dark / Light Mode     | ✅ Done  | Persistent via localStorage, smooth CSS vars     |
| 🌍 Multi-language        | ✅ Done  | English, French, Kinyarwanda via react-i18next   |
| 📊 Visit Counter         | ✅ Done  | Atomic increment via Supabase RPC                |
| ✉️ Contact Form          | ✅ Done  | Validation + Supabase insert + email via Resend  |
| 🔗 Social Links          | ✅ Done  | GitHub + LinkedIn with hover animations          |
| 🎬 Scroll Animations     | ✅ Done  | Framer Motion + IntersectionObserver             |
| 📱 Fully Responsive      | ✅ Done  | Mobile-first, Tailwind breakpoints               |
| 🖼 Gallery + Lightbox    | ✅ Done  | yet-another-react-lightbox                       |
| 📝 Blog Section          | ✅ Done  | Live from Supabase, "Coming Soon" fallback       |
| 🚀 Projects Section      | ✅ Done  | API-driven with static fallback                  |
| 🏆 Awards Timeline       | ✅ Done  | Translated into all 3 languages                  |
| 📈 Scroll Progress Bar   | ✅ Done  | Framer Motion spring physics                     |
| ✍ Type Animation         | ✅ Done  | react-type-animation in hero                     |

---

## 🔑 Environment Variables Reference

### Backend (`backend/.env`)

| Variable              | Required | Description                                |
|-----------------------|----------|--------------------------------------------|
| `SUPABASE_URL`        | ✅        | Your Supabase project URL                  |
| `SUPABASE_KEY`        | ✅        | Supabase anon/public key                   |
| `SUPABASE_SERVICE_KEY`| ✅        | Supabase service role key (bypasses RLS)   |
| `CONTACT_EMAIL`       | ✅        | Email to receive contact notifications     |
| `RESEND_API_KEY`      | ❌        | Optional — for email notifications         |
| `ALLOWED_ORIGINS`     | ✅        | JSON array of allowed CORS origins         |

### Frontend (`frontend/.env.local`)

| Variable       | Required | Description          |
|----------------|----------|----------------------|
| `VITE_API_URL` | ✅        | FastAPI backend URL  |

---

## 📬 Adding Blog Posts

Use the API directly (admin):

```bash
curl -X POST http://localhost:8000/api/blog/ \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "my-first-post",
    "title": "My First Blog Post",
    "title_fr": "Mon Premier Article",
    "title_rw": "Inyandiko Yanjye ya Mbere",
    "excerpt": "A short summary of the post...",
    "tags": ["learning", "web"],
    "published": true
  }'
```

Or insert directly in Supabase Table Editor.

---

## 👩‍💻 Author

**Uwamwezi Phionah**
- 📧 [uwaphiona11@gmail.com](mailto:uwaphiona11@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/uwamwezi-phionah-4139203aa/)
- 🐙 [GitHub](https://github.com/rubera118)
- 📍 Kigali, Rwanda
