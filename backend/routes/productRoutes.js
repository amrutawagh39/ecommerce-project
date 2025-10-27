const express = require('express');
const { getProducts, getProductById, createProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware'); // Import admin middleware
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/')); // Images will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

router.route('/')
  .get(getProducts)
  .post(protect, admin, upload.single('image'), createProduct); // Protect and require admin for product creation

router.route('/:id').get(getProductById);

module.exports = router;