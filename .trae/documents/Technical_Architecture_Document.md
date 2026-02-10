# Technical Architecture Document
## Red Flag Checker (Bilingual Support)

### 1. Tech Stack
- **Framework**: React 18 (via Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (untuk menyimpan jawaban kuis dan state bahasa)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animation**: Framer Motion (opsional, atau CSS transition standar)

### 2. Struktur Data

#### A. State Management (Zustand Store)
```typescript
interface AppState {
  language: 'id' | 'en';
  setLanguage: (lang: 'id' | 'en') => void;
  answers: boolean[]; // true = Yes (Red Flag), false = No
  addAnswer: (answer: boolean) => void;
  resetQuiz: () => void;
  calculateScore: () => number;
}
```

#### B. Localization Structure (Translation Data)
Data bahasa disimpan dalam objek konstan untuk kemudahan akses tanpa dependensi berat.
```typescript
const translations = {
  id: {
    title: "Cek Red Flag",
    startBtn: "Mulai Cek",
    questions: [
      "Apakah dia sering membatalkan janji tiba-tiba?",
      "Apakah dia kasar pada pelayan restoran?",
      // ...
    ],
    results: {
      low: "Aman banget!",
      high: "Bahaya!"
    }
  },
  en: {
    title: "Red Flag Checker",
    startBtn: "Start Check",
    questions: [
      "Do they often cancel plans last minute?",
      "Are they rude to waitstaff?",
      // ...
    ],
    results: {
      low: "Total Keeper!",
      high: "Danger!"
    }
  }
}
```

### 3. Arsitektur Komponen

- **`App.tsx`**: Main layout, routing, dan global wrapper.
- **`components/Layout/Header.tsx`**: Berisi Logo dan **LanguageToggle**.
- **`components/UI/Button.tsx`**: Komponen tombol reusable dengan style Valentine.
- **`components/UI/Card.tsx`**: Container untuk pertanyaan/hasil.
- **`pages/LandingPage.tsx`**: Halaman awal.
- **`pages/QuizPage.tsx`**: Logika kuis, menampilkan pertanyaan satu per satu berdasarkan bahasa aktif.
- **`pages/ResultPage.tsx`**: Kalkulasi skor dan tampilan hasil akhir.

### 4. Strategi Multi-bahasa
Menggunakan React Context atau Zustand state sederhana untuk menyimpan `currentLanguage`.
- **Inisialisasi**: Saat aplikasi dimuat, cek `navigator.language`. Jika diawali dengan 'id' (misal 'id-ID'), set bahasa ke 'id'. Selain itu, default ke 'en'.
- **Penyimpanan**: (Opsional) Simpan preferensi bahasa pengguna di `localStorage` agar tetap tersimpan saat kunjungan berikutnya.
Setiap komponen teks akan memanggil helper function atau hooks, misal: `t('key')` atau mengakses objek `translations[currentLang].key`.
Mengingat skala proyek kecil, kita akan mengakses objek translasi secara langsung via hooks kustom `useTranslation`.

### 5. Deployment
- Build command: `npm run build`
- Output: `dist/` folder static files.
