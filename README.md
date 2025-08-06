## Table of Contents

[Getting Started](#getting-started)
[Redirects](#redirects)
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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
