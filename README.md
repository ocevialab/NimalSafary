# Nimal Safari — Website

Official website for **Nimal Safari**, a wildlife safari agency based in Tissamaharama, Sri Lanka. The site covers safari packages across Yala, Udawalawa, Bundala and Lunugamwehera National Parks, includes a blog, and features an admin dashboard for blog and payment management.

**Live site:** [https://nimalsafari.com](https://nimalsafari.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | GSAP 3 + Framer Motion |
| Database | SQLite via `better-sqlite3` |
| Auth | JWT (`jsonwebtoken`) + `bcryptjs` |
| Payments | OnePay (Sri Lanka) |
| Analytics | Google Analytics 4 (`@next/third-parties`) |
| Icons | `lucide-react`, `react-icons` |

---

## Project Structure

```
app/
├── page.tsx                      # Home page
├── layout.tsx                    # Root layout (Nav, Footer, GA4)
├── sitemap.ts                    # Auto-generated sitemap
├── robots.ts                     # Crawl rules for Google
│
├── safaris/                      # Safari packages listing
├── parks/
│   ├── yala/                     # Yala National Park page
│   ├── udawalawa/                # Udawalawa National Park page
│   ├── bundala/                  # Bundala National Park page
│   └── lunugamwehera/            # Lunugamwehera National Park page
│
├── blog/                         # Public blog listing
├── aboutus/                      # About Us page
├── contact/                      # Contact page
│
├── admin/
│   ├── login/                    # Admin login page
│   └── dashboard/
│       ├── blogs/                # Blog CRUD (list / create / edit)
│       └── payments/             # OnePay payment link management
│
├── api/
│   ├── auth/                     # login, logout, check
│   ├── blogs/                    # blog REST endpoints
│   ├── payments/                 # OnePay link creation & callback
│   └── upload/                   # Image upload handler
│
└── Components/                   # Shared UI components

data/
└── app.db                        # SQLite database (auto-created on first run)

public/                           # Static assets (images, icons, OG images)
```

---

## Local Development Setup

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later (or pnpm / yarn)

### 1. Clone the repository

```bash
git clone <repository-url>
cd namalsafariweb
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root. Copy the template below and fill in your values:

```env
# App
APP_ENV=development
NEXT_PUBLIC_APP_ENV=development
PUBLIC_APP_URL=http://localhost:3000

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password

# JWT (change this in production — use a long random string)
JWT_SECRET=your-secret-key-change-in-production

# Database (optional — defaults to ./data/app.db)
# DATABASE_PATH=

# OnePay payment gateway (sandbox credentials)
ONEPAY_APP_ID=your-onepay-app-id
ONEPAY_APP_TOKEN=your-onepay-app-token
ONEPAY_HASH_SALT=your-onepay-hash-salt
ONEPAY_ALLOW_HTTP_REDIRECT=1
```

> **Note:** The `data/` folder and `app.db` SQLite database are created automatically on the first server start. You do not need to run any migrations manually.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack (hot reload) |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint across the project |

---

## Admin Panel

### Login URL

```
http://localhost:3000/admin/login        (development)
https://nimalsafari.com/admin/login      (production)
```

### Credentials

Admin credentials are set via environment variables in `.env.local`:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<your-password>
```

> Never commit `.env.local` to version control. Credentials are managed entirely through environment variables — there is no seed file or default hard-coded password.

### Dashboard Features

After login you are redirected to `/admin/dashboard`. From there:

| Section | URL | What you can do |
|---|---|---|
| **Overview** | `/admin/dashboard` | See total blog count, quick-action links |
| **Blogs** | `/admin/dashboard/blogs` | View all published blog posts |
| **Create Blog** | `/admin/dashboard/blogs/create` | Write and publish a new blog post (with image upload) |
| **Edit Blog** | `/admin/dashboard/blogs/edit/[id]` | Edit or delete an existing post |
| **Payment Links** | `/admin/dashboard/payments` | List all OnePay payment links with status |
| **New Payment Link** | `/admin/dashboard/payments/create` | Generate a payment link for a customer booking |
| **Payment Detail** | `/admin/dashboard/payments/[id]` | View link details, copy URL, override status |

### Logging Out

Click the logout button in the admin sidebar, or navigate to `/api/auth/logout`.

---

## OnePay Payment Integration

Payments are processed via [OnePay Sri Lanka](https://onepay.lk). The flow is:

1. Admin creates a payment link from the dashboard → a unique shareable URL is generated.
2. Customer opens the link and pays via OnePay.
3. OnePay calls the webhook at `/api/payments/onepay/callback`.
4. Payment status is updated in the SQLite database (`PENDING` → `PAID` / `FAILED`).

### Webhook testing locally

OnePay cannot reach `http://localhost`. Use [ngrok](https://ngrok.com) for local end-to-end testing:

```bash
ngrok http 3000
```

Then update `PUBLIC_APP_URL` in `.env.local` to the ngrok HTTPS URL and configure the same URL as the webhook in the OnePay merchant portal.

---

## Production Deployment

### Environment variables to set on your server / hosting platform

```env
APP_ENV=production
NEXT_PUBLIC_APP_ENV=production
PUBLIC_APP_URL=https://nimalsafari.com

ADMIN_USERNAME=admin
ADMIN_PASSWORD=<strong-password>
JWT_SECRET=<long-random-secret>

ONEPAY_APP_ID=<live-app-id>
ONEPAY_APP_TOKEN=<live-app-token>
ONEPAY_HASH_SALT=<live-hash-salt>
# Remove ONEPAY_ALLOW_HTTP_REDIRECT in production
```

### Build & start

```bash
npm run build
npm run start
```

> The SQLite database file is stored at `./data/app.db` by default. Make sure this path is on a persistent volume (not ephemeral storage) when deploying to containerised environments like Docker or Railway.

---

## SEO

The following SEO features are implemented:

- **Per-page metadata** — unique title, description and keywords on every route
- **`metadataBase`** — ensures correct canonical and OG image URLs
- **Canonical URLs** — `alternates.canonical` set on all public pages
- **Open Graph & Twitter Cards** — full OG images and card metadata on every page
- **JSON-LD Structured Data** — `LocalBusiness`, `TouristTrip` (per park), `FAQPage` (home)
- **Dynamic sitemap** — auto-served at `/sitemap.xml`
- **robots.txt** — auto-served at `/robots.txt`, blocks `/admin/` and `/api/`
- **Google Analytics 4** — Measurement ID `G-VLXEQQL4J7`

### OG images

Place `1200 × 630 px` images in `/public/` with these exact filenames for social sharing previews:

| File | Used on |
|---|---|
| `og-home.jpg` | Home page |
| `og-safaris.jpg` | Safaris listing |
| `og-yala.jpg` | Yala park page |
| `og-udawalawa.jpg` | Udawalawa park page |
| `og-bundala.jpg` | Bundala park page |
| `og-lunugamwehera.jpg` | Lunugamwehera park page |
| `og-about.jpg` | About Us page |
| `og-blog.jpg` | Blog listing |
| `og-contact.jpg` | Contact page |

---

## Public Routes

| Route | Description |
|---|---|
| `/` | Home — hero, popular safaris, gallery, FAQ |
| `/safaris` | All safari packages |
| `/parks/yala` | Yala National Park |
| `/parks/udawalawa` | Udawalawa National Park |
| `/parks/bundala` | Bundala National Park |
| `/parks/lunugamwehera` | Lunugamwehera National Park |
| `/blog` | Blog listing |
| `/aboutus` | About Nimal Safari |
| `/contact` | Contact details and map |
| `/terms-and-conditions` | Terms & Conditions |
| `/privacy-policy` | Privacy Policy |
| `/refund-policy` | Refund Policy |
| `/sitemap.xml` | Auto-generated XML sitemap |
| `/robots.txt` | Crawler rules |

---

## Contact

- **Email:** nimalsafariyala@gmail.com
- **Phone / WhatsApp:** +94 76 762 7295
- **Location:** Tissamaharama, Southern Province, Sri Lanka
- **TripAdvisor:** [Nimal Safari on TripAdvisor](https://www.tripadvisor.com/Attraction_Review-g1102395-d5512904-Reviews-Nimal_Safari-Tissamaharama_Southern_Province.html)
