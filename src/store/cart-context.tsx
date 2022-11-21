import React from 'react'

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item: {}) => {},
    removeItemById: (id: string) => {}
})

export default CartContext