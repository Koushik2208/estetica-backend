const Appointment = require("../models/Appointment");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");

// @desc    Create a new appointment and generate invoice
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res) => {
  try {
    const { productsUsed } = req.body;
    if (!productsUsed || !productsUsed.length) {
      throw new AppError("No products provided", 400);
    }

    let total = 0;
    const detailedItems = [];

    for (const item of productsUsed) {
      const product = await Product.findById(item.product);
      if (!product)
        throw new AppError(`Product ${item.product} not found`, 404);

      const qty = Number(item.quantity);
      const price = Number(product.price);

      if (isNaN(qty) || qty <= 0)
        throw new AppError(`Invalid quantity for ${product.name}`, 400);
      if (isNaN(price))
        throw new AppError(`Invalid price for ${product.name}`, 500);

      const subtotal = price * qty;
      total += subtotal;

      detailedItems.push({
        productId: product._id,
        name: product.name,
        price,
        quantity: qty,
        subtotal,
      });
    }

    // Add 'status' field for soft delete support
    const appointment = await Appointment.create({
      user: req.user._id,
      productsUsed: productsUsed.map((p) => ({
        product: p.product,
        quantity: Number(p.quantity),
      })),
      total,
      status: "active", // default status
    });

    res.status(201).json({
      appointmentId: appointment._id,
      invoice: {
        lineItems: detailedItems,
        grandTotal: total,
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      console.error(err);
      err = new AppError(err.message || "Server Error", 500);
    }
    res.status(err.statusCode).json({ status: "fail", message: err.message });
  }
};

// @desc    Get all appointments of the current user
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
  try {
    // Optional query parameter ?status=all to fetch all appointments
    const statusFilter = req.query.status === "all" ? {} : { status: "active" };

    const appointments = await Appointment.find({
      user: req.user._id,
      ...statusFilter,
    }).populate("productsUsed.product", "name price");

    res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "fail", message: "Failed to fetch appointments" });
  }
};

exports.cancelAppointment = async (req, res) => {
  const appointment = await Appointment.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!appointment)
    return res
      .status(404)
      .json({ status: "fail", message: "Appointment not found" });

  appointment.status = "canceled";
  await appointment.save();

  res
    .status(200)
    .json({ status: "success", message: "Appointment canceled successfully" });
};
