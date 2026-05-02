const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const fixImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find products with missing or non-http images
    const products = await Product.find({});
    
    let updated = 0;
    for (let product of products) {
      if (!product.image || (!product.image.startsWith('http') && !product.image.startsWith('/'))) {
        console.log(`Fixing image for: ${product.name}`);
        // Assign a default valid image based on name
        if (product.name.toLowerCase().includes('keyboard') || product.name.toLowerCase().includes('new product')) {
          product.image = 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80';
        } else {
          product.image = 'https://images.unsplash.com/photo-1544324903-874db5c0d23d?w=800&q=80';
        }
        await product.save();
        updated++;
      }
    }
    
    console.log(`Fixed ${updated} products.`);
    process.exit(0);
  } catch (error) {
    console.error('Error fixing images:', error);
    process.exit(1);
  }
};

fixImages();
