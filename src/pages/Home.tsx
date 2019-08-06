import { h } from 'preact';
import useAuth from 'hooks/useAuth';

const Home = () => {
  const { signOut } = useAuth();
  return (
    <div>
      <h1>HOME</h1>
      <button type="button" onClick={signOut}>signOut</button>
    </div>
  );
};

export default Home;
