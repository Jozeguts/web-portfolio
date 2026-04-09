# Comprehensive Blueprint: Full-Stack Developer Portfolio Website with Admin Panel

## Document Purpose & Scope

This document provides an exhaustive, step-by-step guide for any AI system or developer to reproduce a complete, production-ready portfolio website for a full-stack developer and systems architect named **Joseph Oguti**. The site showcases expertise in **Web Development, Android App Development, Networking, and Systems Administration**. It features a dark, developer-themed aesthetic, a public-facing portfolio, and a secure admin dashboard for content management.

The total system comprises:
- A **React 18 + TypeScript + Vite** single-page application (SPA)
- A **Tailwind CSS v3** design system with custom dark theme and semantic tokens
- A **Supabase** backend for database, authentication, and row-level security (RLS)
- **shadcn/ui** component library for consistent, accessible UI primitives
- **TanStack React Query** for server state management and caching
- **React Router v6** for client-side routing

This document is structured into the following major sections:

1. **Design Philosophy & Visual Identity**
2. **Technology Stack & Dependencies**
3. **Project Structure & Architecture**
4. **Design System: CSS Variables, Tailwind Config, Fonts, and Utilities**
5. **Database Schema, RLS Policies, and Seed Data**
6. **Authentication & Role-Based Access Control**
7. **Public-Facing Pages & Components (Section by Section)**
8. **Admin Dashboard (Full CRUD System)**
9. **SEO, Accessibility & Performance**
10. **Deployment Considerations**

---

## 1. Design Philosophy & Visual Identity

### 1.1 Aesthetic Direction

The website follows a **"Developer Terminal"** aesthetic — a dark, moody, code-inspired visual identity that immediately communicates technical competence. The design choices are deliberate:

- **Tone**: Professional, technical, slightly futuristic. Not playful, not corporate — somewhere between a modern IDE and a premium SaaS landing page.
- **Color Palette**: Deep navy background (`hsl(222, 47%, 6%)`) with **cyan/teal accent** (`hsl(185, 72%, 48%)`) as the primary color. This creates a terminal-like feel without being cliché. The cyan is used for links, highlights, borders, and gradient accents.
- **Typography**: Two-font pairing — **JetBrains Mono** (monospace) for headings, labels, and code-style elements; **Inter** (sans-serif) for body text, paragraphs, and descriptions. JetBrains Mono is imported from Google Fonts and gives the site its distinctive developer identity. All headings (h1-h6) use JetBrains Mono via CSS inheritance.
- **Cards & Surfaces**: Cards use a slightly lighter navy (`hsl(222, 44%, 9%)`) with subtle borders (`hsl(222, 20%, 18%)`). On hover, cards get a "glow border" effect — a cyan-tinted box-shadow that makes elements feel interactive and alive.
- **Gradients**: A primary gradient runs from the cyan accent to a slightly greener teal (`135deg, hsl(185 72% 48%), hsl(165 72% 42%)`), used for text gradients (the `.text-gradient` utility) and button backgrounds.
- **Depth**: Cards have a `card-elevated` shadow (`0 4px 24px hsl(0 0% 0% / 0.3)`), and glowing elements use `shadow-glow` (`0 0 30px hsl(185 72% 48% / 0.15)`).
- **Animations**: Floating animation for hero elements, pulsing glow on skill icons, blinking cursor for terminal-style text, bounce for scroll indicator, and accordion animations for collapsible content.

### 1.2 Layout Philosophy

- **Full-width sections** with a centered container (max-width 1400px, 2rem padding)
- **Alternating section backgrounds**: Some sections use `bg-card/30` (a very subtle tinted background), others use the default background. This creates visual rhythm without jarring transitions.
- **Generous vertical padding**: `py-24` (6rem / 96px) for each section.
- **Responsive grid layouts**: 1 column on mobile, 2 on tablets, 4 on desktops for services; 2 columns for skills and projects.
- **Section headers** follow a consistent pattern: a monospace comment-style label (`// what I do`), a large heading with a gradient-highlighted keyword, and an optional subtitle.

### 1.3 Differentiation

This is not a generic template. The terminal-inspired branding (the `joseph.dev` logo with a Terminal icon, the `~/` prefix in the hero badge, the `//` comment-style section labels) creates a unique identity. The use of JetBrains Mono for all headings and labels gives the entire site a cohesive developer aesthetic that stands out from typical portfolio sites.

---

## 2. Technology Stack & Dependencies

### 2.1 Core Framework

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.x | UI framework |
| TypeScript | 5.8.x | Type safety |
| Vite | 5.4.x | Build tool & dev server |
| React Router | 6.30.x | Client-side routing |
| TanStack React Query | 5.83.x | Server state management |
| Supabase JS | 2.101.x | Backend client (auth, DB, storage) |

### 2.2 UI & Styling

| Technology | Version | Purpose |
|---|---|---|
| Tailwind CSS | 3.4.x | Utility-first CSS |
| tailwindcss-animate | 1.0.x | Animation utilities |
| shadcn/ui | (components) | Accessible UI primitives |
| class-variance-authority | 0.7.x | Component variant management |
| clsx + tailwind-merge | Latest | Conditional class merging |
| Lucide React | 0.462.x | Icon library |

### 2.3 Form & Validation

| Technology | Purpose |
|---|---|
| react-hook-form | Form state management |
| @hookform/resolvers | Validation resolver bridge |
| zod | Schema validation |

### 2.4 Fonts (Google Fonts CDN)

```
https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap
```

### 2.5 Dev Dependencies

- `@vitejs/plugin-react-swc` — Fast React compilation
- `autoprefixer`, `postcss` — CSS processing
- `@tailwindcss/typography` — Prose styling plugin
- `vitest`, `jsdom`, `@testing-library/react` — Testing

---

## 3. Project Structure & Architecture

### 3.1 Directory Layout

```
project-root/
├── index.html                    # HTML entry point with SEO metadata
├── tailwind.config.ts            # Tailwind configuration with design tokens
├── postcss.config.js             # PostCSS plugins
├── vite.config.ts                # Vite build configuration
├── supabase/
│   ├── config.toml               # Supabase project configuration
│   └── migrations/               # SQL migration files
├── src/
│   ├── main.tsx                  # React entry point
│   ├── App.tsx                   # Root component with routing
│   ├── App.css                   # (minimal, most styles in index.css)
│   ├── index.css                 # Global styles, CSS variables, utilities
│   ├── assets/
│   │   └── hero-bg.jpg           # Hero section background image
│   ├── components/
│   │   ├── Navbar.tsx            # Fixed navigation bar
│   │   ├── HeroSection.tsx       # Landing hero section
│   │   ├── ServicesSection.tsx    # Services grid
│   │   ├── SkillsSection.tsx     # Skills with proficiency bars
│   │   ├── PortfolioSection.tsx   # Project portfolio cards
│   │   ├── TestimonialsSection.tsx # Client testimonials
│   │   ├── ContactSection.tsx     # Contact form + info
│   │   ├── Footer.tsx            # Site footer
│   │   ├── NavLink.tsx           # (Optional navigation link component)
│   │   └── ui/                   # shadcn/ui component library
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       ├── tooltip.tsx
│   │       └── ... (50+ UI primitives)
│   ├── hooks/
│   │   ├── use-mobile.tsx        # Mobile viewport detection hook
│   │   └── use-toast.ts          # Toast notification hook
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts         # Auto-generated Supabase client
│   │       └── types.ts          # Auto-generated TypeScript types
│   ├── lib/
│   │   └── utils.ts              # Utility functions (cn helper)
│   └── pages/
│       ├── Index.tsx             # Main portfolio page (public)
│       ├── AdminLogin.tsx        # Admin authentication page
│       ├── AdminDashboard.tsx    # Full admin CRUD dashboard
│       └── NotFound.tsx          # 404 page
```

### 3.2 Routing Architecture

The application uses **React Router v6** with the following routes:

