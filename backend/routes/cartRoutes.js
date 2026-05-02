const express = require('express');
const Cart = require('../models/Cart');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get user cart
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update cart
router.post('/', protect, async (req, res) => {
  const { items } = req.body; // Expecting array of { product: productId, quantity: number }
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = await Cart.create({ user: req.user.id, items });
    }
    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
