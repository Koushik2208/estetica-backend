const User = require("../models/User");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError("Email already registered", 400);

  const user = await User.create({ name, email, password });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
    cart: { items: [] },
  });
};

// @desc    Login user and merge frontend cart
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password, frontendCart } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Merge frontend cart with DB cart
  let dbCart = await Cart.findOne({ user: user._id });

  if (frontendCart && frontendCart.length) {
    if (!dbCart) {
      dbCart = await Cart.create({
        user: user._id,
        items: frontendCart.map((i) => ({
          product: i.product,
          quantity: Number(i.quantity),
        })),
      });
    } else {
      frontendCart.forEach((fcItem) => {
        const existingIndex = dbCart.items.findIndex(
          (dbItem) => dbItem.product.toString() === fcItem.product
        );
        const qty = Number(fcItem.quantity);
        if (existingIndex > -1) {
          dbCart.items[existingIndex].quantity += qty;
        } else {
          dbCart.items.push({ product: fcItem.product, quantity: qty });
        }
      });
      dbCart.updatedAt = Date.now();
      await dbCart.save();
    }
  }

  const populatedCart = await dbCart?.populate("items.product", "name price");

  res.status(200).json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
    cart: populatedCart || { items: [] },
  });
};
