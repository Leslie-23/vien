import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-mark">V</span>
          <span className="logo-text">VIEN</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`bar ${menuOpen ? 'open' : ''}`} />
          <span className={`bar ${menuOpen ? 'open' : ''}`} />
          <span className={`bar ${menuOpen ? 'open' : ''}`} />
        </button>

        <div className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>
            Our Story
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
        </div>

        <button
          className="cart-button"
          onClick={() => {
            setMenuOpen(false);
            open();
          }}
          aria-label={`Open cart (${count} item${count === 1 ? '' : 's'})`}
        >
          <span aria-hidden="true">Cart</span>
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
      </div>
    </nav>
  );
}
