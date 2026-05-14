import { motion } from 'motion/react';
import { PRODUCTS, type Product } from '../types.ts';

interface CatalogProps {
  onProductSelect: (product: Product) => void;
}

export default function Catalog({ onProductSelect }: CatalogProps) {
  const categories = ["ALL", "OVER-EAR", "IN-EAR", "WIRELESS"];

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

      {/* Category Filter */}
      <section className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-steel/30 pb-8">
        <h2 className="text-4xl uppercase text-blue">Collections</h2>
        <div className="flex overflow-x-auto gap-12 no-scrollbar px-4 md:px-0">
          {categories.map((cat, i) => (
            <button 
              key={cat}
              className={`flex-none nav-label tracking-[3px] transition-all relative ${
                i === 0 
                  ? 'text-neon after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-blue' 
                  : 'text-[#e5e2e1]/40 hover:text-neon'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {PRODUCTS.map(product => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer flex flex-col space-y-6"
            onClick={() => onProductSelect(product)}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-industrial neon-border">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out group-hover:scale-110"
              />
              <div className="absolute top-0 right-0 w-12 h-12 bg-neon flex items-center justify-center">
                <span className="text-[10px] font-bold text-black font-mono">№{product.id.slice(-2).toUpperCase()}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:text-neon transition-colors">{product.name}</h3>
                <span className="font-mono text-sm font-bold text-blue">${product.price.toFixed(2)}</span>
              </div>
              
              <p className="text-xs opacity-50 line-clamp-2 leading-relaxed font-sans">
                {product.description}
              </p>

              <div className="pt-4 flex items-center gap-4 group">
                <div className="nav-label text-neon group-hover:text-blue transition-colors">Interface Access</div>
                <div className="flex-1 h-[1px] bg-neon/20 group-hover:bg-blue/30 transition-colors"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="pt-24 border-t border-steel/20">
        <div className="space-y-12">
          <div className="flex justify-between items-center">
            <h4 className="nav-label text-blue">Environmental Status</h4>
            <div className="text-[9px] uppercase tracking-widest opacity-40 font-mono">Spectral Analysis // Kyoto Node</div>
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
              <span>20Hz</span>
              <span className="animate-pulse opacity-100 font-bold text-neon">MONITORING FREQUENCY...</span>
              <span>22kHz</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
