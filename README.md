<div align="center">

# 🚩 Red Flag Checker - Valentine's Edition

A fun, bilingual quiz app to check relationship red flags with a Valentine's twist! 🌹

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with TRAE AI](https://img.shields.io/badge/Made%20with-TRAE%20AI-rose.svg)](https://trae.ai/)

**[Live Demo](https://red-flag-checker.vercel.app)** • [Report Bug](https://github.com/your-username/red-flag-checker/issues)

</div>

## ✨ Features

- 🌐 **Bilingual Support** - Available in Indonesian & English with auto-detection
- 🎲 **Randomized Questions** - 30+ unique questions, shuffled each time
- 🎨 **Beautiful UI** - Modern design with Valentine's theme and smooth animations
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ⚡ **Instant Results** - Get your "red flag score" in seconds
- 🔗 **Shareable** - Share results with friends via native share or clipboard

## 🚀 Tech Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Routing**: React Router DOM

## 📸 Screenshots

| Landing Page | Quiz | Result |
|-------------|-------|---------|
| ![Landing](screenshots/landing.png) | ![Quiz](screenshots/quiz.png) | ![Result](screenshots/result.png) |

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/red-flag-checker.git

# Navigate to the project
cd red-flag-checker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📦 Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── LanguageToggle.tsx
├── hooks/
│   └── useTheme.ts
├── lib/
│   ├── translations.ts    # Bilingual content
│   └── utils.ts
├── pages/
│   ├── LandingPage.tsx
│   ├── QuizPage.tsx
│   └── ResultPage.tsx
├── store/
│   └── useStore.ts       # Zustand state management
├── App.tsx
└── main.tsx
```

## 🎯 How It Works

1. **User Flow**: Landing → Quiz (10 random questions) → Results
2. **Scoring**: Each "Yes" answer = 10% red flag score
3. **Verdicts**:
   - 0-20%: Green Flag 💍
   - 21-50%: Beige Flag ⚠️
   - 51-80%: Red Flag 🏃
   - 81-100%: Disaster 🌋

## 🌍 Adding New Questions

Edit `src/lib/translations.ts` and add questions to the `questions` array in both `id` and `en` objects:

```typescript
questions: [
  "Your new question here?",
  // Add more...
]
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [TRAE AI](https://trae.ai/) for the Valentine's Build-off Challenge
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

<div align="center">
  <sub>Built with ❤️ for Valentine's Day 2025</sub>
</div>
