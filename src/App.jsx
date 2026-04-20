import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import UserSettings from './pages/UserSettings';
import AddProducts from './pages/AddProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Catalogue />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Checkout />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="settings" element={<UserSettings />} />
          <Route path="addproducts" element={<AddProducts />} />
          {/* Add placeholders for other routes if needed */}
          <Route path="heritage" element={<Home />} />
          <Route path="contact" element={<Home />} />
          <Route path="about" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
