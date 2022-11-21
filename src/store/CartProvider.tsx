import { PropsWithChildren, useReducer, Reducer } from 'react';
import CartContext from './cart-context';

type CartProviderProps = PropsWithChildren<{}>;

type Item = {
  name?: string;
  description?: string;
  price: number | null;
  amount: number | null;
};
type State = {
  items: [
    item: {
      name?: string;
      description?: string;
      price: number | null;
      amount: number | null;
    }
  ];
  totalAmount: number;
};

type Action = {
  item: {
    name?: string;
    description?: string;
    price: number | null;
    amount: number | null;
  } | null;
  type: string;
  id?: string;
};

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state: State, action: Action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items].push(action.item!);

    // concat(action.item!);
    const updatedTotalAmount =
      state.totalAmount + action.item!.price! + action.item!.amount!;
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

const CartProvider = (props: CartProviderProps) => {
  const [cartState, dispatchCart] = useReducer<Reducer<State, {type: string;id?: string;}>>(
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
