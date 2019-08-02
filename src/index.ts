import firebase from 'firebase/app';
import 'firebase/auth';

import App from './App';
import './global.css';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  require('preact/debug');
}

interface FbConfig {
  apiKey?: string;
  authDomain?: string;
  databaseURL?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

const config: FbConfig = {
  apiKey: process.env.PREACT_APP_fbApi,
  authDomain: process.env.PREACT_APP_fbAuth,
  databaseURL: process.env.PREACT_APP_fbDatabase,
  projectId: process.env.PREACT_APP_fbProject,
  storageBucket: process.env.PREACT_APP_fbStorage,
  messagingSenderId: process.env.PREACT_APP_fbMessaging,
  appId: process.env.PREACT_APP_fbApp,
};


firebase.initializeApp(config);


export default App;
