const express = require("express");
const {
  createAppointment,
  getAppointments,
  cancelAppointment,
} = require("../controllers/appointmentController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", protect, getAppointments).post("/", protect, createAppointment);
router.delete("/:id", protect, cancelAppointment);
module.exports = router;
