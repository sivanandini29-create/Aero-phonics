import { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { LogIn, Github, Mail, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
  const { login, signInWithGithub } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleLogin = async (method: 'google' | 'github') => {
    setIsConnecting(true);
    try {
      if (method === 'google') {
        await login();
      } else {
        await signInWithGithub();
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-12"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-neon/10 border border-neon/30 text-neon mb-6">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-5xl font-bold uppercase italic text-neon tracking-tighter">Initialize_Session</h1>
          <p className="font-mono text-[10px] text-blue uppercase tracking-[0.2em] opacity-60">
            Secure uplink required for neural synchronization
          </p>
        </div>

        <div className="space-y-6">
          <button 
            onClick={() => handleLogin('google')}
            disabled={isConnecting}
            className="w-full flex items-center justify-between p-6 bg-industrial hud-border border-blue/20 hover:border-neon group transition-all disabled:opacity-50"
          >
            <div className="flex items-center gap-4">
              <Mail className="text-blue group-hover:text-neon transition-colors" />
              <span className="nav-label text-sm uppercase">Auth via Google_Uplink</span>
            </div>
            {isConnecting ? (
              <Loader2 className="animate-spin text-neon" size={20} />
            ) : (
              <ArrowRight className="text-steel group-hover:text-neon group-hover:translate-x-1 transition-all" size={20} />
            )}
          </button>

          <button 
            onClick={() => handleLogin('github')}
            disabled={isConnecting}
            className="w-full flex items-center justify-between p-6 bg-industrial hud-border border-blue/20 hover:border-neon group transition-all disabled:opacity-50"
          >
            <div className="flex items-center gap-4">
              <Github className="text-blue group-hover:text-neon transition-colors" />
              <span className="nav-label text-sm uppercase">Auth via Github_Proxy</span>
            </div>
            <ArrowRight className="text-steel group-hover:text-neon group-hover:translate-x-1 transition-all" size={20} />
          </button>
        </div>

        <div className="pt-12 space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-px flex-grow bg-steel/20" />
            <span className="micro-label text-steel opacity-40">System_Notices</span>
            <div className="h-px flex-grow bg-steel/20" />
          </div>
          
          <div className="bg-industrial/30 p-6 space-y-4 border-l-2 border-neon/20">
            <p className="font-mono text-[9px] text-[#e5e2e1]/60 leading-relaxed uppercase">
              By initializing session, you agree to the decentralized governance protocols and neural data collection policy v4.2.
            </p>
            <p className="font-mono text-[9px] text-blue uppercase font-bold">
              Uplink status: UNAUTHORIZED
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
