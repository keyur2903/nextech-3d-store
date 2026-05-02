import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import useStore from '../store';
import Button from './Button';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, deleteProduct } = useStore();

  return (
    <motion.div 
      className="product-card glass-card"
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <button 
        className="delete-product-btn" 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deleteProduct(product.id);
        }}
        title="Delete Product"
      >
        <Trash2 size={16} />
      </button>
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          <div className="product-footer">
            <span className="product-price">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
      <div className="product-action">
         <Button 
            variant="outline" 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
          >
            Add to Cart
          </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
