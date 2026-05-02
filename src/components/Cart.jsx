import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import useStore from '../store';
import Button from './Button';
import './Cart.css';

const Cart = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart } = useStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cart-overlay"
            onClick={toggleCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="cart-sidebar glass"
          >
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button onClick={toggleCart} className="close-btn"><X /></button>
            </div>
            
            <div className="cart-items">
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="text-gradient">${total.toFixed(2)}</span>
              </div>
              <Button variant="primary" className="checkout-btn">Checkout</Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
