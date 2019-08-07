import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import api from 'api/firebase';

const useAuth = () => {
  const profileDefault = api.user() instanceof Promise ? null : api.user();
  const [profile, setProfile] = useState(profileDefault);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      try {
        setProfile(await api.user());
      } catch (err) {
        route('/login', true);
        setProfile(null);
      }
      setLoading(false);
    };
    request();
  }, [setLoading]);

  const signOut = async () => {
    setLoading(true);
    await api.signOut();
    setProfile(null);
    setLoading(false);
    route('/login', true);
  };

  return ({
    loading,
    signInGoogle: api.signInWithPopUp,
    signIn: api.signIn,
    user: profile,
    signOut,
  });
};


export default useAuth;
