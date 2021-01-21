import React from 'react';

import Seo from 'gatsby-plugin-wpgraphql-seo';
import Layout from '../components/layout';

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not Found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
