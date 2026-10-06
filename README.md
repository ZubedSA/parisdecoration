# Paris Decoration - Website Bisnis Jasa Dekorasi Profesional

Platform digital full-stack untuk bisnis jasa dekorasi profesional **Paris Decoration**, melayani pemesanan dekorasi pernikahan (*wedding*), lamaran (*engagement*), ulang tahun (*birthday*), aqiqah, walimatul khitan, hingga corporate gathering & gala dinner.

Dibangun dengan pendekatan **Mobile-First**, arsitektur modern Next.js App Router, integrasi database Neon PostgreSQL + Prisma ORM, autentikasi admin Auth.js/JWT, dan penyimpanan foto Google Drive melalui Google Apps Script.

---

## 🚀 Fitur Utama

### 1. Sisi Pengunjung & Pelanggan (Public)
- **Beranda (Home):**
  - Sticky glassmorphism header & mobile navigation drawer
  - Hero banner mewah dengan headline, deskripsi, dan tombol CTA langsung
  - Katalog layanan unggulan beranimasi responsif
  - Galeri hasil dekorasi dengan fitur *Lightbox preview*
  - Section keunggulan, nilai profesionalisme & testimoni pelanggan aktif
  - CTA WhatsApp langsung & formulir pemesanan
- **Katalog Layanan (`/layanan`):**
  - Pencarian instan (nama, fasilitas, dan deskripsi)
  - Filter kategori dinamis (Wedding, Engagement, Birthday, Aqiqah, Khitan, Event)
  - Sorting harga (terendah / tertinggi)
- **Detail Layanan (`/layanan/[slug]`):**
  - Galeri foto interaktif & multi-thumbnail
  - Rincian fasilitas paket dengan checklist rapi
  - Estimasi harga transparan
  - Tombol pesan langsung yang otomatis mengisi paket di halaman order
  - Layanan terkait dalam kategori yang sama
- **Galeri Foto (`/galeri`):**
  - Tab kategori foto hasil karya dekorasi
  - Modal image preview (lightbox) dengan deskripsi venue
- **Pemesanan Online (`/order`):**
  - Formulir pemesanan dengan validasi ketat (Zod)
  - Tanggal acara dengan proteksi (tidak boleh tanggal lewat)
  - Alur multi-tahap (Pengisian -> Review Rincian -> Konfirmasi)
  - Penomoran kode unik otomatis: `PD-YYYYMMDD-XXXX`
  - Tombol otomatis ke WhatsApp dengan pesan pra-format resmi
- **Tentang Kami (`/tentang`) & Kontak (`/kontak`):**
  - Cerita bisnis, visi, nilai integritas & peta interaktif lokasi workshop

### 2. Sisi Administrator (Admin Portal)
- **Autentikasi Terproteksi:**
  - Halaman login admin (`/admin/login`)
  - Server-side authorization check & session cookie
  - Akses terlindungi untuk seluruh route `/admin/*`
- **Dashboard Statistik (`/admin/dashboard`):**
  - Metrik: Total Layanan, Total Pesanan, Pesanan Pending, Pesanan Selesai
  - Estimasi perputaran transaksi dari pesanan terkonfirmasi
  - Tabel pesanan terbaru & daftar layanan terpopuler
- **Manajemen Layanan (`/admin/layanan`):**
  - Tambah, edit, dan hapus layanan
  - Aktifkan/nonaktifkan status tayang secara cepat
  - Multi-image manager dengan foto utama (primary badge)
  - Desain adaptif: tabel di desktop, kartu di smartphone
- **Manajemen Kategori (`/admin/kategori`):**
  - Tambah, ubah nama/slug & deskripsi kategori
  - Proteksi hapus aman (mencegah penghapusan kategori yang masih digunakan layanan)
- **Manajemen Galeri & Google Drive (`/admin/galeri`):**
  - Upload foto dekorasi langsung ke Google Drive via Google Apps Script
  - Preview & kontrol visibilitas (Tayang / Sembunyikan)
- **Manajemen Pesanan (`/admin/pesanan`):**
  - Filter status: PENDING, CONFIRMED, PROCESSING, COMPLETED, CANCELLED
  - Pencarian kode pesanan & nama pemesan
  - Halaman detail lengkap (`/admin/pesanan/[id]`)
  - Hubungi pelanggan instan ke WhatsApp dengan satu klik
- **Manajemen Testimoni (`/admin/testimonial`):**
  - Kelola ulasan klien, rating bintang, dan status publikasi
- **Pengaturan Website (`/admin/pengaturan`):**
  - Kelola nama brand, deskripsi, kontak WhatsApp, Instagram, alamat, hingga teks hero banner

---

## 🛠️ Teknologi & Stack

- **Framework:** Next.js (App Router, Server & Client Components)
- **Bahasa:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS + Design tokens (Champagne Gold `#C5A059`, Warm Ivory `#FDFBF7`, Dark Luxury `#141413`)
- **Database:** Neon PostgreSQL
- **ORM:** Prisma
- **Autentikasi:** JWT session (jose + bcryptjs)
- **Image Storage:** Google Drive (via Google Apps Script Web App)
- **Ikon:** Lucide React
- **Validasi:** Zod

---

## 📁 Struktur Direktori

