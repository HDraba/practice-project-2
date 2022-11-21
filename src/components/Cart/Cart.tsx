import Modal from '../UI/Modal';
import styles from './Cart.module.css';

type CartProps = {
  onHideCart: () => void
}

const Cart = (props: CartProps) => {
  const cartItems = (
    <ul className={styles['cart-items']}>
      {[{ id: 'c1', name: 'sushi', amount: 2, price: 12.99 }].map((item) => {
        return <li key='1'>{item.name}</li>;
      })}
    </ul>
  );
  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>25.96</span>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onHideCart} className={styles['button--alt']}>Close</button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
