import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  InstagramIcon, 
  Facebook01Icon, 
  Mail01Icon 
} from '@hugeicons/core-free-icons';

const Footer = () => {
  return (
    <footer id="footer" className="bg-[#244539] w-full pt-20 pb-12 transition-colors duration-300">
      <div className="grid grid-cols-1 md:group-cols-4 gap-12 px-12 w-full max-w-screen-2xl mx-auto">
        <div className="md:col-span-1">
          <Link to="/" className="signature-font text-4xl text-[#ffffff] mb-6 block">
            E&S.
          </Link>
          <p className="text-[#ebeeed]/80 text-sm leading-relaxed max-w-xs font-['Inter']">
            Creating timeless upholstered furniture through generational skills and contemporary vision.
          </p>
        </div>

        <div>
          <h4 className="text-white text-xs uppercase tracking-widest mb-8 font-bold">The Studio</h4>
          <ul className="space-y-4 text-[#ebeeed]/80 text-sm font-['Inter']">
            <li><Link className="hover:text-white transition-all opacity-80 hover:opacity-100" to="/sustainability">Sustainability</Link></li>
            <li><Link className="hover:text-white transition-all opacity-80 hover:opacity-100" to="/shipping">Shipping & Returns</Link></li>
            <li><Link className="hover:text-white transition-all opacity-80 hover:opacity-100" to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs uppercase tracking-widest mb-8 font-bold">Connect</h4>
          <ul className="space-y-4 text-[#ebeeed]/80 text-sm font-['Inter']">
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={InstagramIcon} size={16} />
              <a className="hover:text-white transition-all" href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li className="flex items-center gap-2">
              <HugeiconsIcon icon={Facebook01Icon} size={16} />
              <a className="hover:text-white transition-all" href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs uppercase tracking-widest mb-8 font-bold">Inquiries</h4>
          <p className="text-[#ebeeed]/80 text-sm leading-relaxed font-['Inter']">
            atelier@es-upholstery.co.uk<br />
            +44 (0) 20 3456 7890
          </p>
        </div>
      </div>

      <div className="mt-20 px-12 w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8">
        <p className="text-[#ebeeed]/60 text-[10px] uppercase tracking-[0.2em] font-['Inter']">
          © 2026 E&S Upholstery. Artisanal Craftsmanship for Modern Spaces.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0 opacity-50">
          <div className="w-10 h-6 bg-white/20 rounded-sm"></div>
          <div className="w-10 h-6 bg-white/20 rounded-sm"></div>
          <div className="w-10 h-6 bg-white/20 rounded-sm"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
