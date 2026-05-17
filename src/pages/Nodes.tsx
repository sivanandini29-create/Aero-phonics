import { motion, AnimatePresence } from 'motion/react';
import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, ShieldAlert, Cpu, Activity, Database, Settings, User, Save, Loader2, RefreshCw } from 'lucide-react';
import { updateUserProfile } from '../services/firebase';
import { getNodeStatus } from '../services/api';

export default function Nodes({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { user, loading } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [nodeStatus, setNodeStatus] = useState<string>('LOADING...');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getNodeStatus();
        setNodeStatus(data.status);
      } catch (error) {
        console.error('Failed to fetch node status:', error);
        setNodeStatus('UNKNOWN');
      }
    };
    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] font-mono text-neon gap-6">
        <Loader2 className="animate-spin" size={40} />
        <div className="animate-pulse tracking-widest uppercase">Analyzing_Authorization...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-industrial border border-steel flex items-center justify-center text-blue">
            <ShieldAlert size={40} />
          </div>
        </div>
        <h1 className="text-4xl font-bold uppercase italic text-neon">Access Denied</h1>
        <p className="font-mono text-xs opacity-60 max-w-md mx-auto">
          Neural link required for node access. Please establish a secure uplink to view system logs and personal telemetry.
        </p>
        <button 
          onClick={() => onNavigate('login')}
          className="px-8 py-4 bg-neon text-black font-mono font-bold uppercase tracking-widest hover:blue-glow transition-all"
        >
          Initialize_Uplink
        </button>
      </div>
    );
  }

  const handleUpdateClick = (e: FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const executeSync = async () => {
    setIsUpdating(true);
    setShowConfirm(false);
    setMessage('');
    try {
      await updateUserProfile(user.uid, { displayName, photoURL });
      setMessage('PROFILE_SYNC_COMPLETE');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('SYNC_FAILURE: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
      <AnimatePresence>
        {isUpdating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center gap-8"
          >
            <div className="relative">
              <RefreshCw size={80} className="text-neon animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-neon rounded-full animate-ping" />
              </div>
            </div>
            <div className="space-y-2 text-center">
              <h2 className="text-4xl font-black uppercase italic text-neon tracking-tighter">Synchronizing_Profile</h2>
              <div className="flex gap-2 justify-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 bg-neon" 
                  />
                ))}
              </div>
              <p className="font-mono text-[10px] text-blue uppercase tracking-widest mt-4 opacity-60">
                Updating Decentralized Records...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="space-y-4">
         <span className="text-blue uppercase font-mono text-xs font-bold tracking-widest">
            System Control // User_Node_{user.uid.slice(0, 8)}
          </span>
          <h1 className="text-6xl font-bold uppercase italic text-neon">Digital_Monograph</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-24">
        {/* Profile Card */}
        <div className="md:col-span-4 space-y-8">
          <div className="bg-industrial hud-border p-8 space-y-6">
            <div className="relative w-24 h-24 mx-auto">
              <div className="w-full h-full rounded-full border-2 border-neon/30 overflow-hidden neon-glow bg-industrial">
                {photoURL ? (
                  <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neon/20">
                    <User size={48} />
                  </div>
                )}
              </div>
              {isUpdating && (
                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                  <Loader2 className="animate-spin text-neon" size={24} />
                </div>
              )}
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold uppercase text-[#e5e2e1]">{displayName || 'ANONYMOUS_UNIT'}</h2>
              <p className="font-mono text-[10px] text-blue uppercase">{user.email}</p>
            </div>
          </div>

          <div className="bg-industrial/30 hud-border p-6 space-y-4">
             <div className="flex items-center gap-3">
               <Shield size={16} className="text-neon" />
               <span className="nav-label text-[10px] text-[#e5e2e1]">Security_Level: ALPHA</span>
             </div>
             <div className="flex items-center gap-3">
               <Activity size={16} className="text-blue" />
               <span className="nav-label text-[10px] text-[#e5e2e1]">Latency: 0.002ms</span>
             </div>
          </div>
        </div>

        {/* User Settings & System Stats */}
        <div className="md:col-span-8 space-y-8">
          {/* Settings Section */}
          <section className="bg-industrial p-8 hud-border space-y-8 relative overflow-hidden">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <Settings size={20} className="text-neon animate-spin-slow" />
                 <h2 className="text-2xl font-bold uppercase italic text-blue">User_Config</h2>
                 <div className={`px-2 py-0.5 rounded-sm font-mono text-[9px] font-bold border ${
                   nodeStatus === 'ONLINE' ? 'bg-neon/10 border-neon text-neon' :
                   nodeStatus === 'MAINTENANCE' ? 'bg-orange-500/10 border-orange-500 text-orange-500' :
                   nodeStatus === 'OFFLINE' ? 'bg-red-500/10 border-red-500 text-red-500' :
                   'bg-steel/10 border-steel text-steel'
                 }`}>
                   {nodeStatus}
                 </div>
               </div>
               <span className="micro-label text-neon/40">NODE_MODIFICATION_ENABLED</span>
            </div>

            <form onSubmit={handleUpdateClick} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="nav-label text-[10px] text-blue uppercase opacity-70">Identity_Tag</label>
                  <input 
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="cyber-input"
                    placeholder="ENTER_DISPLAY_NAME"
                    disabled={isUpdating}
                  />
                </div>
                <div className="space-y-2">
                  <label className="nav-label text-[10px] text-blue uppercase opacity-70">Avatar_Link</label>
                  <input 
                    type="url"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="cyber-input"
                    placeholder="https://images.remote.com/avatar.jpg"
                    disabled={isUpdating}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="font-mono text-[10px] text-neon uppercase">
                  {message && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={message.includes('FAILURE') ? 'text-red-500' : 'text-neon'}
                    >
                      {message}
                    </motion.span>
                  )}
                </div>
                <button 
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center gap-3 px-6 py-3 bg-neon/10 border border-neon text-neon font-mono text-xs font-bold uppercase tracking-widest hover:bg-neon hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <Save size={14} className="group-hover:scale-110 transition-transform" />
                      Save_Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-industrial p-8 hud-border space-y-6">
              <div className="flex items-center justify-between">
                 <Cpu size={20} className="text-blue" />
                 <span className="micro-label">Processor</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-neon font-bold uppercase">Neural_Link_Status</h3>
                <div className="h-2 bg-steel/30 rounded-full overflow-hidden">
                  <motion.div 
                     initial={{ width: 0 }}
                     animate={{ 
                       width: '85%',
                       opacity: [0.8, 1, 0.8],
                       boxShadow: [
                         '0 0 10px rgba(57,255,20,0.5)',
                         '0 0 20px rgba(57,255,20,0.8)',
                         '0 0 10px rgba(57,255,20,0.5)'
                       ]
                     }}
                     transition={{ 
                       width: { duration: 1.5, ease: "easeOut" },
                       opacity: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                       boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                     }}
                     className="h-full bg-neon"
                  />
                </div>
                <p className="font-mono text-[9px] opacity-40">System integrity checks passed. All filters nominal.</p>
              </div>
            </div>

            <div className="bg-industrial p-8 hud-border space-y-6">
              <div className="flex items-center justify-between">
                 <Database size={20} className="text-blue" />
                 <span className="micro-label">Memory</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-neon font-bold uppercase">Cloud_Sync</h3>
                <div className="h-1 bg-steel/10 rounded-full overflow-hidden">
                  <motion.div 
                     initial={{ width: '0%' }}
                     animate={{ width: '100%' }}
                     transition={{ 
                       duration: 4, 
                       repeat: Infinity, 
                       ease: "linear"
                     }}
                     className="h-full bg-blue shadow-[0_0_8px_rgba(0,163,255,0.4)]"
                  />
                </div>
                <div className="flex justify-between items-end border-b border-steel/20 pb-2">
                   <span className="font-mono text-[10px] text-blue">Firestore_Latency</span>
                   <motion.span 
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="font-mono text-[10px] text-neon"
                   >
                     42ms
                   </motion.span>
                </div>
                <div className="flex justify-between items-end border-b border-steel/20 pb-2">
                   <span className="font-mono text-[10px] text-blue">Total_Uplinks</span>
                   <span className="font-mono text-[10px] text-neon">124</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowConfirm(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-industrial p-12 hud-border border-neon max-w-md w-full space-y-8"
          >
            <div className="flex justify-between items-start">
               <div className="p-3 bg-neon/10 border border-neon text-neon">
                 <ShieldAlert size={24} />
               </div>
               <span className="micro-label text-neon">PROTOCOL_VERIFICATION</span>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl font-bold uppercase italic text-neon">Authorize Sync?</h3>
              <p className="font-mono text-xs text-blue">
                You are about to overwrite decentralized profile records for node: <span className="text-[#e5e2e1]">{user.uid.slice(0, 12)}...</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <button 
                onClick={() => setShowConfirm(false)}
                className="px-6 py-3 border border-steel/50 text-steel font-mono text-xs font-bold uppercase tracking-widest hover:bg-steel/10 transition-all"
              >
                Abort
              </button>
              <button 
                onClick={executeSync}
                className="px-6 py-3 bg-neon text-black font-mono text-xs font-bold uppercase tracking-widest hover:blue-glow transition-all"
              >
                Confirm
              </button>
            </div>
            
            <div className="flex gap-1 justify-center pt-2">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-neon/20 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
