# How Popular Is?

A web application that aggregates data from multiple public sources to estimate the popularity of a person, brand, or topic.

## Live Demo

🔗 https://your-domain.com

## Product Preview

**Login**

<img width="1174" height="884" alt="localhost_3000_" src="https://github.com/user-attachments/assets/49290824-5b0c-4e4f-bf38-a78c2b9d5e9c" />

**Dashboard**

<img width="1155" height="1208" alt="localhost_3000_dashboard (1)" src="https://github.com/user-attachments/assets/ade1cd09-fe6a-402d-a94f-25fc77e1d39f" />

## Features

- Google sign-in (Supabase Auth)
- Protected routes via middleware — the dashboard never renders without a valid session, not even for a fraction of a second
- Aggregates popularity data from Wikipedia, Google Trends, YouTube, and GNews
- Result caching to reduce redundant calls to external APIs
- Per-user search history
- Graceful error handling when all external sources fail
- Responsive UI

## Tech Stack

- Next.js
- React
- TypeScript
- Supabase
- Tailwind CSS
- SQL (for database in Supabase)

## How Popularity Metrics Are Calculated

The dashboard provides a popularity score based on the average of the following sources:

- **Wikipedia**: article views and content relevance
- **Google Trends**: search interest over time
- **YouTube**: video-related popularity indicators
- **News Sources**: volume and relevance of recent news coverage

Each metric is displayed separately so users can compare different indicators rather than relying on a single score.

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
```

Create a `.env.local` file in the project root with your own keys:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
YOUTUBE_API_KEY=
NEWS_API_KEY=
```

*(adjust the variable names to match whatever you named them for the YouTube/News/Google Trends integrations in your own code)*

### Supabase setup

- Enable the **Google** provider under Authentication → Providers
- Add `http://localhost:3000/auth/callback` as an authorized Redirect URL
- Create a `search_history` table with `id`, `user_id`, `query`, and a timestamp column
- Create a `api_cache` table with `id`, `query`, `source`, `data` and a timestamp column

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** this project runs on Supabase's free tier, which pauses the database after 7 days of inactivity. If the live demo seems unresponsive, that may be why — running it locally with your own Supabase project is a reliable fallback.

## Purpose

This project explores building a production-style feature end to end: aggregating
and normalizing data from four independent external APIs (each with its own
failure modes and rate limits), caching results to stay within free-tier API
quotas, and protecting authenticated routes at the edge via middleware so
protected pages never render without a valid session — even for a fraction
of a second.
