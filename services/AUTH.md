# Setup Guide

Complete guide to set up and customize the authentication system.

## 📦 Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Basic knowledge of Next.js, React, and TypeScript

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Install shadcn/ui Components

This project uses shadcn/ui components. Install the required components:

```bash
npx shadcn@latest init
```

When prompted, choose:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

Then install the required components:

```bash
# Core components
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add card
npx shadcn@latest add avatar
npx shadcn@latest add dropdown-menu
npx shadcn@latest add separator
npx shadcn@latest add switch
npx shadcn@latest add sidebar

# Optional: Install all at once
npx shadcn@latest add button input label card avatar dropdown-menu separator switch sidebar
```

### 3. Environment Setup

```bash
cp .env.example .env.local
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Authentication API

The default configuration uses DummyJSON API. To use your own API:

1. Update `src/config/constants.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: "https://your-api.com",
  ENDPOINTS: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },
};
```

2. Update type definitions in `src/types/auth.types.ts` if your API response differs.

3. Update Zod schemas in `src/schemas/auth.schema.ts` to match your API.

### Token Storage Strategy

**Current:** In-memory (Zustand) + Optional httpOnly cookies

**To enable httpOnly cookies:**

1. Uncomment the API route: `src/app/api/auth/route.ts`
2. Update `authService` to call your API routes instead of external API
3. Update middleware to read from cookies

```typescript
// In middleware.ts
const accessToken = request.cookies.get("accessToken")?.value;
```

### Protected Routes

Add routes to protection list in `src/config/constants.ts`:

```typescript
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.SETTINGS,
  "/your-new-route", // Add here
] as const;
```

## 🎨 Customization

### Styling

1. **Theme Colors** - Edit `src/app/globals.css`
2. **Tailwind Config** - Edit `tailwind.config.ts`
3. **Component Styles** - Use Tailwind classes or create custom CSS

### Adding New Features

#### 1. Add New Dashboard Page

```bash
# Create new page
mkdir -p src/app/dashboard/your-page
touch src/app/dashboard/your-page/page.tsx
```

```typescript
// src/app/dashboard/your-page/page.tsx
"use client";

export default function YourPage() {
  return <div>Your New Page</div>;
}
```

#### 2. Add to Sidebar Navigation

Edit `src/components/layout/app-sidebar.tsx`:

```typescript
const navItems = [
  // ... existing items
  {
    title: "Your Page",
    href: "/dashboard/your-page",
    icon: YourIcon,
  },
];
```

#### 3. Add New API Endpoint

Edit `src/services/auth.service.ts`:

```typescript
export const authService = {
  // ... existing methods
  
  async yourNewMethod(data: YourType): Promise<ResponseType> {
    const response = await fetchWithError<ResponseType>(
      `${API_CONFIG.BASE_URL}/your-endpoint`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    return response;
  },
};
```

#### 4. Add React Query Hook

Edit `src/hooks/useAuth.ts`:

```typescript
export function useYourFeature() {
  return useMutation({
    mutationFn: (data: YourType) => authService.yourNewMethod(data),
    onSuccess: (data) => {
      // Handle success
    },
  });
}
```

## 🔐 Security Best Practices

### 1. Environment Variables

Never commit `.env.local` to version control:

```bash
# Add to .gitignore
.env*.local
.env
```

### 2. API Keys

If you add API keys, use server-side API routes:

```typescript
// src/app/api/your-endpoint/route.ts
export async function POST() {
  const apiKey = process.env.SECRET_API_KEY;
  // Use apiKey server-side only
}
```

### 3. CSRF Protection

For production, implement CSRF tokens:

```typescript
// Add CSRF token to forms
<input type="hidden" name="_csrf" value={csrfToken} />
```

### 4. Rate Limiting

Add rate limiting to prevent abuse:

```typescript
// Use a library like 'express-rate-limit' or implement custom logic
```

## 🧪 Testing

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Build

```bash
npm run build
```

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Other Platforms

Build and start:

```bash
npm run build
npm start
```

## 🔄 Migration Guide

### From localStorage to httpOnly Cookies

1. Enable API routes (see above)
2. Update `authService` to use API routes
3. Remove localStorage usage
4. Update middleware to read cookies

### From JWT to Session-based Auth

1. Replace token storage with session IDs
2. Implement server-side session store (Redis, Database)
3. Update middleware to validate sessions
4. Update API calls to include session ID

## 📚 Additional Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Zod Docs](https://zod.dev/)

## 🐛 Troubleshooting

### Issue: Type errors after installation

**Solution:**
```bash
npm run type-check
# Fix any errors shown
```

### Issue: shadcn components not styled correctly

**Solution:**
```bash
# Reinstall Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Issue: Auth state not persisting

**Solution:** This is by design for security. Enable cookies if needed.

### Issue: Middleware redirect loop

**Solution:** Check that login page is in `PUBLIC_ROUTES` array.

## 💡 Tips

1. Use React Query DevTools in development
2. Enable Zustand DevTools for debugging
3. Use TypeScript strict mode for better type safety
4. Add error boundaries for all async operations
5. Implement proper loading states
6. Use Suspense for better UX
7. Add analytics and error tracking in production

## 🎯 Next Steps

After setup, consider adding:

- [ ] Email verification
- [ ] Password reset flow
- [ ] Two-factor authentication
- [ ] Social login (Google, GitHub)
- [ ] Role-based access control
- [ ] Audit logs
- [ ] Session management
- [ ] Account settings
- [ ] Profile editing
- [ ] Dark mode toggle

---

Need help? Open an issue or check the README.md