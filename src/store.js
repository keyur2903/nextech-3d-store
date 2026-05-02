import { create } from 'zustand';

const API_URL = 'http://localhost:5000/api';

const useStore = create((set) => ({
  cart: [],
  isCartOpen: false,
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthModalOpen: false,
  authModalType: 'login', // 'login' or 'signup'
  isAddProductModalOpen: false,
  products: [],
  addToCart: (product) => set((state) => {
    const existing = state.cart.find((item) => item.id === product.id);
    if (existing) {
      return { cart: state.cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId)
  })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  closeCart: () => set({ isCartOpen: false }),

  login: async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        set({ user: data, token: data.token, isAuthModalOpen: false });
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: 'Network error' };
    }
  },

  register: async (name, email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        set({ user: data, token: data.token, isAuthModalOpen: false });
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: 'Network error' };
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  fetchProducts: async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      if (res.ok) {
        set({ products: data });
      }
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  },

  openAuthModal: (type = 'login') => set({ isAuthModalOpen: true, authModalType: type }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  openAddProductModal: () => set({ isAddProductModalOpen: true }),
  closeAddProductModal: () => set({ isAddProductModalOpen: false }),

  addProduct: async (productData) => {
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (res.ok) {
        set((state) => ({ products: [...state.products, data] }));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: 'Network error' };
    }
  },

  deleteProduct: async (id) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        set((state) => ({ products: state.products.filter(p => p._id !== id) }));
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  }
}));

export default useStore;
