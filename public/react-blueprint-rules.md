# ReactBlueprint — AI Rules for React + TypeScript Projects

> Drop this file into your project as `CLAUDE.md`, `.cursorrules`, or paste into your AI assistant's custom instructions.
> Source: https://react-blueprint.dev

---

## Tech Stack

- Use React 18, TypeScript 5, Vite 5, Tailwind CSS 3.
- Use TanStack Query for server state, Zustand for client state.
- Use React Hook Form + Zod for forms.
- Use shadcn/ui for UI components, lucide-react for icons.
- Use React Router for routing.
- Use clsx + tailwind-merge (as a `cn()` utility) for conditional classes.
- Use date-fns for dates, Sonner for toasts.
- Use Vitest + Testing Library for unit tests, Playwright for E2E.
- Use pnpm as the package manager.

---

## Project Structure

```
src/
├── app/              # Providers, router, App.tsx
├── components/       # ui/, layout/, common/
├── features/         # Feature modules (own components/, hooks/, services/, stores/, types/)
├── hooks/            # Shared custom hooks
├── lib/              # Third-party configs
├── services/         # API clients, integrations
├── stores/           # Global Zustand stores
├── types/            # Shared TypeScript types
├── utils/            # Pure utility functions
├── constants/        # App constants, routes, query keys
└── assets/           # Images, icons, fonts
```

- Organize by feature, not by file type.
- Each feature folder has its own components/, hooks/, services/, stores/, types/.
- Export through index.ts to control the public API of each feature.
- Colocate tests next to the files they test.
- Limit directory nesting to 4 levels maximum.
- Use `@/*` path aliases for imports.
- No circular dependencies — use tools like madge to detect them.

---

## Naming Conventions

### Files

- Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useUserData.ts`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `camelCase.types.ts` (e.g., `user.types.ts`)
- Stores: `camelCase` + `Store.ts` (e.g., `authStore.ts`)
- Tests: `.test.tsx` / `.test.ts` suffix (e.g., `Button.test.tsx`)
- Directories: `kebab-case` (e.g., `user-profile/`)

### Code

- Components: PascalCase.
- Props interfaces: PascalCase + `Props` suffix (e.g., `UserCardProps`).
- Hooks: camelCase with `use` prefix.
- Event handlers: `handle` prefix (e.g., `handleSubmit`, `handleClick`).
- Booleans: `is`/`has`/`should` prefix (e.g., `isLoading`, `hasError`).
- Constants: SCREAMING_SNAKE_CASE (e.g., `MAX_RETRIES`).
- Enums: PascalCase name, UPPERCASE values.

### Git

- Branch format: `<type>/<description>` or `<type>/<ticket-id>-<description>`.
- Branch types: `feature/`, `bugfix/`, `hotfix/`, `refactor/`, `docs/`, `test/`, `chore/`.
- Always lowercase, use hyphens. Max 50 chars for description.
- Commit format (Conventional Commits): `<type>(<scope>): <subject>`.
- Commit types: feat, fix, docs, style, refactor, perf, test, build, ci, chore.
- Imperative mood: "add feature" not "added feature". Max 72 chars. No period at end.

---

## Components

- One component per file. Single responsibility.
- Max 150 lines per component file. Max 50 lines of JSX in render.
- Prefer composition over configuration — use children and render props over mega-prop components.
- Extract complex logic into custom hooks.
- Forward refs when wrapping native elements.
- Use `React.memo` only for expensive renders with stable props.
- Never use prop drilling past 2 levels — use Context or Zustand.
- Never use inline function definitions in JSX loops.

### Component File Order

1. Types / interfaces
2. Constants
3. Component function
4. Hooks (useState → useReducer → useContext → custom hooks → useMemo → useCallback → useEffect)
5. Event handlers
6. Early returns (loading, error, empty states)
7. Main render
8. displayName (if needed)

---

## Forms

- Always use React Hook Form + Zod for form validation.
- Define Zod schemas separately, infer TypeScript types with `z.infer<typeof schema>`.
- Set default values on all fields to prevent undefined.
- Use `mode: 'onBlur'` for better UX (validate on blur, not on every keystroke).
- Reset the form after successful submission.
- Map API errors to form fields with `setError`.
- Show loading state on the submit button during submission.
- Use `.coerce` in Zod for form inputs (HTML forms return strings).
- Reuse common schemas (email, password) across forms.
- Transform data (trim, toLowerCase) inside Zod schemas.
- For file uploads: validate on client and server, limit to 5MB, check MIME types, show progress, clean up preview object URLs.

---

## State Management

### Decision Tree

- Single component UI state → `useState`
- Complex local state with transitions → `useReducer`
- Shared parent-child state → props
- Server/async data → TanStack Query
- Global UI state (theme, sidebar) → Zustand
- Feature flags → React Context

### Zustand Rules

- One store per domain (authStore, uiStore).
- Always use selectors — never subscribe to the whole store.
- Keep store shape flat, avoid deep nesting.
- Use Immer middleware for complex nested updates.
- Persist only the data that must survive page reloads.
- Export selector hooks (e.g., `useAuthUser`, `useIsAuthenticated`).

### TanStack Query Rules

- Centralize query keys in `constants/queryKeys.ts`.
- Create a custom hook for every query and mutation.
- Use optimistic updates for interactive UX.
- Set appropriate `staleTime` and `gcTime` per resource.
- Do not retry on 4xx errors.
- Always handle loading, error, and empty states in components.
- Never store server data in Zustand — that's TanStack Query's job.

---

## Data Fetching & API

- Create typed service objects per domain (e.g., `userService`, `productService`).
- Add auth tokens via request interceptors.
- Handle 401 errors with response interceptors (redirect to login or refresh token).
- Use a custom `AppError` class with `code`, `statusCode`, and `details`.
- Centralize API endpoints in constants.
- Type all API responses.
- Map error codes to user-friendly messages in a centralized messages map.

---

## Authentication

- Use Context or Zustand to hold auth state (user, token, isAuthenticated).
- Clear all auth state on logout.
- Check auth status on app mount.
- Token storage preference: httpOnly cookies (best) > memory + refresh token > localStorage (avoid for sensitive apps).
- Wrap protected routes in a `ProtectedRoute` component or layout.
- Show a loading spinner during auth verification.
- Preserve the return URL so users redirect back after login.
- Never store passwords client-side. Always use HTTPS in production.
- Validate everything server-side — never trust the client.
- Refresh tokens before they expire.
- Short access token expiry (15 minutes), long refresh token (7–30 days).
- Rotate refresh tokens on every use — issue a new one each time.
- Add CSRF token protection when using cookie/session-based auth.
- For OAuth: use established libraries (NextAuth.js / Auth.js, Auth0, Firebase Auth).
- Request minimal OAuth scopes — only ask for what you need.
- Allow users to link multiple OAuth providers to one account.

---

## Styling (Tailwind CSS)

- No inline styles. Use Tailwind utility classes only.
- Mobile-first responsive design (`sm:`, `md:`, `lg:` breakpoints).
- Class order: Layout → Sizing → Spacing → Typography → Colors → Effects → States.
- Use CSS variables for theming (light/dark mode).
- Define design tokens (colors, spacing, radius) as CSS variables in `:root` and `.dark`.
- Use HSL format for CSS color variables: `--primary: 24 95% 53%` with `hsl(var(--primary))` in Tailwind config.
- Consistent spacing scale: 4, 8, 12, 16, 24, 32, 48, 64.
- Use `cva` (class-variance-authority) for component variants.
- Always use the `cn()` utility for conditional classes:

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

---

## TypeScript

### Strict Config

Enable these in `tsconfig.json`:
- `strict: true`
- `noUncheckedIndexedAccess: true`
- `noImplicitReturns: true`
- `noUnusedLocals: true`
- `exactOptionalPropertyTypes: true`

### Rules

- Never use `any`. Use `unknown` with type guards instead.
- Avoid type assertions (`as`). Prefer type guards and narrowing.
- Add explicit return types on all exported functions.
- Use `interface` for extendable object shapes. Use `type` for unions and primitives.
- Infer types from Zod schemas with `z.infer<typeof schema>`.
- Use `satisfies` for type checking without widening.

---

## Testing

### Coverage Targets

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

### What to Test (Priority Order)

1. User interactions (clicks, form submissions)
2. Rendered output (correct elements appear)
3. Form validation (error messages, submission)
4. Error states (API failures, boundaries)
5. Loading states (spinners, skeletons)

### Rules

- Test behavior, not implementation details.
- Use semantic queries: `getByRole` > `getByLabelText` > `getByText` > `getByTestId`.
- One assertion per test — keep tests focused.
- Mock at boundaries (external APIs) — never mock internal modules.
- Use MSW (Mock Service Worker) for API mocking.
- Name tests with the pattern: "should [expected behavior] when [condition]".

---

## Error Handling

### Error Boundaries

- Wrap each route and major feature section in an error boundary.
- Provide a meaningful fallback UI (not a blank screen).
- Report caught errors to a monitoring service (Sentry).
- Error boundaries do NOT catch: event handlers, async code, server-side rendering errors.

### API Error Handling

- Use a custom `AppError` class with `code`, `statusCode`, and `details`.
- Centralize error messages in a map keyed by error code.
- Use a `useApiError` hook for consistent error handling in components.
- Map server validation errors to the correct form fields.
- Always show user-friendly messages, never raw error objects.
- Handle network errors (offline state) separately.

---

## Performance

### Optimization Rules

- Use `React.memo` for components that re-render often with the same props.
- Use `useMemo` for expensive computations.
- Use `useCallback` for event handlers passed to memoized children.
- Virtualize lists with 100+ items (use TanStack Virtual).
- Debounce search/filter inputs with `useDeferredValue` or a `useDebounce` hook.
- Lazy load images with `loading="lazy"`.

### Code Splitting

- Route-based splitting with `React.lazy` + `Suspense`.
- Lazy-load heavy components (charts, editors, maps).
- Preload components on hover for perceived performance.
- Use specific loading UI per `Suspense` boundary.

### Performance Targets

- Main bundle: < 200KB gzipped
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Largest Contentful Paint: < 2.5s

---

## Linting & Formatting

### ESLint

- `@typescript-eslint/no-explicit-any`: error
- `@typescript-eslint/consistent-type-imports`: error
- `react-hooks/exhaustive-deps`: warn
- `import/order`: error (with alphabetical sorting)

### Prettier

- `semi: true`
- `singleQuote: true`
- `trailingComma: 'es5'`
- `printWidth: 100`
- Use `prettier-plugin-tailwindcss` for automatic class sorting.

---

## Environment Variables

- Client-side variables: prefix with `VITE_` (Vite) or `NEXT_PUBLIC_` (Next.js).
- Server-only variables: no prefix — never expose to the client.
- Never commit secrets. Add `.env.local` to `.gitignore`.
- Always validate env vars with Zod at app startup:

```typescript
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  VITE_API_URL: z.string().url(),
});
export const env = envSchema.parse(import.meta.env);
```

- Maintain a `.env.example` with placeholder values for documentation.
- Centralize env access in a config file (`lib/config.ts`) — don't scatter `process.env` calls.
- Use `import 'server-only'` in server config files to prevent accidental client imports.

---

## CI/CD

- Run lint, typecheck, test, and build as parallel CI jobs.
- Use pnpm with caching for fast installs.
- Set concurrency groups to cancel redundant workflow runs.
- Upload coverage reports to Codecov.
- Deploy only after all checks pass.
- Use Vercel for Next.js deployments (recommended).
- Enable preview deployments for every PR.
- Set environment-specific variables per deployment target.
- Have a rollback plan and health checks after deployment.
- Configure Dependabot for weekly dependency updates with grouped PRs.
- Add CodeQL security scanning workflow (schedule weekly).
- Run Lighthouse CI on PRs (target 0.9 minimum scores for performance, accessibility, best practices, SEO).
- Set branch protection on `main`: require PR reviews, require status checks (lint, typecheck, test, build), require conversation resolution.

---

## Internationalization (i18n)

- Use next-intl (Next.js) or react-i18next (Vite).
- Use semantic translation keys: `auth.login.submit` not `button1`.
- Keep translations max 2–3 levels deep.
- Account for text expansion (~30% longer in German).
- Use path-based locale URLs: `/en/about`, `/es/about`.
- Type-safe translations with generated types.
- Test all supported languages.

---

## Monitoring & Logging

### Error Tracking (Sentry)

- Initialize on both client and server.
- Upload source maps for readable stack traces.
- Set user context after login.
- Add breadcrumbs for user journey tracking.
- Filter out browser extension errors.
- Sample transactions in production (not 100%).

### Logging

- Use structured logging (Pino).
- Include context: requestId, userId, action.
- Use appropriate log levels (debug, info, warn, error).
- Redact sensitive data (passwords, tokens, PII).
- Aggregate logs in production (Datadog, CloudWatch).

---

## Security

### Do

- Sanitize all user input with DOMPurify before rendering.
- Use HTTPS only in production.
- Scope environment variables properly (client vs. server).
- Configure Content Security Policy (CSP) headers.
- Enable CSRF protection for session-based auth.
- Run `pnpm audit` regularly.
- Keep dependencies updated.
- Store auth tokens in httpOnly cookies.

### Do NOT

- Store tokens in localStorage for sensitive apps.
- Use `dangerouslySetInnerHTML` with unsanitized input.
- Expose server-only env vars to client bundles.
- Trust client-side validation alone — always validate server-side.
- Log sensitive data (passwords, tokens, PII).

---

## Accessibility (WCAG 2.1 AA)

- Use semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<button>`, `<a>`.
- Add ARIA labels to icon-only buttons and interactive elements.
- Support full keyboard navigation (Tab, Enter, Escape, Arrow keys).
- Manage focus: trap focus in modals, return focus on close.
- Color contrast ratio: 4.5:1 for normal text, 3:1 for large text.
- Add skip links for keyboard users.
- All images must have descriptive `alt` text (empty `alt=""` for decorative).
- All form fields must have visible `<label>` elements.
- Touch targets: minimum 44×44px.
- Test with screen readers, keyboard-only navigation, and 200% zoom.
- Run automated checks with axe-core.

