import { h } from 'preact';

import Router from './Router';
import Layout from './components/Layout/Layout';
import SnackbarProvider from './components/SnackbarProvider';

const App = () => (
  <SnackbarProvider>
    <Layout>
      <Router />
    </Layout>
  </SnackbarProvider>
);


export default App;
