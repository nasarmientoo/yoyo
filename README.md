# YoYo - Hypermedia Events Platform

YoYo is a hypermedia web experience for discovering events, artists, and genres. It combines a Nuxt 3 front end with a Node/Express API and a SQL-backed data layer to deliver curated event listings, artist profiles, and category filtering.

## Overview

The YoYo site focuses on live music and cultural events. Users can browse all events, filter by genre, explore individual event pages, and view artist profiles. The interface is designed to feel visual and immersive while staying lightweight and fast.

## Features

- Event listing with category filters
- Dynamic event detail pages
- Artist profiles and artist detail pages
- Category descriptions and visual icons
- Contact form flow (API-backed)
- Shared layout components (navbar, footer, cards)

## Tech Stack

- Nuxt 3 (Vue 3 + server-side rendering)
- Node.js + Express API
- Sequelize migrations and seeders
- Supabase client integration

## Project Structure

- `pages/` - Nuxt pages (events, artists, contact, etc.)
- `components/` - Reusable UI components
- `server/` - API endpoints and database utilities
- `assets/` - Global styles and images
- `public/` - Static assets (icons, images)

## Prerequisites

- Node.js (LTS recommended)
- npm

## Setup

Install dependencies:

```bash
npm install
```

Run the API server (Express, port 8080):

```bash
npm run watch
```

Reset database migrations (optional):

```bash
npx sequelize-cli db:migrate:undo:all
```

Run migrations:

```bash
npx sequelize-cli db:migrate
```

Seed the database:

```bash
npx sequelize-cli db:seed:all
```

Start the Nuxt development server (port 3000):

```bash
npm run dev
```

## Notes

- If your environment requires API keys (for example, Supabase), ensure they are available in your runtime environment before starting the servers.
- The API routes live under `server/api/` and are consumed by the Nuxt pages.

## License

This project is provided for educational and demo purposes.

