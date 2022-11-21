import { PropsWithChildren } from 'react'
import styles from './Card.module.css'

type CardProps = PropsWithChildren<{

}>

const Card = (props: CardProps) => {
return <div className={styles.card}>{props.children}</div>
}

export default Card