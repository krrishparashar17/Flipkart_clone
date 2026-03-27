import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import "./CartPage.css";

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, totals } = useContext(CartContext);
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <div className="cart-page">
        <div className="cart-page__layout">
          <div className="cart-page__items">
            <h2>My Cart ({cartItems.length})</h2>

            {!cartItems.length ? (
              <div className="cart-page__empty">
                <p>Your cart is empty.</p>
                <Link to="/" className="cart-page__shop-btn">
                  Shop Now
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.thumbnail} alt={item.name} className="cart-item__image" />

                  <div className="cart-item__details">
                    <h3>{item.name}</h3>
                    <p>{item.brand}</p>
                    <p className="cart-item__price">{formatPrice(item.price)}</p>

                    <div className="cart-item__qty">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>

                    <button
                      className="cart-item__remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="cart-page__summary">
            <h3>Price Details</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(totals.subtotal)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(totals.total)}</span>
            </div>

            <button
              className="cart-page__checkout-btn"
              disabled={!cartItems.length}
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;