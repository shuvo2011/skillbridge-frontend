# SkillBridge Frontend 🎓

Next.js frontend for SkillBridge — a platform that connects students with expert tutors.

## Links

| | URL |
|--|-----|
| **Frontend Repo** | https://github.com/shuvo2011/skillbridge-frontend |
| **Backend Repo** | https://github.com/shuvo2011/skillbridge-backend |
| **Frontend Live** | https://skillbridge-frontend-beta.vercel.app |
| **Backend Live** | https://skillbridge-backend-alpha.vercel.app |
| **Demo Video** | https://drive.google.com/file/d/xxx/view |

## Test Credentials

### Admin
| Field    | Value                    |
|----------|--------------------------|
| Email    | rahim@skillbridge.com    |
| Password | Pa$$w0rd!                |

### Tutor
| Field    | Value                        |
|----------|------------------------------|
| Email    | omar.faruk@mailinator.com    |
| Password | Pa$$w0rd!                    |

### Student
| Field    | Value                        |
|----------|------------------------------|
| Email    | xufyqebi@mailinator.com      |
| Password | Pa$$w0rd!                    |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | App Router, SSR/SSG |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Radix UI + shadcn/ui | UI Components |
| Better Auth | Authentication |
| TanStack Form | Form management |
| Recharts | Charts & analytics |
| Zod | Schema validation |
| Cloudinary | Image uploads |
| Sonner | Toast notifications |
| SweetAlert2 | Confirmation dialogs |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/shuvo2011/skillbridge-frontend
cd skillbridge-frontend

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env

NEXT_PUBLIC_BACKEND_URL=http://localhost:5050
NEXT_PUBLIC_APP_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run the App

```bash
# Development
pnpm dev
```

App runs on `http://localhost:3000`

---

## Pages & Routes

### Public Routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, features, popular tutors, newsletter |
| `/tutors` | Browse tutors with filters |
| `/tutors/:id` | Tutor profile — details, reviews, book |
| `/about` | About SkillBridge |
| `/contact-us` | Contact form |
| `/terms` | Terms & Conditions |
| `/privacy` | Privacy Policy |
| `/login` | Login |
| `/register` | Register |

### Student Routes (Private)

| Route | Description |
|-------|-------------|
| `/dashboard` | Overview & stats |
| `/dashboard/bookings` | My bookings |
| `/dashboard/profile` | Edit profile |

### Tutor Routes (Private)

| Route | Description |
|-------|-------------|
| `/tutor/dashboard` | Sessions & stats |
| `/tutor/availability` | Set time slots |
| `/tutor/profile` | Edit tutor info |
| `/tutor/sessions` | View all sessions |

### Admin Routes (Private)

| Route | Description |
|-------|-------------|
| `/admin` | Dashboard & statistics |
| `/admin/users` | Manage users (ban/unban, feature tutors) |
| `/admin/bookings` | All bookings |
| `/admin/categories` | Manage categories |

---

## Project Structure

```
src/
├── actions/              # Server actions
│   ├── admin.action.ts
│   ├── availability.action.ts
│   ├── booking.action.ts
│   ├── category.action.ts
│   ├── student.action.ts
│   ├── tutor-category.action.ts
│   ├── tutor.action.ts
│   ├── update-profile-picture.ts
│   └── user.action.ts
├── app/
│   ├── (auth)/           # Login, Register
│   ├── (private)/        # Admin, Student, Tutor dashboards
│   └── (public)/         # Home, Tutors, About, Contact, etc.
├── components/
│   ├── common/           # Shared components (StatCard, Navbar, etc.)
│   ├── home/             # Home page sections
│   ├── layout/           # Dashboard layout, Sidebar, Topbar
│   ├── module/           # Feature modules (admin, student, tutor)
│   └── ui/               # shadcn/ui primitives
├── hooks/                # Custom React hooks
├── lib/
│   ├── auth-client.ts
│   ├── cloudinary.ts
│   ├── get-session.ts
│   └── utils.ts
├── services/             # API service functions
│   ├── admin.service.ts
│   ├── availability.service.ts
│   ├── booking.service.ts
│   ├── category.service.ts
│   ├── review.service.ts
│   ├── student.service.ts
│   ├── tutor-category.service.ts
│   ├── tutor.service.ts
│   └── user.service.ts
└── types/
    ├── category.type.ts
    └── tutor.types.ts
```