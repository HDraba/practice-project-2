import { useContext } from "react"
import CartContext from "../../store/cart-context"
import CartIcon from "../Cart/CartIcons"
import styles from './HeaderCartButton.module.css'

type HeaderCartButtonProps = {
    onShowCart: () => void
}

const HeaderCartButton = (props: HeaderCartButtonProps) => {
    const cartCtx = useContext(CartContext)
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount
    }, 0)
    return (
        <button onClick={props.onShowCart} className={styles.button}>
            <span className={styles.icon}><CartIcon/></span>
            <span>Your Cart</span>
            <span className={styles.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton