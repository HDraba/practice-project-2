import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps {
  label: string;
  id: string;
  input: InputHTMLAttributes<HTMLInputElement>;
}

type Ref = HTMLInputElement

const Input = React.forwardRef<Ref, InputProps>((props: InputProps, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});
export default Input;
