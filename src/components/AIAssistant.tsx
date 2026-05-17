import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'model', parts: [{ text: data.text }] }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Neural link severed. Please try again." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-neon text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:scale-110 active:scale-95 transition-transform"
        whileHover={{ rotate: 5 }}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] h-[500px] bg-industrial hud-border border-blue/40 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-blue/20 bg-blue/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neon/10 rounded-lg">
                  <Sparkles size={16} className="text-neon" />
                </div>
                <div>
                  <h3 className="font-bold text-xs uppercase italic tracking-wider text-blue">System_AI</h3>
                  <p className="text-[8px] font-mono text-neon/60 uppercase">Neural Uplink Active</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-steel hover:text-neon transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide"
            >
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                  <MessageSquare size={48} className="text-blue" />
                  <p className="font-mono text-[9px] uppercase max-w-[200px]">
                    Waiting for input. Initialize inquiry sequence.
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-xl font-mono text-[10px] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue/20 border border-blue/30 text-blue-100 rounded-tr-none' 
                      : 'bg-industrial-light border border-neon/30 text-neon rounded-tl-none'
                  }`}>
                    <Markdown>{msg.parts[0].text}</Markdown>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-industrial-light border border-neon/20 p-3 rounded-xl rounded-tl-none">
                    <Loader2 className="animate-spin text-neon" size={12} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-blue/20 bg-blue/5 flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Inquiry text..."
                className="flex-grow bg-black/40 border border-blue/20 rounded-lg px-4 py-2 font-mono text-[10px] focus:outline-none focus:border-neon transition-colors placeholder:text-steel/40"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 bg-neon text-black rounded-lg hover:blue-glow disabled:opacity-50 transition-all"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
