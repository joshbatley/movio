import { h } from 'preact';
import { FieldAttributes, Field } from 'formik';
import styles from './style.modules.css';

const Input = (props: FieldAttributes<any>) => (
  <Field class={styles.input} {...props} />
);

export default Input;
