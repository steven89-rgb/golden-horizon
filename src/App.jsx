import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Nav } from './layout/Nav.jsx';
import { Footer } from './layout/Footer.jsx';
import { WhatsAppFab } from './layout/WhatsAppFab.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Product from './pages/Product.jsx';
import Verify from './pages/Verify.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Account from './pages/Account.jsx';

/** Scroll to top on every route change. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
