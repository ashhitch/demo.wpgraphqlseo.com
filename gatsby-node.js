const createPosts = require(`./gatsby/createPosts`);
const createPages = require(`./gatsby/createPages`);

exports.createPages = async ({ actions, graphql }) => {
  await createPosts({ actions, graphql });
  await createPages({ actions, graphql });
};
