const Product = require("../models/Product");
const ActivityLog = require("../models/ActivityLog");
const joi = require("joi");
const cloudinary = require("../config/cloudinary.config");




const addProduct = async (req, res) => {
  try {
    const schema = joi.object({
      product: joi.string().required().max(30).min(2),
      category: joi.string().required(),
      price: joi.string().required(),
      quantity: joi.number().required(),
      description: joi.string().required().max(250).min(15),
      image: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { product, category, price, quantity, description, image } = req.body;
    const productExists = await Product.findOne({ product: product });

    if (productExists)
      return res.status(400).json(`Product ${product} already exists`);
    const result = await cloudinary.uploader.upload(req.body.image);

    const new_product = new Product({
      product,
      category,
      price,
      quantity,
      description,
      slug: product,
      image: result.secure_url,
    });

    await new_product.save();

    // Log Activity
    await ActivityLog.create({
      action: "Product Added",
      user: req.user._id,
      details: `Product ${product} was added to inventory.`
    });

    return res.status(200).json("Product has been saved.");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", category = "", sort = "newest", minPrice, maxPrice } = req.query;
    
    let query = {};
    
    if (search) {
      query.product = { $regex: search, $options: "i" };
    }
    
    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    let sortOptions = { createdAt: -1 };
    if (sort === "oldest") sortOptions = { createdAt: 1 };
    if (sort === "price-low") sortOptions = { price: 1 };
    if (sort === "price-high") sortOptions = { price: -1 };
    if (sort === "quantity-low") sortOptions = { quantity: 1 };
    if (sort === "quantity-high") sortOptions = { quantity: -1 };

    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments(query);

    return res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalProducts: count
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json(`product with ${id} doesnot exist.`);

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const schema = joi.object({
      product: joi.string().required().max(30).min(2),
      category: joi.string().required(),
      price: joi.string().required(),
      quantity: joi.number().required(),
      description: joi.string().required().max(250).min(15),
      image: joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).json(error.details[0].message);

    const { product, category, price, quantity, description, image } = req.body;
    
    let imageUrl = image;
    // If image is a base64 string, upload to cloudinary
    if (image && image.startsWith("data:image")) {
      const result = await cloudinary.uploader.upload(image);
      imageUrl = result.secure_url;
    }

    const productCheck = await Product.findByIdAndUpdate(
      id,
      { product, category, price, quantity, description, image: imageUrl },
      { new: true }
    );

    if (!productCheck)
      return res.status(404).json(`product with ${id} doesnot exist.`);

    return res.status(200).json("Product has been updated.");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json(`product with ${id} doesnot exist.`);

    // Log Activity
    await ActivityLog.create({
      action: "Product Deleted",
      user: req.user._id,
      details: `Product ${product.product} was removed from inventory.`
    });

    return res.status(200).json("Product has been deleted.");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
