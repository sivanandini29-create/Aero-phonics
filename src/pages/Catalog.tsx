import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { PRODUCTS, type Product } from '../types.ts';
import { getHealth, type HealthStatus } from '../services/api.ts';
import { getProducts, seedProducts } from '../services/firebase.ts';

interface CatalogProps {
  onProductSelect: (product: Product) => void;
}

export default function Catalog({ onProductSelect }: CatalogProps) {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const categories = ["ALL", "OVER-EAR", "IN-EAR", "WIRELESS"];

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const data = await getHealth();
        setHealth(data);
      } catch (err) {
        console.error("Failed to fetch node status", err);
      }
    };
    
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let data = await getProducts();
        if (data.length === 0) {
          console.log("[CATALOG] Syncing static products to database...");
          await seedProducts(PRODUCTS);
          data = await getProducts();
        }
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products from database", err);
        setProducts(PRODUCTS); // Fallback to static
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealth();
    fetchProducts();
    const interval = setInterval(fetchHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "ALL" || 
      product.category.toUpperCase() === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
      {/* Industrial Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-0 hud-border border-l-0 border-r-0">
        <div className="md:col-span-5 flex flex-col justify-center p-8 md:p-16 space-y-8 bg-industrial/50">
          <span className="text-neon uppercase font-mono text-[10px] font-bold tracking-widest">
            Neural Architecture // Phase 01
          </span>
          <h1 className="text-6xl md:text-8xl leading-[0.85] tracking-tighter text-neon uppercase italic">
            Sonic <br/>
            <span className="text-blue not-italic">Engine.</span>
          </h1>
          <p className="font-mono text-xs leading-relaxed opacity-50 max-w-[300px]">
            Calibrated for surgical precision. High-fidelity audio interfaces for the next generation of sound architects.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <button className="px-10 py-4 bg-neon text-black text-[10px] uppercase tracking-widest font-mono font-bold hover:blue-glow transition-all">
              Initialize Uplink
            </button>
            <div className="h-[1px] w-12 bg-neon/20"></div>
            <span className="micro-label">Latency: 0.001ms</span>
          </div>
        </div>

        <div className="md:col-span-7 bg-industrial relative min-h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-void/40"></div>
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-void shadow-2xl border border-neon/10 flex flex-col"
          >
            <div className="flex-1 overflow-hidden relative">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_xPFE3MD0NuBAiZ6LH7FI-712AR3-A86qDHBicIOBvoHJsF3i5Dh2EJUsSkq_j9iTg7w0L7IR5KhdHgzgAvKAQ4VT1vLAgz9AenM8vdN9Z0ZlllfJRgzMjVv_OFEax-yF-Rn6UmQS_cUBCMojRMZLACGEpWHxHBQxza9LjNfU357Xhr94sJfYg_TeapVVTnjx8xn2YzxdPGPDrzyd2KCHYmP7EPFrrx46cRM2sGuyZ7LHC_MSrFxypeBsn4X_Dgu4oX2RCXpxeyg"
                alt="Architecture"
                className="w-full h-full object-cover grayscale opacity-50"
              />
              <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue flex items-center justify-center">
                 <span className="text-4xl text-void font-bold opacity-30 font-mono">04</span>
              </div>
            </div>
            <div className="h-16 flex items-center px-6 justify-between bg-industrial">
                <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-neon">Uplink Stable</span>
                <span className="text-[9px] uppercase tracking-widest font-mono opacity-40">NODE_ID: KYOTO_01</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter & Search */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-steel group-focus-within:text-neon transition-colors" size={18} />
            <input 
              type="text"
              placeholder="SEARCH_MANIFEST..."
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z0-9 ]*$/.test(value)) {
                  setSearchTerm(value);
                }
              }}
              className="cyber-input pl-12 pr-12 py-4"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-steel hover:text-neon transition-colors p-1"
                title="Clear Search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-4 micro-label text-steel">
            <span className="animate-pulse text-neon">●</span>
            SYSTEM_FILTER: ACTIVE
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-steel/30 pb-8">
          <h2 className="text-4xl uppercase text-blue">Collections</h2>
          <div className="flex overflow-x-auto gap-12 no-scrollbar px-4 md:px-0">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-none nav-label tracking-[3px] transition-all relative ${
                  activeCategory === cat 
                    ? 'text-neon after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-blue' 
                    : 'text-[#e5e2e1]/40 hover:text-neon'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 min-h-[400px]">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin text-neon" size={48} />
            <p className="font-mono text-[10px] uppercase text-blue animate-pulse">Syncing_Records...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="group cursor-pointer flex flex-col space-y-6"
                onClick={() => onProductSelect(product)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-industrial neon-border">
                  <motion.div 
                    className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"
                    initial={false}
                  />
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute top-0 right-0 w-12 h-12 bg-neon flex items-center justify-center z-20">
                    <span className="text-[10px] font-bold text-black font-mono">№{product.id.slice(-2).toUpperCase()}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:text-neon transition-colors truncate max-w-[200px] sm:max-w-xs">{product.name}</h3>
                      {product.stockStatus && (
                        <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 border border-steel/20 shrink-0">
                          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                            product.stockStatus === 'High' ? 'bg-neon shadow-[0_0_5px_theme(colors.neon)]' : 
                            product.stockStatus === 'Medium' ? 'bg-blue shadow-[0_0_5px_theme(colors.blue)]' : 
                            'bg-red-500 shadow-[0_0_5px_theme(colors.red.500)]'
                          }`} />
                          <span className="text-[8px] font-mono uppercase tracking-wider text-steel">{product.stockStatus}</span>
                        </div>
                      )}
                    </div>
                    <span className="font-mono text-sm font-bold text-blue shrink-0">${product.price.toFixed(2)}</span>
                  </div>
                  
                  <p className="text-xs opacity-50 line-clamp-2 leading-relaxed font-sans">
                    {product.description}
                  </p>

                  <div className="pt-4 flex items-center gap-4 group/interface">
                    <div className="nav-label text-neon group-hover:text-blue transition-colors">Interface Access</div>
                    <motion.div 
                      className="flex-1 h-[1px] bg-neon/20 group-hover:bg-blue/30 transition-colors"
                      whileHover={{ scaleX: 1.05 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="col-span-full py-24 text-center border border-dashed border-steel/20">
            <p className="font-mono text-xs opacity-40 uppercase tracking-widest">
              No matching records found in database.
            </p>
          </div>
        )}
      </section>

      <section className="pt-24 border-t border-steel/20">
        <div className="space-y-12">
          <div className="flex justify-between items-center">
            <h4 className="nav-label text-blue">Environmental Status</h4>
            <div className="text-[9px] uppercase tracking-widest opacity-40 font-mono">
              Spectral Analysis // {health?.node || 'CONNECTING...'}
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-end gap-2 h-16">
              {Array.from({ length: 60 }).map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`] }}
                  transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, delay: i * 0.02 }}
                  className="flex-1 bg-neon/30 min-w-[1px]"
                />
              ))}
            </div>
            <div className="flex justify-between micro-label">
              <span>{health ? health.status.toUpperCase() : 'INITIALIZING...'}</span>
              <span className="animate-pulse opacity-100 font-bold text-neon">
                {health ? `LATENCY: ${health.latency}` : 'MONITORING FREQUENCY...'}
              </span>
              <span>{health ? new Date(health.timestamp).toLocaleTimeString() : '22kHz'}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
