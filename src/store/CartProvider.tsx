import { PropsWithChildren, useReducer, Reducer } from 'react';
import CartContext from './cart-context';

export type Item = {
  // name?: string,
  price: number;
  amount: number;
};

type CartState = {
  items: Item[];
  totalAmount: number;
};

type CartAction = {
  type: 'ADD_ITEM' | 'REMOVE_ITEM';
  id?: string | null;
  item?: Item | null;
};

const defaultCartState = { 
    items: [], 
    totalAmount: 0 
};

const cartReducer = (state: CartState, action: CartAction) => {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items].concat(action.item!);
    const updatedTotalAmount =
      state.totalAmount + action.item!.price + action.item!.amount!;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

const CartProvider = (props: PropsWithChildren) => {
  const [cartState, dispatchCart] = useReducer<Reducer<CartState, CartAction>>(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: Item) => {
    dispatchCart({ type: 'ADD_ITEM', item: item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCart({ type: 'REMOVE_ITEM', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItemById: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
