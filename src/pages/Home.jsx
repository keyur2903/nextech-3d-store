import { motion } from 'framer-motion';
import Scene from '../components/canvas/Scene';
import TechModel from '../components/canvas/TechModel';
import Planets from '../components/canvas/Planets';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import AddProductModal from '../components/AddProductModal';
import useStore from '../store';
import './Home.css';

const Home = () => {
  const { products, openAddProductModal } = useStore();
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <Scene>
          <TechModel color="#00f3ff" distort={0.5} />
          <Planets />
        </Scene>
        
        <div className="hero-content container">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-text glass"
          >
            <h1>Future of <span className="text-gradient">Tech</span> is Here</h1>
            <p>Experience the next generation of premium gadgets and quantum processors. Designed for the elite.</p>
            <button className="btn btn-primary cta-btn" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>Explore Collection</button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="products-section container">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-header"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <h2>Featured <span className="text-gradient">Gadgets</span></h2>
          <Button variant="outline" onClick={openAddProductModal}>
            + Add New Product
          </Button>
        </motion.div>
        
        <div className="products-grid">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={{...product, id: product._id}} />
            </motion.div>
          ))}
        </div>
      </section>

      <AddProductModal />
    </div>
  );
};

export default Home;