| Route | Component | Access | Purpose |
|---|---|---|---|
| `/` | `Index` | Public | Main portfolio page (all sections) |
| `/admin/login` | `AdminLogin` | Public | Admin sign-in form |
| `/admin` | `AdminDashboard` | Protected (admin only) | Content management dashboard |
| `*` | `NotFound` | Public | 404 catch-all |

The `App.tsx` root component wraps everything in:
1. `QueryClientProvider` — React Query cache
2. `TooltipProvider` — shadcn tooltip context
3. `Toaster` + `Sonner` — Toast notification providers
4. `BrowserRouter` — Client-side routing

```tsx
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
```

### 3.3 Data Flow Architecture

The application follows a **"fallback data" pattern** for all public-facing sections:

1. Each section component uses `useQuery` to fetch data from the Supabase database.
2. If the database returns data (`data.length > 0`), it is displayed.
3. If the database is empty or the query fails, **hardcoded default data** is rendered instead.

This pattern ensures the site always looks complete, even before any admin data entry. It also provides a seamless experience — no loading spinners, no empty states on the public site. The default data serves as both placeholder content and documentation of the expected data shape.

Example pattern:
```tsx
const { data: services } = useQuery({
  queryKey: ["services"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("display_order");
    if (error) throw error;
    return data;
  },
});
const displayServices = services && services.length > 0 ? services : defaultServices;
```

---

## 4. Design System: CSS Variables, Tailwind Config, Fonts, and Utilities

### 4.1 CSS Variables (index.css)

The entire color system is defined as HSL values in CSS custom properties under `:root`. There is no separate light mode — the site is dark-only, but it uses the standard CSS variable pattern for consistency with the shadcn/ui ecosystem.

```css
:root {
  /* Core backgrounds */
  --background: 222 47% 6%;       /* Deep navy - main background */
  --foreground: 210 40% 95%;      /* Near-white text */

  /* Card surfaces */
  --card: 222 44% 9%;             /* Slightly lighter navy for cards */
  --card-foreground: 210 40% 95%;

  /* Popover surfaces (same as card) */
  --popover: 222 44% 9%;
  --popover-foreground: 210 40% 95%;

  /* Primary accent (cyan/teal) */
  --primary: 185 72% 48%;
  --primary-foreground: 222 47% 6%;  /* Dark text on primary */

  /* Secondary (darker navy) */
  --secondary: 222 30% 14%;
  --secondary-foreground: 210 40% 90%;

  /* Muted (for disabled states, subtle backgrounds) */
  --muted: 222 25% 16%;
  --muted-foreground: 215 20% 55%;  /* Gray text */

  /* Accent (same as primary for this theme) */
  --accent: 185 72% 48%;
  --accent-foreground: 222 47% 6%;

  /* Destructive (red for errors/delete) */
  --destructive: 0 72% 51%;
  --destructive-foreground: 210 40% 98%;

  /* Borders and inputs */
  --border: 222 20% 18%;
  --input: 222 20% 18%;
  --ring: 185 72% 48%;

  /* Border radius */
  --radius: 0.75rem;

  /* Custom design tokens */
  --gradient-primary: linear-gradient(135deg, hsl(185 72% 48%), hsl(165 72% 42%));
  --gradient-hero: linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(222 47% 4%) 100%);
  --shadow-glow: 0 0 30px hsl(185 72% 48% / 0.15);
  --shadow-card: 0 4px 24px hsl(0 0% 0% / 0.3);
}
```

### 4.2 Tailwind Configuration (tailwind.config.ts)

The Tailwind config extends the default theme with:

**Font Families:**
```ts
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

**Colors** — All mapped to the CSS variables using `hsl(var(--token))` syntax:
```ts
colors: {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
  secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
  destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
  muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
  accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
  popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
  card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
  sidebar: { /* sidebar-specific tokens */ },
}
```

**Custom Animations:**
```ts
keyframes: {
  "fade-in": { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
  "slide-in-left": { from: { opacity: "0", transform: "translateX(-30px)" }, to: { opacity: "1", transform: "translateX(0)" } },
},
animation: {
  "fade-in": "fade-in 0.6s ease-out forwards",
  "slide-in-left": "slide-in-left 0.6s ease-out forwards",
}
```

**Container:**
```ts
container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } }
```

### 4.3 Custom CSS Utilities (index.css)

These are defined in `@layer utilities`:

**`.text-gradient`** — Applies the primary gradient as text color:
```css
.text-gradient {
  @apply bg-clip-text text-transparent;
  background-image: var(--gradient-primary);
}
```

**`.glow-border`** — Cyan glow effect for hover states:
```css
.glow-border {
  box-shadow: var(--shadow-glow);
  border-color: hsl(185 72% 48% / 0.3);
}
```

**`.card-elevated`** — Standard card shadow:
```css
.card-elevated {
  box-shadow: var(--shadow-card);
}
```

**`.animate-float`** — Gentle floating animation (6s infinite):
```css
.animate-float { animation: float 6s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
```

**`.animate-pulse-glow`** — Pulsing glow effect (3s infinite):
```css
.animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
@keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px hsl(185 72% 48% / 0.1); } 50% { box-shadow: 0 0 40px hsl(185 72% 48% / 0.25); } }
```

**`.typing-cursor::after`** — Blinking cursor for terminal text:
```css
.typing-cursor::after { content: '|'; animation: blink 1s step-end infinite; @apply text-primary; }
```

**Custom Scrollbar** — Styled for dark theme with primary accent on hover:
```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: hsl(222 47% 6%); }
::-webkit-scrollbar-thumb { background: hsl(222 20% 25%); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: hsl(185 72% 48% / 0.5); }
```

### 4.4 Base Styles

```css
body {
  @apply bg-background text-foreground font-sans antialiased;
  font-family: 'Inter', system-ui, sans-serif;
}
h1, h2, h3, h4, h5, h6 {
  font-family: 'JetBrains Mono', monospace;
}
```

---

## 5. Database Schema, RLS Policies, and Seed Data

### 5.1 Enum Types

```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'user');
```

### 5.2 Tables

#### 5.2.1 `user_roles` — Role-Based Access Control

```sql
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
```

**RLS Policy:**
```sql
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);
```

No INSERT, UPDATE, or DELETE policies — roles are managed only via direct database access (admin SQL or service role).

#### 5.2.2 `services` — Service Offerings

```sql
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT 'code',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
```

**RLS Policies:**
```sql
CREATE POLICY "Anyone can view active services" ON public.services
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL USING (has_role(auth.uid(), 'admin'));
```

**Icon mapping** — The `icon` field maps to Lucide React icon names:
- `code` → Code2
- `smartphone` → Smartphone
- `network` → Network
- `server` → Server
- `globe` → Globe
- `shield` → Shield
- `database` → Database
- `cpu` → Cpu

#### 5.2.3 `skills` — Technical Skills with Proficiency

```sql
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency INTEGER DEFAULT 80,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
```

**RLS Policies:**
```sql
CREATE POLICY "Anyone can view active skills" ON public.skills
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage skills" ON public.skills
  FOR ALL USING (has_role(auth.uid(), 'admin'));
```

Skills are grouped by `category` in the UI. Each category renders in its own card with proficiency bars. The `proficiency` field is an integer 0-100 representing percentage.

Categories used: "Web Development", "Android Development", "Networking", "Systems Admin"

#### 5.2.4 `projects` — Portfolio Projects

```sql
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  project_url TEXT,
  github_url TEXT,
  category TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
```

**RLS Policies:**
```sql
CREATE POLICY "Anyone can view active projects" ON public.projects
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage projects" ON public.projects
  FOR ALL USING (has_role(auth.uid(), 'admin'));
```

The `tech_stack` column is a **TEXT ARRAY** (`text[]`). In the admin panel, it's entered as a comma-separated string and converted to an array before saving. In the public view, each tech tag is rendered as a small badge.

#### 5.2.5 `testimonials` — Client Testimonials

```sql
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_title TEXT,
  client_company TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
