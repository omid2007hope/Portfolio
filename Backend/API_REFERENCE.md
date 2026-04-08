# Portfolio Prime API Reference

Default local base URL: `http://127.0.0.1:4000/api`

## Environment

- `MONGO_URL`: MongoDB connection string
- `PORT`: API port, defaults to `4000`
- `CORS_ORIGIN`: allowed origin for browser requests, defaults to `*`

All write routes expect a JSON object body. Public `contact` and `chat` routes now validate and trim incoming input before the controller/service layer runs.

## Health

- `GET /server`

## Profiles

- `GET /profile` - latest active profile for the website
- `GET /portfolio/profile` - alias of `GET /profile`
- `GET /profiles` - list all active profiles
- `GET /profiles/:id` - get one profile by Mongo `_id`
- `POST /profiles` - create profile
- `PATCH /profiles/:id` - update profile
- `DELETE /profiles/:id` - soft-delete profile

Create/update example:

```json
{
  "fullName": "Omid Teimory",
  "jobTitle": "Frontend / Full-Stack Developer",
  "headline": "I build fast, modern web applications that help businesses grow.",
  "shortBio": "Frontend / Full-Stack Developer in Vienna, Austria building fast, production-ready web apps with React, Next.js, Node.js, and MongoDB.",
  "longBio": "I build fast, modern web applications that help businesses grow.",
  "heroBadge": "Currently building",
  "availabilityText": "Available for full-time roles immediately",
  "currentFocus": "Building production-ready web apps with clear UI and reliable backend support",
  "location": "Vienna, Austria",
  "address": "Vienna 1120, Austria",
  "email": "omidhope2007@gmail.com",
  "phoneNumber": "+43 681-81580180",
  "portfolioUrl": "https://omidteimory.com",
  "primaryStack": "React, Next.js, Tailwind CSS, Node.js, MongoDB",
  "openToWork": true,
  "portraitImage": "https://images.example.com/me.jpg",
  "logoImage": "https://images.example.com/logo.png",
  "heroSkills": ["React", "Next.js", "Tailwind CSS", "Node.js"],
  "spokenLanguages": ["English", "German", "Persian"],
  "socialLinks": [
    {
      "name": "GitHub",
      "iconKey": "github",
      "url": "https://github.com/omid2007hope"
    },
    {
      "name": "LinkedIn",
      "iconKey": "linkedin",
      "url": "https://www.linkedin.com/in/omid-teimory-48233638b/"
    }
  ],
  "highlights": [
    { "label": "Based in", "value": "Vienna, Austria" },
    { "label": "Primary stack", "value": "React, Next.js, Tailwind CSS, Node.js, MongoDB" },
    { "label": "Current focus", "value": "Frontend-led product work with backend architecture support" }
  ],
  "aboutCards": [
    { "label": "Primary stack", "value": "React, Next.js, Tailwind CSS, Node.js, MongoDB" },
    { "label": "Current focus", "value": "Frontend-led product work with backend architecture support" }
  ],
  "aboutParagraphs": [
    {
      "content": "I build full-stack web products with a frontend-first mindset, combining polished interfaces with maintainable backend architecture."
    },
    {
      "content": "My goal is to deliver strong product UI while supporting it with backend structure, APIs, and reliability."
    }
  ],
  "navigationLinks": [
    { "label": "Home", "to": "/" },
    { "label": "About", "to": "/about" },
    { "label": "Projects", "to": "/projects" },
    { "label": "Contact", "to": "/contact" }
  ],
  "footerText": "© 2026 Omid Teimory. All rights reserved.",
  "homePrimaryCtaLabel": "View Projects",
  "homePrimaryCtaUrl": "https://omidteimory.com",
  "homeSecondaryCtaLabel": "Hire Me",
  "homeSecondaryCtaUrl": "/contact"
}
```

## Projects

- `GET /projects` - list published active projects
- `GET /projects?featured=true` - list featured published projects
- `GET /projects?includeAll=true` - list all active projects including drafts/archived
- `GET /projects?status=draft&includeAll=true` - filter by status
- `GET /projects/:identifier` - get by `projectId`, `slug`, or Mongo `_id`
- `POST /projects` - create project
- `PATCH /projects/:id` - update project by Mongo `_id`
- `DELETE /projects/:id` - soft-delete project

Create/update example:

