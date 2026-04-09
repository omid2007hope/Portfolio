# Portfolio Prime

Portfolio Prime is a full-stack portfolio platform built with Next.js, Express, and MongoDB. The frontend renders portfolio content from the backend API, while the backend manages profiles, projects, resume data, contact submissions, and chat conversations.

## System Overview

```text
[ User (Browser) ]
          |
          v
[ Next.js Frontend (App Router) ]
          |
          v
[ API Client (Frontend/src/lib/api.js) ]
          |
          v
[ Express Backend (/api) ]
          |
          v
[ Controllers ]
          |
          v
[ Services ]
          |
          v
[ MongoDB (Mongoose Models) ]
```

In short:

- UI requests data from the API.
- Express routes pass requests to controllers.
- Controllers delegate business logic to services.
- Services read and write MongoDB through Mongoose models.
- Responses flow back to the frontend and get rendered into pages.

## Top-Level Structure

```text
Portfolio Prime/
|
|-- Frontend/              Next.js application
|-- Backend/               Express API and MongoDB access
|-- For_Ai_Read_Only/      Architecture notes and AI guidance
|-- deploy/
|   `-- nginx/             Deployment server config
`-- License
```

## Frontend Architecture

The frontend lives in `Frontend/` and uses Next.js App Router.

### Main Responsibilities

- Render the public portfolio website
- Fetch profile, projects, resume, contact, and chat data from the backend
- Generate metadata and structured SEO content on the server
- Handle interactive features such as the contact form and chat UI

### Frontend Structure

```text
Frontend/
|-- src/
|   |-- app/               Route entrypoints, layout, metadata files
|   |-- features/          Page-level feature modules
|   |-- components/        Shared UI, layout, and SEO components
|   |-- lib/               API client and shared helpers
|   `-- utils/             Small utility helpers
|-- public/                Static public assets
|-- .env.example           Frontend environment template
`-- package.json
```

### Frontend Flow

```text
Route file in src/app
  -> fetches data with src/lib/api.js
  -> passes data into a feature component
  -> feature composes shared UI components
  -> page is rendered
```

### Important Frontend Areas

- `src/app`
  - Defines routes like `/`, `/about`, `/projects`, `/projects/[slug]`, `/resume`, and `/contact`
  - Includes `layout.js`, `sitemap.js`, `robots.js`, and other metadata files
- `src/features`
  - Organizes the app by domain: `home`, `about`, `projects`, `resume`, `contact`, `chat`
  - Each feature owns its page composition and related subcomponents
- `src/components`
  - Reusable building blocks
  - `layout/` contains shared layout pieces like the header and footer
  - `ui/` contains generic presentational components
  - `seo/` contains JSON-LD helpers
- `src/lib`
  - `api.js` is the frontend gateway to the backend
  - `seo.js` builds metadata and SEO structures

## Backend Architecture

The backend lives in `Backend/` and is built with Express and Mongoose.

### Main Responsibilities

- Expose REST API endpoints under `/api`
- Validate and sanitize incoming data
- Handle business logic for portfolio content
- Persist and retrieve data from MongoDB
- Provide both unversioned and `/v1` route support

### Backend Structure

```text
Backend/
|-- Server.js              Express app entrypoint
|-- config/                Environment and database config
|-- routes/                Route wiring
|-- controller/            HTTP handlers
|-- services/              Business logic
|-- model/                 Mongoose schemas and model exports
|-- middleware/            Validation, request, and error middleware
|-- utils/                 Shared backend helpers
|-- tests/                 API and service tests
|-- API_REFERENCE.md       Endpoint documentation
`-- package.json
```

### Backend Flow

```text
Incoming request
  -> route
  -> controller
  -> service
  -> model
  -> response
```

### Important Backend Areas

- `Server.js`
  - Loads environment variables
  - Creates the Express app
  - Applies middleware
  - Mounts routes
  - Connects to MongoDB
  - Exports the app for testing
- `routes/`
  - `index.js` mounts health routes plus both unversioned and `/v1` API routes
  - `versionOne/` groups resource routers
  - Each resource folder is split by HTTP method
- `controller/`
  - Reads request input
  - Calls services
  - Returns HTTP responses
- `services/`
  - Contains the main business logic
  - Shapes backend data into frontend-friendly responses
- `model/version_1/`
  - Defines the Mongoose models for:
    - profile
    - project
    - resume
    - contact submission
    - chat conversation
- `middleware/`
  - `request/` for request-level middleware such as CORS
  - `validation/` for sanitizing and validating input
  - `error/` for 404 and centralized error handling

## Strategic Docs

The `For_Ai_Read_Only/` folder contains guidance files used to preserve structure and code quality during future work.

### Contents

- `Logic.md` defines development preferences and coding expectations
- `Router.md` documents the target backend route architecture
- `BetterAndCleaner_*.md` captures refactor direction
- `*_Doplication.md` highlights duplication concerns to clean up later

This folder is documentation, not runtime application code.

## Deployment

`deploy/nginx/` is reserved for production server configuration such as reverse proxy rules and future SSL/domain setup.

## Main Features

- Backend-driven profile content
- Projects listing and project detail pages
- Resume page backed by API data
- Public contact submission flow
- Portfolio chat flow
- SEO metadata, sitemap, robots, and structured data

## API Surface

Base local API URL:

```text
http://127.0.0.1:4000/api
```

Main endpoint groups:

- `GET /server`
- `GET /profile`
- `GET /projects`
- `GET /resume`
- `POST /contact`
- `POST /chat`

The backend also supports versioned routes such as:

- `/api/v1/profile`
- `/api/v1/projects`
- `/api/v1/resume`
- `/api/v1/contact`
- `/api/v1/chat`

For full request and payload examples, see `Backend/API_REFERENCE.md`.

## Local Development

### Requirements

- Node.js 18+
- npm
- MongoDB connection string

### 1. Install Dependencies

Frontend:

```bash
cd Frontend
npm install
```

Backend:

```bash
cd Backend
npm install
```

### 2. Configure Environment

Frontend `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:4000/api
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=
YANDEX_SITE_VERIFICATION=
```

Backend environment:

```bash
MONGO_URL=your_mongodb_connection_string
PORT=4000
CORS_ORIGIN=*
```

### 3. Run the Project

Backend:

```bash
cd Backend
npm run dev
```

Frontend:

```bash
cd Frontend
npm run dev
```

## Testing

Backend:

```bash
cd Backend
npm test
```

Frontend:

```bash
cd Frontend
npm test
```

## Notes

- The frontend is organized well around route -> feature -> shared component boundaries.
- The backend follows a controller -> service -> model flow, which keeps responsibilities separated.
- A few folders currently appear unused or empty and may be candidates for cleanup later:
  - `Backend/api`
  - `Backend/database`
  - `Backend/models`
  - `Backend/view`
  - `Frontend/src/services`

## Mental Model

Think of the app like this:

- Frontend = interface
- Backend = engine
- Services = brain
- Database = memory
- `For_Ai_Read_Only` = strategy
