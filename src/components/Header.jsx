import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ShoppingBag01Icon, UserIcon, Menu01Icon, Cancel01Icon, ViewIcon, ViewOffIcon } from '@hugeicons/core-free-icons';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signIn, signUp, resetPassword, signOut } = useAuth();
  const { cartCount } = useCart();
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin', 'signup', 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const navLinks = [
    { name: 'Showroom', path: '/search' },
    { name: 'Contact', path: '#footer' },
  ];

  const handleScroll = (e, path) => {
    if (path === '#footer') {
      e.preventDefault();
      const footer = document.getElementById('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleAccountClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/settings');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    if (cartCount === 0) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      navigate('/checkout');
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    try {
      if (authMode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) throw error;
        setIsAuthModalOpen(false);
      } else if (authMode === 'signup') {
        const { error } = await signUp(email, password, { display_name: displayName });
        if (error) throw error;
        setMessage('Verification email sent! Please check your inbox.');
        setAuthMode('signin');
      } else if (authMode === 'reset') {
        const { error } = await resetPassword(email);
        if (error) throw error;
        setMessage('Password reset email sent!');
        setAuthMode('signin');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#f7faf9]/70 backdrop-blur-md shadow-sm shadow-[#244539]/5 transition-colors duration-300">
        <div className="flex justify-between items-center px-8 py-6 max-w-screen-2xl mx-auto">
          <Link to="/" className="signature-font text-3xl text-[#244539]">
            E&S.
          </Link>
          
          <div className="hidden md:flex items-center space-x-12 font-label font-light tracking-tight">
            {navLinks.map((link) => (
              link.path.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleScroll(e, link.path)}
                  className="text-[#414845] hover:text-[#244539] transition-colors duration-300 cursor-pointer"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors duration-300 ${
                    location.pathname === link.path 
                      ? 'text-[#244539] border-b border-[#244539] pb-1' 
                      : 'text-[#414845] hover:text-[#244539]'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          <div className="flex items-center space-x-6 text-[#244539]">
            <button 
              onClick={handleCartClick}
              className="hover:scale-95 duration-200 transition-transform flex items-center relative"
            >
              <HugeiconsIcon icon={ShoppingBag01Icon} size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={handleAccountClick}
              className="hover:scale-95 duration-200 transition-transform flex items-center"
            >
              <HugeiconsIcon icon={UserIcon} size={24} strokeWidth={1.5} />
            </button>
            <button className="md:hidden flex items-center">
              <HugeiconsIcon icon={Menu01Icon} size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden p-8"
            >
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute top-4 right-4 text-outline hover:text-primary transition-colors"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={24} />
              </button>

              <div className="text-center mb-8">
                <span className="signature-font text-4xl text-primary mb-2 block">E&S.</span>
                <h2 className="text-2xl font-headline font-bold text-on-surface uppercase tracking-widest">
                  {authMode === 'signin' ? 'Welcome Back' : authMode === 'signup' ? 'Join the Archive' : 'Reset Password'}
                </h2>
                <p className="text-on-surface-variant text-sm mt-2">
                  {authMode === 'signin' ? 'Access your curated collection.' : authMode === 'signup' ? 'Begin your bespoke journey with us.' : 'Enter your email to receive a reset link.'}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-error/10 border border-error/20 text-error text-xs rounded-sm">
                  {error}
                </div>
              )}
              {message && (
                <div className="mb-6 p-3 bg-primary/10 border border-primary/20 text-primary text-xs rounded-sm">
                  {message}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} className="space-y-6">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">Display Name</label>
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-surface-container border-b border-outline-variant/40 py-3 px-4 focus:outline-none focus:border-primary transition-all text-on-surface rounded-sm"
                      placeholder="e.g. Julian Montgomery"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container border-b border-outline-variant/40 py-3 px-4 focus:outline-none focus:border-primary transition-all text-on-surface rounded-sm"
                    placeholder="name@example.com"
                  />
                </div>

                {authMode !== 'reset' && (
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-surface-container border-b border-outline-variant/40 py-3 px-4 focus:outline-none focus:border-primary transition-all text-on-surface rounded-sm"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                      >
                        <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} size={20} />
                      </button>
                    </div>
                  </div>
                )}

                {authMode === 'signin' && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setAuthMode('reset')}
                      className="text-xs text-primary hover:underline underline-offset-4 uppercase tracking-widest font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-sm uppercase tracking-[0.2em] font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 transition-all"
                >
                  {authMode === 'signin' ? 'Sign In' : authMode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-outline-variant/20 text-center">
                <p className="text-sm text-on-surface-variant">
                  {authMode === 'signin' ? (
                    <>
                      Don't have an account?{' '}
                      <button
                        onClick={() => setAuthMode('signup')}
                        className="text-primary font-bold hover:underline underline-offset-4"
                      >
                        Register
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button
                        onClick={() => setAuthMode('signin')}
                        className="text-primary font-bold hover:underline underline-offset-4"
                      >
                        Sign In
                      </button>
                    </>
                  )}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] bg-primary text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4"
          >
            <HugeiconsIcon icon={ShoppingBag01Icon} size={20} />
            <span className="text-sm font-medium tracking-wide">Your collection is currently empty.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