---

## Mobile (Capacitor)

### Setup

- Set `webDir: 'dist'` in `capacitor.config.ts`.
- Set `androidScheme: 'https'` for Android secure connections.
- iOS: set `contentInset: 'automatic'` and `preferredContentMode: 'mobile'`.
- Remove `server.url` from config before production (live reload is dev-only).

### Native Plugins

- Always check plugin availability: `Capacitor.isPluginAvailable('PluginName')`.
- Always check platform at runtime: `Capacitor.isNativePlatform()` or `Capacitor.getPlatform()`.
- Provide graceful web fallbacks when plugins are unavailable.
- Clean up all plugin listeners on component unmount (call `.remove()`).
- Catch errors — users may cancel permission requests.
- Document required iOS permissions in Info.plist (NSCameraUsageDescription, etc.).

### App Store Deployment

- iOS: 1024x1024 PNG app icon required. Provide screenshots for all required device sizes.
- Android: generate a keystore once and keep it safe — losing it means you can never update the app.
- Android: add `android/keystore.properties` to `.gitignore`.
- Android: use AAB (Android App Bundle), not APK, for Play Store.
- Android: increment `versionCode` with every release.
- Android: target SDK 34 or higher.
- Both: include privacy policy URL, complete metadata, and test before submission.

---

