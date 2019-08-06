import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { Form, Formik } from 'formik';

import useSnackbar from 'hooks/useSnackbar';
import useAuth from 'hooks/useAuth';
import Loading from 'components/Loading';
import Input from 'components/Input';

const Login = () => {
  const { signInGoogle, signIn, getUser } = useAuth();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    getUser((user) => {
      if (user === null) {
        route('/login', true);
      }
    });
  }, [getUser]);

  const { queueSnack } = useSnackbar();
  const signin = async () => {
    try {
      const result = await signInGoogle();
      if (result !== null) {
        route('/', true);
      }
    } catch (err) {
      setLoading(false);
      queueSnack(err);
    }
  };

  const email = async (values) => {
    setLoading(true);
    try {
      const res = await signIn(values.email, values.password);
      if (res !== null) {
        route('/', true);
      }
    } catch (err) {
      setLoading(false);
      queueSnack(err);
    }
  };

  return (
    <section>
      { isLoading && (<Loading />) }
      <h1 style={{ width: '100%', background: 'red' }}>Login</h1>
      <button type="button" onClick={signin}>Sign in google</button>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={email}>
        {() => (
          <Form>
            <Input name="email" />
            <Input name="password" />
            <button type="submit">Email</button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Login;
