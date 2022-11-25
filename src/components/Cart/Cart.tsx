import { useContext, useState } from 'react';

import styles from './Cart.module.css';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import { Item } from '../../store/CartProvider';
import Checkout from './Checkout';

type CartProps = {
  onHideCart: () => void;
};

const Cart = (props: CartProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false)

  const CartCtx = useContext(CartContext);

  const totalAmount = `$${CartCtx.totalAmount.toFixed(2)}`;
  const hasItems = CartCtx.items.length > 0;

  const cartItemRemoveHandler = (id: string) => {
    CartCtx.removeItemById(id)
  };
  const cartItemAddHandler = (item: Item) => {
    CartCtx.addItem({...item, amount: 1})
  };

  const orderHandler = () => {
    setIsCheckingOut(true)
  }

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

      const modalActions = (
        <div className={styles.actions}>
        <button onClick={props.onHideCart} className={styles['button--alt']}>
          Close
        </button>
        {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
      </div>
      )

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>totalAmount</span>
      </div>
      {isCheckingOut && <Checkout onClose={props.onHideCart} />}
      {!isCheckingOut &&
      modalActions
      }
    </Modal>
  );
};

export default Cart;
