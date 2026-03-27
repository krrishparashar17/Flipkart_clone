import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(location.search);

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    navigate(`/?${params.toString()}`);
  };

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
            defaultValue={new URLSearchParams(location.search).get("search") || ""}
            onChange={handleSearch}
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