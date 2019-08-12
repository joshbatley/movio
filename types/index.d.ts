declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

interface Login {
  email: string;
  password: string;
}

interface UserProfile {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  provider: string;
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
