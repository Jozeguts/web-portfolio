# Joseph Oguti - Full-Stack Developer Portfolio

A production-ready portfolio website for a full-stack developer, systems architect, and DevOps engineer. Built with React 18, TypeScript, Tailwind CSS, and Supabase.

**Live Blueprint Documentation:** See [Portfolio_Website_Blueprint.md](./Portfolio_Website_Blueprint.md) for complete specifications, design system, database schema, and implementation details.

## Features

✨ **Modern Design**
- Dark terminal-inspired aesthetic with cyan accents
- Responsive mobile-first design
- Smooth animations and transitions
- JetBrains Mono + Inter typography

🎨 **Public Portfolio**
- Hero section with skill highlights
- Services showcase with icon mapping
- Skills section with proficiency bars
- Project portfolio with tech stacks
- Client testimonials with ratings
- Contact form with email integration

🔐 **Admin Dashboard**
- Secure authentication with Supabase Auth
- Role-based access control (admin/user)
- Full CRUD management for:
  - Services
  - Skills
  - Projects
  - Testimonials
  - Contact requests
- Real-time updates to public site

🚀 **Performance & SEO**
- Vite for fast builds
- React Query for smart caching
- TypeScript for type safety
- Semantic HTML
- Meta tags & Open Graph support

---

## Quick Start

### Prerequisites
- Node.js 18+
- A Supabase account (free tier works)

### 1. Clone & Install

```bash
git clone <repo-url>
cd web-portfolio
npm install
```

### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration SQL from below
3. Go to **Settings > API** and copy:
   - Project URL → `VITE_SUPABASE_URL`
   - Publishable Key (anon key) → `VITE_SUPABASE_PUBLISHABLE_KEY`

### 3. Create Environment File

Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
```

### 4. Install UI Components

shadcn/ui components must be installed via their CLI:

```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init -y

# Install required components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add toaster
npx shadcn-ui@latest add tooltip
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## Database Setup

### SQL Migration

Run this in your Supabase SQL Editor:

```sql
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Security function
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

-- Services table
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

-- Skills table
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

-- Projects table
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

-- Testimonials table
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

-- Contact requests table
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

### Create Admin User

1. Sign up via `/admin/login`
2. In Supabase SQL Editor, run:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('<your-user-uuid>', 'admin');
```

Get `<your-user-uuid>` from Supabase Auth > Users table.

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx              # Fixed navigation
│   ├── HeroSection.tsx         # Landing hero
│   ├── ServicesSection.tsx     # Services grid
│   ├── SkillsSection.tsx       # Skills with bars
│   ├── PortfolioSection.tsx    # Project showcase
│   ├── TestimonialsSection.tsx # Reviews/testimonials
│   ├── ContactSection.tsx      # Contact form
│   ├── Footer.tsx              # Site footer
│   └── ui/                     # shadcn/ui components (auto-generated)
├── pages/
│   ├── Index.tsx               # Main portfolio page
│   ├── AdminLogin.tsx          # Admin auth
│   ├── AdminDashboard.tsx      # Admin management
│   └── NotFound.tsx            # 404 page
├── hooks/
│   └── use-mobile.tsx          # Mobile detection
├── integrations/
│   └── supabase/
│       ├── client.ts           # Supabase client
│       └── types.ts            # Database types
├── lib/
│   └── utils.ts                # Helper functions
├── App.jsx                     # Root component
├── main.tsx                    # Entry point
└── index.css                   # Global styles
```

---

## Design System

### Colors (Dark Theme)
- **Background:** `hsl(222 47% 6%)` - Deep navy
- **Foreground:** `hsl(210 40% 95%)` - Near white
- **Primary:** `hsl(185 72% 48%)` - Cyan accent
- **Card:** `hsl(222 44% 9%)` - Slightly lighter navy

### Fonts
- **Headings:** JetBrains Mono (monospace)
- **Body:** Inter (sans-serif)
- **Import:** Via Google Fonts (see index.html)

### Utilities
- `.text-gradient` - Cyan gradient text
- `.glow-border` - Cyan glow effect
- `.card-elevated` - Card shadow
- `.animate-float` - Floating animation
- `.animate-pulse-glow` - Pulsing glow

---

## Build & Deploy

### Build for Production

```bash
npm run build
```

Output in `dist/` folder.

### Deploy Options

#### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Any Static Host
1. `npm run build`
2. Upload `dist/` folder
3. Configure SPA routing (all routes → index.html)

### Environment on Production
Set environment variables in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

---

## Customization

### Change Creator Info
Edit these files:
- `src/components/Navbar.tsx` - Logo
- `src/components/HeroSection.tsx` - Name & subtitle
- `src/components/ContactSection.tsx` - Contact details
- `src/components/Footer.tsx` - Footer text

### Update Brand Colors
Edit `:root` CSS variables in `src/index.css`

### Add More Content
Use admin dashboard at `/admin/login` or edit `defaultServices`, `defaultSkills`, etc. in component files.

---

## Tech Stack

| Layer | Technologies |
|-------|---|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, CSS Variables |
| **Components** | shadcn/ui, Lucide Icons |
| **Routing** | React Router v6 |
| **State** | React Query, React Hooks |
| **Backend** | Supabase (PostgreSQL + Auth) |
| **Forms** | React Hook Form, Zod |

---

## Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` exists
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are set
- Restart dev server

### Admin login returns "Access denied"
- Ensure user_roles table has an entry with your user_id and 'admin' role
- Check that user exists in Supabase Auth

### Components not rendering
- Ensure shadcn/ui components are installed (`npx shadcn-ui@latest add ...`)
- Check imports use `@/` alias correctly

### Styles look wrong
- Verify Tailwind CSS is imported in `src/index.css`
- Check CSS variables are defined in `:root`
- Clear browser cache and restart dev server

---

## File References

- **[Portfolio_Website_Blueprint.md](./Portfolio_Website_Blueprint.md)** - Complete specifications & architecture
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Additional setup reference

---

## License

Private - Custom portfolio for Joseph Oguti

---

## Support

For complete specifications, design decisions, and detailed implementation guide, see [Portfolio_Website_Blueprint.md](./Portfolio_Website_Blueprint.md)
