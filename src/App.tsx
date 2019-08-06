import { h } from 'preact';
import Layout from 'components/Layout';
import SnackbarProvider from 'components/SnackbarProvider';

import Router from './Router';

const App = () => (
  <SnackbarProvider>
    <Layout>
      <Router />
    </Layout>
  </SnackbarProvider>
);


export default App;
