## Table of Contents

[Getting Started](#getting-started)  
[Redirects](#redirects)  
[Managing Locales and Translations](#managing-locales-and-translations)  
[Multi-Site Setup](#multi-site-setup)  
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

#### 1. **Open the Redirects Section in Sanity**

- Log in to Sanity Studio.

- In the left menu, select Redirects.

- Click “Create new”.

#### 2. **Fill Out the Redirect Form**

- **Source Path**

  - This is the old URL that users are visiting.

  - Must start with a forward slash (/). Example:
    ```bash
    /old-blog-post
    ```

- **Destination**

  You can redirect to one of two types of destinations:

  1. Destination Page (Internal Reference)

     - Use this if the redirect should point to another page on our site.

     - Click “Select a page” and pick the new page.

  2. Destination Path (Manual Slug)

     - Use this if you want to redirect to a custom internal URL.

     - Must start with /. Example:

```bash
/new-blog-post
```

#### 3. External URL (Optional)

- If the redirect should point to an external website, enter the full URL:

```bash
http://example.com/new-page
```

Only one destination is required. If you select a page, you can leave the slug empty.

#### 4. **Set Permanent or Temporary Redirect**

- Permanent (301): Use if the old URL will never return. Recommended for SEO.
- Temporary (302): Use if the redirect is short-term.

#### 5. **Publish the Redirect**

- Click Publish in the bottom-right corner.
- Sanity will trigger a site rebuild.
- Your redirect will be active after the site deploys (usually within 30–60 seconds).

### Important Notes

- Redirects must start with / for internal pages.
- Only one destination is required.
- Changes go live after a site rebuild triggered by our Sanity webhook.
- Avoid redirect loops (don’t redirect a page to itself).

### Troubleshooting

- If the redirect doesn’t work immediately, wait for the Vercel deployment to finish.
- Check that the source path is correct and starts with /.
- If it still doesn’t work, contact the web team to verify the Sanity webhook and Next.js redirects.

## Managing Locales and Translations

This guide explains how to add new redirects, translations, and locales in the project.

### 1. Adding a new locale in Sanity

1. Open `deskStructure.ts`.
2. Add the new locale to the `locales` array:

```ts
const locales = [
  { id: "en-us", title: "English (US)" },
  { id: "es-us", title: "Spanish (US)" },
];
```

### 2. Add a new translation for a page

By default, new pages will automatically be set the en-US locale. To add a new translation for another locale, do the following:

1. Open the document you want to create a translation for.

2. Click the Locale Switcher (Translations) in the toolbar at the top of the document.

3. Select the desired locale.

4. A new document will be generated that automatically sets your locale in the document's locale property. Update as needed.

5. The desk structure groups pages by locale automatically (via the `locale` field in `parentChild`).

6. Once published, your document will be published under the locales `id` (`es-US/you-document-slug`).

Pages without a locale default to the `en-us` grouping in DeskStructure.

### 2. Add a new locale in NextJS

1. Open `lib/i18n.ts`.

2. Add the new locale to the `locales` array:

```ts
export const locales = [
  { id: "en-us", title: "English (US)" },
  { id: "es-us", title: "Spanish (US)" },
];
```

This will generate the a link for the locale under the global locale picker, and tell NextJS to generate the path for the locale.

## Mulit-Site Setup

This project supports multiple sites powered by Sanity Studio and Next.js 15. Each site is mapped to a hostname in middleware and automatically routed to its own `[site]/[locale]/` folder in the Next.js App Router.

### 1. Adding a new site in Sanity Studio

1. Open Sanity Studio and navigate to **Sites** (`site` document type).

2. Create a new document and fill out the required fields:

   - **Site Title** → Human-friendly name (e.g. `My Brand`).

   - **Identifier** → Unique slug that identifies this site (e.g. `my-brand`).

     - **IMPORTANT**: This value maps directly to the `[site]` in the NextJS folder structure and to `siteMapping` in middleware.

   - **Primary Domain** → The site's canonical domain (e.g. `https://my-brand.com`).
   - **Default Locale** → The fallback locale for this site (e.g. `en-us`).
   - All other fields should be self explanatory.

3. Publish the document.

   - Sanity will now expose this `site` for queries when fetching navigation, SEO or theme settings.

   Once published, the **Identifier** (`identifier.current`) becomes the key that connects Sanity → middleware → NextJS routes.

### 2. NextJS App Router Folder Structure

The app uses nested dynamic segments for **site** and **locale**.

```
app/
  [site]/            ← site identifier (from Sanity + middleware)
    [locale]/        ← locale prefix ("en-us", "fr-fr", etc.)
      [...slug]/     ← catch-all routes for pages
        page.tsx     ← actual page renderer
      layout.tsx     ← layout applied for all pages in this site/locale
```

#### How it works

- Middleware rewrites incoming requests to this structure.

- Example:

  - Visiting https://example.com/about → rewritten internally to /example/en-us/about.

  - `params.site = "example"`, `params.locale = "en-us"`.

- Pages and layouts fetch Sanity content scoped by `site` and `locale`.

### 2. Local Development for New Site

By default, localhost:3000 maps to whatever `SITE_ID` is set to.
To run a specific site locally, add a dev script to the root `package.json`:

```
"scripts": {
  "dev:newsite": "SITE_ID=new-site concurrently \"npm run dev:frontend\" \"npm run dev:studio\""
}
```

- Replace `new-site` with your site's identifier (from the Site settings in Studio).

- This runs both the **frontend** and **studio** together with the correct `SITE_ID`.

Run it with:

```
npm run dev:newsite
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
