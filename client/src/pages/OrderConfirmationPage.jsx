import { useParams, Link } from "react-router-dom";
import "./OrderConfirmationPage.css";

function OrderConfirmationPage() {
  const { orderId } = useParams();

  return (
    <div className="order-success-page">
      <div className="order-success-card">
        <h1>Order Placed Successfully 🎉</h1>
        <p>Your order has been confirmed.</p>
        <h2>Order ID: {orderId}</h2>
        <Link to="/" className="order-success-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;