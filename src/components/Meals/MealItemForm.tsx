import React, { useRef, useState } from 'react';
import Input from '../UI/Input';
import styles from './MealItemForm.module.css';

type MealItemFormProps = {
  id: string | null;
  onAddToCart: (amount: number) => void
  
};

const MealItemForm = (props: MealItemFormProps) => {
    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef<HTMLInputElement>(null)
    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault()

        const enteredAmount = amountInputRef.current!.value
        const enteredAmountNumber = parseFloat(enteredAmount)

        if (enteredAmount.trim().length === length || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false)
            return
        }
        props.onAddToCart(enteredAmountNumber)
    }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
      ref={amountInputRef}
        label="Amount"
        id={'amount_' + props.id}
        input={{
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>Add</button>
      {
        !amountIsValid && <p>Please choose a valid amount! (1-5)</p>
      }
    </form>
  );
};

export default MealItemForm;
