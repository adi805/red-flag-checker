import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LanguageToggle } from '../components/LanguageToggle';
import { Flag, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    language, 
    currentQuestionIndex, 
    answerQuestion, 
    isQuizFinished,
    activeQuestions 
  } = useStore();
  
  const t = translations[language];
  const question = activeQuestions[currentQuestionIndex];
  const totalQuestions = activeQuestions.length;

  useEffect(() => {
    if (activeQuestions.length === 0) {
      navigate('/');
    }
  }, [activeQuestions, navigate]);

  useEffect(() => {
    if (isQuizFinished) {
      navigate('/result');
    }
  }, [isQuizFinished, navigate]);

  const handleAnswer = (isRedFlag: boolean) => {
    answerQuestion(isRedFlag);
  };

  const handleBack = () => {
    navigate('/');
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  if (activeQuestions.length === 0) return null;

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
          onClick={handleBack}
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

      {/* Progress Bar */}
      <div className="relative z-10 px-6 max-w-7xl mx-auto w-full mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-rose-700">
            {language === 'id' ? 'Pertanyaan' : 'Question'} {currentQuestionIndex + 1}
          </span>
          <span className="text-sm text-gray-500">{totalQuestions}</span>
        </div>
        <div className="h-2 bg-white/60 rounded-full overflow-hidden shadow-inner">
          <motion.div 
            className="h-full bg-gradient-to-r from-rose-500 to-pink-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-6">
        <Card className="max-w-2xl w-full p-8 bg-white/80 backdrop-blur-sm shadow-xl shadow-rose-100/50 border-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-rose-50 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <Flag size={32} className="text-rose-600" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 leading-relaxed mb-8 min-h-[120px] flex items-center justify-center">
                {question}
              </h2>
            </motion.div>
          </AnimatePresence>

          <motion.div
            key={`answers-${currentQuestionIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4 max-w-sm mx-auto"
          >
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => handleAnswer(true)}
              className="w-full py-4 text-base shadow-lg shadow-rose-200 hover:shadow-rose-300 hover:scale-[1.02] transition-all"
            >
              {t.quiz.yes}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => handleAnswer(false)}
              className="w-full py-4 text-base border-2 hover:bg-gray-50 hover:scale-[1.02] transition-all"
            >
              {t.quiz.no}
            </Button>
          </motion.div>
        </Card>
      </main>
    </div>
  );
};