```text
paris-decoration/
├── app/
│   ├── (public)/              # Rute publik (Home, Layanan, Galeri, Tentang, Kontak, Order)
│   ├── admin/
│   │   ├── (protected)/       # Rute dashboard admin terproteksi server-side
│   │   ├── login/             # Halaman login admin
│   │   └── page.tsx           # Redirect ke dashboard
│   ├── api/
│   │   ├── admin/             # API handler untuk operasi CRUD admin
│   │   ├── auth/              # Login, logout, session handler
│   │   ├── orders/            # Endpoint submit pemesanan pelanggan
│   │   └── upload/            # Endpoint upload gambar ke Google Drive
│   ├── globals.css            # Desain token, scrollbar elegan, glassmorphism
│   └── layout.tsx             # Root layout & Google Fonts
├── components/
│   ├── admin/                 # Komponen sidebar, topbar, uploader, form admin
│   ├── public/                # Komponen navbar, hero, kartu layanan, galeri, footer
│   └── ui/                    # Reusable button, input, textarea, modal, badge, toast
├── data/                      # Persistent storage & fallback data
├── google-apps-script/
│   ├── Code.gs                # Skrip Google Apps Script untuk Google Drive API
│   └── appsscript.json        # Manifest Web App
├── lib/
│   ├── auth.ts                # Manajemen sesi JWT & otentikasi
│   ├── db.ts                  # Lapisan repository database terpadu
│   ├── google-drive.ts        # Klien upload Google Drive
│   ├── prisma.ts              # Inisialisasi Prisma Client singleton
│   └── utils.ts               # Pemformat rupiah, tanggal Indonesia, kode order
├── prisma/
│   ├── schema.prisma          # Skema database relasional PostgreSQL
│   └── seed.ts                # Seeder data awal kategori, layanan, galeri, admin
├── types/                     # Definisi tipe data TypeScript
└── .env.example               # Contoh variabel lingkungan
```

---

## ⚙️ Panduan Menjalankan Aplikasi

### 1. Prasyarat
- Node.js versi 18+ (disarankan Node 20+)
- npm

### 2. Salin Konfigurasi Environment
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

Sesuaikan nilai environment variable:
```env
# Koneksi Neon PostgreSQL
DATABASE_URL="postgresql://neondb_owner:password@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://neondb_owner:password@ep-sample.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Rahasia Sesi Admin
AUTH_SECRET="kunci-rahasia-minimal-32-karakter-acak"

# Akun Login Admin Awal
ADMIN_EMAIL="admin@parisdecoration.com"
ADMIN_PASSWORD="AdminParisDeco2026!#"

# Integrasi Google Apps Script
GOOGLE_APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycb.../exec"
GOOGLE_DRIVE_UPLOAD_SECRET="secret_token_paris_upload"

# Konfigurasi Website
NEXT_PUBLIC_WHATSAPP_NUMBER="6285943610397"
```

> **Catatan Fleksibilitas:** Jika Anda belum menghubungkan Neon PostgreSQL atau Google Apps Script saat awal pengujian lokal, sistem telah dilengkapi dengan lapisan *resilient storage* otomatis dan folder *fallback storage* lokal (`public/uploads`), sehingga Anda dapat langsung menjalankan dan menguji seluruh fungsi website dan admin secara penuh tanpa hambatan!

### 3. Setup Database (Neon PostgreSQL)
Jika menggunakan Neon PostgreSQL:
```bash
# Generate Prisma Client
npx prisma generate

# Sinkronisasikan skema ke Neon DB
npx prisma db push

# Jalankan seeder data awal
npx tsx prisma/seed.ts
```

### 4. Menjalankan Server Development
```bash
npm run dev
```
Buka browser di `http://localhost:3000`.

---

## 🔑 Akses Administrator

- **URL Login Admin:** `http://localhost:3000/admin/login`
- **Email:** `admin@parisdecoration.com`
- **Password:** `AdminParisDeco2026!#`

---

## ☁️ Panduan Deploy Google Apps Script (Google Drive Upload)

1. Buka [Google Apps Script](https://script.google.com).
2. Buat proyek baru dengan nama **Paris Decoration Media API**.
3. Buka file `Code.gs` dan salin seluruh isi dari file `google-apps-script/Code.gs`.
4. Sesuaikan menu **Project Settings > Script Properties**:
   - `DRIVE_FOLDER_ID`: Masukkan ID folder Google Drive tempat foto disimpan.
   - `UPLOAD_SECRET`: Masukkan kode rahasia yang sama dengan `GOOGLE_DRIVE_UPLOAD_SECRET` di `.env`.
5. Klik **Deploy > New Deployment**:
   - Pilih jenis: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Salin **Web app URL** yang dihasilkan dan masukkan ke `GOOGLE_APPS_SCRIPT_URL` pada `.env`.

---

## 🌐 Panduan Deploy ke Vercel

1. Push repository ke GitHub.
2. Impor proyek di dashboard [Vercel](https://vercel.com).
3. Masukkan semua variabel lingkungan dari `.env` ke konfigurasi **Environment Variables** di Vercel.
4. Klik **Deploy**. Vercel akan otomatis melakukan proses *build* dan aplikasi siap digunakan di seluruh dunia.
