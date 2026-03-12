const HASHNODE_API_URL = "https://gql.hashnode.com";
const HASHNODE_HOST = process.env.NEXT_PUBLIC_HASHNODE_HOST;

interface HashnodePost {
  id: string;
  title: string;
  brief: string;
  slug: string;
  publishedAt: string;
  content: {
    html: string;
  };
  coverImage: {
    url: string;
  };
  author: {
    name: string;
    profilePicture: string;
  };
}

interface HashnodeAllPostsData {
  publication: {
    posts: {
      edges: {
        node: HashnodePost;
      }[];
    };
  };
}

interface HashnodeSinglePostData {
  publication: {
    post: HashnodePost;
  };
}

async function fetchHashnode(query: string, variables = {}) {
  const res = await fetch(HASHNODE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 1 },
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch Hashnode API");
  }

  return json.data;
}

export async function getLatestPosts(limit = 3) {
  const query = `
    query GetLatestPosts($host: String!, $first: Int!) {
      publication(host: $host) {
        posts(first: $first) {
          edges {
            node {
              id
              title
              brief
              slug
              publishedAt
              coverImage {
                url
              }
            }
          }
        }
      }
    }
  `;

  const data = (await fetchHashnode(query, {
    host: HASHNODE_HOST,
    first: limit,
  })) as HashnodeAllPostsData;

  return data.publication.posts.edges.map((edge) => edge.node);
}

export async function getPostBySlug(slug: string) {
  const query = `
    query GetPostBySlug($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          id
          title
          brief
          publishedAt
          content {
            html
          }
          coverImage {
            url
          }
          author {
            name
            profilePicture
          }
        }
      }
    }
  `;

  const data = (await fetchHashnode(query, {
    host: HASHNODE_HOST,
    slug,
  })) as HashnodeSinglePostData;

  return data.publication.post;
}

export async function getAllPostSlugs() {
  const query = `
    query GetAllPostSlugs($host: String!) {
      publication(host: $host) {
        posts(first: 20) {
          edges {
            node {
              slug
            }
          }
        }
      }
    }
  `;

  const data = (await fetchHashnode(query, {
    host: HASHNODE_HOST,
  })) as HashnodeAllPostsData;

  return data.publication.posts.edges.map((edge) => edge.node.slug);
}
