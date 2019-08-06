import { useContext } from 'preact/hooks';
import SnackbarProvider from 'contexts/Snackbar';

const useSnack = () => {
  const context = useContext(SnackbarProvider);

  return {
    ...context,
  };
};

export default useSnack;
