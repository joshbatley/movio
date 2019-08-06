import api from 'api/firebase';

const useAuth = () => ({
  signInGoogle: api.signInWithPopUp,
  signIn: api.signIn,
  getUser: api.user,
  signOut: api.signOut,
});

export default useAuth;
