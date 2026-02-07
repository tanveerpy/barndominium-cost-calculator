---
description: Build a complete 10-article website with stunning UI and AdSense compliance.
---

# Autonomous Website Build Workflow

This workflow orchestrates the creation of a full-stack, content-rich website.

## Steps

1.  **Initialize Project** (If needed)
    - Check if Next.js is installed. If not, auto-run `npx create-next-app@latest . --typescript --tailwind --eslint`.

2.  **Design System Setup**
    - Create `components/ui` folder.
    - Install `lucide-react` `clsx` `tailwind-merge`.
    - Configure `tailwind.config.ts` with premium colors.

3.  **Core Components**
    - Build `Navbar` (Responsive).
    - Build `Footer` (With Privacy/Terms links for AdSense).
    - Build `AdPlaceholder` components.

4.  **Content Generation (The "Content Factory")**
    - Create `content/` directory.
    - **Generate 10 Articles**:
        - Topic research based on user input.
        - Write MDX files with frontmatter (title, date, author, excerpt).

5.  **Page Implementation**
    - `app/page.tsx`: Landing page with Hero and Feature Grid.
    - `app/blog/page.tsx`: Grid of articles.
    - `app/blog/[slug]/page.tsx`: Article reader with Ad slots.
    - `app/privacy/page.tsx` & `app/terms/page.tsx`: **Mandatory for AdSense**.

6.  **Final Polish**
    - Run linting.
    - Check build status.

// turbo-all