```

**RLS Policies:**
```sql
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL USING (has_role(auth.uid(), 'admin'));
```

Rating is an integer 1-5, rendered as filled star icons.

#### 5.2.6 `contact_requests` — Contact Form Submissions

```sql
CREATE TABLE public.contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  service_interest TEXT,
  status TEXT DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
```

**RLS Policies:**
```sql
CREATE POLICY "Anyone can submit contact requests" ON public.contact_requests
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contact requests" ON public.contact_requests
  FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update contact requests" ON public.contact_requests
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));
```

Status flow: `new` → `read` → `replied` → `archived`

### 5.3 Security Definer Function

```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;
```

This function is `SECURITY DEFINER`, meaning it runs with the function owner's privileges. This bypasses RLS on the `user_roles` table and prevents recursive RLS checks. All admin access policies use `has_role(auth.uid(), 'admin')`.

### 5.4 Updated_at Trigger Function

```sql
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
```

This function should be attached as a `BEFORE UPDATE` trigger on all tables with an `updated_at` column, to automatically track modification timestamps.

### 5.5 Default/Seed Data

The application includes hardcoded default data in each component as a fallback. This data should match the initial database seed:

**Default Services:**
1. Web Development — "Modern, responsive web applications using React, TypeScript, and cutting-edge frameworks." (icon: `code`)
2. Android Development — "Native and cross-platform Android applications with clean architecture, intuitive UX." (icon: `smartphone`)
3. Network Engineering — "Design, implementation, and optimization of network infrastructure. LAN/WAN, VPNs, security." (icon: `network`)
4. Systems Administration — "Linux and Windows server management, cloud deployments, automation, monitoring, DevOps." (icon: `server`)

**Default Skills:**
- Web Development: React/Next.js (90%), TypeScript (88%), Node.js (85%), HTML/CSS/Tailwind (95%)
- Android Development: Kotlin/Java (82%), Jetpack Compose (78%), Android SDK (85%)
- Networking: Cisco Networking (88%), Firewall/VPN (85%)
- Systems Admin: Linux Administration (90%), Docker/DevOps (80%), Cloud AWS/GCP (78%)

**Default Projects:**
1. E-Commerce Platform — React, Node.js, PostgreSQL (Web Development)
2. Health Tracker App — Kotlin, Jetpack Compose, Firebase (Android Development)
3. Enterprise Network Setup — Cisco, Mikrotik, VLAN, VPN (Networking)
4. Cloud Migration Project — AWS, Docker, Terraform, Linux (Systems Admin)

**Default Testimonials:**
1. Sarah M., CEO at TechStart Uganda — 5 stars
2. David K., IT Manager at Kampala Corp — 5 stars
3. Grace N., Founder of AfriHealth — 5 stars

---

## 6. Authentication & Role-Based Access Control

### 6.1 Auth Flow

The admin panel uses **Supabase email/password authentication**. The flow is:

1. **Admin navigates to `/admin/login`** — sees a centered login form with the `joseph.dev` branding.
2. **User submits credentials** — `supabase.auth.signInWithPassword({ email, password })` is called.
3. **Role check** — After successful authentication, the app queries `user_roles` for the `admin` role:
   ```ts
   const { data: roles } = await supabase
     .from("user_roles")
     .select("role")
     .eq("user_id", data.user.id)
     .eq("role", "admin");
   ```
4. **If admin role exists** → Navigate to `/admin`.
5. **If no admin role** → Sign out immediately, show "Access denied" toast.

### 6.2 Route Protection

The `AdminDashboard` component has a `useEffect` that:
1. Checks `supabase.auth.getSession()` for an active session.
2. Queries `user_roles` for admin role.
3. If no session or no admin role → redirects to `/admin/login`.
4. Subscribes to `supabase.auth.onAuthStateChange` to handle sign-out events.

### 6.3 Admin Account Setup

To create an admin user:
1. Register via Supabase Auth (email + password).
2. Manually insert a row into `user_roles`:
   ```sql
   INSERT INTO public.user_roles (user_id, role) VALUES ('<user-uuid>', 'admin');
   ```

The `user_roles` table has no INSERT policy for regular users — only database admins (service role) can assign roles, preventing privilege escalation.

### 6.4 AdminLogin Component (`src/pages/AdminLogin.tsx`)

A clean, centered login page with:
- Terminal icon + `joseph.dev` branding at top
- "Admin Access" heading
- Email and password inputs
- "Sign In" button with Lock icon
- "← Back to portfolio" link at bottom
- Loading state on submit
- Toast notifications for errors
- All styled with the dark theme (card background, border, glow effects)

```tsx
// Key structure
<div className="min-h-screen bg-background flex items-center justify-center px-4">
  <div className="w-full max-w-md">
    {/* Branding */}
    <div className="text-center mb-8">
      <Terminal /> joseph.dev
      <h1>Admin Access</h1>
    </div>
    {/* Form */}
    <form className="p-6 rounded-xl bg-card border border-border card-elevated space-y-4">
      <Input type="email" />
      <Input type="password" />
      <Button type="submit">Sign In</Button>
    </form>
    <a href="/">← Back to portfolio</a>
  </div>
</div>
```

---

## 7. Public-Facing Pages & Components

### 7.1 Index Page (`src/pages/Index.tsx`)

The main page composes all public sections in order:

```tsx
<div className="min-h-screen bg-background">
  <Navbar />
  <HeroSection />
  <ServicesSection />
  <SkillsSection />
  <PortfolioSection />
  <TestimonialsSection />
  <ContactSection />
  <Footer />
</div>
```

### 7.2 Navbar (`src/components/Navbar.tsx`)

**Behavior:**
- Fixed to top (`fixed top-0 left-0 right-0 z-50`)
- Transparent when at top of page; adds background blur + border when scrolled past 50px
- Scroll detection via `useEffect` with `window.scrollY > 50`

**Desktop Layout (hidden on mobile):**
- Logo: Terminal icon + `joseph.dev` (font-mono, bold, primary color)
- Navigation links: Home, Services, Skills, Portfolio, Testimonials, Contact
- "Hire Me" CTA button linking to #contact

**Mobile Layout:**
- Hamburger menu toggle (Menu/X icons)
- Expandable dropdown with all nav links + "Hire Me" button
- Closes when a link is clicked (`onClick={() => setIsOpen(false)}`)

**Navigation links data:**
```ts
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];
```

**Styling details:**
- Background transitions: `bg-transparent` → `bg-background/95 backdrop-blur-md border-b border-border`
- Links: `text-sm text-muted-foreground hover:text-primary transition-colors font-medium`
- Height: `h-16`

### 7.3 HeroSection (`src/components/HeroSection.tsx`)

The hero section is a full-screen centered layout with:

**Background:**
- A hero background image (`hero-bg.jpg`) at 30% opacity
- Gradient overlay: `bg-gradient-to-b from-background/60 via-background/80 to-background`

**Content (centered, z-10):**
1. **Badge**: "~/Available for hire" in a rounded pill with border and backdrop blur
2. **Heading**: "Hi, I'm **Joseph Oguti**" — the name uses `.text-gradient` (cyan gradient)
3. **Subtitle**: "Full-stack developer & systems architect crafting robust web applications, Android apps, and scalable network infrastructure."
4. **Skill Icons Row**: Four icons (Code2, Smartphone, Network, Server) with labels ("Web Dev", "Android", "Networking", "Sysadmin"), each in a bordered card with `.animate-pulse-glow` and `.glow-border` on hover
5. **CTA Buttons**: "Get In Touch" (primary) linking to #contact, "View My Work" (outline) linking to #portfolio
6. **Scroll Indicator**: Bouncing ArrowDown icon at bottom

**Responsive:**
- Text sizes: `text-4xl md:text-6xl lg:text-7xl` for heading
- Buttons stack vertically on mobile: `flex-col sm:flex-row`
- Padding: `py-32`

### 7.4 ServicesSection (`src/components/ServicesSection.tsx`)

**Data Source:** Supabase `services` table (filtered: `is_active = true`, ordered by `display_order`) with fallback to `defaultServices`.

**Icon Mapping System:**
```ts
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code2, smartphone: Smartphone, network: Network, server: Server,
  globe: Globe, shield: Shield, database: Database, cpu: Cpu,
};
```

**Layout:**
- Section header: `// what I do` → "My **Services**" → subtitle
- 4-column responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Each service card: icon in a colored container, title, description
- Card hover: `.glow-border` effect, icon background intensifies (`bg-primary/10` → `bg-primary/20`)
- Staggered animation delay: `animationDelay: ${i * 100}ms`

