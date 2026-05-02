import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import useStore from './store';
import './App.css';

function App() {
  const fetchProducts = useStore(state => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Cart />
        <AuthModal />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
