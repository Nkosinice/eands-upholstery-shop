import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, FilterIcon } from '@hugeicons/core-free-icons';
import { supabase } from '../lib/supabase';

const Catalogue = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['All', 'Furniture', 'Accessories', 'Reupholstery'];

  // Handle category from URL param
  useEffect(() => {
    if (categoryParam) {
      const matchedCategory = categories.find(
        cat => cat.toLowerCase() === categoryParam.toLowerCase()
      );
      if (matchedCategory) {
        setActiveCategory(matchedCategory);
      } else {
        setActiveCategory('All');
      }
    } else {
      setActiveCategory('All');
    }
  }, [categoryParam]);

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('products')
        .select('*');

      // Category filter
      if (activeCategory !== 'All') {
        query = query.eq('category', activeCategory.toLowerCase());
      }

      // Sorting logic
      if (sortBy === 'Price Low-High') {
        query = query.order('price', { ascending: true, nullsFirst: false });
      } else if (sortBy === 'Price High-Low') {
        query = query.order('price', { ascending: false, nullsFirst: false });
      } else if (sortBy === 'Newest Arrivals') {
        query = query.order('created_at', { ascending: false });
      } else {
        // Featured default
        query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="pt-32 pb-20 px-8 max-w-screen-2xl mx-auto min-h-screen bg-surface">
      {/* Search & Filter Header */}
      <header className="mb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-primary text-xs tracking-[0.3em] uppercase font-semibold mb-4 block">
              The Collection
            </span>
            <h1 className="text-5xl font-headline font-light tracking-tight text-on-surface">Curated Masterpieces</h1>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Search Bar */}
            <div className="relative group w-full md:w-80">
              <input
                className="w-full bg-transparent border-b border-outline-variant/40 py-2 px-1 focus:outline-none focus:border-primary transition-all font-light text-lg text-on-surface placeholder:text-outline-variant"
                placeholder="Search the archive..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute right-1 top-2 text-outline group-focus-within:text-primary transition-colors flex items-center">
                <HugeiconsIcon icon={Search01Icon} size={20} strokeWidth={1.5} />
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 border-b border-outline-variant/40 py-2 group focus-within:border-primary transition-colors">
              <HugeiconsIcon icon={FilterIcon} size={18} className="text-outline group-focus-within:text-primary" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-on-surface text-sm font-medium cursor-pointer pr-8 py-0 appearance-none uppercase tracking-widest"
              >
                <option value="Featured">Featured</option>
                <option value="Price Low-High">Price: Low to High</option>
                <option value="Price High-Low">Price: High to Low</option>
                <option value="Newest Arrivals">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-8 border-b border-outline-variant/20 pb-4 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                if (cat === 'All') {
                  searchParams.delete('category');
                } else {
                  searchParams.set('category', cat.toLowerCase());
                }
                setSearchParams(searchParams);
              }}
              className={`text-xs uppercase tracking-[0.2em] transition-all relative pb-4 ${
                activeCategory === cat 
                  ? 'text-primary font-bold after:content-[""] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:height-[2px] after:bg-primary' 
                  : 'text-on-surface-variant hover:text-primary opacity-60 hover:opacity-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Loading & Error States */}
      {loading ? (
        <div className="flex justify-center items-center py-40">
          <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center py-40">
          <p className="text-error font-headline text-xl">Failed to load the collection.</p>
          <button 
            onClick={fetchProducts}
            className="mt-6 text-primary underline underline-offset-4 font-label uppercase tracking-widest text-xs"
          >
            Try Again
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-40">
          <p className="text-on-surface-variant font-headline text-xl italic">No pieces found matching your criteria.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            className="mt-6 text-primary underline underline-offset-4 font-label uppercase tracking-widest text-xs"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Footer Note */}
      {!loading && filteredProducts.length > 0 && (
        <div className="mt-32 text-center border-t border-outline-variant/20 pt-12">
          <p className="text-on-surface-variant font-label text-xs uppercase tracking-[0.3em]">
            Showing {filteredProducts.length} of {products.length} Items
          </p>
        </div>
      )}
    </div>
  );
};

export default Catalogue;