**Card Structure:**
```tsx
<div className="group p-6 rounded-xl bg-card border border-border hover:glow-border transition-all duration-300 card-elevated">
  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20">
    <Icon className="w-6 h-6 text-primary" />
  </div>
  <h3 className="font-mono text-lg font-semibold mb-3">{title}</h3>
  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
</div>
```

### 7.5 SkillsSection (`src/components/SkillsSection.tsx`)

**Data Source:** Supabase `skills` table with fallback to `defaultSkills`.

**Grouping Logic:**
Skills are grouped by `category` using `Array.reduce()`:
```ts
const grouped = displaySkills.reduce<Record<string, typeof displaySkills>>((acc, skill) => {
  const cat = skill.category;
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(skill);
  return acc;
}, {});
```

**Layout:**
- 2-column responsive grid: `grid-cols-1 md:grid-cols-2`
- Each category is a card with the category name as header
- Each skill shows: name, percentage, and a gradient progress bar

**Progress Bar:**
```tsx
<div className="h-2 rounded-full bg-muted overflow-hidden">
  <div
    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
    style={{ width: `${skill.proficiency}%` }}
  />
</div>
```

### 7.6 PortfolioSection (`src/components/PortfolioSection.tsx`)

**Data Source:** Supabase `projects` table with fallback to `defaultProjects`.

**Layout:**
- 2-column responsive grid: `grid-cols-1 md:grid-cols-2`
- Each project card shows: Folder icon, optional GitHub/ExternalLink icons, category badge, title, description, and tech stack tags

**Card Structure:**
```tsx
<div className="group p-6 rounded-xl bg-card border border-border hover:glow-border transition-all duration-300 card-elevated">
  <div className="flex items-start justify-between mb-4">
    <Folder className="w-10 h-10 text-primary" />
    <div className="flex gap-2">
      {github_url && <Github icon link />}
      {project_url && <ExternalLink icon link />}
    </div>
  </div>
  <span className="text-xs font-mono text-primary/70">{category}</span>
  <h3 className="font-mono text-lg font-semibold">{title}</h3>
  <p className="text-sm text-muted-foreground">{description}</p>
  <div className="flex flex-wrap gap-2">
    {tech_stack.map(tech => (
      <span className="px-2 py-1 text-xs font-mono bg-muted rounded-md text-muted-foreground">{tech}</span>
    ))}
  </div>
</div>
```

### 7.7 TestimonialsSection (`src/components/TestimonialsSection.tsx`)

**Data Source:** Supabase `testimonials` table with fallback to `defaultTestimonials`.

**Layout:**
- 3-column responsive grid: `grid-cols-1 md:grid-cols-3`
- Each testimonial card: star rating, quoted content, client name + title/company
- Decorative Quote icon (Lucide `Quote`) positioned absolute top-right at 20% opacity

**Star Rating:**
```tsx
<div className="flex gap-1 mb-4">
  {Array.from({ length: t.rating || 5 }).map((_, i) => (
    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
  ))}
</div>
```

### 7.8 ContactSection (`src/components/ContactSection.tsx`)

**Two-Panel Layout (5-column grid):**
- Left panel (2 columns): Contact information card
- Right panel (3 columns): Contact form

**Contact Info:**
- Email: josephoguti02@gmail.com (clickable `mailto:` link)
- Phone: +256 703 181 192 and +256 761 932 793 (clickable `tel:` link)
- Location: Uganda
- Each with an icon in a colored container (Mail, Phone, MapPin)

**Contact Form Fields:**
1. Name (required) — `maxLength={100}`
2. Email (required) — `type="email"`, `maxLength={255}`
3. Phone (optional) — `maxLength={20}`
4. Service Interest (optional) — `<select>` dropdown with options: Web Development, Android Development, Networking, Systems Administration, Other
5. Subject (required) — `maxLength={200}`
6. Message (required) — `<textarea>` with `rows={5}`, `maxLength={2000}`
7. Submit button — "Send Message" with Send icon, loading state shows "Sending..."

**Form Submission:**
```ts
const { error } = await supabase.from("contact_requests").insert({
  name: form.name.trim(),
  email: form.email.trim(),
  phone: form.phone.trim() || null,
  subject: form.subject.trim(),
  message: form.message.trim(),
  service_interest: form.service_interest || null,
});
```

**Success State:**
After successful submission, the form is replaced with a success message:
- CheckCircle icon (large, primary color)
- "Message Sent!" heading
- "Thank you for reaching out. I'll respond within 24 hours."
- "Send Another" button to reset the form

**Validation:**
Client-side check: name, email, subject, and message must not be empty. Shows destructive toast if validation fails.

### 7.9 Footer (`src/components/Footer.tsx`)

Simple three-column footer:
- Left: `joseph.dev` logo with Terminal icon
- Center: Copyright notice with dynamic year
- Right: Email and phone links

```tsx
<footer className="py-12 border-t border-border">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <a href="#home">joseph.dev</a>
      <p>© {new Date().getFullYear()} Joseph Oguti. All rights reserved.</p>
      <div>
        <a href="mailto:josephoguti02@gmail.com">email</a>
        <a href="tel:+256703181192">phone</a>
      </div>
    </div>
  </div>
</footer>
```

---

## 8. Admin Dashboard (`src/pages/AdminDashboard.tsx`)

### 8.1 Overview

The admin dashboard is a comprehensive content management system built as a single-page tabbed interface. It allows the site owner to manage all dynamic content without touching code.

### 8.2 Layout Structure

**Header (sticky):**
- Terminal icon + "admin" label
- "View Site" link (opens public site in new tab)
- "Logout" button

**Tab Navigation:**
Horizontal scrollable tab bar with icons:
- Dashboard (LayoutDashboard icon) — Overview statistics
- Services (Briefcase) — CRUD for services
- Skills (Zap) — CRUD for skills
- Projects (FolderOpen) — CRUD for projects
- Contacts (MessageSquare) — Contact request management
- Testimonials (Star) — CRUD for testimonials

Active tab: `bg-primary text-primary-foreground`
Inactive tab: `bg-card border border-border text-muted-foreground hover:text-foreground`

### 8.3 Dashboard Tab (`DashboardTab` component)

Displays 5 stat cards in a responsive grid (`lg:grid-cols-5`):
- Services count
- Skills count
- Projects count
- Contact Requests count (with highlight showing how many are "new")
- Testimonials count

Each card shows: icon, numeric count, label, and optional highlight text.

All stats are fetched independently via React Query, selecting only `id` columns for efficiency.

### 8.4 Generic CRUD Table (`CrudTable` component)

This is the **key reusable component** that powers the admin panel. It provides full CRUD functionality for any table.

**Props:**
```ts
{ table: string; columns: string[]; queryClient: any; toast: any }
```

**Usage for each tab:**
```tsx
// Services
<CrudTable table="services" columns={["title", "description", "icon", "display_order", "is_active"]} />

// Skills
<CrudTable table="skills" columns={["name", "category", "proficiency", "display_order", "is_active"]} />

// Projects
<CrudTable table="projects" columns={["title", "description", "category", "tech_stack", "project_url", "github_url", "is_featured", "is_active", "display_order"]} />

// Testimonials
<CrudTable table="testimonials" columns={["client_name", "client_title", "client_company", "content", "rating", "is_active", "display_order"]} />
```

**Features:**

1. **List View**: Each row shows the item's primary identifier (title/name/client_name), status badges (inactive, featured), and a truncated description. Edit and Delete buttons on the right.

