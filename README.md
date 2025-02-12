# Holy Cross School Kabuganj Website

A modern, responsive website for Holy Cross School Kabuganj built with React, Vite, TypeScript, and Tailwind CSS.

## Overview

This project is a comprehensive school website that serves as both an informational platform for the public and an administrative tool for school staff. It features a modern design, responsive layout, and a robust admin dashboard.

## Features

### Public Features

1. **Homepage**
   - Dynamic hero carousel featuring campus and school activities
   - Quick access section for important links (Admissions, Fees, Curriculum, Contact)
   - School building showcase section
   - Recent events grid with images
   - Latest news section

2. **About Section**
   - Hero section with school overview
   - Quick statistics (Years of Excellence, Student Count, Awards, Success Rate)
   - Principal's message with photo
   - Staff section with photo gallery

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

### Admin Features

1. **Dashboard**
   - Overview statistics
   - Quick actions menu
   - Recent activities

2. **Content Management**
   - News and events management
   - Media gallery with image optimization
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
- Zod for validation
- Date-fns

## Project Structure

```
src/
├── assets/
│   └── images/         # Optimized images
│       ├── slider/     # Carousel images
│       ├── events/     # Event images
│       └── staff/      # Staff and faculty images
├── components/
│   ├── admin/         # Admin dashboard components
│   ├── home/          # Homepage sections
│   ├── about/         # About page components
│   ├── layout/        # Layout components
│   └── ui/            # Reusable UI components
├── lib/              # Utility functions
├── hooks/            # Custom React hooks
└── types/            # TypeScript definitions
```

## Image Organization

The project follows a structured approach to image management:

```
images/
├── slider1.webp        # Carousel images
├── slider2.webp
├── slider3.webp
├── campus.webp         # School building
├── about-hero.webp     # About page hero
├── principal.webp      # Principal's photo
├── staff-*.webp        # Staff related images
└── event-*.webp        # Event photos
```

## Setup & Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start development server:
```bash
npm run dev
```

## Build & Deployment

```bash
npm run build
```

## Performance Optimization

- WebP image format for optimal loading
- Responsive images with appropriate sizing
- Code splitting and lazy loading
- Asset optimization and compression
- PWA support

## Contact

For any queries regarding the project, please contact:
- Email: [hcskabuganj@gmail.com](mailto:hcskabuganj@gmail.com)
- Phone: +91 6000632897
