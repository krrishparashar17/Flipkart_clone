const express = require("express");
const router = express.Router();

let cartItems = [];

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: cartItems,
  });
});

router.post("/", (req, res) => {
  const item = req.body;
  const existingIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

  if (existingIndex !== -1) {
    cartItems[existingIndex].quantity += item.quantity || 1;
  } else {
    cartItems.push({ ...item, quantity: item.quantity || 1 });
  }

  res.status(201).json({
    success: true,
    message: "Item added to cart",
    data: cartItems,
  });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { quantity } = req.body;

  cartItems = cartItems.map((item) =>
    item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
  );

  res.status(200).json({
    success: true,
    data: cartItems,
  });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  cartItems = cartItems.filter((item) => item.id !== id);

  res.status(200).json({
    success: true,
    data: cartItems,
  });
});

module.exports = router;