const orderModel = require("../models/orderModel");
const transporter = require("../config/mailer");

const sendOrderEmail = async ({ email, customer_name, orderId, total_amount, items }) => {
  if (!email) return;

  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd;">${item.name}</td>
        <td style="padding:8px;border:1px solid #ddd;">${item.quantity}</td>
        <td style="padding:8px;border:1px solid #ddd;">₹${Number(item.price).toLocaleString("en-IN")}</td>
      </tr>
    `
    )
    .join("");

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: `Order Confirmed - #${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <h2 style="color: #2874f0;">Your Order is Confirmed 🎉</h2>
        <p>Hi ${customer_name || "Customer"},</p>
        <p>Thank you for shopping with our Flipkart Clone.</p>
        <p><strong>Order ID:</strong> #${orderId}</p>
        <p><strong>Total Amount:</strong> ₹${Number(total_amount).toLocaleString("en-IN")}</p>

        <h3>Items Ordered:</h3>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th style="padding:8px;border:1px solid #ddd;text-align:left;">Product</th>
              <th style="padding:8px;border:1px solid #ddd;text-align:left;">Quantity</th>
              <th style="padding:8px;border:1px solid #ddd;text-align:left;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <p style="margin-top: 20px;">We will process your order soon.</p>
        <p>Thanks,<br/>Flipkart Clone Team</p>
      </div>
    `,
  });
};

const placeOrder = async (req, res) => {
  try {
    const {
      customer_name,
      email,
      phone,
      address_line1,
      city,
      state,
      pincode,
      total_amount,
      items,
    } = req.body;

    if (
      !customer_name ||
      !phone ||
      !address_line1 ||
      !city ||
      !state ||
      !pincode ||
      !total_amount ||
      !items ||
      !items.length
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required order details",
      });
    }

    const orderId = await orderModel.createOrder(req.body);

    try {
      await sendOrderEmail({
        email,
        customer_name,
        orderId,
        total_amount,
        items,
      });
    } catch (mailError) {
      console.error("Email sending failed:", mailError.message);
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: {
        orderId,
      },
    });
  } catch (error) {
    console.error("Order placement failed:", error);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

const getOrderHistoryByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const orders = await orderModel.getOrdersByEmail(email);

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Failed to fetch order history:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order history",
    });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  getOrderHistoryByEmail,
};