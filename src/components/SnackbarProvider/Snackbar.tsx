import Preact, { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { id } from 'utils';
import SnackbarContext from 'contexts/Snackbar';
import styles from './style.module.css';

interface Props {
  children: Preact.VNode[] | Preact.VNode;
}

interface Snack {
  key: number;
  msg: string;
  level: number;
}

const Layout = ({ children }: Props) => {
  const [snacks, setSnacks] = useState([] as Snack[]);

  const queueSnack = (msg: string) => {
    setSnacks([...snacks, {
      key: id(),
      msg,
      level: 1,
    }]);
  };

  const cancelSnack = (k: number) => (e: Event) => {
    // TODO: pass to prop of onclose
    console.log(e);
    setSnacks(snacks.filter(({ key }) => key !== k));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null;
    if (snacks.length) {
      timer = setInterval(() => setSnacks(snacks.slice(1)), 3000);
    }
    return () => timer && clearInterval(timer);
  }, [snacks, setSnacks]);

  const context = { queueSnack, cancelSnack };

  return (
    <SnackbarContext.Provider value={context}>
      <section class={styles.container}>
        {snacks && snacks.map(({ msg, key }, i) => (
          <div
            class={styles.snack}
            style={{ top: (i * 50 + 10) }}
            key={key}
            onClick={cancelSnack(key)}
            onKeyDown={cancelSnack(key)}
          >
            {msg}
          </div>
        ))}
      </section>
      { children }
    </SnackbarContext.Provider>
  );
};


export default Layout;
