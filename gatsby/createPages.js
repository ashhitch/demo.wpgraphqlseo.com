const path = require(`path`);
module.exports = async ({ actions, graphql }) => {
  const GET_PAGES = `
    query GET_PAGES($limit: Int, $skip: Int) {
      allWpPage(limit: $limit , skip: $skip, filter: {status: {eq: "publish"}}) {
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
  const allPages = [];
  let pageInt = 0;
  const fetchPages = async (variables) =>
    graphql(GET_PAGES, variables).then(({ data }) => {
      const {
        allWpPage: {
          nodes,
          pageInfo: { hasNextPage },
        },
      } = data;
      nodes.forEach((page) => {
        allPages.push(page);
      });
      if (hasNextPage) {
        pageInt++;
        return fetchPages({ limit: variables.limit, skip: pageInt * 9 });
      }
      return allPages;
    });

  await fetchPages({ limit: 100, skip: 0 }).then((pages) => {
    const pageTemplate = path.resolve(`./src/templates/page.tsx`);

    pages.forEach((page) => {
      console.log(`create page: ${page.uri}`);
      createPage({
        path: page.uri !== '/' ? `${page.uri}` : `/`,
        component: pageTemplate,
        context: page,
      });
    });
  });
};
