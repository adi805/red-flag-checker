import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LanguageToggle } from '../components/LanguageToggle';
import { Heart, Flag, Zap, Globe, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, startQuiz } = useStore();
  const t = translations[language].landing;

  const handleStart = () => {
    startQuiz();
    navigate('/quiz');
  };

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: language === 'id' ? 'Bilingual' : 'Bilingual',
      desc: language === 'id' ? 'Bahasa Indonesia & Inggris' : 'Indonesian & English',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: language === 'id' ? 'Cepat' : 'Fast',
      desc: language === 'id' ? 'Hasil instan tanpa ribet' : 'Instant results',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: language === 'id' ? 'Variasi Soal' : 'Varied Questions',
      desc: language === 'id' ? '30+ pertanyaan berbeda' : '30+ different questions',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-pink-300 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-200 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Flag className="w-6 h-6 text-rose-600" />
          <span className="font-bold text-gray-800 text-lg">RedFlag<span className="text-rose-600">Check</span></span>
        </motion.div>
        <LanguageToggle />
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl mx-auto lg:mx-0 mb-6 flex items-center justify-center shadow-lg shadow-rose-200"
            >
              <Heart size={36} className="text-white fill-white" />
            </motion.div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {t.title}
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t.subtitle}
            </p>
            
            <Button 
              onClick={handleStart} 
              size="lg" 
              className="w-full lg:w-auto px-8 py-4 text-base shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-shadow"
            >
              {t.cta}
            </Button>
            
            <p className="mt-6 text-sm text-gray-500 flex items-center justify-center lg:justify-start gap-2">
              <Heart size={14} className="text-rose-400 fill-rose-400" />
              {t.footer}
            </p>
          </motion.div>

          {/* Right - Features Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl shadow-rose-100/50 border-0">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {language === 'id' ? 'Kenapa Cek?' : 'Why Check?'}
              </h2>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-sm text-gray-500">
        <p>© 2025 RedFlagCheck. Built with TRAE AI ❤️</p>
      </footer>
    </div>
  );
};
