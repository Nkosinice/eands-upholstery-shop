import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  Home01Icon, 
  Layers01Icon, 
  SquareIcon, 
  Leaf01Icon
} from '@hugeicons/core-free-icons';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('featured', true)
          .limit(4);
        
        if (error) throw error;
        setFeaturedProducts(data || []);
      } catch (err) {
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="bg-surface text-on-surface">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden bg-surface">
        <div className="absolute inset-0 z-0">
          <img
            alt="Artisanal armchair"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyHQcYlvA_23Rx95WwtWrnkZVE8TgLTzhZDPGqW8vxybht8R_FayhM3tcxVye-kJHU8PFcEDb2kIIPwaROZHytqXGDG_4vE9SxxXuqcD6fl58x6QZKlTLoMCQGjwZH3iHYUeJVFjLNXhBZ6P2fzWkc-wXjfxnYF5cROhtmSoIlJQ23kDFl0HorMxwAxi5t5lzAw5015P5AWx4CyGYlpjAktOITZjCE3G1vOayvT9Q93ZM2MWXrlbVsJjrQWgexW8fFXZr-qecRz4M"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-primary leading-tight mb-8">
              Artisanal Craftsmanship for Modern Living
            </h1>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/search"
                className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-4 text-sm font-medium tracking-widest uppercase rounded-sm shadow-xl shadow-primary/10 hover:opacity-90 transition-all text-center"
              >
                Shop Now
              </Link>
              <Link
                to="/search?category=reupholstery"
                className="text-primary editorial-underline px-2 py-4 text-sm font-medium tracking-widest uppercase hover:opacity-70 transition-all"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 px-8 max-w-screen-2xl mx-auto">
        <div className="mb-20 flex justify-between items-end">
          <div>
            <span className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-4 block">
              Selected Works
            </span>
            <h2 className="text-4xl font-light text-on-surface">The Curator's Choice</h2>
          </div>
          <Link to="/search" className="text-primary editorial-underline text-sm font-medium tracking-wide">
            View All Collection
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-outline-variant/20 rounded-lg">
            <p className="text-on-surface-variant font-light italic">The curator is currently selecting new pieces. Check back soon.</p>
          </div>
        )}
      </section>

      {/* Service Highlights */}
      <section className="bg-surface-container py-32 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5">
              <span className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-6 block">
                Our Expertise
              </span>
              <h2 className="text-5xl font-bold text-on-surface mb-8 leading-tight font-headline">
                Elevating Spaces through Fabric and Form
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-12">
                From restorative re-upholstery of family heirlooms to the creation of bespoke centerpieces, our master
                craftsmen blend centuries-old techniques with contemporary vision.
              </p>
              <div className="space-y-10">
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 flex items-center justify-center bg-white text-primary rounded-full shadow-sm">
                    <HugeiconsIcon icon={Home01Icon} size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-on-surface mb-2 font-headline">Custom Furniture</h4>
                    <p className="text-on-surface-variant">Tailor-made frames and finishes designed to your exact specifications.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 flex items-center justify-center bg-white text-primary rounded-full shadow-sm">
                    <HugeiconsIcon icon={Layers01Icon} size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-on-surface mb-2 font-headline">Re-upholstery</h4>
                    <p className="text-on-surface-variant">Breathe new life into beloved pieces with our premium textile library.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start group">
                  <div className="w-12 h-12 flex items-center justify-center bg-white text-primary rounded-full shadow-sm">
                    <HugeiconsIcon icon={SquareIcon} size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-on-surface mb-2 font-headline">Cushions & Accessories</h4>
                    <p className="text-on-surface-variant">The finishing touch—bespoke soft furnishings crafted for comfort.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-7 relative">
              <div className="grid grid-cols-2 gap-6 items-end">
                <div className="aspect-[3/4] rounded-lg overflow-hidden translate-y-12">
                  <img
                    alt="Workshop details"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm_TrqlRl4Ec-s86hLr6a0JsoOu8JD3x1PqtmqG9lOHSJG4WHDa_R1ZLIC2CFMeU3An9uiNUbuuDQj9eK2ivgRqfNRZS_I92L4fKWfDd79aChJOqEcG7QL79ii-xrFkiGGgipk3orikbf_j57plQ6TaKc24kSuLgHUUbOgeq4OKKrDKuGKnQtXl-ddKSHb6V2QP2c3H1UisVmTLSHMn0651Qw-xyYKk9HRsv31PLbkcJZf9Iaih7A75Co-ZhF8lBuNPYhBvv1Mu0M"
                  />
                </div>
                <div className="aspect-[4/5] rounded-lg overflow-hidden">
                  <img
                    alt="Fabric samples"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhoICXi53498X5VcR3j2bNYdGVMJAt49iFK2UINCV2GXMH03nKsq-eDMlsz2-wSKNENuU59SDsIXKCsPiAYqdhjtXbqGexWnTaqwSI8vHRIYJ1m0yRBx-V7nAlNWPeE1pGJ2m3BOmdkJxZnbvwZrt-YRSCGKL5ArFrF-DF9R0rtNWnOd-8IG4WESOpSQR-93tDl0CaOBWlgBO1t3GOuoN8xd6DvX-16yzJuTDMeHCDaRqaE6fuAzJWo3QUPl6L9PNKdWD_8jwqj5Q"
                  />
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Snippet */}
      <section className="py-40 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="signature-font text-5xl text-primary mb-8 block">Legacy of the Stitch</span>
          <p className="text-3xl font-light text-on-surface leading-relaxed mb-12 font-headline">
            "E&S Upholstery was founded on the belief that furniture is the soul of a room. We treat every stitch as a
            signature and every frame as a canvas for comfort."
          </p>
          <div className="flex justify-center">
            <Link to="/about" className="text-primary editorial-underline text-sm font-medium tracking-[0.2em] uppercase">
              Learn More About Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="pb-40 px-8 max-w-screen-2xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-4 block">
            Explore Our World
          </span>
          <h2 className="text-4xl font-light text-on-surface font-headline">Browse by Category</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              name: 'Furniture',
              desc: 'Custom-built frames tailored to your comfort.',
              icon: Home01Icon,
              img: 'https://images.pexels.com/photos/8135261/pexels-photo-8135261.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
              link: '/search?category=furniture',
            },
            {
              name: 'Accessories',
              desc: 'Premium textiles from the world\'s finest mills.',
              icon: Layers01Icon,
              img: 'https://images.pexels.com/photos/36214622/pexels-photo-36214622.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
              link: '/search?category=accessories',
            },
            {
              name: 'Re-upholstery',
              desc: 'Expert re-upholstery for cherished heirlooms.',
              icon: Leaf01Icon,
              img: 'https://images.pexels.com/photos/30233116/pexels-photo-30233116.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
              link: '/search?category=reupholstery',
            },
            {
              name: 'Bespoke Craft',
              desc: 'The finishing touches for an elegant home.',
              icon: SquareIcon,
              img: 'https://images.pexels.com/photos/36585044/pexels-photo-36585044.png?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
              link: '/search',
            },
          ].map((cat) => (
            <Link key={cat.name} to={cat.link} className="group relative aspect-[3/4] overflow-hidden rounded-lg">
              <img
                alt={cat.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                src={cat.img}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 p-8">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 text-white">
                  <HugeiconsIcon icon={cat.icon} size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-headline uppercase tracking-widest">{cat.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-[200px]">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
