import { h } from 'preact';
import { useField } from 'formik';

interface Props {
  name: string;
}

const Input = ({ name }: Props) => {
  const [field] = useField(name);
  return (
    <input type="text" {...field} />
  );
};

export default Input;
