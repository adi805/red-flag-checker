import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { Share2, RotateCcw } from 'lucide-react';

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
    if (score <= 20) return 'text-green-500';
    if (score <= 50) return 'text-yellow-500';
    if (score <= 80) return 'text-orange-500';
    return 'text-red-600';
  };

  const handleRestart = () => {
    resetQuiz();
    navigate('/');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: translations[language].meta.title,
        text: `${t.score}: ${score}% - ${getVerdict()}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Link copied to clipboard! (Simulated)");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <h1 className="text-xl font-medium text-gray-500 uppercase tracking-wider mb-2">
            {t.title}
          </h1>
          
          <div className="relative inline-block mb-6">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="70"
                cx="80"
                cy="80"
              />
              <motion.circle
                className={getScoreColor()}
                strokeWidth="8"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * score) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="70"
                cx="80"
                cy="80"
                initial={{ strokeDashoffset: 440 }}
                animate={{ strokeDashoffset: 440 - (440 * score) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
              <span className={`text-4xl font-bold ${getScoreColor()}`}>
                {score}%
              </span>
              <span className="text-xs text-gray-400">Red Flag</span>
            </div>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-gray-800 mb-8 px-4"
          >
            "{getVerdict()}"
          </motion.p>
        </motion.div>

        <div className="grid gap-3">
          <Button onClick={handleShare} variant="primary" className="w-full flex items-center justify-center gap-2">
            <Share2 size={18} />
            {t.share}
          </Button>
          <Button onClick={handleRestart} variant="ghost" className="w-full flex items-center justify-center gap-2">
            <RotateCcw size={18} />
            {t.retry}
          </Button>
        </div>
      </Card>
    </div>
  );
};
