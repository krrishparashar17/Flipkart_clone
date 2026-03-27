const pool = require("../config/db");

const createOrder = async (orderData) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const {
      customer_name,
      email,
      phone,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      total_amount,
      items,
    } = orderData;

    const [orderResult] = await connection.query(
      `
      INSERT INTO orders (
        customer_name,
        email,
        phone,
        address_line1,
        address_line2,
        city,
        state,
        pincode,
        total_amount,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        customer_name,
        email || null,
        phone,
        address_line1,
        address_line2 || null,
        city,
        state,
        pincode,
        total_amount,
        "PLACED",
      ]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await connection.query(
        `
        INSERT INTO order_items (
          order_id,
          product_id,
          quantity,
          price_at_purchase
        )
        VALUES (?, ?, ?, ?)
        `,
        [orderId, item.id, item.quantity, item.price]
      );
    }

    await connection.commit();

    return orderId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getAllOrders = async () => {
  const [rows] = await pool.query(`
    SELECT 
      id,
      customer_name,
      email,
      phone,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      total_amount,
      status,
      created_at
    FROM orders
    ORDER BY id DESC
  `);

  return rows;
};

const getOrdersByEmail = async (email) => {
  const [orders] = await pool.query(
    `
    SELECT 
      id,
      customer_name,
      email,
      phone,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      total_amount,
      status,
      created_at
    FROM orders
    WHERE email = ?
    ORDER BY id DESC
    `,
    [email]
  );

  for (const order of orders) {
    const [items] = await pool.query(
      `
      SELECT 
        oi.id,
        oi.order_id,
        oi.product_id,
        oi.quantity,
        oi.price_at_purchase,
        p.name,
        p.brand,
        p.thumbnail
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
      `,
      [order.id]
    );

    order.items = items;
  }

  return orders;
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
};