import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LanguageToggle } from '../components/LanguageToggle';
import { Flag, ArrowLeft, Share2, RotateCcw, Sparkles, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, getScore, resetQuiz } = useStore();
  const t = translations[language].result;
  
  const score = getScore();

  const getVerdict = () => {
    if (score <= 20) return t.verdict.safe;
    if (score <= 50) return t.verdict.caution;
    if (score <= 80) return t.verdict.danger;
    return t.verdict.disaster;
  };

  const getScoreColor = () => {
    if (score <= 20) return 'from-emerald-400 to-green-600';
    if (score <= 50) return 'from-amber-400 to-yellow-600';
    if (score <= 80) return 'from-orange-400 to-red-600';
    return 'from-red-500 to-rose-700';
  };

  const getScoreTextColor = () => {
    if (score <= 20) return 'text-emerald-600';
    if (score <= 50) return 'text-amber-600';
    if (score <= 80) return 'text-orange-600';
    return 'text-rose-700';
  };

  const getScoreEmoji = () => {
    if (score <= 20) return '💍';
    if (score <= 50) return '⚠️';
    if (score <= 80) return '🏃';
    return '🌋';
  };

  const handleRestart = () => {
    resetQuiz();
    navigate('/');
  };

  const handleShare = async () => {
    const shareData = {
      title: translations[language].meta.title,
      text: `${t.score}: ${score}% - ${getVerdict()} ${getScoreEmoji()}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      alert(language === 'id' ? 'Link disalin ke clipboard!' : 'Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-rose-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-pink-300 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">{language === 'id' ? 'Kembali' : 'Back'}</span>
        </motion.button>
        
        <div className="flex items-center gap-2">
          <Flag className="w-5 h-5 text-rose-600" />
          <span className="font-bold text-gray-800">RedFlag<span className="text-rose-600">Check</span></span>
        </div>
        
        <div className="w-16">
          <LanguageToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl shadow-rose-100/50 border-0 text-center">
            {/* Trophy Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-rose-200"
            >
              <Trophy size={36} className="text-white" />
            </motion.div>

            <h1 className="text-xl font-medium text-gray-500 uppercase tracking-wider mb-8">
              {t.title}
            </h1>
            
            {/* Score Circle */}
            <div className="relative inline-block mb-8">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  className="text-gray-100"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="80"
                  cx="96"
                  cy="96"
                />
                <motion.circle
                  className={`bg-gradient-to-r ${getScoreColor()}`}
                  strokeWidth="10"
                  strokeDasharray={503}
                  strokeDashoffset={503 - (503 * score) / 100}
                  strokeLinecap="round"
                  stroke="url(#gradient)"
                  fill="transparent"
                  r="80"
                  cx="96"
                  cy="96"
                  initial={{ strokeDashoffset: 503 }}
                  animate={{ strokeDashoffset: 503 - (503 * score) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={score <= 20 ? '#34d399' : score <= 50 ? '#f6e05e' : score <= 80 ? '#ed8936' : '#e53e3e'} />
                    <stop offset="100%" stopColor={score <= 20 ? '#059669' : score <= 50 ? '#d69e2e' : score <= 80 ? '#c05621' : '#be123c'} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
                  className={`text-5xl font-bold ${getScoreTextColor()}`}
                >
                  {score}%
                </motion.span>
                <span className="text-sm text-gray-400">{t.score}</span>
              </div>
            </div>

            {/* Verdict */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 mb-8 border border-rose-100"
            >
              <motion.p 
                className="text-xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {getScoreEmoji()} {getVerdict()}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="flex items-center justify-center gap-2 text-sm text-rose-600"
              >
                <Sparkles size={14} />
                <span>{language === 'id' ? 'Hasil tidak selalu akurat 100%' : 'Results not always 100% accurate'}</span>
              </motion.div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="grid gap-3"
            >
              <Button 
                onClick={handleShare} 
                variant="primary" 
                className="w-full flex items-center justify-center gap-2 py-4 shadow-lg shadow-rose-200 hover:shadow-rose-300"
              >
                <Share2 size={18} />
                {t.share}
              </Button>
              <Button 
                onClick={handleRestart} 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 py-4 border-2 hover:bg-gray-50"
              >
                <RotateCcw size={18} />
                {t.retry}
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-sm text-gray-500">
        <p>© 2025 RedFlagCheck. Built with TRAE AI ❤️</p>
      </footer>
    </div>
  );
};
