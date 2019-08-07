import Preact from 'preact';
import { route, RoutableProps } from 'preact-router';
import useAuth from 'hooks/useAuth';

interface Props {
  component: (prop: RoutableProps) => Preact.VNode;
  [key: string]: unknown;
}

const AuthedRoute = ({ component, ...props }: Props) => {
  const { user, loading } = useAuth();
  if (user === null && !loading) {
    route('/login', true);
    return null;
  }
  return loading ? null : component(props);
};

export default AuthedRoute;
