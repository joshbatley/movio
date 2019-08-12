import Preact, { h, Fragment } from 'preact';
import styles from './style.module.css';

interface Props {
  children: Preact.VNode[] | Preact.VNode;
}

const Layout = ({ children }: Props) => (
  <Fragment>
    {/* <header>Movio</header> */}
    <main class={styles.main}>
      {children}
    </main>
  </Fragment>
);


export default Layout;
