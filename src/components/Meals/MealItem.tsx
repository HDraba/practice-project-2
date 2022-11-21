import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';

type MealItem = {
  id?: string | undefined;
  name: string;
  description: string;
  price: number;
};

const MealItem = (props: MealItem) => {
  const cartCtx = useContext(CartContext)

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({

      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    }
    )
  }

  return (
    <li key={props.id} className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id!} />
      </div>
    </li>
  );
};

export default MealItem;
