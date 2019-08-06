import firebase from 'firebase/app';

import 'firebase/auth';
// import 'firebase/firestore';

type onAuthStateChanged = firebase.Observer<any, Error> | ((a: firebase.User | null) => any);

interface API {
  user: (func: onAuthStateChanged) => firebase.Unsubscribe;
  signInWithPopUp: () => Promise<{}>;
  signIn: (e: string, p: string) => Promise<{}>;
}

class Firebase implements API {
  private provider: firebase.auth.GoogleAuthProvider;

  public constructor(config: FbConfig) {
    firebase.initializeApp(config);
    this.provider = new firebase.auth.GoogleAuthProvider();
  }

  private persist = (func: () => {}) => firebase.auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION).then(func)

  public user = (func: onAuthStateChanged) => firebase.auth().onAuthStateChanged(func);

  public signInWithPopUp = () => this.persist(
    () => firebase.auth().signInWithPopup(this.provider),
  )

  public signIn = (e: string, p: string) => this.persist(
    () => firebase.auth().signInWithEmailAndPassword(e, p),
  );

  public signOut = () => firebase.auth().signOut();
}

const config: FbConfig = {
  apiKey: process.env.PREACT_APP_FBAPI,
  authDomain: process.env.PREACT_APP_FBAUTH,
  databaseURL: process.env.PREACT_APP_FBDB,
  projectId: process.env.PREACT_APP_FBPROJECT,
  storageBucket: process.env.PREACT_APP_FBSTORAGE,
  messagingSenderId: process.env.PREACT_APP_FBMSG,
  appId: process.env.PREACT_APP_FBAPP,
};

export default new Firebase(config);
