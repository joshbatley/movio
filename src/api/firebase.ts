import firebase from 'firebase/app';

import 'firebase/auth';
// import 'firebase/firestore';

export interface FbConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

class Api {
  private config: firebase.app.App;

  public constructor(config: FbConfig) {
    this.config = firebase.initializeApp(config);
  }

  public getUser() {
    return this.config;
  }
}

export default Api;
