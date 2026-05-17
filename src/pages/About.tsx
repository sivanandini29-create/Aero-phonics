import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const categories = [
    { 
      title: "The Aesthetic", 
      description: "We believe in the silent authority of minimalism. Our physical objects are quiet until engaged, revealing their complexity only through interaction." 
    },
    { 
      title: "The Engineering", 
      description: "Every node in our network is calibrated against the golden ratio. We don't just build hardware; we engineer sensory experiences." 
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24 py-12 text-[#e5e2e1]">
      {/* Technical Header */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        <div className="md:col-span-6 space-y-8">
          <span className="text-blue uppercase font-mono text-xs font-bold tracking-widest">
            Nodal Monograph // Root_Dir
          </span>
          <h1 className="text-6xl md:text-9xl font-bold leading-[0.8] tracking-tighter uppercase italic text-neon">
            Pure <br/>
            <span className="text-blue not-italic">Signal.</span>
          </h1>
          <p className="font-mono text-xs leading-relaxed opacity-60">
            Aero-Phonics was established in the Kyoto Node with a singular objective: to eliminate the latency between biological audition and digital synthesis.
          </p>
        </div>
        <div className="md:col-span-6 aspect-square bg-industrial relative overflow-hidden group neon-border">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_xPFE3MD0NuBAiZ6LH7FI-712AR3-A86qDHBicIOBvoHJsF3i5Dh2EJUsSkq_j9iTg7w0L7IR5KhdHgzgAvKAQ4VT1vLAgz9AenM8vdN9Z0ZlllfJRgzMjVv_OFEax-yF-Rn6UmQS_cUBCMojRMZLACGEpWHxHBQxza9LjNfU357Xhr94sJfYg_TeapVVTnjx8xn2YzxdPGPDrzyd2KCHYmP7EPFrrx46cRM2sGuyZ7LHC_MSrFxypeBsn4X_Dgu4oX2RCXpxeyg"
            alt="Laboratory"
            className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
          />
          <div className="absolute inset-0 border-[40px] border-void z-10 pointer-events-none hidden md:block"></div>
        </div>
      </section>

      {/* Philosophy Details */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-24 pt-24 border-t border-steel/20">
        {categories.map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 group"
          >
            <div className="flex items-center gap-4">
              <span className="text-neon font-mono text-2xl italic">0{i+1}</span>
              <motion.div 
                className="flex-grow h-[0.5px] bg-steel/20"
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                initial={{ width: 0 }}
              />
            </div>
            <h2 className="text-4xl font-bold tracking-tight h-12 uppercase text-blue group-hover:text-neon transition-colors">{item.title}</h2>
            <p className="text-xs opacity-50 leading-relaxed font-mono">{item.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Visual Quote */}
      <section className="bg-industrial p-12 md:p-32 text-center space-y-12 hud-border neon-glow">
        <blockquote className="text-3xl md:text-5xl font-display leading-tight tracking-tighter max-w-4xl mx-auto italic uppercase text-neon">
          "Sound is not just heard; it is inhabited. We build the neural architecture for that habitation."
        </blockquote>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-[1px] bg-blue"></div>
          <span className="nav-label text-blue">DIRECTOR // AERO SYSTEMS</span>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pt-12 grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-5 space-y-6">
          <h2 className="text-4xl italic uppercase text-blue">Uplink</h2>
          <p className="font-mono text-xs opacity-50 leading-relaxed">
            For systematic partnerships or individual monographs, please establish an uplink through our secure Kyoto terminal.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-full border border-steel/20 flex items-center justify-center group-hover:border-neon transition-colors">
                <Mail size={16} className="text-neon" />
              </div>
              <span className="nav-label text-neon">uplink@aero-phonics.sys</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-industrial/30 p-12 hud-border">
           <form className="space-y-12">
              <div className="space-y-2">
                <label className="nav-label text-blue opacity-100">Identity_Seed</label>
                <input className="cyber-input" placeholder="FULL_NAME" />
              </div>
              <div className="space-y-2">
                <label className="nav-label text-blue opacity-100">Packet_Destination</label>
                <input className="cyber-input" placeholder="EMAIL_ADDR" />
              </div>
              <div className="space-y-2">
                <label className="nav-label text-blue opacity-100">Data_Payload</label>
                <textarea className="cyber-input min-h-[100px] resize-none" placeholder="INSERT_MANIFEST..." />
              </div>
              <button className="w-full bg-neon text-black py-5 font-mono font-bold uppercase tracking-widest hover:bg-blue hover:text-white transition-all flex items-center justify-center gap-4 group">
                Establish Protocol
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </form>
        </div>
      </section>
    </div>
  );
}
