import { h } from 'preact';
import useAuth from 'hooks/useAuth';
import { Link } from 'preact-router';

const Home = () => {
  const { signOut } = useAuth();
  return (
    <div>
      <h1>Hello welcome to MOVIO</h1>
      <Link href="/settings">Settings</Link>
      <button type="button" onClick={signOut}>signOut</button>
    </div>
  );
};

export default Home;
