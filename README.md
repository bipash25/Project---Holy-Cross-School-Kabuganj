# Holy Cross School Kabuganj Website

A modern, responsive website for Holy Cross School Kabuganj built with React, Vite, TypeScript, and Tailwind CSS.

## Overview

This project is a comprehensive school website that serves as both an informational platform for the public and an administrative tool for school staff. It features a modern design, responsive layout, and a robust admin dashboard.

## Features

### Public Features

1. **Homepage**
   - Dynamic hero carousel
   - Quick access section for important links
   - Latest news and events section
   - Responsive navigation

2. **About Section**
   - School history
   - Mission and vision
   - Principal's message
   - Core values
   - School statistics

3. **Academics**
   - Admission procedures
   - Examination system
   - Student conduct guidelines
   - Parent guidelines

4. **School Information**
   - Fee structure
   - Curriculum details
   - Uniform guidelines
   - School timing

5. **Facilities**
   - Library
   - Computer lab
   - Science lab

6. **News & Events**
   - Latest school news
   - Upcoming events
   - News archive

### Admin Features

1. **Dashboard**
   - Overview statistics
   - Quick actions
   - Real-time updates

2. **Content Management**
   - News and events management
   - Media gallery
   - Student records
   - Academic statistics
   - Calendar events
   - School settings

## Technical Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/UI Components
- Lucide Icons

### Backend & Database
- Supabase
- PostgreSQL

### Key Libraries
- React Router DOM
- React Hook Form
- Zod
- Date-fns
- Tailwind Merge
- Class Variance Authority

## Project Structure

```
src/
├── assets/         # Static assets (images, etc.)
├── components/     # React components
│   ├── admin/      # Admin dashboard components
│   ├── layout/     # Layout components
│   ├── ui/         # Reusable UI components
│   └── ...         # Feature-specific components
├── lib/           # Utility functions and API
├── hooks/         # Custom React hooks
└── types/         # TypeScript type definitions
```

## Database Schema

### Key Tables
1. `news_events` - News and event entries
2. `calendar_events` - School calendar events
3. `school_stats` - School statistics
4. `media` - Media gallery items
5. `settings` - Website settings
6. `students` - Student records
7. `achievements` - School achievements

## Setup & Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with required environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start development server:
```bash
npm run dev
```

## Build & Deployment

1. Create production build:
```bash
npm run build
```

2. Preview production build:
```bash
npm run preview
```

## Key Features Implementation

### Authentication
- Simple admin authentication system
- Protected routes for admin section
- Session management

### Responsive Design
- Mobile-first approach
- Breakpoints for all screen sizes
- Optimized images and assets

### Performance Optimization
- Code splitting
- Lazy loading of images
- Optimized build configuration
- PWA support

### SEO
- Meta tags management
- Semantic HTML
- Sitemap generation

## Contact

For any queries regarding the project, please contact:
- Email: [contact@hcsk.edu.in](mailto:contact@hcsk.edu.in)
- Phone: +91 6000632897
