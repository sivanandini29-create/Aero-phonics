import { useState } from 'react';
import { ChevronDown, Battery, Shield, Bluetooth, Plus, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { type Product } from '../types.ts';

interface ProductDetailProps {
  product: Product;
  onCheckout: () => void;
}

export default function ProductDetail({ product, onCheckout }: ProductDetailProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>('specs');

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Product Image Section */}
        <section className="lg:col-span-7 relative aspect-[4/5] bg-industrial overflow-hidden neon-border">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover grayscale brightness-90"
          />
          <div className="absolute top-8 left-8">
            <div className="bg-void text-neon font-mono text-[10px] px-6 py-3 uppercase font-bold tracking-widest hud-border">
              UNIT_REF: 048_X
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="lg:col-span-5 flex flex-col justify-center gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-blue uppercase font-mono text-xs font-bold tracking-widest">
                Interface Monograph // System Spec
              </span>
              <h1 className="text-6xl md:text-8xl font-bold leading-[0.85] tracking-tighter uppercase italic">{product.name}</h1>
              <p className="font-mono text-sm font-bold text-neon tracking-widest uppercase">${product.price.toFixed(2)}</p>
            </div>
            <p className="text-[#e5e2e1] text-base leading-relaxed opacity-60 font-sans">
              {product.description} Calibrated for surgical precision within the neural frequency bandwidth. Captured across the Kyoto Node.
            </p>
          </div>

          {/* Feature List (Subtle) */}
          <div className="grid grid-cols-1 gap-6 border-y border-steel/20 py-12">
            {[
              { icon: Battery, text: "40H AUTONOMY" },
              { icon: Shield, text: "ACTIVE ISOLATION" },
              { icon: Bluetooth, text: "NEURAL_LINK 5.3" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-4">
                  <feature.icon size={16} className="text-blue group-hover:text-neon transition-colors" />
                  <span className="nav-label text-[#e5e2e1]/60 group-hover:text-neon transition-colors">{feature.text}</span>
                </div>
                <div className="h-[1px] flex-1 mx-8 bg-steel/20"></div>
                <Zap size={14} className="text-blue/30" />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <button 
              onClick={onCheckout}
              className="w-full h-16 bg-neon text-black font-mono font-bold uppercase tracking-widest hover:blue-glow transition-all"
            >
              Initialize Purchase
            </button>
            <div className="flex justify-center">
              <span className="micro-label">Limited release // Kyoto Terminal_01</span>
            </div>
          </div>
        </section>
      </div>

      {/* Technical Data */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-12 border-t border-steel/20">
        <div className="space-y-8">
          <h3 className="text-3xl uppercase text-blue italic">Sub-System Specs</h3>
          <div className="space-y-6">
            {Object.entries(product.specs || {}).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-steel/10 pb-4 font-mono">
                <span className="text-[10px] uppercase text-[#e5e2e1]/40 tracking-wider ">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-xs font-bold text-neon">{value as string}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-8">
          <h3 className="text-3xl uppercase text-blue italic">Logistics</h3>
          <p className="text-sm opacity-50 leading-relaxed font-sans">
            Global expedited shipping via AERO-PHONICS orbital freight. Secured in impact-resistant carbon-reinforced containment. Delivery latency: 2-3 standard cycles. Kyoto distribution node active.
          </p>
        </div>
      </section>

      {/* Audio Visualization */}
      <section className="opacity-80 pt-12">
        <p className="font-mono text-[10px] text-blue mb-4 uppercase tracking-widest">Neural Frequency Spectrum</p>
        <div className="w-full h-32 hud-border relative flex items-end overflow-hidden bg-industrial/30">
          <div className="flex items-end gap-1 px-4 h-full w-full justify-around relative z-0">
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div 
                key={i} 
                animate={{ height: [`${20+Math.random()*60}%`, `${20+Math.random()*60}%`, `${20+Math.random()*60}%`] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.05 }}
                className={`w-[2px] bg-neon ${i % 3 === 0 ? 'bg-blue shadow-[0_0_10px_rgba(0,163,255,0.5)]' : 'shadow-[0_0_10px_rgba(57,255,20,0.5)]'}`} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar for Detail */}
      <div className="fixed bottom-0 left-0 w-full hud-blur px-4 md:px-12 py-6 flex gap-4 border-t border-steel-light/50 z-50">
        <button className="flex-1 h-14 bg-steel-dark border border-steel-light font-display font-bold uppercase tracking-widest hover:bg-steel-light transition-all">
          Add to Cart
        </button>
        <button 
          onClick={onCheckout}
          className="flex-1 h-14 bg-neon-green text-black font-display font-bold uppercase tracking-widest neon-glow hover:scale-[1.02] active:scale-95 transition-all"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
