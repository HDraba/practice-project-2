import { useContext, useEffect, useState } from "react"
import CartContext from "../../store/cart-context"
import CartIcon from "../Cart/CartIcons"
import styles from './HeaderCartButton.module.css'

type HeaderCartButtonProps = {
    onShowCart: () => void  
}

const HeaderCartButton = (props: HeaderCartButtonProps) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
    
    const cartCtx = useContext(CartContext)
    const {items} = cartCtx

    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)


    const btnStyles = `${styles.button} ${btnIsHighlighted && styles.bump}`

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnIsHighlighted(true)

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300);

        return () => {
            clearTimeout(timer)
        }
    }, [items])
    
    return (
        <button onClick={props.onShowCart} className={btnStyles}>
            <span className={styles.icon}><CartIcon/></span>
            <span>Your Cart</span>
            <span className={styles.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton