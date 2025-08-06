import { sanityClient } from "../sanity/client";

export async function getRedirects() {
  const redirects = await sanityClient.fetch(`
    *[_type == "redirect"]{
      "source": source.current,
      permanent,
      destinationSlug,
      destinationPage->{
        "slug": slug.current
      }
    }  
  `);

  return redirects
    .map((redirect: any) => {
      const destination = redirect.destinationPage?.slug
        ? `/${redirect.destinationPage.slug}`
        : redirect.destinationSlug?.current;

      if (!destination) return null;

      return {
        source: redirect.source,
        destination,
        permanent: redirect.permanent ?? true,
      };
    })
    .filter(Boolean);
}