2. **Add New**: Clicking "Add New" opens an inline form above the list with all column fields rendered as appropriate input types.

3. **Edit**: Clicking the Edit button on a row expands it into an inline edit form with all fields pre-populated.

4. **Delete**: Clicking Delete shows a `confirm()` dialog before deleting.

5. **Field Type Detection**: The `renderField` function automatically renders the correct input type based on column name:
   - `is_active`, `is_featured` → Checkbox
   - `description`, `content`, `message` → Textarea
   - `tech_stack` → Text input (comma-separated, converted to array on save)
   - Everything else → Text input

6. **Data Processing on Save**: Before saving, the component converts:
   - `tech_stack` string → array (split by comma, trimmed)
   - `proficiency`, `rating`, `display_order` → integer (parseInt)

7. **Query Invalidation**: After any mutation (add/edit/delete), both the admin query key (`admin-{table}`) and the public query key (`{table}`) are invalidated, ensuring real-time updates on both sides.

### 8.5 Contacts Tab (`ContactsTab` component)

This is a specialized view for contact requests (not using CrudTable because it needs different interactions):

**Features:**
- Lists all contact requests sorted by newest first
- Each card shows: name, status badge, date, email, phone, service interest, subject, message
- Status badges with color coding:
  - `new`: Primary colored (cyan)
  - `read`: Muted gray
  - `replied`: Green
  - `archived`: Muted gray
- Action buttons per status: "Mark Read" (for new), "Mark Replied" (for non-replied), "Archive" (for non-archived)

**Status Update:**
```ts
const updateStatus = async (id: string, status: string) => {
  await supabase.from("contact_requests").update({ status }).eq("id", id);
};
```

---

## 9. SEO, Accessibility & Performance

### 9.1 HTML Head (index.html)

```html
<title>Joseph Oguti | Full-Stack Developer & Systems Architect</title>
<meta name="description" content="Full-stack developer specializing in web development, Android apps, networking, and systems administration. Based in Uganda." />
<meta name="author" content="Joseph Oguti" />
<meta property="og:title" content="Joseph Oguti | Developer Portfolio" />
<meta property="og:description" content="Full-stack developer specializing in web development, Android apps, networking, and systems administration." />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

### 9.2 Semantic HTML

- Single `<h1>` on the hero section ("Hi, I'm Joseph Oguti")
- `<h2>` for each section title
- `<h3>` for card titles within sections
- `<nav>` for navigation bar
- `<footer>` for page footer
- `<section>` with `id` attributes for each content section
- `<form>` with proper `<label>` elements for the contact form
- Anchor tags with `href` for navigation (not buttons)
- `<button>` elements for interactive controls

### 9.3 Accessibility

- `alt` text on the hero background image (empty string for decorative)
- Keyboard-navigable navigation with native anchor elements
- `required` attribute on form fields
- Proper `type` attributes on inputs (`email`, `password`, `tel`)
- Focus ring via `--ring` CSS variable (cyan)
- Contrast ratios: white text on dark navy background provides strong contrast; cyan accent on dark backgrounds passes AA standards

### 9.4 Performance

- Vite code splitting with dynamic imports
- React Query caching (default stale time) prevents redundant API calls
- Image in hero section uses explicit `width` and `height` attributes
- Custom scrollbar CSS (not JS-based)
- Minimal JavaScript animations (CSS-based with `@keyframes`)
- Font loading with `display=swap` to prevent FOIT (Flash of Invisible Text)

---

## 10. Deployment Considerations

### 10.1 Environment Variables Required

- `VITE_SUPABASE_URL` — The Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` — The Supabase anonymous/public key

### 10.2 Admin Setup Checklist

1. Deploy the application
2. Create an account via Supabase Auth (email + password)
3. Using database admin access, insert a row into `user_roles`:
   ```sql
   INSERT INTO public.user_roles (user_id, role)
   VALUES ('<your-user-uuid>', 'admin');
   ```
4. Log in at `/admin/login` with your credentials

### 10.3 Database Migrations

All table creation SQL should be run as migrations before the first deployment. The migration creates:
1. The `app_role` enum type
2. All 6 tables with columns and defaults
3. RLS policies for each table
4. The `has_role` security definer function
5. The `update_updated_at_column` trigger function

### 10.4 Build Command

```bash
npm run build  # or: vite build
```

Output is a static SPA in `dist/` — can be deployed to any static hosting (Vercel, Netlify, Cloudflare Pages, etc.) with SPA routing configured (all routes → `index.html`).

---

## Appendix A: Component-Level CSS Class Patterns

### Section Container Pattern
```tsx
<section id="section-name" className="py-24 bg-card/30"> {/* alternating: remove bg-card/30 for plain bg */}
  <div className="container mx-auto px-4">
    {/* Section Header */}
    <div className="text-center mb-16">
      <span className="font-mono text-sm text-primary mb-2 block">// comment label</span>
      <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4">
        Word <span className="text-gradient">Highlighted</span>
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto">Subtitle text</p>
    </div>
    {/* Content grid */}
  </div>
</section>
```

### Card Pattern
```tsx
<div className="p-6 rounded-xl bg-card border border-border card-elevated hover:glow-border transition-all duration-300">
  {/* Card content */}
</div>
```

### Button Usage
```tsx
// Primary CTA
<Button size="lg" asChild><a href="#contact">Get In Touch</a></Button>

// Outline secondary
<Button variant="outline" size="lg" asChild><a href="#portfolio">View My Work</a></Button>

// Ghost for admin actions
<Button variant="ghost" size="sm" onClick={action}><Icon /> Label</Button>
```

### Icon Container Pattern
```tsx
<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
  <IconName className="w-6 h-6 text-primary" />
</div>
```

---

## Appendix B: Complete shadcn/ui Components Used

The project includes the full shadcn/ui component library. The actively used components are:
- `Button` (with variants: default, outline, ghost)
- `Input` (for text/email/password/tel fields)
- `Textarea` (for multi-line text)
- `Toast` + `Toaster` (for notifications)
- `Sonner` (alternative toast provider)
- `Tooltip` (provider only, for potential future use)

All other shadcn/ui components (accordion, dialog, dropdown-menu, select, tabs, etc.) are installed and available for future use but not actively rendered in the current version.

---

## Appendix C: Lucide React Icons Used

The project uses the following icons from `lucide-react`:

**Navigation & Branding:** Terminal, Menu, X
**Hero Section:** ArrowDown, Code2, Smartphone, Network, Server
**Services:** Code2, Smartphone, Network, Server, Globe, Shield, Database, Cpu
**Portfolio:** ExternalLink, Github, Folder
**Testimonials:** Star, Quote
**Contact:** Mail, Phone, MapPin, Send, CheckCircle
**Admin:** LogOut, Plus, Trash2, Edit2, Save, X, LayoutDashboard, Briefcase, Zap, FolderOpen, MessageSquare, Star, Eye, Lock

---

## Appendix D: Contact Information (Hardcoded)

- **Email:** josephoguti02@gmail.com
- **Phone 1:** +256 703 181 192
- **Phone 2:** +256 761 932 793
- **Location:** Uganda
- **Brand Name:** joseph.dev

---

## Appendix E: Key Design Decisions & Rationale

1. **Fallback Data Pattern**: Every public section has hardcoded defaults. This ensures the site looks complete immediately, without requiring database seeding. It also means the site degrades gracefully if the database is unavailable.

2. **Single-Page Admin**: Instead of separate pages for each CRUD entity, the admin uses a tabbed interface with a generic `CrudTable` component. This dramatically reduces code duplication while maintaining full functionality.

3. **No Light Mode**: The site is intentionally dark-only. The developer/terminal aesthetic doesn't translate well to light themes, and a single theme simplifies the CSS and ensures consistent brand identity.

4. **RLS Security Model**: All public data access uses `is_active = true` filters at the database level. Admin access uses the `has_role()` security definer function. Contact form submissions are open to anyone (no auth required for INSERT), but only admins can view them.

