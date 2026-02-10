import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../lib/translations';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
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
    // Redirect to home if no questions loaded (e.g. direct access/refresh)
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

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  if (activeQuestions.length === 0) return null; // Prevent flash before redirect

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-between text-sm font-medium text-pink-700 mb-2">
          <span>{language === 'id' ? 'Pertanyaan' : 'Question'} {currentQuestionIndex + 1}</span>
          <span>{totalQuestions}</span>
        </div>
        <div className="h-3 bg-white/50 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <Card className="max-w-md w-full text-center min-h-[400px] flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-2xl font-bold text-gray-800 leading-relaxed"
            >
              {question}
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="grid gap-4 mt-8">
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={() => handleAnswer(true)}
            className="w-full"
          >
            {t.quiz.yes}
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => handleAnswer(false)}
            className="w-full"
          >
            {t.quiz.no}
          </Button>
        </div>
      </Card>
    </div>
  );
};
