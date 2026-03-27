import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { CartContext } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import { placeOrder } from "../services/cartService";
import "./CheckoutPage.css";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, totals, clearCart } = useContext(CartContext);

  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!cartItems.length) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const payload = {
        ...formData,
        items: cartItems,
        total_amount: totals.total,
      };

      const response = await placeOrder(payload);
      const orderId = response.data.orderId;

      clearCart();
      navigate(`/order-success/${orderId}`);
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order");
    }
  };

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <div className="checkout-page">
        <div className="checkout-page__layout">
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <h2>Delivery Address</h2>

            <input name="customer_name" placeholder="Full Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
            <input name="address_line1" placeholder="Address Line 1" onChange={handleChange} required />
            <input name="address_line2" placeholder="Address Line 2" onChange={handleChange} />
            <input name="city" placeholder="City" onChange={handleChange} required />
            <input name="state" placeholder="State" onChange={handleChange} required />
            <input name="pincode" placeholder="Pincode" onChange={handleChange} required />

            <button type="submit">Place Order</button>
          </form>

          <div className="checkout-summary">
            <h3>Order Summary</h3>

            {cartItems.map((item) => (
              <div key={item.id} className="checkout-summary__item">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}

            <div className="checkout-summary__total">
              <span>Total</span>
              <span>{formatPrice(totals.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;