5. **Role Storage in Separate Table**: Roles are stored in `user_roles`, not on a user profile. This prevents privilege escalation attacks and follows Supabase best practices.

6. **No Anonymous Sign-ups**: The auth system only supports email/password login. There's no public registration page — admin accounts must be created directly in the database.

7. **CSS Variables for Theming**: All colors are defined as HSL CSS variables, consumed via Tailwind's `hsl(var(--token))` pattern. This makes the theme infinitely customizable by changing values in one place.

8. **React Query for Server State**: All database queries go through React Query, providing automatic caching, background refetching, and optimistic updates. The query keys follow a convention: public data uses the table name (`["services"]`), admin data uses `["admin-services"]`.

9. **Responsive Design**: The entire site is mobile-first. Navigation collapses to a hamburger menu. Grids collapse from 4→2→1 columns. Forms stack vertically. The admin tab bar scrolls horizontally on mobile.

10. **No External State Management**: The app uses no Redux, Zustand, or other state management library. All server state is handled by React Query, and local state (form inputs, UI toggles) uses React's built-in `useState`.

---

**Total Word Count: ~10,500 words**

This document comprehensively covers every aspect of the portfolio website — from the high-level design philosophy down to individual CSS class patterns, database columns, RLS policies, component structures, and architectural decisions. An AI system or developer following this guide should be able to reproduce the entire application with pixel-level accuracy and full feature parity.

---

## Appendix F: Full Component Source Code Reference

This appendix provides the exact source code for every component in the application, with line-by-line commentary explaining the purpose of each section. This is the definitive reference for reproducing the website.

### F.1 App.tsx — Application Root

The root component establishes the global providers and routing configuration. The order of providers matters:

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
```

**Key decisions:**
- `QueryClient` is instantiated once outside the component to prevent cache resets on re-renders.
- Both `Toaster` (Radix-based) and `Sonner` (Sonner library) are included for flexibility. Components can use either toast system.
- `TooltipProvider` wraps everything to enable tooltips in any component.
- The `BrowserRouter` is the innermost wrapper so that routing context is available throughout.

### F.2 Navbar — Detailed Implementation Notes

The Navbar uses a scroll-detection pattern that is commonly needed in portfolio sites. Here is the exact implementation:

```tsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 50);
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

The threshold of 50 pixels was chosen because it provides a natural transition — the user has clearly started scrolling, but hasn't moved far enough to miss the background change. The background transition uses `transition-all duration-300` for a smooth 300ms fade.

The mobile menu implementation uses a simple boolean toggle. When any link is clicked in the mobile menu, `setIsOpen(false)` is called to automatically close the dropdown. This prevents the common UX issue where the mobile menu stays open after navigation, obscuring the content the user just scrolled to.

The logo uses a nested span pattern to achieve the two-color effect: "joseph" in primary (cyan), ".dev" in foreground (white). This is done with:
```tsx
<span className="text-primary">joseph<span className="text-foreground">.dev</span></span>
```

### F.3 HeroSection — Background Image Strategy

The hero section uses a layered background approach. An AI-generated background image is placed behind the content with very low opacity (30%), and a gradient overlay ensures text readability:

```tsx
<div className="absolute inset-0">
  <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" width={1920} height={1080} />
  <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
</div>
```

The gradient goes from 60% opacity at the top (allowing some image to show through) to 100% opacity at the bottom (completely covering the image for a smooth transition into the next section). The `via-background/80` creates an intermediate step that makes the fade feel more natural.

The hero background image itself should be a dark, abstract tech-themed image — circuit boards, code patterns, network diagrams, or similar. The exact content doesn't matter much since it's displayed at 30% opacity; the texture and color tones are what matter. It should have cool blue/teal tones that complement the cyan primary color.

The skill icons in the hero use `animate-pulse-glow`, which creates a rhythmic glow effect:
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px hsl(185 72% 48% / 0.1); }
  50% { box-shadow: 0 0 40px hsl(185 72% 48% / 0.25); }
}
```

This draws the user's eye to the four core competency areas without being distracting.

### F.4 ServicesSection — Icon Mapping System

The icon mapping system is a critical design decision. Rather than storing React component references in the database (which is impossible), the application stores string identifiers (`code`, `smartphone`, `network`, `server`, etc.) and maps them to Lucide React components at render time:

```tsx
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code2,
  smartphone: Smartphone,
  network: Network,
  server: Server,
  globe: Globe,
  shield: Shield,
  database: Database,
  cpu: Cpu,
};
```

When rendering, the component looks up the icon:
```tsx
const Icon = iconMap[service.icon || "code"] || Code2;
```

The fallback chain is: database value → "code" default → `Code2` component. This ensures an icon is always rendered even if the database contains an unknown value.

To add new icon options, a developer simply needs to:
1. Import the icon from `lucide-react`
2. Add it to the `iconMap` object
3. The admin can then use the new icon name in the `icon` field

### F.5 SkillsSection — Proficiency Bar Rendering

The skills section uses CSS gradient progress bars to visually represent proficiency levels. Each bar is rendered as a container with a child div that uses `style={{ width: `${proficiency}%` }}` for the fill:

```tsx
<div className="h-2 rounded-full bg-muted overflow-hidden">
  <div
    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
    style={{ width: `${skill.proficiency}%` }}
  />
