import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { getOrderHistoryByEmail } from "../services/orderService";
import { formatPrice } from "../utils/formatPrice";

function OrderHistoryPage() {
  const [email, setEmail] = useState("");
  const [searchedEmail, setSearchedEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await getOrderHistoryByEmail(email.trim());
      setOrders(response.data || []);
      setSearchedEmail(email.trim());
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to fetch order history"
      );
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="page-shell">
        <div className="container">
          <div className="page-heading-card">
            <h1 className="page-title">Order History</h1>
            <p className="page-subtitle">
              Enter the same email used during checkout to view your orders
            </p>
          </div>

          <div className="order-history-search-card">
            <form className="order-history-form" onSubmit={handleSearch}>
              <input
                type="email"
                placeholder="Enter your email"
                className="order-history-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="order-history-btn">
                {loading ? "Loading..." : "View Orders"}
              </button>
            </form>
            {error ? <p className="form-error-text">{error}</p> : null}
          </div>

          {searchedEmail && !loading && !orders.length && !error ? (
            <div className="empty-page-card">
              <h3>No orders found</h3>
              <p>No orders found for {searchedEmail}</p>
            </div>
          ) : null}

          <div className="order-history-list">
            {orders.map((order) => (
              <div key={order.id} className="order-history-card">
                <div className="order-history-card__header">
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p>
                      {new Date(order.created_at).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <span className="order-status-badge">{order.status}</span>
                </div>

                <div className="order-history-card__meta">
                  <p>
                    <strong>Total:</strong> {formatPrice(order.total_amount)}
                  </p>
                  <p>
                    <strong>Delivery Address:</strong> {order.address_line1}, {order.city},{" "}
                    {order.state} - {order.pincode}
                  </p>
                </div>

                <div className="order-history-items">
                  {order.items?.map((item) => (
                    <div key={item.id} className="order-history-item">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="order-history-item__image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/120x120?text=No+Image";
                        }}
                      />
                      <div className="order-history-item__details">
                        <p className="order-history-item__name">{item.name}</p>
                        <p className="order-history-item__brand">{item.brand}</p>
                        <p>Qty: {item.quantity}</p>
                        <p>{formatPrice(item.price_at_purchase)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default OrderHistoryPage;