import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Camera, BookOpen, Heart, Star } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-brand-ink/5 bg-white/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-pastel-pink rounded-lg flex items-center justify-center">
            <Camera className="w-5 h-5 text-brand-ink" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-brand-ink">PASTELPIX</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-[0.2em] text-brand-ink/60">
          <a href="#" className="hover:text-brand-primary transition-colors">Collections</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Design Tips</a>
          <a href="#" className="hover:text-brand-primary transition-colors">Our Story</a>
        </div>
        <button 
          onClick={onStart}
          className="bg-brand-ink text-white px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-primary transition-all shadow-xl shadow-brand-ink/10"
        >
          Create Your Own
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pastel-blue/30 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pastel-pink/20 rounded-full blur-[120px]"></div>
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-pastel-green/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-display font-black text-brand-ink mb-8 leading-[0.9]">
              Soft Moments, <br />
              <span className="text-brand-primary italic font-serif font-light">Lasting Memories.</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-ink/60 mb-12 font-serif max-w-2xl mx-auto leading-relaxed">
              Minimalist, premium photo albums designed with a touch of pastel elegance. 
              Preserve your journey in a book as beautiful as your memories.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="group bg-brand-ink text-white px-12 py-6 rounded-full text-sm font-bold uppercase tracking-[0.3em] hover:bg-brand-primary transition-all flex items-center gap-4 mx-auto shadow-2xl shadow-brand-ink/20"
            >
              Start Designing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display font-bold mb-4 text-brand-ink">The Pastel Collection</h2>
            <div className="w-24 h-1 bg-pastel-pink mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Dreamy Skies', color: 'bg-pastel-blue' },
              { name: 'Morning Dew', color: 'bg-pastel-green' },
              { name: 'Sunset Glow', color: 'bg-pastel-pink' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="group cursor-pointer"
              >
                <div className={`aspect-[3/4] overflow-hidden rounded-[2rem] mb-6 ${item.color}/10 p-8 flex items-center justify-center transition-all group-hover:shadow-2xl group-hover:shadow-brand-ink/5`}>
                  <img 
                    src={`https://picsum.photos/seed/pastel-template-${i}/800/1000`} 
                    alt={item.name} 
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2 text-brand-ink">{item.name}</h3>
                <p className="text-brand-ink/40 text-xs font-bold uppercase tracking-widest">12-Page Custom Layout</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why PastelPix */}
      <section className="py-32 px-6 bg-brand-cream/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-ink/5">
              <BookOpen className="w-8 h-8 text-pastel-blue" />
            </div>
            <h4 className="font-display font-bold text-xl mb-3 text-brand-ink">Silk Matte Paper</h4>
            <p className="text-sm text-brand-ink/50 leading-relaxed">Premium archival quality paper with a soft-touch finish.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-ink/5">
              <Heart className="w-8 h-8 text-pastel-pink" />
            </div>
            <h4 className="font-display font-bold text-xl mb-3 text-brand-ink">Artisan Bound</h4>
            <p className="text-sm text-brand-ink/50 leading-relaxed">Each album is hand-finished by our master bookbinders.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-ink/5">
              <Star className="w-8 h-8 text-pastel-yellow" />
            </div>
            <h4 className="font-display font-bold text-xl mb-3 text-brand-ink">Smart Editor</h4>
            <p className="text-sm text-brand-ink/50 leading-relaxed">Effortlessly arrange your photos with our intuitive tools.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-ink/5">
              <Camera className="w-8 h-8 text-pastel-green" />
            </div>
            <h4 className="font-display font-bold text-xl mb-3 text-brand-ink">Fast Delivery</h4>
            <p className="text-sm text-brand-ink/50 leading-relaxed">From our studio to your doorstep in just a few days.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-ink text-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-pastel-pink rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-brand-ink" />
              </div>
              <span className="font-display text-3xl font-bold tracking-tight">PASTELPIX</span>
            </div>
            <p className="text-white/40 max-w-md mb-10 font-serif text-lg leading-relaxed">
              Crafting premium, minimalist photo albums that turn your digital memories into tangible art. 
              Soft colors, hard memories.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-8 uppercase tracking-[0.2em] text-[10px] text-white/30">Explore</h5>
            <ul className="space-y-5 text-white/60 text-sm font-medium">
              <li><a href="#" className="hover:text-pastel-pink transition-colors">Pastel Collection</a></li>
              <li><a href="#" className="hover:text-pastel-pink transition-colors">Gift Vouchers</a></li>
              <li><a href="#" className="hover:text-pastel-pink transition-colors">Bulk Orders</a></li>
              <li><a href="#" className="hover:text-pastel-pink transition-colors">Design Service</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-8 uppercase tracking-[0.2em] text-[10px] text-white/30">Support</h5>
            <ul className="space-y-5 text-white/60 text-sm font-medium">
              <li><a href="#" className="hover:text-pastel-pink transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-pastel-pink transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-pastel-pink transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-pastel-pink transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 mt-24 border-t border-white/5 text-white/20 text-[10px] font-bold uppercase tracking-widest flex justify-between">
          <p>© 2024 PastelPix Official. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
