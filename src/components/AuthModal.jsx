import { useState } from 'react';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import useStore from '../store';
import './AuthModal.css';
import './Button.css';

const AuthModal = () => {
  const { isAuthModalOpen, authModalType, closeAuthModal, openAuthModal, login, register } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    if (authModalType === 'signup') {
      result = await register(name, email, password);
    } else {
      result = await login(email, password);
    }

    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  };

  const toggleType = () => {
    openAuthModal(authModalType === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="auth-overlay" onClick={closeAuthModal}>
      <div className="auth-modal glass" onClick={e => e.stopPropagation()}>
        <button className="auth-close" onClick={closeAuthModal}>
          <X size={24} />
        </button>

        <h2 className="auth-title">
          {authModalType === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="auth-subtitle">
          {authModalType === 'login' 
            ? 'Enter your details to access your account' 
            : 'Sign up to explore our premium products'}
        </p>

        {error && <div className="auth-error" style={{ color: '#ff3b30', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {authModalType === 'signup' && (
            <div className="input-group">
              <UserIcon className="input-icon" size={20} />
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
          )}

          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? 'Processing...' : (authModalType === 'login' ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-footer">
          {authModalType === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button className="text-btn" onClick={toggleType}>Sign up</button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button className="text-btn" onClick={toggleType}>Sign in</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
