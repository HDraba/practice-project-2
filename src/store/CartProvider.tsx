import { PropsWithChildren, useReducer, Reducer } from 'react';
import { convertTypeAcquisitionFromJson } from 'typescript';
import CartContext from './cart-context';

export type Item = {
  id: string | null;
  name: string;
  price: number;
  amount: number;
};

type CartState = {
  items: Item[];
  totalAmount: number;
};

type CartAction = {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'CLEAR_CART';
  id?: string | null;
  item?: Item | null;
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: CartState, action: CartAction) => {
  if (action.type === 'ADD_ITEM') {
    const updatedTotalAmount =
      state.totalAmount + action.item!.price + action.item!.amount!;
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item!.id;
    });
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item!.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // updatedItem = { ...action.item!}
      updatedItems = state.items.concat(action.item!);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  } else if (action.type === 'REMOVE_ITEM') {
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => {
        return item.id !== action.id;
      });
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }

    return {items: updatedItems, totalAmount: updatedTotalAmount}
  }

  if (action.type === 'CLEAR_CART') {
    return defaultCartState
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

  const clearCartHandler = () => {
    dispatchCart({type: 'CLEAR_CART'})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItemById: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
