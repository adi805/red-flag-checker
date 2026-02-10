import React from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useStore();

  return (
    <div className="bg-white/50 p-1 rounded-full flex gap-1 backdrop-blur-sm border border-pink-200">
      <button
        onClick={() => setLanguage('id')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === 'id'
            ? 'bg-pink-500 text-white shadow-md'
            : 'text-pink-600 hover:bg-pink-100'
        }`}
      >
        ID
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-pink-500 text-white shadow-md'
            : 'text-pink-600 hover:bg-pink-100'
        }`}
      >
        EN
      </button>
    </div>
  );
};
