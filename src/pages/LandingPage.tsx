import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LanguageToggle } from '../components/LanguageToggle';
import { Heart, Flag } from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, startQuiz } = useStore();
  const t = translations[language].landing;

  const handleStart = () => {
    startQuiz();
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-pink-300 opacity-50"
      >
        <Heart size={64} fill="currentColor" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0] }} 
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-10 text-rose-300 opacity-50"
      >
        <Flag size={64} fill="currentColor" />
      </motion.div>

      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>

      <Card className="max-w-md w-full text-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-20 h-20 bg-pink-100 rounded-full mx-auto mb-6 flex items-center justify-center"
        >
          <Flag size={40} className="text-red-500" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t.title}
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          {t.subtitle}
        </p>
        
        <Button onClick={handleStart} size="lg" className="w-full">
          {t.cta}
        </Button>
        
        <p className="mt-8 text-xs text-gray-400">
          {t.footer}
        </p>
      </Card>
    </div>
  );
};
