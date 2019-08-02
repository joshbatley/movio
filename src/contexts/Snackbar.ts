import { createContext } from 'preact';

interface SnackbarInterface {
  queueSnack: (msg: string) => void;
}

const SnackbarContext = createContext<SnackbarInterface>({ queueSnack: () => { } });

export default SnackbarContext;
