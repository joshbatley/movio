import { h } from 'preact';
import firebase from 'firebase/app';

import useSnackbar from '../hooks/useSnackbar';


const Login = () => {
  const { queueSnack } = useSnackbar();
  const signin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log(result);
      queueSnack('okurrrrrr');
    }).catch((err) => {
      queueSnack(err);
    });
  };

  const snacky = () => queueSnack('I\'m feeling snacky');

  const email = (e: any) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(e.target[0].value, e.target[1].value)
      .then((user) => {
        queueSnack((user.additionalUserInfo && user.additionalUserInfo.username) || '');
      }).catch((err) => {
        queueSnack(err.message);
      });
  };
  return (
    <section>
      <h1 style={{ width: '100%', background: 'red' }}>Login</h1>
      <button type="button" onClick={signin}>Sign in google</button>
      <form onSubmit={email}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit">Email</button>
      </form>
      <button type="button" onClick={snacky}>Snacky?</button>
    </section>
  );
};

export default Login;
