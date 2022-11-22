import React from 'react'
import {Item} from './CartProvider'

interface CartContext {
    items: Item[],
    totalAmount: number,
    addItem: (item: Item) => void,
    removeItemById: (id: string) => void
}

const CartContext = React.createContext<CartContext>({
    items: [],
    totalAmount: 0,
    addItem: (item: {}) => {},
    removeItemById: (id: string) => {}
})

export default CartContext