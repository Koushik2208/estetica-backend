const Cart = require("../models/Cart");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");

// Utility to calculate total
const calculateCartTotal = (items) => {
  return items.reduce(
    (sum, item) => sum + item.quantity * (item.product.price || 0),
    0
  );
};

// @desc    Get current user's cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price imageUrl"
    );

    const items = cart?.items || [];
    const total = calculateCartTotal(items);

    res.status(200).json({ items, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "fail", message: "Failed to fetch cart" });
  }
};

// @desc    Add or update item in cart
// @route   POST /api/cart
// @access  Private
exports.addOrUpdateItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const qty = Number(quantity);

    if (!qty || qty <= 0) {
      throw new AppError("Invalid quantity for product", 400);
    }

    const product = await Product.findById(productId);
    if (!product) throw new AppError("Product not found", 404);

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity: qty }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (i) => i.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = qty;
      } else {
        cart.items.push({ product: productId, quantity: qty });
      }

      cart.updatedAt = Date.now();
      await cart.save();
    }

    const populatedCart = await cart.populate(
      "items.product",
      "name price imageUrl"
    );
    const items = populatedCart.items;
    const total = calculateCartTotal(items);

    res.status(200).json({ items, total });
  } catch (err) {
    if (!err.statusCode) {
      console.error(err);
      err = new AppError(err.message || "Server Error", 500);
    }
    res.status(err.statusCode).json({ status: "fail", message: err.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
exports.removeItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) throw new AppError("Cart not found", 404);

    cart.items = cart.items.filter(
      (i) => i.product.toString() !== req.params.productId
    );

    await cart.save();

    const populatedCart = await cart.populate(
      "items.product",
      "name price imageUrl"
    );
    const items = populatedCart.items;
    const total = calculateCartTotal(items);

    res.status(200).json({ items, total });
  } catch (err) {
    if (!err.statusCode) {
      console.error(err);
      err = new AppError(err.message || "Server Error", 500);
    }
    res.status(err.statusCode).json({ status: "fail", message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(200).json({ items: [], total: 0 });
    }

    cart.items = []; // remove all items
    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ items: [], total: 0 });
  } catch (err) {
    if (!err.statusCode) {
      console.error(err);
      err = new AppError(err.message || "Server Error", 500);
    }
    res.status(err.statusCode).json({ status: "fail", message: err.message });
  }
};
