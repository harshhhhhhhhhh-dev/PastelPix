import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check } from 'lucide-react';
import { Template } from '../types';
import { TEMPLATES } from '../constants';

interface TemplateSelectionProps {
  onSelect: (template: Template) => void;
  onBack: () => void;
}

export const TemplateSelection: React.FC<TemplateSelectionProps> = ({ onSelect, onBack }) => {
  return (
    <div className="min-h-screen bg-brand-cream p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-brand-ink/60 hover:text-brand-ink mb-12 transition-colors font-bold uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-black text-brand-ink mb-4">Choose Your Edition</h1>
          <p className="text-brand-ink/50 font-serif text-xl">Select a base template to start your creative journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {TEMPLATES.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-brand-ink/5 border border-brand-ink/5 flex flex-col group cursor-pointer"
              onClick={() => onSelect(template)}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={template.preview} 
                  alt={template.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-ink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white text-brand-ink px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    Select This Edition
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold text-brand-ink mb-2">{template.name}</h3>
                <p className="text-brand-ink/40 text-sm font-medium uppercase tracking-widest mb-6">
                  {template.pages.length} Pages • Custom Layouts
                </p>
                <div className="flex gap-2">
                  {['#FFB7B2', '#A8DADC', '#B2F2BB'].map((c, i) => (
                    <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
