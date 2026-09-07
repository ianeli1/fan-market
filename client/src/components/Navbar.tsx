import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  // How many items should the little badge on the cart show?
  const itemCount = cart.length;

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-mark">◍</span> Fan Market
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/fans">Shop Fans</NavLink>
          <NavLink to="/cart" className="cart-link">
            Cart
            {itemCount > 0 && <span className="badge">{itemCount}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
