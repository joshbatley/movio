import { h } from 'preact';
import style from './style.module.css';

interface Props {
  onClick: () => {};
}

const Google = ({ onClick }: Props) => (
  <button type="button" class={style.button} onClick={onClick}>
    <span class={style.text}>Sign in with Google</span>
  </button>
);

export default Google;
