import { useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  return (
    <>
      <Navbar />
      <main className="page-shell">
        <div className="container">
          <div className="page-heading-card">
            <h1 className="page-title">My Wishlist</h1>
            <p className="page-subtitle">{wishlistItems.length} items saved</p>
          </div>

          {!wishlistItems.length ? (
            <div className="empty-page-card">
              <h3>Your wishlist is empty</h3>
              <p>Save products you love and access them later.</p>
              <Link to="/" className="primary-link-btn">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="wishlist-grid">
              {wishlistItems.map((product) => (
                <div key={product.id} className="wishlist-card">
                  <Link to={`/product/${product.id}`} className="wishlist-card__image-link">
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="wishlist-card__image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x300?text=No+Image";
                      }}
                    />
                  </Link>

                  <div className="wishlist-card__content">
                    <Link to={`/product/${product.id}`} className="wishlist-card__name">
                      {product.name}
                    </Link>
                    <p className="wishlist-card__brand">{product.brand}</p>
                    <p className="wishlist-card__price">{formatPrice(product.price)}</p>

                    <div className="wishlist-card__actions">
                      <button
                        className="wishlist-move-btn"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="wishlist-remove-btn"
                        onClick={() => toggleWishlist(product)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default WishlistPage;