# YOKM Production Website: Documentation & Architecture

## Overview
A production-ready website for Yendel Ocha Kpeling Ministry (YOKM).
- **Core Identity**: "Awake Oh Ye Widows"
- **Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, Supabase (Auth/DB/Storage), Paystack (Payments), Resend (Email).

## Directory Structure
```text
/
├── app/                  # App Router
│   ├── (admin)/         # Protected admin dashboard
│   ├── (public)/        # Public pages (Home, About, etc.)
│   ├── api/             # API routes (Paystack, Contact, News)
│   └── layout.tsx
├── components/           # Shared UI (Shadcn)
│   ├── ui/
│   ├── sections/
│   └── shared/
├── lib/                  # Utilities (Supabase client, Paystack)
├── prisma/               # Database Schema
├── public/               # Static assets (logo.png)
├── types/                # TS Interfaces
├── .env.example
├── middleware.ts         # Auth guards
└── README.md
```

## Database Schema (Supabase/Prisma)
- **Donations**: `id, amount, currency, email, status (pending/success), reference, date`
- **BlogPosts**: `id, title, content, image_url, category, author, status, published_at`
- **Gallery**: `id, image_url, caption, category, created_at`
- **Subscribers**: `id, email, active, created_at`

## Implementation Checklist
- [x] Design System established ({{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_3}})
- [x] Core Screens (Home, About, Donate, Admin)
- [x] Shared Components (Header, Footer, Sidebar)
- [ ] Backend logic and API integrations (Paystack/Supabase)

## Deployment Guide
1. **Supabase**: Create project, run SQL schema from `lib/schema.sql`, enable Storage bucket `yokm-assets`.
2. **Paystack**: Get API keys from dashboard, set `PAYSTACK_SECRET_KEY`.
3. **Resend**: Configure domain, set `RESEND_API_KEY`.
4. **Vercel**: Link repository, add environment variables, deploy.
