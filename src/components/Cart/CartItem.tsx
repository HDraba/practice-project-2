import { Item } from '../../store/CartProvider';
import classes from './CartItem.module.css';

type CartItemProps = {
  name: string,
  amount: number,
  price: number,
  onRemove: any,
  // (id: string) => void,
  onAdd: any
  //  (item: Item) => void
}

const CartItem = (props: CartItemProps) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
