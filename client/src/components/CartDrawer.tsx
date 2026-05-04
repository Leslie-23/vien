import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, close, subtotal, setQty, remove, clear } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return (
    <>
      <div
        className={`cart-backdrop ${isOpen ? 'show' : ''}`}
        onClick={close}
        aria-hidden={!isOpen}
      />
      <aside
        className={`cart-drawer ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <header className="cart-drawer-head">
          <h3>Your Cart</h3>
          <button className="cart-close" onClick={close} aria-label="Close cart">
            &times;
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link to="/shop" className="btn btn-primary" onClick={close}>
              Browse the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="cart-lines">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size ?? 'one'}`}
                  className="cart-line"
                >
                  <Link
                    to={`/shop/${item.productId}`}
                    onClick={close}
                    className="cart-line-img"
                  >
                    <img src={item.imageUrl} alt={item.name} />
                  </Link>
                  <div className="cart-line-body">
                    <Link
                      to={`/shop/${item.productId}`}
                      onClick={close}
                      className="cart-line-name"
                    >
                      {item.name}
                    </Link>
                    {item.size != null && (
                      <span className="cart-line-meta">Size {item.size}</span>
                    )}
                    <span className="cart-line-price">
                      ${item.price.toFixed(2)}
                    </span>
                    <div className="cart-qty">
                      <button
                        onClick={() =>
                          setQty(item.productId, item.size, item.qty - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() =>
                          setQty(item.productId, item.size, item.qty + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        className="cart-line-remove"
                        onClick={() => remove(item.productId, item.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="cart-drawer-foot">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <p className="cart-note">Shipping and taxes calculated at checkout.</p>
              <button className="btn btn-primary btn-lg cart-checkout" disabled>
                Checkout (coming soon)
              </button>
              <button className="cart-clear" onClick={clear}>
                Clear cart
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
