import { h } from 'preact';
import { useField } from 'formik';

const Input = ({ name }) => {
  const [field, meta] = useField(name);
  return (
    <input type="text" {...field} />
  );
};

export default Input;