## SEO

### Meta Tags

- Unique `<title>` per page, under 60 characters, primary keyword first.
- Unique `<meta name="description">` per page, 150–160 characters.
- Set canonical URLs to prevent duplicate content.
- Use dynamic meta tags per route.
- Add hreflang tags for multilingual sites.
- Generate sitemap.xml with next-sitemap.
- Configure robots.txt.

### Favicon

- Must exist at `/favicon.ico` (root) — Google requires this specific file.
- Minimum 48x48 pixels (multiples of 48 recommended).
- Provide multiple formats: .ico (required), .svg (modern), .png (fallback).
- Include apple-touch-icon.png (180x180) and android-chrome icons (192x192, 512x512).
- Must not be blocked by robots.txt.

### Open Graph & Social

- OG image: 1200x630 pixels (1.91:1 ratio), PNG or JPEG, max 8MB.
- Twitter card: use `summary_large_image` (1200x628).
- Always use absolute URLs for og:image.
- og:url must match the canonical URL.
- Create unique OG images per page when possible.
- Test with Facebook Debugger and Twitter Card Validator before launch.

### Structured Data

- Use JSON-LD format in `<script type="application/ld+json">`.
- Common schemas: WebSite, Organization, BreadcrumbList, Article, FAQPage, Product.
- Only mark up visible content — never hidden content.
- Test with Google Rich Results Test before deploying.

### Core Web Vitals

- LCP (Largest Contentful Paint): target ≤ 2.5s. Preload LCP images, use `priority` on hero images, prefer static generation over SSR.
- INP (Interaction to Next Paint): target ≤ 200ms. Break long tasks, debounce input handlers, use Web Workers for heavy computation.
- CLS (Cumulative Layout Shift): target ≤ 0.1. Set explicit width/height on images, use aspect-ratio CSS, reserve space for dynamic content, use `font-display: swap`.

---

## Documentation

- JSDoc comments on all public APIs and exported functions.
- Include usage examples in comments.
- Document component props with descriptions.
- Explain "why", not "what" — the code shows what, comments explain intent.
- Add a README per feature folder: overview, dependencies, usage, API, file structure.

---

*Generated from [ReactBlueprint](https://react-blueprint.dev) — the complete React + TypeScript best practices guide.*
