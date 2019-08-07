import firebase from 'firebase/app';

import 'firebase/auth';
// import 'firebase/firestore';

interface API {
  user: () => UserProfile | Promise<UserProfile>;
  signInWithPopUp: () => Promise<{}>;
  signIn: (e: string, p: string) => Promise<{}>;
  signOut: () => Promise<void>;
  createAccount: (e: string, p: string) => Promise<{}>;
}

class Firebase implements API {
  private provider: firebase.auth.GoogleAuthProvider;

  private app: firebase.app.App;

  private auth: firebase.auth.Auth;

  private userInfo: UserProfile | null;

  public constructor(config: FbConfig, name: string = '[DEFAULT]') {
    this.app = firebase.initializeApp(config, name);
    this.auth = this.app.auth();
    this.provider = new firebase.auth.GoogleAuthProvider();
    this.userInfo = null;

    this.user = this.user.bind(this);
    this.signInWithPopUp = this.signInWithPopUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  private persist = (func: () => {}) => firebase.auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION).then(func);

  public user() {
    if (this.userInfo) {
      return this.userInfo;
    }
    return new Promise<UserProfile>((resolve, reject) => {
      this.auth.onAuthStateChanged((user: firebase.User | null) => {
        if (user) {
          this.userInfo = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          };
          resolve(this.userInfo);
        }
        reject(new Error('No user'));
      });
    });
  }

  public signInWithPopUp() {
    return this.persist(async () => {
      try {
        const userCred = await this.auth.signInWithPopup(this.provider);
        if (userCred.user) {
          this.userInfo = {
            displayName: userCred.user.displayName,
            email: userCred.user.email,
            photoURL: userCred.user.photoURL,
            uid: userCred.user.uid,
          };
          return this.userInfo;
        }
      } catch (err) {
        return new Error(err);
      }
      return new Error('Internal Error');
    });
  }

  public signIn(e: string, p: string) {
    return this.persist(async () => {
      try {
        const userCred = await this.auth.signInWithEmailAndPassword(e, p);
        if (userCred.user) {
          this.userInfo = {
            displayName: userCred.user.displayName,
            email: userCred.user.email,
            photoURL: userCred.user.photoURL,
            uid: userCred.user.uid,
          };
          return this.userInfo;
        }
      } catch (err) {
        return new Error(err);
      }
      return new Error('Internal Error');
    });
  }

  public async signOut() {
    try {
      await this.auth.signOut();
    } finally {
      this.userInfo = null;
    }
  }

  public createAccount(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
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
