import styles from './button.module.scss';

export interface ButtonProps {
  variant: 'alert' | 'filled' | 'outlined';
  cta?: () => void;
  disable: boolean;
  label: string;
  type?: 'button' | 'reset' | "submit";
}

export default function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.disable ?? false}
      onClick={props.cta}
      className={`${styles.buttonClass} ${styles[`${props.variant}`]}`}
      type={props.type}
    >
      {props.label}
    </button>
  );
}
