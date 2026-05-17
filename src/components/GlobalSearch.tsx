import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import { PRODUCTS, type Product, type Page } from '../types.ts';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: Page) => void;
}

export default function GlobalSearch({ isOpen, onClose, onSelectProduct, onNavigate }: GlobalSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  const filteredProducts = PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pages = [
    { id: 'home', name: 'Catalog', desc: 'Browse all audio interfaces and nodes', type: 'System Page' },
    { id: 'nodes', name: 'Nodes', desc: 'View grid status and telemetry data', type: 'System Page' },
    { id: 'about', name: 'Architecture', desc: 'Read internal specifications and philosophy', type: 'System Page' }
  ];

  const filteredPages = pages.filter(page => 
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    page.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-void/80 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-11/12 max-w-2xl bg-industrial hud-border border-blue/40 shadow-2xl z-[101] flex flex-col max-h-[80vh] overflow-hidden"
          >
            {/* Header & Input */}
            <div className="flex items-center p-4 border-b border-steel/20 bg-black/40">
              <SearchIcon size={20} className="text-neon" />
              <input
                ref={inputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Query system database..."
                className="flex-1 bg-transparent border-none outline-none text-blue text-lg px-4 font-mono placeholder:text-steel/40"
              />
              <button 
                onClick={onClose}
                className="p-2 text-steel hover:text-neon transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
              {!searchTerm && (
                <div className="text-center py-12">
                  <p className="font-mono text-xs text-steel/50 uppercase">Initialize search parameters...</p>
                </div>
              )}
              
              {searchTerm && filteredProducts.length > 0 && (
                <div className="space-y-4">
                  <h3 className="nav-label text-steel">Hardware Manifest</h3>
                  <div className="space-y-2">
                    {filteredProducts.map(product => (
                      <button
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-4 bg-void/40 border border-steel/10 hover:border-neon/40 hover:bg-void transition-all text-left group"
                      >
                        <div className="flex items-center gap-4">
                          <img src={product.image} alt={product.name} className="w-12 h-12 object-cover grayscale group-hover:grayscale-0 transition-all border border-steel/20" />
                          <div>
                            <div className="font-bold text-blue uppercase font-sans tracking-tight">{product.name}</div>
                            <div className="text-[10px] text-steel font-mono">ID: {product.id} // {product.category}</div>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-steel opacity-0 group-hover:opacity-100 group-hover:text-neon transition-all -translate-x-4 group-hover:translate-x-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchTerm && filteredPages.length > 0 && (
                <div className="space-y-4">
                  <h3 className="nav-label text-steel">System Modules</h3>
                  <div className="space-y-2">
                    {filteredPages.map(page => (
                      <button
                        key={page.id}
                        onClick={() => {
                          onNavigate(page.id as Page);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-4 bg-void/40 border border-steel/10 hover:border-neo/40 hover:bg-void hover:border-blue/40 transition-all text-left group"
                      >
                        <div>
                          <div className="font-bold text-neon uppercase font-sans tracking-tight flex items-center gap-2">
                            {page.name}
                            <span className="bg-blue/10 text-blue px-2 py-0.5 text-[8px] font-mono border border-blue/20">{page.type}</span>
                          </div>
                          <div className="text-[10px] text-steel font-mono">{page.desc}</div>
                        </div>
                        <ArrowRight size={16} className="text-steel opacity-0 group-hover:opacity-100 group-hover:text-blue transition-all -translate-x-4 group-hover:translate-x-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchTerm && filteredProducts.length === 0 && filteredPages.length === 0 && (
                <div className="text-center py-12">
                  <p className="font-mono text-xs text-red-500/80 uppercase">No records found matching query.</p>
                </div>
              )}
            </div>
            
            <div className="bg-black/80 px-4 py-2 border-t border-steel/20 flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-steel/50">
              <span>Status: <span className="text-neon">Scanning</span></span>
              <span>Global Index</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
