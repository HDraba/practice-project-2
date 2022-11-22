import { useContext } from 'react';

import styles from './Cart.module.css';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import { Item } from '../../store/CartProvider';

type CartProps = {
  onHideCart: () => void;
};

const Cart = (props: CartProps) => {
  const CartCtx = useContext(CartContext);

  const totalAmount = `$${CartCtx.totalAmount.toFixed(2)}`;
  const hasItems = CartCtx.items.length > 0;

  const cartItemRemoveHandler = (id: string) => {};
  const cartItemAddHandler = (item: Item) => {};

  const cartItems = (
    <ul className={styles['cart-items']}>
      {CartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id!)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>totalAmount</span>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onHideCart} className={styles['button--alt']}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
