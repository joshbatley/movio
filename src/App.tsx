import { h } from 'preact';
import Layout from 'components/Layout';
import { BrowserRouter } from 'react-router-dom';
import SnackbarProvider from 'components/SnackbarProvider';

import Router from './Router';

const App = () => (
  <BrowserRouter>
    <SnackbarProvider>
      <Layout>
        <Router />
      </Layout>
    </SnackbarProvider>
  </BrowserRouter>
);


export default App;
