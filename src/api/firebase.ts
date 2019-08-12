import firebase from 'firebase/app';

import 'firebase/auth';
// import 'firebase/firestore';
interface API {
  user: () => UserProfile | Promise<UserProfile>;
  signInWithPopUp: () => Promise<{}>;
  signIn: ({ email: string, password: string}: Login) => Promise<{}>;
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
    this.reauthenticate = this.reauthenticate.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateName = this.updateName.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  /**
   * Wrapps sign with persist wrapepr
   * @param func - signin method to be wrapped
   * @returns - signin wrapped in persist
   */
  private persist = (func: () => {}) => firebase.auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION).then(func);

  /**
   * Get the current saved user or gets the returns a promise
   * @retuns UserProfile
   */
  public user() {
    if (this.userInfo) {
      return this.userInfo;
    }
    return new Promise<UserProfile>((resolve, reject) => {
      this.auth.onAuthStateChanged((user: firebase.User | null) => {
        if (user) {
          this.userInfo = {
            displayName: user.displayName || '',
            email: user.email || '',
            photoURL: user.photoURL || '',
            uid: user.uid,
            provider: user.providerData.map((i: firebase.UserInfo | null) => i && i.providerId)[0] || '',
          };
          resolve(this.userInfo);
        }
        reject(new Error('No user'));
      });
    });
  }

  /**
   * Sign into 3rd party provider - Google
   * @returns - Returns error or userprofile
   */
  public signInWithPopUp() {
    return this.persist(async () => {
      try {
        const userCred = await this.auth.signInWithPopup(this.provider);
        if (userCred.user) {
          this.userInfo = {
            displayName: userCred.user.displayName || '',
            email: userCred.user.email || '',
            photoURL: userCred.user.photoURL || '',
            uid: userCred.user.uid,
            provider: (userCred.additionalUserInfo && userCred.additionalUserInfo.providerId) || '',
          };
          return this.userInfo;
        }
      } catch (err) {
        return err.message;
      }
      return new Error('Internal Error');
    });
  }

  /**
   * Sign into 3rd party provider - Google
   * @param email - Email address
   * @param password - password
   * @returns - Returns error or userprofile
   */
  public signIn({ email, password }: Login) {
    return this.persist(async () => {
      try {
        const userCred = await this.auth.signInWithEmailAndPassword(email, password);
        console.log(userCred);
        if (userCred.user) {
          this.userInfo = {
            displayName: userCred.user.displayName || '',
            email: userCred.user.email || '',
            photoURL: userCred.user.photoURL || '',
            uid: userCred.user.uid,
            provider: (userCred.additionalUserInfo && userCred.additionalUserInfo.providerId) || '',
          };
          return this.userInfo;
        }
      } catch (err) {
        return err.message;
      }
      return new Error('Internal Error');
    });
  }

  /**
   * Signs out the user
   * @returns - user is signed out and userInfo is deleted
   */
  public async signOut() {
    try {
      await this.auth.signOut();
    } finally {
      this.userInfo = null;
    }
  }

  /**
   * Get the user credentials for reauthing.
   * @param user - the current firebase user
   * @param password - user password
   * @returns - returns the AuthCredential
   */
  private getCredential = async (user: firebase.User, password: string) => {
    if (user && this.userInfo) {
      switch (this.userInfo.provider) {
        case 'google.com':
          return firebase.auth.GoogleAuthProvider.credential(await user.getIdToken());
        default:
        case 'password':
          return firebase.auth.EmailAuthProvider.credential(this.userInfo.email, password);
      }
    }
    throw new Error('No user');
  };

  /**
   * Reauthenticate user for actions like updated email or password
   * @param user - Current user
   * @param password - user password
   * @returns - has the passed auth check
   */
  private reauthenticate(user: firebase.User, password: string) {
    return new Promise(async (resolve, reject) => {
      if (user && user.email && password) {
        try {
          const credential = await this.getCredential(user, password);
          resolve(await user.reauthenticateWithCredential(credential));
        } catch (err) {
          reject(err);
        }
      }
      reject(new Error('Params missing'));
    });
  }

  /**
   * Update the user email
   * @param newEmail - users new email
   * @param password - current password
   * @returns Promise for updated user
   */
  public async updateEmail(newEmail: string, password: string) {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await this.reauthenticate(user, password);
        return user.updateEmail(newEmail);
      } catch (err) {
        if (err.message) {
          throw new Error(err.message);
        }
        throw new Error(err);
      }
    }
    throw new Error('No user');
  }

  /**
   * Update the user password
   * @param newPassword - users new passwrd
   * @param oldPassword - current password
   * @returns Promise for updated password
   */
  public async updatePassword(newPassword: string, oldPassword: string) {
    const user = this.auth.currentUser;
    if (user) {
      try {
        await this.reauthenticate(user, oldPassword);
        return user.updatePassword(newPassword);
      } catch (err) {
        if (err.message) {
          throw new Error(err.message);
        }
        throw new Error(err);
      }
    }
    throw new Error('No user');
  }

  /**
   * Update the user profile
   * @param displayName - users name
   * @returns Updated userInfo
   */
  public async updateName(displayName: string) {
    const user = this.auth.currentUser;
    if (user && this.userInfo) {
      try {
        await user.updateProfile({ displayName, photoURL: user.photoURL });
        this.userInfo = {
          ...this.userInfo,
          displayName,
        };
        return this.userInfo;
      } catch (err) {
        if (err.message) {
          throw new Error(err.message);
        }
        throw new Error(err);
      }
    }
    throw new Error('No user');
  }

  /**
   * Create new user
   * @param email - new user email
   * @param password - new user password
   * @returns Promise for new account
   */
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
