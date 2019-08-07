import { h } from 'preact';
import useAuth from 'hooks/useAuth';


const Home = () => {
  const { signOut, user } = useAuth();
  // console.log('HOME', user);
  return (
    <div>
      <h1>Hello {JSON.stringify(user)} and well to MOVIO</h1>
      <button type="button" onClick={signOut}>signOut</button>
    </div>
  );
};

export default Home;
