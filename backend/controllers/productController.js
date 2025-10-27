const Product = require('../models/Product');
const { Op } = require('sequelize'); // For search operations

// @desc    Get all products with search and category filter
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const { keyword, category } = req.query;
  let where = {};

  if (keyword) {
    where.name = { [Op.like]: `%${keyword}%` };
  }
  if (category) {
    where.category = category;
  }

  try {
    const products = await Product.findAll({ where });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: 'Server error fetching product' });
  }
};

// @desc    Create a product (requires admin access)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    let imageUrl = null;

    // Check if an image was uploaded
    if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`; // Path to be stored in DB
    }

    try {
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            imageUrl,
        });
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: 'Server error creating product' });
    }
};


module.exports = { getProducts, getProductById, createProduct };