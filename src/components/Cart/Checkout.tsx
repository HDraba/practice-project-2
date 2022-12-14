import { FormEvent, useRef, useState } from 'react';
import styles from './Checkout.module.css';

export type UserData = {
  name: string;
  street: string;
  post: string;
  city: string;
};

type CheckoutProps = {
  onClose: () => void;
  onConfirm: (userData: UserData) => void;
};

const isEmpty = (value: string) => value.trim() === '';
const isFiveChars = (value: string) => value.trim().length === 5;

const Checkout = (props: CheckoutProps) => {
  // set them as valid to not get any errors at start
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    post: true,
    city: true,
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const postRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredName = nameRef.current!.value;
    const enteredStreet = streetRef.current!.value;
    const enteredPost = postRef.current!.value;
    const enteredCity = cityRef.current!.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostIsValid =
      !isEmpty(enteredPost) && isFiveChars(enteredPost);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      post: enteredPostIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      post: enteredPost,
      city: enteredCity,
    });

    // props.onClose();
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div
        className={` ${styles.control} ${
          formInputsValidity.name ? '' : styles.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={nameRef} type="text" id="name" />
        {!formInputsValidity.name && <p>Enter a valid name</p>}
      </div>
      <div
        className={` ${styles.control} ${
          formInputsValidity.street ? '' : styles.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input ref={streetRef} type="text" id="street" />
        {!formInputsValidity.street && <p>Enter a valid street</p>}
      </div>
      <div
        className={` ${styles.control} ${
          formInputsValidity.post ? '' : styles.invalid
        }`}
      >
        <label htmlFor="post">Postcode</label>
        <input ref={postRef} type="text" id="post" />
        {!formInputsValidity.post && <p>Enter a valid postcode</p>}
      </div>
      <div
        className={` ${styles.control} ${
          formInputsValidity.city ? '' : styles.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input ref={cityRef} type="text" id="city" />
        {!formInputsValidity.city && <p>Enter a valid city</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