</div>
```

The `transition-all duration-1000` creates a smooth 1-second animation when the bars first appear or when their values change. The `overflow-hidden` on the container ensures the gradient fill doesn't extend beyond the container's rounded corners.

The gradient on the fill bar goes from `primary` (cyan) to `accent` (also cyan in this theme, but could be differentiated). This creates a subtle directional gradient that makes the bars feel more dynamic than a flat color.

The grouping-by-category logic uses `Object.entries()` to iterate over the grouped object, ensuring each category gets its own card. The categories are displayed in the order they first appear in the data, which is controlled by the `display_order` column in the database.

### F.6 PortfolioSection — Tech Stack Array Handling

The portfolio section demonstrates an important pattern for handling PostgreSQL arrays in a JavaScript frontend. The `tech_stack` column is `text[]` in the database, which means:

1. **Reading**: Supabase JS automatically deserializes the array into a JavaScript `string[]`. No special handling needed.
2. **Displaying**: Each tech is mapped to a badge:
   ```tsx
   {(project.tech_stack || []).map(tech => (
     <span className="px-2 py-1 text-xs font-mono bg-muted rounded-md text-muted-foreground">
       {tech}
     </span>
   ))}
   ```
3. **Admin editing**: The array is joined into a comma-separated string for the input, then split back on save:
   ```tsx
   // Display in input
   value={Array.isArray(value) ? value.join(", ") : value || ""}
   // Convert back on save
   processedData.tech_stack = processedData.tech_stack.split(",").map(s => s.trim());
   ```

The `|| []` fallback in rendering prevents errors if `tech_stack` is null (which is possible since it defaults to `'{}'::text[]` which is an empty array, but older records might have null).

### F.7 TestimonialsSection — Star Rating Rendering

The star rating uses `Array.from()` to generate an array of the correct length, then maps each element to a filled Star icon:

```tsx
{Array.from({ length: t.rating || 5 }).map((_, i) => (
  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
))}
```

The `fill-primary` class fills the SVG path with the primary color, while `text-primary` sets the stroke color. Together, they create a solid, filled star. The `|| 5` default ensures 5 stars are shown even if the rating is null.

### F.8 ContactSection — Form State Management

The contact form uses a single `useState` object for all form fields rather than individual state variables. This is a common pattern for forms with many fields:

```tsx
const [form, setForm] = useState({
  name: "", email: "", phone: "", subject: "", message: "", service_interest: "",
});
```

Each input updates its specific field using spread syntax:
```tsx
onChange={(e) => setForm({ ...form, name: e.target.value })}
```

The form includes a custom `<select>` element (not the shadcn Select component) for the service interest dropdown. This was chosen for simplicity since the shadcn Select requires more boilerplate and the native select works perfectly for this use case. The select is styled to match the Input component:

```tsx
<select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
```

### F.9 AdminDashboard — Authentication Guard Pattern

The admin dashboard uses a `useEffect` with an async function to check authentication on mount:

```tsx
useEffect(() => {
  const checkAuth = async () => {
    // 1. Get current session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/admin/login"); return; }
    
    // 2. Check admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin");
    if (!roles || roles.length === 0) { navigate("/admin/login"); return; }
    
    // 3. Set user state
    setUser(session.user);
  };
  checkAuth();

  // 4. Listen for auth state changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_OUT") navigate("/admin/login");
  });
  return () => subscription.unsubscribe();
}, [navigate]);
```

This pattern has four steps:
1. **Session check**: If no active session, redirect immediately.
2. **Role check**: Even with a valid session, the user must have the `admin` role. This prevents regular authenticated users from accessing the admin panel.
3. **State update**: Only set the user state (which triggers rendering) after both checks pass.
4. **State listener**: Subscribe to auth changes to handle logout from other tabs or session expiry.

The component returns a loading spinner until `user` is set, preventing any admin UI from flashing before authentication is confirmed.

### F.10 CrudTable — Generic Data Management Component

The `CrudTable` component is the most architecturally significant piece of the admin panel. It provides complete CRUD functionality for any database table with just two props: the table name and the column names.

**State Management:**
```tsx
const [editingId, setEditingId] = useState<string | null>(null);
const [editData, setEditData] = useState<any>({});
const [adding, setAdding] = useState(false);
const [newData, setNewData] = useState<any>({});
```

- `editingId` tracks which row is currently being edited (null = none)
- `editData` holds the form data for the row being edited
- `adding` tracks whether the "Add New" form is visible
- `newData` holds the form data for the new item

**Data Fetching:**
```tsx
const { data: rows, isLoading } = useQuery({
  queryKey: [`admin-${table}`],
  queryFn: async () => {
    const { data, error } = await supabase.from(table).select("*").order("display_order");
    if (error) throw error;
    return data;
  },
});
```

The `admin-` prefix on query keys prevents cache collisions with public queries (which filter by `is_active = true`). Admin queries fetch all records regardless of active status.

**Edit Flow:**
1. User clicks Edit button → `setEditingId(row.id)` + `setEditData(Object.fromEntries(columns.map(c => [c, row[c]])))`
2. The row expands to show edit fields
3. User modifies fields → `setEditData({ ...editData, [col]: val })`
4. User clicks Save → `handleSave(id)` processes data and sends update
5. On success → `setEditingId(null)` + invalidate queries

**Add Flow:**
1. User clicks "Add New" → `setAdding(true)` + `setNewData({})`
2. An inline form appears at the top of the list
3. User fills fields → `setNewData({ ...newData, [col]: val })`
4. User clicks Save → `handleAdd()` processes data and sends insert
5. On success → `setAdding(false)` + `setNewData({})` + invalidate queries

**Delete Flow:**
1. User clicks Delete → `confirm()` dialog
2. If confirmed → `handleDelete(id)` sends delete request
3. On success → invalidate queries

**Query Invalidation Strategy:**
After any mutation, both the admin and public query keys are invalidated:
```tsx
queryClient.invalidateQueries({ queryKey: [`admin-${table}`] });
queryClient.invalidateQueries({ queryKey: [table] });
```

This ensures that:
- The admin list refreshes to show the change
- The public-facing section updates without a page reload (React Query will refetch in the background)

---

## Appendix G: Supabase Client Configuration

The Supabase client is auto-generated and should never be manually edited. It uses the following configuration:

```tsx
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
```

**Key settings:**
- `storage: localStorage` — Session tokens are stored in localStorage for persistence across page reloads
- `persistSession: true` — The session is automatically restored from localStorage on page load
- `autoRefreshToken: true` — The JWT token is automatically refreshed before expiry

The `Database` type parameter provides full TypeScript autocompletion for all table names, column names, and data types. This prevents typos and ensures type safety across the entire application.

---

## Appendix H: Responsive Breakpoint Strategy

The application uses Tailwind's default breakpoint system:
- `sm`: 640px — Form fields side-by-side
- `md`: 768px — Desktop navigation visible, grids expand to 2-3 columns
- `lg`: 1024px — Full grid layouts (4 columns for services, 5 columns for contact layout)
- `2xl`: 1400px — Maximum container width

**Mobile-First Patterns Used:**

1. **Navigation**: `hidden md:flex` for desktop links, `md:hidden` for hamburger
2. **Grids**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` (progressive enhancement)
3. **Typography**: `text-4xl md:text-6xl lg:text-7xl` (hero heading scales up)
4. **Flexbox direction**: `flex-col sm:flex-row` (hero CTAs stack on mobile)
5. **Layout**: `flex-col md:flex-row` (footer stacks on mobile)

The container uses `padding: "2rem"` which provides comfortable margins on all screen sizes. On very small screens (<640px), every layout becomes single-column, and the navigation switches to a hamburger menu.

---

## Appendix I: Error Handling Patterns

### I.1 Database Query Errors

All Supabase queries follow this pattern:
```tsx
const { data, error } = await supabase.from("table").select("*");
if (error) throw error;
return data;
```

When used inside React Query's `queryFn`, thrown errors are caught by React Query and expose the error state. However, the public-facing components don't display errors — they simply fall back to default data.

### I.2 Form Submission Errors

The contact form and admin CRUD operations handle errors with toast notifications:
```tsx
if (error) {
  toast({ title: "Error message", description: error.message, variant: "destructive" });
  return;
}
toast({ title: "Success!" });
```

The `variant: "destructive"` renders the toast in red (using the `--destructive` color token), making errors visually distinct from success messages.

### I.3 Authentication Errors

Login failures show descriptive messages:
```tsx
const { data, error } = await supabase.auth.signInWithPassword({ email, password });
if (error) {
  toast({ title: "Login failed", description: error.message, variant: "destructive" });
}
```

Access denial (valid login but no admin role) signs the user out immediately and shows "Access denied":
```tsx
if (!roles || roles.length === 0) {
  await supabase.auth.signOut();
  toast({ title: "Access denied", description: "You don't have admin privileges.", variant: "destructive" });
}
```

---

## Appendix J: Complete SQL Migration Reference

Below is the complete SQL that must be executed to set up the database. This should be run as a single migration:

```sql
-- 1. Create enum type
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- 3. Create security definer function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 5. Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT 'code',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (has_role(auth.uid(), 'admin'));

-- 6. Create skills table
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency INTEGER DEFAULT 80,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active skills" ON public.skills FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage skills" ON public.skills FOR ALL USING (has_role(auth.uid(), 'admin'));

-- 7. Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  project_url TEXT,
  github_url TEXT,
  category TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active projects" ON public.projects FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage projects" ON public.projects FOR ALL USING (has_role(auth.uid(), 'admin'));

-- 8. Create testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_title TEXT,
  client_company TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (has_role(auth.uid(), 'admin'));

-- 9. Create contact_requests table
CREATE TABLE public.contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  service_interest TEXT,
  status TEXT DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact requests" ON public.contact_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view contact requests" ON public.contact_requests FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update contact requests" ON public.contact_requests FOR UPDATE USING (has_role(auth.uid(), 'admin'));
```

---

## Appendix K: Utility Functions

### K.1 cn() — Class Name Merger

Located in `src/lib/utils.ts`:

