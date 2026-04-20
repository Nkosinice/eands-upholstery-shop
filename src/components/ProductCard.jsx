import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { Add01Icon } from '@hugeicons/core-free-icons';

const ProductCard = ({ product }) => {
  const formattedPrice = product.price 
    ? new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
      }).format(product.price)
    : null;

  // Use the first image from the array, or a placeholder
  const displayImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://via.placeholder.com/400x500?text=E%26S+Upholstery';

  return (
    <div className="group flex flex-col">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-[4/5] overflow-hidden rounded-lg bg-surface-container relative">
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={displayImage}
            alt={product.name}
          />
          {product.requires_quote && (
            <div className="absolute top-4 left-4">
              <span className="bg-surface-container-lowest/80 backdrop-blur-sm text-primary px-3 py-1 text-xs tracking-widest font-medium rounded-sm uppercase">
                Service
              </span>
            </div>
          )}
          {!product.requires_quote && (
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-primary-container text-on-primary p-3 rounded-sm shadow-xl flex items-center justify-center hover:bg-primary transition-colors">
                <HugeiconsIcon icon={Add01Icon} size={20} strokeWidth={2} />
              </button>
            </div>
          )}
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-headline font-light text-on-surface mb-1">{product.name}</h3>
          <p className="text-on-surface-variant text-xs uppercase tracking-widest mb-3 opacity-60">
            {product.category}
          </p>
          <div className="flex justify-between items-baseline">
            <span className={`text-lg font-headline font-light tracking-tight ${product.requires_quote ? 'text-outline italic' : ''}`}>
              {product.requires_quote ? 'Price on Request' : formattedPrice}
            </span>
            <span className="text-xs font-label uppercase tracking-widest text-primary underline underline-offset-8 decoration-primary/30 group-hover:decoration-primary transition-all">
              {product.requires_quote ? 'Enquire' : 'View Piece'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
