# Portfolio Prime API Reference

Default local base URL: `http://127.0.0.1:4000/api`

## Environment

- `MONGO_URL`: MongoDB connection string
- `PORT`: API port, defaults to `4000`
- `CORS_ORIGIN`: allowed origin for browser requests, defaults to `*`

All write routes expect a JSON object body. Public `contact` and `chat` routes validate and trim incoming input before the controller/service layer runs.

## Health

- `GET /server`

## Profiles

- `GET /profile` - latest active profile used across home, about, contact, header, and footer
- `GET /portfolio/profile` - alias of `GET /profile`
- `GET /profiles` - list all active profiles
- `GET /profiles/:id` - get one profile by Mongo `_id`
- `POST /profiles` - create profile
- `PATCH /profiles/:id` - update profile
- `DELETE /profiles/:id` - soft-delete profile

Full seed example:

```json
{
  "fullName": "Omid Teimory",
  "jobTitle": "Frontend / Full-Stack Developer",
  "headline": "I build fast, modern web applications that help businesses grow.",
  "shortBio": "Frontend / Full-Stack Developer in Vienna, Austria building fast, production-ready web apps with React, Next.js, Node.js, and MongoDB.",
  "longBio": "I build fast, modern web applications that help businesses grow by combining polished frontend work with reliable backend structure.",
  "heroBadge": "Currently building",
  "headerBannerText": "Available for full-time roles immediately",
  "headerAvailabilityText": "Interviewing for frontend and full-stack roles",
  "headerContactCtaLabel": "Hire Me",
  "availabilityText": "Available for full-time roles immediately",
  "currentFocus": "Building production-ready web apps with clear UI and reliable backend support",
  "homeEyebrow": "Frontend / Full-Stack Developer",
  "homeTitle": "I build fast, modern web applications that help businesses grow.",
  "homeDescription": "Frontend / Full-Stack Developer (React, Next.js, Node.js)",
  "homeAvailabilityNote": "Vienna, Austria - Available for full-time roles immediately",
  "homeSupportText": "Open to freelance and contract work in the coming months",
  "homeFeaturedTitle": "Building production-ready web apps with clear UI and reliable backend support",
  "homeFeaturedDescription": "Currently building",
  "homeStrengthsTitle": "Core strengths",
  "homeStrengthsText": "React, Next.js, Tailwind CSS, Node.js, MongoDB, and production-ready UI systems.",
  "homeNextStepTitle": "Next step",
  "homeNextStepText": "I build with frontend quality first, then support it with backend structure, APIs, and data flows that keep the product fast, reliable, and maintainable.",
  "homeSectionEyebrow": "What I Do",
  "homeSectionTitle": "I build complete web applications from frontend to backend.",
  "homeSectionDescription": "I focus on speed, clarity, and real-world usability so the product feels polished for users and easy to maintain for the team.",
  "homeSectionItems": [
    "Modern frontend development with React and Next.js",
    "Backend APIs and authentication systems with Node.js",
    "Clean, scalable architecture for real-world applications"
  ],
  "homeInfoCards": [
    {
      "title": "Frontend first",
      "text": "I start with the interface, because clear layout and content make the rest easier."
    },
    {
      "title": "Backend aware",
      "text": "I connect the frontend to the systems behind it without turning the experience into an afterthought."
    }
  ],
  "homeWorkflowTitle": "How I Work",
  "homeWorkflowDescription": "I focus on building clear, fast, and maintainable applications from idea to production.",
  "homeStatusTitle": "Status",
  "homeStatusDescription": "Currently building real-world full-stack applications and actively seeking opportunities in Austria.",
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
    { "label": "Current focus", "value": "Building production-ready web apps with clear UI and reliable backend support" }
  ],
  "aboutCards": [
    { "label": "Primary stack", "value": "React, Next.js, Tailwind CSS, Node.js, MongoDB" },
    { "label": "Working style", "value": "Fast, practical, and production-focused" }
  ],
  "aboutParagraphs": [
    {
      "content": "I build complete web applications from idea to launch, starting with a clear frontend and the simplest useful user flow."
    },
    {
      "content": "When a project needs more than good visuals, I connect the interface to APIs, authentication, and data flows without making the product feel heavy."
    }
  ],
  "aboutIntroTitle": "About Omid Teimory",
  "aboutIntroDescription": "A short look at how Omid Teimory builds fast, production-ready web applications.",
  "aboutSectionTitle": "I build fast, modern web applications that help businesses grow.",
  "aboutProcessEyebrow": "How I work",
  "aboutProcessTitle": "Clear process, thoughtful implementation, and room to grow",
  "aboutProcessDescription": "I start by clarifying the goal, then build the smallest useful version of the experience and shape the technical layer around that.",
  "navigationLinks": [
    { "label": "Home", "to": "/" },
    { "label": "About", "to": "/about" },
    { "label": "Projects", "to": "/projects" },
    { "label": "Contact", "to": "/contact" }
  ],
  "footerText": "© 2026 Omid Teimory. All rights reserved.",
  "homePrimaryCtaLabel": "View Projects",
  "homePrimaryCtaUrl": "/projects",
  "homeSecondaryCtaLabel": "Hire Me",
  "homeSecondaryCtaUrl": "/contact",
  "contactIntroEyebrow": "Start here",
  "contactIntroTitle": "Tell me what you want to build",
  "contactIntroDescription": "The fastest way to get a useful reply is to include the goal of the project, the expected timeline, and any constraints you already know about.",
  "contactFormTitle": "Project inquiry",
  "contactPanelTitle": "Contact Information",
  "contactPanelDescription": "Reach out through the form or use one of the direct channels below if you prefer a quicker intro before sharing the details."
}
```

Patch example:

```json
{
  "headerBannerText": "Open for selected full-stack roles",
  "homeTitle": "I build products that look sharp and ship cleanly.",
  "homeInfoCards": [
    {
      "title": "Shipping mindset",
      "text": "I aim for the smallest useful version first, then refine."
    }
  ],
  "aboutProcessDescription": "I move from clarified product goals into fast implementation and keep the code easy to maintain.",
  "contactPanelDescription": "Email or call if you want a faster intro before sending a full brief."
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

Canonical response fields are `shortDescription`, `techStack`, `coverImage`, `showcaseImages`, `repositoryUrl`, and `liveDemoUrl`.

Create example:

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

Patch example:

```json
{
  "featured": true,
  "sortOrder": 1,
  "status": "published",
  "highlightQuote": "Structured content made the frontend much easier to maintain."
}
```

## Resume

- `GET /resume` - latest active resume for the website
- `GET /resumes` - list all active resumes
- `GET /resumes/:id` - get resume by Mongo `_id`
- `POST /resumes` - create resume
- `PATCH /resumes/:id` - update resume
- `DELETE /resumes/:id` - soft-delete resume

Create example:

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

Patch example:

```json
{
  "headline": "Frontend / Full-Stack Developer",
  "summary": "Updated summary text for a frontend-first full-stack positioning.",
  "skillGroups": [
    {
      "title": "Frontend",
      "items": ["React", "Next.js", "Tailwind CSS", "JavaScript", "Accessibility"],
      "sortOrder": 1
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

Patch example:

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

Patch example:

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
- For project detail routes, `:identifier` accepts the numeric `projectId`, the `slug`, or the Mongo `_id`
