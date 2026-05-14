import { CreditCard, ArrowRight } from 'lucide-react';

export default function Checkout() {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-24 pb-24 text-[#e5e2e1]">
      {/* Order Manifest */}
      <section className="w-full bg-industrial border border-neon/20 p-12 relative overflow-hidden neon-glow">
        <div className="flex justify-between items-center mb-12">
          <div className="flex flex-col">
            <span className="micro-label opacity-100 text-blue">Transaction Node // Secure</span>
            <h2 className="text-4xl font-bold uppercase italic tracking-tighter">Order Manifest</h2>
          </div>
          <div className="text-[10px] uppercase font-bold tracking-widest bg-neon text-black px-6 py-2">
            № 992-XC
          </div>
        </div>

        <div className="flex items-center gap-8 mb-12 border-y border-steel/20 py-8">
          <div className="w-32 h-32 bg-void relative flex-shrink-0 overflow-hidden text-blue/20 flex items-center justify-center font-display text-4xl border border-blue/10">
            01
          </div>
          <div className="flex-grow space-y-2">
            <h3 className="text-2xl font-bold uppercase tracking-widest text-[#e5e2e1]">AP-700 X-TRANS</h3>
            <p className="micro-label font-bold text-neon/60">Neural Noise Filtering // Unit.04</p>
          </div>
          <div className="text-right">
            <span className="font-mono text-lg font-bold text-blue">$499.00</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between nav-label opacity-60">
            <span>Subtotal</span>
            <span>$499.00</span>
          </div>
          <div className="flex justify-between nav-label opacity-60">
            <span>Logistics</span>
            <span className="text-neon">OFFLINE_NODAL_FREE</span>
          </div>
          <div className="flex justify-between text-5xl font-bold mt-12 italic border-t border-steel/20 pt-8 uppercase">
            <span className="tracking-tighter">Total</span>
            <span className="text-neon">$499.00</span>
          </div>
        </div>
      </section>

      {/* Form Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        {/* Step 1: Shipping */}
        <section className="space-y-12">
          <div className="flex items-center gap-6">
            <span className="text-2xl italic text-neon font-bold">01</span>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-blue">Terminal Link</h2>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-2">
              <label className="nav-label opacity-40">Operator Identity</label>
              <input 
                className="cyber-input"
                placeholder="FULL_NAME_ID"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="nav-label opacity-40">Uplink Address</label>
              <input 
                className="cyber-input"
                placeholder="STREET, UNIT, SUITE"
                type="text"
              />
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-2">
                <label className="nav-label opacity-40">Global Sector</label>
                <input 
                  className="cyber-input"
                  placeholder="CITY"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="nav-label opacity-40">Routing Node</label>
                <input 
                  className="cyber-input"
                  placeholder="POSTAL"
                  type="text"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Payment */}
        <section className="space-y-12">
          <div className="flex items-center gap-6">
            <span className="text-2xl italic text-steel font-bold">02</span>
            <h2 className="text-3xl font-bold uppercase tracking-tight opacity-40 text-blue">Credit_Cred</h2>
          </div>

          <div className="bg-industrial/50 p-12 hud-border border-blue/20 space-y-12 relative">
            <div className="flex justify-between items-start">
              <CreditCard size={32} className="text-blue opacity-50" />
              <span className="micro-label font-bold text-neon/40">Encrypted Stream Data</span>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="nav-label opacity-40">Card Cipher</label>
                <input 
                  className="cyber-input"
                  placeholder="0000 0000 0000 0000"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-2">
                  <label className="nav-label opacity-40">Expiry</label>
                  <input 
                    className="cyber-input"
                    placeholder="MM / YY"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="nav-label opacity-40">Hash</label>
                  <input 
                    className="cyber-input"
                    placeholder="***"
                    type="password"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Final Execution CTA */}
      <div className="space-y-8 pt-12">
        <button className="w-full bg-neon text-black py-8 font-mono font-bold uppercase tracking-[0.4em] flex justify-center items-center gap-4 hover:bg-blue hover:text-white transition-all group neon-glow">
          <span className="text-xl">Execute Transfer</span>
          <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
        </button>
        <p className="micro-label !opacity-30 text-center tracking-[0.3em]">
          Authorization packet required for final synchronization
        </p>
      </div>
    </div>
  );
}
