import { h } from 'preact';
import { Router } from 'preact-router';
import Login from 'pages/Login';
import Home from 'pages/Home';
import AuthedRoute from 'components/AuthedRoute';

const Routes = () => (
  <Router>
    <Login path="/login" />
    <AuthedRoute component={Home} default path="/" />
  </Router>
);


export default Routes;
