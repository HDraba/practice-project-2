import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps {
  label: string;
  id: string
  input: InputHTMLAttributes<HTMLInputElement>
};

const Input = React.forwardRef((props: InputProps, ref) => {
    const inputRef = ref
  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input ref={inputRef} {...props.input} />
    </div>
  );
});
export default Input;