```json
{
  "projectId": 1,
  "slug": "portfolio-prime",
  "title": "Portfolio Prime",
  "shortDescription": "Personal portfolio with case studies, resume, contact workflows, and AI chat.",
  "overview": "Portfolio Prime is a full-stack portfolio system built with Next.js, Express, and MongoDB.",
  "challengesAndSolutions": "The main challenge was replacing hardcoded UI content with structured backend data while keeping the experience polished.",
  "improvements": "Add authentication, image uploads, and a dashboard CMS for content management.",
  "highlightQuote": "Backend-driven content keeps the portfolio flexible and maintainable.",
  "role": "Full-Stack Developer",
  "duration": "3 Weeks",
  "status": "published",
  "featured": true,
  "techStack": ["Next.js", "React", "Express", "MongoDB", "Tailwind CSS"],
  "coverImage": {
    "url": "https://images.example.com/portfolio-cover.png",
    "alt": "Portfolio Prime cover image",
    "kind": "cover"
  },
  "showcaseImages": [
    {
      "url": "https://images.example.com/portfolio-screen-1.png",
      "alt": "Home page showcase",
      "kind": "showcase"
    },
    {
      "url": "https://images.example.com/portfolio-screen-2.png",
      "alt": "Projects page showcase",
      "kind": "showcase"
    }
  ],
  "actions": [
    {
      "label": "Live Demo",
      "url": "https://omidteimory.com",
      "kind": "liveDemo"
    },
    {
      "label": "Source Code",
      "url": "https://github.com/omid2007hope/Omid-Teimory",
      "kind": "source"
    }
  ],
  "repositoryUrl": "https://github.com/omid2007hope/Omid-Teimory",
  "liveDemoUrl": "https://omidteimory.com",
  "sortOrder": 1
}
```

## Resume

- `GET /resume` - latest active resume for the website
- `GET /resumes` - list all active resumes
- `GET /resumes/:id` - get resume by Mongo `_id`
- `POST /resumes` - create resume
- `PATCH /resumes/:id` - update resume
- `DELETE /resumes/:id` - soft-delete resume

Create/update example:

```json
{
  "profileName": "Omid Teimory",
  "headline": "Full-Stack Developer specialized in Frontend",
  "summary": "Full-stack developer specializing in frontend engineering with React, Next.js, Tailwind CSS, and clean product interfaces, backed by Node.js and backend architecture work.",
  "email": "omidhope2007@gmail.com",
  "phoneNumber": "+43 681-81580180",
  "address": "Vienna 1120, Austria",
  "avatarImage": "https://images.example.com/me-avatar.jpg",
  "importantLinks": [
    { "label": "Portfolio", "url": "https://omidteimory.com" },
    { "label": "GitHub", "url": "https://github.com/omid2007hope" },
    { "label": "LinkedIn", "url": "https://www.linkedin.com/in/omid-teimory-48233638b/" }
  ],
  "languages": ["English - Fluent", "German - Basic", "Persian - Native"],
  "certificates": [
    {
      "title": "IBM Web Development Fundamentals",
      "issuer": "IBM",
      "issuedAtLabel": "Oct 26, 2025",
      "score": "Passed",
      "credentialUrl": "https://credentials.example.com/ibm-web-dev"
    }
  ],
  "experience": [
    {
      "title": "Full-Stack Developer - Freelancer",
      "subtitle": "Independent",
      "period": "2024 - Present",
      "location": "Vienna, Austria",
      "description": "Building frontend-led web products with polished UI and supporting backend architecture.",
      "bullets": [
        "Built responsive interfaces with React and Tailwind CSS.",
        "Supported product delivery with APIs, backend workflows, and scalable architecture."
      ],
      "sortOrder": 1
    }
  ],
  "education": [
    {
      "title": "Full-Stack Web Development",
      "subtitle": "Self-Taught",
      "period": "2023 - Present",
      "location": "Online",
      "description": "Studying frontend and backend technologies through real-world projects.",
      "bullets": ["React", "Node.js", "MongoDB", "REST APIs"],
      "sortOrder": 1
    }
  ],
  "skillGroups": [
    {
      "title": "Frontend",
      "items": ["React", "Next.js", "Tailwind CSS", "JavaScript"],
      "sortOrder": 1
    },
    {
      "title": "Backend",
      "items": ["Node.js", "Express", "MongoDB"],
      "sortOrder": 2
    }
  ]
}
```

## Contact Submissions

- `POST /contact` - public contact form submit
- `GET /contacts` - list contact submissions
- `GET /contacts?status=new` - filter by status
- `GET /contacts/:id` - get one contact submission
- `PATCH /contacts/:id` - update status or message metadata
- `DELETE /contacts/:id` - soft-delete contact submission

Public submit example:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Portfolio project inquiry",
  "message": "Hi Omid, I would like to discuss a frontend project with you.",
  "source": "portfolio-contact-form"
}
```

Update contact example:

```json
{
  "status": "replied"
}
```

## Chat

- `POST /chat` - send a message and store conversation
- `GET /chats` - list active conversations
- `GET /chats?status=active` - filter chat conversations
- `GET /chat/:sessionId` - get one conversation
- `PATCH /chat/:sessionId` - update status or title
- `DELETE /chat/:sessionId` - soft-delete a conversation

Send message example:

```json
{
  "sessionId": "portfolio-test-session-1",
  "message": "Tell me about your latest projects"
}
```

Update chat example:

```json
{
  "title": "Project questions",
  "status": "closed"
}
```

## Notes For Postman

- For `POST` and `PATCH`, set `Content-Type: application/json`
- `DELETE` routes do not require a body
- For update/delete routes, use the Mongo `_id` returned from create/list responses
- For chat lookup/update/delete, use the `sessionId` value
