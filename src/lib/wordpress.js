const WP_GRAPHQL_URL = import.meta.env.VITE_WP_GRAPHQL_URL;

export async function fetchGraphQL(query, variables = {}) {
  const response = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error('GraphQL errors:', json.errors);
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

export async function getPageBySlug(slug) {
  const data = await fetchGraphQL(`
    query GetPage($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        content
        slug
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
          opengraphImage
          canonical
        }
        pageSections {
          title
          sectionId
          sectionData
          order
        }
      }
    }
  `, { slug });

  return data?.page;
}

export async function getAllPages() {
  const data = await fetchGraphQL(`
    query GetAllPages {
      pages(first: 100) {
        nodes {
          title
          slug
          seo {
            title
            metaDesc
          }
        }
      }
    }
  `);

  return data?.pages?.nodes || [];
}

export async function getFaqs(category = null) {
  const variables = {};
  let categoryFilter = '';

  if (category) {
    categoryFilter = ', where: { taxQuery: { taxArray: [{ taxonomy: FAQCATEGORY, terms: [$category], field: SLUG }] } }';
    variables.category = category;
  }

  const data = await fetchGraphQL(`
    query GetFAQs${category ? '($category: String!)' : ''} {
      faqs(first: 100${categoryFilter}) {
        nodes {
          title
          content
          order
          faqCategories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `, variables);

  const nodes = data?.faqs?.nodes || [];
  return nodes.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getBlogPosts(first = 10, after = null) {
  const data = await fetchGraphQL(`
    query GetPosts($first: Int!, $after: String) {
      posts(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          title
          slug
          excerpt
          date
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
          seo {
            title
            metaDesc
            opengraphTitle
            opengraphDescription
            opengraphImage
          }
        }
      }
    }
  `, { first, after });

  return data?.posts;
}

export async function getBlogPostBySlug(slug) {
  const data = await fetchGraphQL(`
    query GetPost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        content
        date
        modified
        excerpt
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
          opengraphImage
          canonical
        }
      }
    }
  `, { slug });

  return data?.post;
}

export async function getCategories() {
  const data = await fetchGraphQL(`
    query GetCategories {
      categories(first: 100) {
        nodes {
          name
          slug
          count
        }
      }
    }
  `);

  return data?.categories?.nodes || [];
}

export async function getSiteSettings() {
  const data = await fetchGraphQL(`
    query GetSiteSettings {
      siteSettings {
        siteName
        siteDescription
        logo
        footerText
        socialLinks
      }
    }
  `);

  return data?.siteSettings;
}

export async function getRelatedPosts(categorySlug, excludeSlug, count = 3) {
  const data = await fetchGraphQL(`
    query GetRelatedPosts($count: Int!) {
      posts(first: $count, where: { categoryName: "${categorySlug}" }) {
        nodes {
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `, { count: count + 1 });

  const posts = data?.posts?.nodes || [];
  return posts.filter(p => p.slug !== excludeSlug).slice(0, count);
}

export async function getPageSections(pageSlug) {
  const page = await getPageBySlug(pageSlug);
  const sections = (page?.pageSections || [])
    .map((section) => ({
      ...section,
      sectionData: section.sectionData ? JSON.parse(section.sectionData) : null,
    }))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return { sections, seo: page?.seo || null };
}

export async function getNavMenu(location) {
  const data = await fetchGraphQL(`
    query GetNavMenu($location: String!) {
      navMenu(location: $location) {
        label
        url
        target
        order
      }
    }
  `, { location });
  return data?.navMenu || [];
}

export async function getGlobalSection(sectionId) {
  const data = await fetchGraphQL(`
    query GetSection($sectionId: String!) {
      sectionById(sectionId: $sectionId) {
        sectionId
        sectionData
      }
    }
  `, { sectionId });
  const match = data?.sectionById;
  return match?.sectionData ? JSON.parse(match.sectionData) : null;
}

export async function getPartnerLogos(placement) {
  const data = await fetchGraphQL(`
    query GetPartnerLogos {
      partnerLogos(first: 100) {
        nodes {
          title
          logoUrl
          order
          logoPlacements {
            nodes {
              slug
            }
          }
        }
      }
    }
  `);

  let nodes = data?.partnerLogos?.nodes || [];
  if (placement) {
    nodes = nodes.filter(n =>
      n.logoPlacements?.nodes?.some(p => p.slug === placement)
    );
  }
  return nodes.sort((a, b) => (a.order || 0) - (b.order || 0));
}
