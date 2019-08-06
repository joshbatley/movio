declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
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
