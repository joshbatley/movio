import { h } from 'preact';
import { Router } from 'preact-router';
import Login from 'pages/Login';
import Home from 'pages/Home';
import Profile from 'pages/Profile';
import AuthedRoute from 'components/AuthedRoute';

const Routes = () => (
  <Router>
    <Login path="/login" />
    <AuthedRoute component={Home} default path="/" />
    <AuthedRoute component={Profile} path="/settings" />
  </Router>
);


export default Routes;
