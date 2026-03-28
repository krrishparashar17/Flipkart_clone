const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getOrders);
router.get("/history", orderController.getOrderHistoryByEmail);
router.post("/", orderController.placeOrder);

module.exports = router;