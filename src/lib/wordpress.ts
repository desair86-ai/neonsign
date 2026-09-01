export const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';

export async function fetchGraphQL(query: string, variables: any = {}) {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: 'no-store', // Disable caching to ensure fresh products are always fetched
  });

  const text = await res.text();
  console.log(`Status: ${res.status} ${res.statusText}`);
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    console.error('Failed to parse JSON. Raw response:', text.substring(0, 500));
    throw new Error('Failed to parse JSON');
  }

  if (json.errors) {
    console.error('WordPress GraphQL Error:', json.errors);
    throw new Error('Failed to fetch from WordPress API');
  }

  return json.data;
}

export async function getProducts(categorySlug?: string, first = 20, sort?: string, featured?: boolean) {
  const categoryFilter = categorySlug ? `categoryIn: ["${categorySlug}"], ` : '';
  const featuredFilter = featured ? `featured: true, ` : '';
  
  let orderbyFilter = '';
  if (sort === 'popularity') {
    orderbyFilter = `orderby: { field: TOTAL_SALES, order: DESC }, `;
  } else if (sort === 'rating') {
    orderbyFilter = `orderby: { field: RATING, order: DESC }, `;
  } else if (sort === 'date') {
    orderbyFilter = `orderby: { field: DATE, order: DESC }, `;
  } else if (sort === 'price-asc') {
    orderbyFilter = `orderby: { field: PRICE, order: ASC }, `;
  } else if (sort === 'price-desc') {
    orderbyFilter = `orderby: { field: PRICE, order: DESC }, `;
  }

  const query = `
    query GetProducts($first: Int!) {
      products(first: $first, where: { ${categoryFilter}${featuredFilter}${orderbyFilter}status: "PUBLISH" }) {
        nodes {
          id
          databaseId
          name
          slug
          description
          image {
            sourceUrl
            altText
          }
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
            onSale
          }
          ... on VariableProduct {
            price
            regularPrice
            salePrice
            onSale
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { first });
  return data?.products?.nodes || [];
}

export async function getProductCategories() {
  const query = `
    query GetProductCategories {
      productCategories(first: 50, where: { hideEmpty: true }) {
        nodes {
          id
          databaseId
          name
          slug
          description
          image {
            sourceUrl
            altText
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL(query);
  return data?.productCategories?.nodes || [];
}

export async function getProduct(slug: string) {
  const query = `
    query GetProduct($slug: ID!) {
      product(id: $slug, idType: SLUG) {
        id
        databaseId
        name
        slug
        description
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          onSale
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
          onSale
        }
      }
    }
  `;

  const data = await fetchGraphQL(query, { slug });
  return data?.product;
}
