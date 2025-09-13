const express = require("express");
const {
  getCart,
  addOrUpdateItem,
  removeItem,
  clearCart,
} = require("../controllers/cartController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addOrUpdateItem);
router.delete("/:productId", protect, removeItem);
router.delete("/", protect, clearCart);

module.exports = router;
