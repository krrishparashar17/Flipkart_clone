import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

function Navbar({ search, setSearch }) {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="container navbar__content">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-main">Flipkart</span>
          <span className="navbar__brand-sub">Clone</span>
        </Link>

        <div className="navbar__search">
          <input
            type="text"
            className="navbar__search-input"
            placeholder="Search for products, brands and more"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <nav className="navbar__actions">
          <Link to="/" className="navbar__link">
            Home
          </Link>

          <Link to="/wishlist" className="navbar__link navbar__link--with-badge">
            Wishlist
            {wishlistItems.length > 0 && (
              <span className="navbar__badge">{wishlistItems.length}</span>
            )}
          </Link>

          <Link to="/orders" className="navbar__link">
            Orders
          </Link>

          <Link to="/cart" className="navbar__cart">
            Cart
            {cartCount > 0 && <span className="navbar__badge">{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;