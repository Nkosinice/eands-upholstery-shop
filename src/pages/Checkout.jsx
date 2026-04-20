import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  Remove01Icon, 
  Add01Icon, 
  Cancel01Icon, 
  AiLockIcon 
} from '@hugeicons/core-free-icons';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const [deliveryType, setDeliveryType] = useState('home');
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const subtotal = cartTotal;

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-xl mx-auto">
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">Review Your Order</h1>
        <p className="text-on-surface-variant max-w-lg leading-relaxed">
          Each piece is meticulously finished by our master artisans. Confirm your selection and details below to proceed.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-7 space-y-16">
          {/* Cart List Section */}
          <section>
            <h2 className="text-xs uppercase tracking-widest text-outline mb-8 font-semibold">Your Selection</h2>
            <div className="space-y-0">
              {cart.length === 0 ? (
                <div className="py-20 text-center border-b border-outline-variant/20">
                  <p className="text-on-surface-variant font-light italic">Your collection is empty.</p>
                  <Link to="/search" className="mt-4 inline-block text-primary underline underline-offset-4 uppercase tracking-widest text-xs">
                    Browse Showroom
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center py-8 bg-surface border-b border-outline-variant/20">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-surface-container">
                      <img 
                        className="w-full h-full object-cover" 
                        src={item.images && item.images[0] || item.image} 
                        alt={item.name} 
                      />
                    </div>
                    <div className="ml-8 flex-grow">
                      <h3 className="font-medium text-lg text-primary">{item.name}</h3>
                      <p className="text-sm text-on-surface-variant mt-1">Category: {item.category}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4 border border-outline-variant/30 rounded px-3 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-on-surface hover:text-primary transition-colors flex items-center"
                          >
                            <HugeiconsIcon icon={Remove01Icon} size={14} />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-on-surface hover:text-primary transition-colors flex items-center"
                          >
                            <HugeiconsIcon icon={Add01Icon} size={14} />
                          </button>
                        </div>
                        <div className="flex items-center space-x-6">
                          <span className="font-medium text-primary">
                            {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(item.price * item.quantity)}
                          </span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-outline hover:text-error transition-colors"
                          >
                            <HugeiconsIcon icon={Cancel01Icon} size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Delivery Details Form */}
          <section className="space-y-12">
            <div>
              <h2 className="text-xs uppercase tracking-widest text-outline mb-8 font-semibold">Delivery Particulars</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Full Name</label>
                  <input className="bg-transparent border-0 border-b border-outline-variant/40 focus:ring-0 focus:border-primary transition-all py-3 text-on-surface placeholder:text-outline-variant" placeholder="e.g. Julian Montgomery" type="text" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Email Address</label>
                  <input className="bg-transparent border-0 border-b border-outline-variant/40 focus:ring-0 focus:border-primary transition-all py-3 text-on-surface placeholder:text-outline-variant" placeholder="e.g. j.montgomery@atelier.com" type="email" />
                </div>
                <div className="flex flex-col md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Delivery Address</label>
                  <textarea className="bg-transparent border-0 border-b border-outline-variant/40 focus:ring-0 focus:border-primary transition-all py-3 text-on-surface placeholder:text-outline-variant resize-none" placeholder="Enter your full address for collection or delivery quotes" rows="2"></textarea>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-outline mb-6 font-semibold">Fulfilment Preference</h3>
              <div className="flex flex-col sm:flex-row gap-6">
                <label className={`flex-1 flex items-center p-6 rounded-sm border cursor-pointer transition-all ${deliveryType === 'home' ? 'border-primary bg-primary/5' : 'border-outline-variant/30 hover:border-outline'}`}>
                  <input className="sr-only" name="delivery" type="radio" onChange={() => setDeliveryType('home')} checked={deliveryType === 'home'} />
                  <div className="flex flex-col">
                    <span className="font-bold text-primary">Atelier Delivery</span>
                    <span className="text-xs text-on-surface-variant mt-1">White-glove service to your door.</span>
                  </div>
                </label>
                <label className={`flex-1 flex items-center p-6 rounded-sm border cursor-pointer transition-all ${deliveryType === 'collect' ? 'border-primary bg-primary/5' : 'border-outline-variant/30 hover:border-outline'}`}>
                  <input className="sr-only" name="delivery" type="radio" onChange={() => setDeliveryType('collect')} checked={deliveryType === 'collect'} />
                  <div className="flex flex-col">
                    <span className="font-bold text-primary">Studio Collection</span>
                    <span className="text-xs text-on-surface-variant mt-1">Collect from our workshop.</span>
                  </div>
                </label>
              </div>
            </div>
          </section>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-5 lg:sticky lg:top-40">
          <div className="bg-surface-container-low p-10 rounded-sm border border-outline-variant/10 shadow-sm">
            <h2 className="text-2xl font-bold text-primary mb-10 tracking-tight">Summary</h2>
            
            <div className="space-y-6 mb-10 pb-10 border-b border-outline-variant/20">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="font-medium text-on-surface">
                  {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Delivery</span>
                <span className="italic text-xs">Quote Pending</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-12">
              <span className="text-lg font-medium text-primary">Total</span>
              <div className="text-right">
                <span className="text-3xl font-bold text-primary tracking-tight">
                  {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(subtotal)}
                </span>
                <p className="text-[10px] text-outline uppercase tracking-tighter mt-1">Excl. Delivery Costs</p>
              </div>
            </div>

            <div className="bg-primary/5 p-5 rounded border border-primary/10 mb-10">
              <p className="text-xs leading-relaxed text-primary-container font-medium italic">
                Delivery costs will be confirmed by E&S Upholstery when we contact you to arrange your order.
              </p>
            </div>

            <button className="w-full py-5 bg-gradient-to-br from-primary to-primary-container text-white font-semibold text-sm tracking-widest uppercase rounded-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
              Place Enquirey
            </button>

            <div className="mt-8 flex items-center justify-center space-x-6 text-outline-variant grayscale opacity-60">
              <HugeiconsIcon icon={AiLockIcon} size={20} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Secure Request</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;
