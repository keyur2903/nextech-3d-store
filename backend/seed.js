const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const MOCK_PRODUCTS = [
  {
    name: 'Quantum Core Processor',
    category: 'Processor',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800',
    description: 'The next generation of computing power.',
    features: ['128 Cores', 'Quantum Entanglement Cache', 'Zero-point Energy Cooling']
  },
  {
    name: 'Neural Link Headset',
    category: 'Wearable',
    price: 549.50,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    description: 'Direct brain-computer interface.',
    features: ['Telepathic Typing', 'Dream Recording', 'Instant Skill Download']
  },
  {
    name: 'Holo-Projector X1',
    category: 'Display',
    price: 1299.00,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
    description: 'True 3D holographic display system.',
    features: ['4K Resolution', 'Haptic Feedback', 'No Glasses Required']
  },
  {
    name: 'Cybernetic Arm Prototype',
    category: 'Wearable',
    price: 4500.00,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    description: 'Military-grade prosthetic enhancement.',
    features: ['Titanium Alloy', 'Neural Feedback', 'Built-in Toolset']
  },
  {
    name: 'Antimatter Battery Cell',
    category: 'Power',
    price: 250.00,
    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=800',
    description: 'Infinite power in the palm of your hand.',
    features: ['100 Year Lifespan', 'Zero Emissions', 'Magnetic Containment']
  },
  {
    name: 'Stealth Drone X-7',
    category: 'Drone',
    price: 1899.99,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800',
    description: 'Invisible to radar, silent operation.',
    features: ['Active Camouflage', 'AI Navigation', 'Laser Payload']
  },
  {
    name: 'Manta Ray Pro-Sub',
    category: 'Submersible',
    price: 3450.00,
    image: 'https://images.unsplash.com/photo-1627967833075-8ef642ef998d?auto=format&fit=crop&q=80&w=800',
    description: 'Deep-sea exploration unit with bio-mimetic propulsion.',
    features: ['6000m Depth Rating', 'Hydrothermal Vent Mapping', 'Soft-touch Sample Grabber']
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected');
    await Product.deleteMany();
    console.log('Products cleared');
    await Product.insertMany(MOCK_PRODUCTS);
    console.log('Products seeded successfully');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
