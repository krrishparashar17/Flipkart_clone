import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { formatPrice } from "../../utils/formatPrice";
import { calculateDiscount } from "../../utils/calculateDiscount";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);

  const discount = calculateDiscount(product.original_price, product.price);
  const liked = isInWishlist(product.id);

  return (
    <div className="product-card">
      <button
        className={`wishlist-heart-btn ${liked ? "active" : ""}`}
        onClick={() => toggleWishlist(product)}
        type="button"
      >
        {liked ? "♥" : "♡"}
      </button>

      <Link to={`/product/${product.id}`} className="product-card__image-link">
        <div className="product-card__image-wrap">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="product-card__image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
            }}
          />
        </div>
      </Link>

      <div className="product-card__content">
        <Link to={`/product/${product.id}`} className="product-card__name">
          {product.name}
        </Link>

        <p className="product-card__brand">{product.brand}</p>

        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {product.original_price ? (
            <span className="product-card__original-price">
              {formatPrice(product.original_price)}
            </span>
          ) : null}
          {discount > 0 ? (
            <span className="product-card__discount">{discount}% off</span>
          ) : null}
        </div>

        <div className="product-card__rating">⭐ {product.rating}</div>

        <button
          className="product-card__cart-btn"
          onClick={() => addToCart(product)}
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;