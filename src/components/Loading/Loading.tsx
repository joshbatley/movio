import { h } from 'preact';
import styles from './style.module.css';

interface Props {
  color?: string;
  size?: number;
}

const Loading = ({ color = 'black', size = 100 }: Props) => (
  <div class={styles.wrapper}>
    <svg class={styles.loader} viewBox="0 0 100 100" width={size} height={size} style={{ fill: color }}>
      <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50" />
    </svg>
  </div>
);

export default Loading;
