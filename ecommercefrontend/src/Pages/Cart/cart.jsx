import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('auth-token');
      try {
        const response = await fetch(`${API_URL}/getCart`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setCartItems(Array.isArray(data.cart) ? data.cart : []);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  const removeFromCart = async (itemId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    const token = localStorage.getItem('auth-token');
    if (token) {
      fetch(`${API_URL}/RemoveFromCart`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId, user: user }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error removing from cart', error));
    } else {
      alert('Please authenticate first to manage your cart.');
    }
  };
const handleIncrease = async (item) => {
  const updatedCart = cartItems.map((cartItem) =>
    cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
  setCartItems(updatedCart);
  await updateCartOnBackend(item.id,'increase');
};

const handleDecrease = async (item) => {
  if (item.quantity <= 1) return;
  const updatedCart = cartItems.map((cartItem) =>
    cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
  setCartItems(updatedCart);
  await updateCartOnBackend(item.id,'decrease');
};

const updateCartOnBackend = async (itemId, action) => {
  const token = localStorage.getItem('auth-token');
  const endpoint = 
    action === 'increase' ? `${API_URL}/Addtocart` : `${API_URL}/RemoveFromCart`;

  try {
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId }),
    });
  } catch (error) {
    console.error(`Error ${action === 'increase' ? 'adding' : 'removing'} item:`, error);
  }
};
 const proceedToCheckout = () => {
    navigate('/CheckOut', { state: { cartItems } });
  };

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-header">
            <span>Product</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span>Remove</span>
          </div>

          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="product-info">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => handleDecrease(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(item)}>+</button>
              </div>
              <div className="subtotal">${(item.newPrice * item.quantity).toFixed(2)}</div>
              <div className="remove-btn" onClick={() => removeFromCart(item.id)}>
                &times;
              </div>
            </div>
          ))}

          <div className="cart-actions">
            <Link to="/">
              <button className="return-btn">Return to Shop</button>
            </Link>
              <button className="checkout-btn" onClick={proceedToCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
