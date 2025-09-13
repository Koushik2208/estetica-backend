const Product = require("../models/Product");

exports.getProducts = async (req, res, next) => {
  try {
    const { search, category, min, max } = req.query;
    const filter = {};

    if (search) filter.name = { $regex: search, $options: "i" };
    if (category) filter.category = category;
    if (min || max)
      filter.price = {
        ...(min && { $gte: Number(min) }),
        ...(max && { $lte: Number(max) }),
      };

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    next(err);
  }
};
