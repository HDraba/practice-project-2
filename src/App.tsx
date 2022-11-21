import { useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';


function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false)

  const showCartHandler = () => {
setCartIsVisible(true)
  }

  const hideCartHandler = () => {
    setCartIsVisible(false)
  }
  return (
    <CartProvider>
      { cartIsVisible && <Cart onHideCart={hideCartHandler} ></Cart> }
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
