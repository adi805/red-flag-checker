import { create } from 'zustand';
import { translations, Language } from '../lib/translations';

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // Quiz State
  currentQuestionIndex: number;
  answers: boolean[]; // true = Yes (Red Flag), false = No
  isQuizFinished: boolean;
  activeQuestions: string[]; // List of questions for the current session
  
  // Actions
  startQuiz: () => void;
  answerQuestion: (isRedFlag: boolean) => void;
  resetQuiz: () => void;
  
  // Computed (Helper functions)
  getScore: () => number;
}

// Helper to detect browser language
const getBrowserLanguage = (): Language => {
  if (typeof window !== 'undefined' && window.navigator) {
    const lang = window.navigator.language;
    if (lang.toLowerCase().startsWith('id')) {
      return 'id';
    }
  }
  return 'en';
};

// Helper to shuffle array (Fisher-Yates)
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const useStore = create<AppState>((set, get) => ({
  language: getBrowserLanguage(),
  setLanguage: (lang) => set({ language: lang }),
  
  currentQuestionIndex: 0,
  answers: [],
  isQuizFinished: false,
  activeQuestions: [],
  
  startQuiz: () => {
    const { language } = get();
    const allQuestions = translations[language].questions;
    // Shuffle and pick 10 questions
    const shuffled = shuffleArray(allQuestions);
    const selectedQuestions = shuffled.slice(0, 10);
    
    set({ 
      currentQuestionIndex: 0, 
      answers: [], 
      isQuizFinished: false,
      activeQuestions: selectedQuestions
    });
  },
  
  answerQuestion: (isRedFlag) => {
    const { currentQuestionIndex, answers, activeQuestions } = get();
    // Use activeQuestions length instead of total translations length
    const totalQuestions = activeQuestions.length;
    
    const newAnswers = [...answers, isRedFlag];
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex >= totalQuestions) {
      set({ 
        answers: newAnswers, 
        isQuizFinished: true 
      });
    } else {
      set({ 
        answers: newAnswers, 
        currentQuestionIndex: nextIndex 
      });
    }
  },
  
  resetQuiz: () => set({ 
    currentQuestionIndex: 0, 
    answers: [], 
    isQuizFinished: false,
    activeQuestions: [] // Clear active questions on reset
  }),
  
  getScore: () => {
    const { answers } = get();
    if (answers.length === 0) return 0;
    
    const redFlags = answers.filter(a => a).length;
    return Math.round((redFlags / answers.length) * 100);
  }
}));
