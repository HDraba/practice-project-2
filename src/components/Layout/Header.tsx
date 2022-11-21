import styles from './Header.module.css';

import mealJPG from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

type HeaderProps = {
    onShowCart: () => void
}

const Header = (props: HeaderProps) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onShowCart={props.onShowCart} ></HeaderCartButton>      
      </header>

      <div className={styles['main-image']}>
        <img src={mealJPG} alt="A table full of delicious food" />
      </div>
    </>
  );
};

export default Header;
