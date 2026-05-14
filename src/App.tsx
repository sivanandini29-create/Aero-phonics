/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShoppingCart, User, Home, Grid, Info, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, type Page, type Product } from './types.ts';
import Catalog from './pages/Catalog.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import Checkout from './pages/Checkout.tsx';
import About from './pages/About.tsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const navigateToDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('detail');
    window.scrollTo(0, 0);
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-void">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-void/80 backdrop-blur-md border-b border-steel/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
          <button 
            onClick={() => navigateTo('home')}
            className="font-display text-2xl font-bold tracking-tighter text-neon uppercase italic"
          >
            Aero-Phonics
          </button>
          
          <nav className="hidden md:flex gap-10 nav-label text-[#e5e2e1]/40">
            {['Architecture', 'Systems', 'Nodes', 'Catalog'].map(item => (
              <button 
                key={item}
                onClick={() => item === 'Catalog' ? navigateTo('home') : null}
                className="hover:text-neon transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 text-neon hover:text-blue transition-colors">
              <ShoppingCart size={20} />
            </button>
            <button className="p-2 text-neon hover:text-blue transition-colors">
              <User size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {currentPage === 'home' && (
              <Catalog onProductSelect={navigateToDetail} />
            )}
            {currentPage === 'detail' && selectedProduct && (
              <ProductDetail 
                product={selectedProduct} 
                onCheckout={() => navigateTo('checkout')} 
              />
            )}
            {currentPage === 'checkout' && (
              <Checkout />
            )}
            {currentPage === 'about' && (
              <About />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Technical Footer */}
      <footer className="w-full py-16 px-6 md:px-12 border-t border-steel/30 bg-industrial flex flex-col gap-12 text-[#e5e2e1]">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="micro-label opacity-60">Precision Engineering // Neural Division</div>
          
          <div className="flex gap-12 micro-label font-bold text-blue">
            <span>Stockholm</span>
            <span>London</span>
            <span>Kyoto</span>
          </div>

          <div className="micro-label italic opacity-60">System v4.0.8 ©2024</div>
        </div>
        
        <div className="max-w-7xl mx-auto w-full flex flex-wrap justify-center gap-8 border-t border-steel/10 pt-12">
          {['Privacy', 'Terms', 'Shipping', 'Warranty'].map(link => (
            <a 
              key={link} 
              href="#" 
              className="nav-label text-[#e5e2e1]/40 hover:text-neon transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </footer>

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-industrial border-t border-steel/30 flex justify-around items-center py-4">
        <button 
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center gap-1 transition-colors ${currentPage === 'home' ? 'text-neon' : 'text-[#e5e2e1]/40'}`}
        >
          <Home size={18} />
          <span className="text-[9px] uppercase tracking-tighter font-bold font-mono">Catalog</span>
        </button>
        <button 
          className="flex flex-col items-center gap-1 text-[#e5e2e1]/40"
        >
          <Grid size={18} />
          <span className="text-[9px] uppercase tracking-tighter font-bold font-mono">Nodes</span>
        </button>
        <button 
          onClick={() => navigateTo('about')}
          className={`flex flex-col items-center gap-1 transition-colors ${currentPage === 'about' ? 'text-neon' : 'text-[#e5e2e1]/40'}`}
        >
          <Info size={18} />
          <span className="text-[9px] uppercase tracking-tighter font-bold font-mono">About</span>
        </button>
      </nav>
    </div>
  );
}
