const path = require(`path`);
module.exports = async ({ actions, graphql }) => {
  const GET_POSTS = `
    query GET_POSTS($limit: Int, $skip: Int) {
        allWpPost(limit: $limit , skip: $skip, filter: {status: {eq: "publish"}}, sort: {fields: date, order: DESC}) {
          pageInfo {
            hasNextPage
          }
          nodes {
            id
            uri
            databaseId
            title
          }
        }
      }
      
  
  `;
  const { createPage } = actions;
  const allPosts = [];
  const blogPages = [];
  let pageInt = 0;
  const fetchPosts = async (variables) =>
    graphql(GET_POSTS, variables).then(({ data }) => {
      const {
        allWpPost: {
          nodes,
          pageInfo: { hasNextPage },
        },
      } = data;

      const nodeIds = nodes.map((node) => node.id);
      const blogTemplate = path.resolve(`./src/templates/blog.tsx`);
      const blogPagePath = !variables.skip ? `/` : `/${pageInt}`;

      blogPages[pageInt] = {
        path: blogPagePath,
        component: blogTemplate,
        context: {
          ids: nodeIds,
          pageInt,
          hasNextPage,
        },
        ids: nodeIds,
      };
      nodes.forEach((post) => {
        allPosts.push(post);
      });
      if (hasNextPage) {
        pageInt++;
        return fetchPosts({ limit: 9, skip: pageInt * 9 });
      }
      return allPosts;
    });

  await fetchPosts({ limit: 9, skip: 0 }).then((allPosts) => {
    const postTemplate = path.resolve(`./src/templates/post.tsx`);

    blogPages.forEach((blogPage) => {
      console.log(`createBlogPage ${blogPage.context.pageInt}`);
      createPage(blogPage);
    });

    allPosts.forEach((post) => {
      console.log(`create post: ${post.uri}`);
      createPage({
        path: `${post.uri}`,
        component: postTemplate,
        context: post,
      });
    });
  });
};
