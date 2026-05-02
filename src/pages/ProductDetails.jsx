import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Zap, Box } from 'lucide-react';
import Scene from '../components/canvas/Scene';
import TechModel from '../components/canvas/TechModel';
import useStore from '../store';
import Button from '../components/Button';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const products = useStore((state) => state.products);
  const product = products.find(p => p._id === id);
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <div className="container not-found"><h2>Product Not Found</h2><Link to="/">Go Back</Link></div>;
  }

  return (
    <div className="product-details">
      <div className="product-layout container">
        
        {/* Left: 3D Interactive Viewer */}
        <div className="product-viewer">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} /> Back to Store
          </Link>
          <div className="viewer-container glass-card">
            <Scene controls cameraPos={[0, 0, 4]}>
              <TechModel color="#00f3ff" distort={0.5} />
            </Scene>
            <div className="viewer-hint">Drag to rotate</div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="product-info-panel">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="product-meta">
              <span className="badge">{product.category}</span>
              <span className="stock-status">In Stock</span>
            </div>
            
            <h1 className="title text-gradient">{product.name}</h1>
            <p className="price">${product.price.toFixed(2)}</p>
            
            <div className="description">
              <p>{product.description}</p>
            </div>

            <div className="features">
              <div className="feature-item">
                <ShieldCheck size={20} className="feature-icon" />
                <span>3 Year Extended Warranty</span>
              </div>
              <div className="feature-item">
                <Zap size={20} className="feature-icon" />
                <span>Next-Day Quantum Delivery</span>
              </div>
              <div className="feature-item">
                <Box size={20} className="feature-icon" />
                <span>Secure Holographic Packaging</span>
              </div>
            </div>

            <div className="actions">
              <Button variant="primary" className="add-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
