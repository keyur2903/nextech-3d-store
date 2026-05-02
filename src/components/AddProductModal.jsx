import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import useStore from '../store';
import Button from './Button';
import './AddProductModal.css';

const AddProductModal = () => {
  const { isAddProductModalOpen, closeAddProductModal, addProduct } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await addProduct({
      ...formData,
      price: parseFloat(formData.price)
    });

    setIsLoading(false);

    if (result.success) {
      closeAddProductModal();
      setFormData({ name: '', price: '', category: '', description: '', image: '' });
    } else {
      setError(result.message || 'Failed to add product');
    }
  };

  return (
    <AnimatePresence>
      {isAddProductModalOpen && (
        <div className="modal-overlay">
          <motion.div 
            className="modal-content glass-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <button className="close-btn" onClick={closeAddProductModal}>
              <X size={24} />
            </button>
            
            <h2 className="modal-title text-gradient">Add New Product</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Product Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  placeholder="e.g. Quantum X1"
                />
              </div>
              
              <div className="form-group">
                <label>Price ($)</label>
                <input 
                  type="number" 
                  name="price"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required 
                  placeholder="e.g. 999.99"
                />
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <input 
                  type="text" 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required 
                  placeholder="e.g. Computing"
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required 
                  placeholder="Short product description..."
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input 
                  type="url" 
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required 
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>
              
              <Button type="submit" variant="primary" disabled={isLoading} style={{ width: '100%', marginTop: '1rem' }}>
                {isLoading ? 'Adding...' : 'Add Product'}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddProductModal;
