import { h } from 'preact';
import firebase from 'firebase/app';

import 'firebase/auth';

import Router from './Router';
import Layout from './components/Layout/Layout';

const config: firebase.app.APP = {
  apiKey: process.env.PREACT_APP_fbApi,
  authDomain: process.env.PREACT_APP_fbAuth,
  databaseURL: process.env.PREACT_APP_fbDatabase,
  projectId: process.env.PREACT_APP_fbProject,
  storageBucket: process.env.PREACT_APP_fbStorage,
  messagingSenderId: process.env.PREACT_APP_fbMessaging,
  appId: process.env.PREACT_APP_fbApp,
};

const App = () => {
  const signin = () => {
    firebase.initializeApp(config);
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    });
  };
  return (
    <Layout>
      <button type="button" onClick={signin}>Sign in</button>
      <Router />
    </Layout>
  );
};

export default App;
