# Holy Cross School Website - Build Version

This is the production-ready build version of the Holy Cross School website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Build the project:
```bash
npm run build
```

4. Preview the build:
```bash
npm run preview
```

## Key Changes for Production Build

- Removed development-only code and dependencies
- Optimized build configuration
- Added proper error boundaries
- Enabled code splitting and chunking
- Configured proper TypeScript checks
- Added production environment handling

## Deployment

The `dist` folder contains the production build. Deploy these files to your hosting service.

## Notes

- Make sure all assets are properly optimized
- Test the build thoroughly in a staging environment
- Check all environment variables are properly set
- Verify all API endpoints are pointing to production URLs