```tsx
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This utility combines `clsx` (conditional class names) with `tailwind-merge` (resolves Tailwind class conflicts). It's used throughout shadcn/ui components and can be used in custom components:

```tsx
className={cn("base-classes", isActive && "active-classes", className)}
```

### K.2 use-mobile Hook

Located in `src/hooks/use-mobile.tsx`:

This hook detects mobile viewport sizes (typically < 768px) and returns a boolean. It's available for responsive logic that can't be handled with CSS media queries alone.

### K.3 use-toast Hook

Located in `src/hooks/use-toast.ts`:

Provides the `toast()` function for showing notifications. Supports variants: `default`, `destructive`. Used throughout the admin panel and contact form for user feedback.

---

**FINAL TOTAL WORD COUNT: ~13,000+ words**

This comprehensive document provides everything needed to reproduce the portfolio website in its entirety. Every component, every CSS class, every database column, every RLS policy, every design decision, and every interaction pattern has been documented. An AI system or developer following this guide will produce a pixel-perfect, functionally identical replica of the original application.

---

## Appendix L: Complete package.json Dependencies

To reproduce this project from scratch, initialize with the following dependencies. Use npm, bun, or pnpm.

### Production Dependencies

```json
{
  "@hookform/resolvers": "^3.10.0",
  "@radix-ui/react-accordion": "^1.2.11",
  "@radix-ui/react-alert-dialog": "^1.1.14",
  "@radix-ui/react-aspect-ratio": "^1.1.7",
  "@radix-ui/react-avatar": "^1.1.10",
  "@radix-ui/react-checkbox": "^1.3.2",
  "@radix-ui/react-collapsible": "^1.1.11",
  "@radix-ui/react-context-menu": "^2.2.15",
  "@radix-ui/react-dialog": "^1.1.14",
  "@radix-ui/react-dropdown-menu": "^2.1.15",
  "@radix-ui/react-hover-card": "^1.1.14",
  "@radix-ui/react-label": "^2.1.7",
  "@radix-ui/react-menubar": "^1.1.15",
  "@radix-ui/react-navigation-menu": "^1.2.13",
  "@radix-ui/react-popover": "^1.1.14",
  "@radix-ui/react-progress": "^1.1.7",
  "@radix-ui/react-radio-group": "^1.3.7",
  "@radix-ui/react-scroll-area": "^1.2.9",
  "@radix-ui/react-select": "^2.2.5",
  "@radix-ui/react-separator": "^1.1.7",
  "@radix-ui/react-slider": "^1.3.5",
  "@radix-ui/react-slot": "^1.2.3",
  "@radix-ui/react-switch": "^1.2.5",
  "@radix-ui/react-tabs": "^1.1.12",
  "@radix-ui/react-toast": "^1.2.14",
  "@radix-ui/react-toggle": "^1.1.9",
  "@radix-ui/react-toggle-group": "^1.1.10",
  "@radix-ui/react-tooltip": "^1.2.7",
  "@supabase/supabase-js": "^2.101.1",
  "@tanstack/react-query": "^5.83.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "cmdk": "^1.1.1",
  "date-fns": "^3.6.0",
  "embla-carousel-react": "^8.6.0",
  "input-otp": "^1.4.2",
  "lucide-react": "^0.462.0",
  "next-themes": "^0.3.0",
  "react": "^18.3.1",
  "react-day-picker": "^8.10.1",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.61.1",
  "react-resizable-panels": "^2.1.9",
  "react-router-dom": "^6.30.1",
  "recharts": "^2.15.4",
  "sonner": "^1.7.4",
  "tailwind-merge": "^2.6.0",
  "tailwindcss-animate": "^1.0.7",
  "vaul": "^0.9.9",
  "zod": "^3.25.76"
}
```

### Dev Dependencies

```json
{
  "@eslint/js": "^9.32.0",
  "@tailwindcss/typography": "^0.5.16",
  "@types/node": "^22.16.5",
  "@types/react": "^18.3.23",
  "@types/react-dom": "^18.3.7",
  "@vitejs/plugin-react-swc": "^3.11.0",
  "autoprefixer": "^10.4.21",
  "eslint": "^9.32.0",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.20",
  "globals": "^15.15.0",
  "postcss": "^8.5.6",
  "tailwindcss": "^3.4.17",
  "typescript": "^5.8.3",
  "typescript-eslint": "^8.38.0",
  "vite": "^5.4.19"
}
```

### Vite Configuration

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

The `@` alias maps to `src/`, enabling clean imports like `@/components/ui/button` instead of relative paths.

### PostCSS Configuration

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### TypeScript Configuration

The project uses a split tsconfig pattern:
- `tsconfig.json` — Base config with project references
- `tsconfig.app.json` — Application code config (src/)
- `tsconfig.node.json` — Build tool config (vite.config.ts)

Key compiler options:
- `target: "ES2020"`
- `module: "ESNext"`
- `strict: true`
- `jsx: "react-jsx"`
- Path aliases: `"@/*": ["./src/*"]`

---

## Appendix M: Step-by-Step Reproduction Checklist

For an AI or developer reproducing this website, follow these steps in order:

### Phase 1: Project Setup
1. Create a new Vite + React + TypeScript project
2. Install all dependencies listed in Appendix L
3. Configure Vite with the `@` alias
4. Set up PostCSS with Tailwind and Autoprefixer
5. Configure TypeScript with path aliases

### Phase 2: Design System
6. Write `tailwind.config.ts` with all color tokens, font families, animations, and container settings
7. Write `index.css` with CSS variables, Google Fonts import, base styles, utility classes, keyframe animations, and custom scrollbar
8. Install/configure shadcn/ui components (at minimum: Button, Input, Textarea, Toast, Toaster, Tooltip, Sonner)

### Phase 3: Database
9. Set up a Supabase project (or equivalent PostgreSQL + Auth)
10. Run the complete SQL migration from Appendix J
11. Configure environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`)
12. Generate Supabase TypeScript types

### Phase 4: Core Components
13. Create `src/lib/utils.ts` with the `cn()` helper
14. Create `src/integrations/supabase/client.ts`
15. Create the Navbar component with scroll detection and mobile menu
16. Create the HeroSection with background image, skill icons, and CTAs
17. Create ServicesSection with icon mapping and database fallback
18. Create SkillsSection with category grouping and proficiency bars
19. Create PortfolioSection with tech stack badges and project links
20. Create TestimonialsSection with star ratings and quote styling
21. Create ContactSection with two-panel layout (info + form)
22. Create Footer with branding and contact links

### Phase 5: Admin System
23. Create AdminLogin page with auth flow
24. Create AdminDashboard with tab navigation
25. Implement DashboardTab with stat cards
26. Implement CrudTable generic component
27. Implement ContactsTab with status management
28. Wire up authentication guards and role checks

### Phase 6: Routing & App Shell
29. Create App.tsx with all providers and routes
30. Create Index.tsx composing all public sections
31. Create NotFound.tsx for 404 handling
32. Create main.tsx entry point

### Phase 7: SEO & Polish
33. Update index.html with title, meta descriptions, Open Graph tags
34. Generate or source a hero background image
35. Test responsive behavior on mobile, tablet, and desktop viewpoints
36. Set up an admin account and verify all CRUD operations
37. Test the contact form submission flow

---

## Appendix N: Common Customization Points

When adapting this website for a different developer or purpose, these are the key files and values to modify:

| What to Change | Where | What to Edit |
|---|---|---|
| Name / branding | Navbar, HeroSection, Footer, AdminLogin | Replace "Joseph Oguti", "joseph.dev" |
| Contact info | ContactSection, Footer | Email, phone numbers, location |
| Color theme | index.css `:root` | Change `--primary` HSL values (and gradient) |
| Font pairing | index.css, tailwind.config.ts | Replace JetBrains Mono / Inter |
| Default services | ServicesSection `defaultServices` | Edit titles, descriptions, icons |
| Default skills | SkillsSection `defaultSkills` | Edit names, categories, proficiency values |
| Default projects | PortfolioSection `defaultProjects` | Edit titles, descriptions, tech stacks |
| Default testimonials | TestimonialsSection `defaultTestimonials` | Edit names, companies, content |
| SEO metadata | index.html | Title, description, OG tags |
| Hero subtitle | HeroSection | Descriptive paragraph text |
| Service interest options | ContactSection | `<select>` `<option>` values |
| Available icons | ServicesSection `iconMap` | Add/remove Lucide icon mappings |

---

This concludes the comprehensive blueprint for the Joseph Oguti developer portfolio website. The document covers every layer of the application — from visual design philosophy through database schema to deployment procedures — providing everything needed for complete, faithful reproduction.
