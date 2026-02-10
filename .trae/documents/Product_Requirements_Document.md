# Product Requirements Document (PRD)
## Red Flag Checker: Valentine's Edition 🚩💘

### 1. Gambaran Produk
"Red Flag Checker" adalah aplikasi web interaktif sederhana yang menyenangkan untuk edisi Valentine. Aplikasi ini memungkinkan pengguna menjawab serangkaian pertanyaan "Yes/No" tentang pasangan atau gebetan mereka untuk menentukan seberapa banyak "Red Flag" (tanda bahaya) yang dimiliki. Hasilnya disajikan dengan nada humor.

**Fitur Utama Baru:** Dukungan Multi-bahasa (Bahasa Indonesia & Bahasa Inggris) yang dapat diganti dengan mudah oleh pengguna.

### 2. Target Pengguna
- Pasangan muda atau orang yang sedang PDKT.
- Pengguna media sosial yang ingin membagikan hasil lucu mereka.
- Peserta event "Valentine's Build-off" Trae.

### 3. Fitur & Fungsionalitas

#### A. Multi-bahasa (i18n)
- **Auto-detection**: Sistem secara otomatis mendeteksi bahasa browser pengguna saat pertama kali membuka aplikasi. Jika bahasa browser adalah Indonesia, aplikasi akan tampil dalam Bahasa Indonesia. Jika tidak, akan default ke Bahasa Inggris.
- **Language Switcher**: Tombol toggle di pojok kanan atas untuk mengganti bahasa antara **ID (Bahasa Indonesia)** dan **EN (English)** secara manual.
- **Konten Fleksibel**: Semua teks (judul, pertanyaan, hasil, tombol) akan berubah sesuai bahasa yang dipilih.

#### B. Halaman Beranda (Landing Page)
- **Hero Section**: Judul menarik (misal: "Seberapa Red Flag Pasanganmu?" / "How Red Flag is Your Date?").
- **Visual**: Animasi hati atau bendera merah yang lucu.
- **Call to Action**: Tombol "Mulai Cek" / "Start Check".

#### C. Halaman Kuis (Quiz Interface)
- **Pertanyaan**: Tampilkan satu pertanyaan per layar untuk fokus.
- **Navigasi**: Tombol "Ya/Tidak" (Yes/No) yang besar dan responsif.
- **Progress Bar**: Indikator sejauh mana kuis berjalan (misal: Pertanyaan 3 dari 10).
- **Animasi**: Transisi halus antar pertanyaan.

#### D. Halaman Hasil (Result Page)
- **Skor Red Flag**: Persentase (0% - 100%) tingkat bahaya.
- **Verdict/Vonis**: Kalimat lucu berdasarkan skor.
    - 0-20%: "Green Flag Abis! Nikahin!" (Keeper Material!)
    - 21-50%: "Hati-hati, ada kerikil." (Proceed with Caution)
    - 51-80%: "Lari Bestie!" (Run Bestie Run!)
    - 81-100%: "Bencana Alam!" (Walking Disaster!)
- **Share Button**: Opsi untuk membagikan hasil (simulasi atau link).
- **Restart Button**: Tombol "Coba Lagi" / "Try Again".

### 4. Desain & UX
- **Tema Warna**: Dominan Pink (#FF69B4), Merah (#FF0000), dan Putih (#FFFFFF).
- **Typography**: Font yang playful namun mudah dibaca (misal: Poppins atau Comic Neue).
- **Tone of Voice**: Humoris, santai, dan "gen-z friendly".

### 5. Alur Pengguna (User Flow)
1. Pengguna membuka web -> Memilih Bahasa (Default: ID).
2. Klik "Mulai" -> Masuk ke pertanyaan pertama.
3. Jawab 10 Pertanyaan (Ya/Tidak).
4. Selesai -> Sistem menghitung skor.
5. Tampil Halaman Hasil -> User tertawa -> Share/Restart.
