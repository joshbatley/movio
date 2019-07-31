import { h } from 'preact';
import Router from 'preact-router';

import Login from './pages/Login';

const Routes = () => (
  <Router>
    <Login default />
  </Router>
);

export default Routes;
