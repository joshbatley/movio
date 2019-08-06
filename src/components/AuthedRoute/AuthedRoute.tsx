import Preact from 'preact';
import { route, RoutableProps } from 'preact-router';
import useAuth from 'hooks/useAuth';

interface Props {
  component: (prop: RoutableProps) => Preact.VNode;
  [key: string]: any;
}

const AuthedRoute = ({ component, ...props }: Props) => {
  const { getUser } = useAuth();
  getUser((user) => {
    if (user === null) {
      route('/login', true);
    }
  });
  return component(props);
};

export default AuthedRoute;
