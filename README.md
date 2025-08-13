## Table of Contents

[Getting Started](#getting-started)  
[Redirects](#redirects)
[Adding New Locales](#adding-new-locales)  
[Additional Info](#learn-more)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend.

Open [http://localhost:3333](http://localhost:3333) with your browser to see the studio.

## Redirects

This guide explains how to create and manage redirects in our website using Sanity. Redirects ensure that users visiting an old URL are automatically sent to a new location, either on our site or an external site.

### When to Use a Redirect

- When a page is moved to a new URL.
- When a page is deleted or replaced.
- When you want to point users to a different page or an external link.

Redirects help prevent broken links and improve SEO.

### Steps to Create a Redirect

1️⃣ Open the Redirects Section in Sanity

- Log in to Sanity Studio.
- In the left menu, select Redirects.
- Click “Create new”.

2️⃣ Fill Out the Redirect Form
_Source Path_

- This is the old URL that users are visiting.
- Must start with a forward slash (/).  
  Example:
  ```bash
  /old-blog-post
  ```

_Destination_

You can redirect to one of two types of destinations:

1. Destination Page (Internal Reference)

- Use this if the redirect should point to another page on our site.
- Click “Select a page” and pick the new page.

2. Destination Path (Manual Slug)

- Use this if you want to redirect to a custom internal URL.
- Must start with /.  
  Example:
  ```bash
  /new-blog-post
  ```

3. External URL (Optional)

- If the redirect should point to an external website, enter the full URL:
  ```bash
  http://example.com/new-page
  ```

⚡ Only one destination is required. If you select a page, you can leave the slug empty.

3️⃣ Set Permanent or Temporary Redirect

- Permanent (301): Use if the old URL will never return. Recommended for SEO.
- Temporary (302): Use if the redirect is short-term.

4️⃣ Publish the Redirect

- Click Publish in the bottom-right corner.
- Sanity will trigger a site rebuild.
- Your redirect will be active after the site deploys (usually within 30–60 seconds).

## Adding New Locales

This guide explains how to add a new language locale to the project, configure routing, and ensure the pages and links work correctly.

### 1. Update i18n Configuration

Edit frontend/lib/i18n.ts:

```ts
export const locales = [
  { id: "en-us", title: "English (US)" },
  { id: "es-us", title: "Spanish (US)" },
  // Add new locale here
  { id: "fr-fr", title: "French (FR)" },
];

export const defaultLocale = "en-us";

export function isValidLocale(locale: string): boolean {
  return locales.some((loc) => loc.id === locale);
}
```

- id: the locale code used in URLs (e.g., /fr-fr/...).

- title: the human-readable name for UI and navigation.

### Important Notes

- Redirects must start with / for internal pages.
- Only one destination is required.
- Changes go live after a site rebuild triggered by our Sanity webhook.
- Avoid redirect loops (don’t redirect a page to itself).

### Troubleshooting

- If the redirect doesn’t work immediately, wait for the Vercel deployment to finish.
- Check that the source path is correct and starts with /.
- If it still doesn’t work, contact the web team to verify the Sanity webhook and Next.js redirects.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
