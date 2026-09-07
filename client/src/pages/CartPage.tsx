import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

const FREE_SHIPPING_OVER = 50;
const SHIPPING_COST = 6.99;

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Add up the price of everything in the cart.
  const subtotal = cart.reduce((total, item) => total + item.price, 0);

  const shipping = subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_COST;
  const orderTotal = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <section className="section">
        <h1>Your cart</h1>
        <p className="muted">Your cart is empty right now.</p>
        <Link to="/fans" className="button">
          Go pick some fans
        </Link>
      </section>
    );
  }

  return (
    <section className="section">
      <h1>Your cart</h1>

      <ul className="cart-list">
        {cart.map((item, index) => (
          <li key={index} className="cart-row">
            <img
              className="cart-row-art"
              src={item.image}
              alt={item.name}
            />

            <div className="cart-row-info">
              <h3>{item.name}</h3>
              <p className="muted">
                {item.brand} - {item.size}mm
              </p>
            </div>

            <div className="quantity">
              <button
                className="quantity-button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="quantity-value">{item.quantity}</span>
              <button
                className="quantity-button"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="cart-row-price">{formatPrice(item.price)}</div>

            <button
              className="link-button"
              onClick={() => removeFromCart(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="summary">
        <div className="summary-line">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="summary-line">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        <div className="summary-line summary-total">
          <span>Total</span>
          <span>{formatPrice(orderTotal)}</span>
        </div>

        <button
          className="button button-large"
          onClick={() => alert("Checkout is not built yet. Coming soon!")}
        >
          Checkout
        </button>

        <button className="link-button" onClick={clearCart}>
          Empty the cart
        </button>
      </div>
    </section>
  );
}
