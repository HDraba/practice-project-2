import { FormEvent, useRef, useState } from 'react';
import styles from './Checkout.module.css';

type CheckoutProps = {
  onClose: () => void;
};

const Checkout = (props: CheckoutProps) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const streetRef = useRef<HTMLInputElement>(null)
  const postRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)

  
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const [nameIsValid, setNameIsValid] = useState<boolean>(false)
    
    event.preventDefault()
    
    console.log(nameRef.current!.value) 

    props.onClose()
  };


  return (  <form className={styles.form} onSubmit={submitHandler}>
    <div className={styles.control}>
      <label htmlFor='name'>Your Name</label>
      <input ref={nameRef} type='text' id='name' />
    </div>
    <div className={styles.control}>
      <label htmlFor='street'>Street</label>
      <input ref={streetRef} type='text' id='street' />
    </div>
    <div className={styles.control}>
      <label htmlFor='post'>Postcode</label>
      <input ref={postRef} type='text' id='post' />
    </div>
    <div className={styles.control}>
      <label htmlFor='city'>City</label>
      <input ref={cityRef} type='text' id='city' />
    </div>
    <div className={styles.actions}>
      <button type='button' onClick={props.onClose}>
        Cancel
      </button>
      <button className={styles.submit}>Confirm</button>
    </div>
  </form>
  );
};

export default Checkout;
