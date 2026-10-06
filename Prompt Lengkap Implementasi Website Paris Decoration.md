# PROMPT PEMBANGUNAN WEBSITE PARIS DECORATION

Anda adalah seorang senior full-stack web developer, software architect, UI/UX designer, dan database engineer.

Bangun sebuah website profesional bernama **Paris Decoration**, yaitu website bisnis jasa dekorasi yang memungkinkan calon pelanggan melihat layanan dekorasi, melihat harga dan foto dekorasi, melihat galeri, kemudian melakukan pemesanan secara online.

Website memiliki dua sisi utama:

1. Public / Tamu / Pelanggan
2. Admin

Aplikasi harus benar-benar functional, bukan sekadar mockup atau tampilan statis.

---

# 1. TUJUAN APLIKASI

Paris Decoration merupakan platform digital untuk bisnis jasa dekorasi.

Calon pelanggan dapat:

- Melihat informasi Paris Decoration
- Melihat daftar layanan
- Melihat kategori layanan
- Melihat harga
- Melihat foto dekorasi
- Melihat detail layanan
- Melihat galeri hasil dekorasi
- Mengisi form pemesanan
- Mengirim order secara online
- Melihat informasi/status pesanan

Admin dapat:

- Login ke dashboard
- Mengelola layanan
- Mengelola kategori
- Mengelola foto layanan
- Mengelola galeri
- Mengelola pesanan
- Mengelola pelanggan
- Mengelola testimoni
- Mengelola informasi website
- Mengubah status pesanan
- Upload gambar ke Google Drive

---

# 2. TEKNOLOGI

Gunakan teknologi berikut:

Frontend + Backend:

- Next.js terbaru
- TypeScript
- App Router
- Tailwind CSS

Database:

- Neon PostgreSQL

ORM:

- Prisma

Image Storage:

- Google Drive

Image Upload API:

- Google Apps Script

Authentication:

- Auth.js

Deployment:

- Vercel

Package manager:

- npm

JANGAN menggunakan:

- pnpm
- Turborepo
- monorepo tooling tambahan

Gunakan satu project Next.js yang sederhana dan mudah dipahami.

---

# 3. PRINSIP ARSITEKTUR

Gunakan arsitektur sederhana tetapi scalable.

Struktur utama:

```text
paris-decoration/
│
├── app/
│   ├── (public)/
│   ├── order/
│   ├── admin/
│   └── api/
│
├── components/
│   ├── ui/
│   ├── public/
│   ├── admin/
│   └── forms/
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── google-drive.ts
│   └── utils.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── types/
│
├── public/
│
├── google-apps-script/
│   ├── Code.gs
│   └── appsscript.json
│
├── .env.example
├── package.json
├── tsconfig.json
└── next.config.ts
```

Jangan membuat arsitektur terlalu kompleks.

Prioritaskan:

- mudah dipahami
- mudah dikembangkan
- mudah di-maintain
- aman
- modular
- reusable

---

# 4. MOBILE-FIRST

Ini adalah salah satu requirement utama.

Website harus dibuat dengan pendekatan:

**MOBILE FIRST**

Jangan membuat desktop terlebih dahulu kemudian mengecilkannya.

Prioritas desain:

```text
Mobile
↓
Tablet
↓
Desktop
```

Semua halaman harus nyaman digunakan pada layar:

- 320px
- 360px
- 375px
- 390px
- 414px
- tablet
- desktop

Pastikan:

- tombol mudah ditekan
- form nyaman digunakan
- font mudah dibaca
- spacing tidak terlalu padat
- gambar responsif
- navigasi mobile jelas
- tidak ada horizontal overflow
- card tidak terlalu kecil
- CTA mudah ditemukan

Admin juga harus tetap usable melalui smartphone.

---

# 5. KONSEP UI/UX

Gunakan desain yang:

- modern
- elegan
- clean
- profesional
- minimalis
- premium
- tidak berlebihan
- tidak terlihat seperti template generik AI

Paris Decoration adalah bisnis dekorasi, sehingga desain harus memiliki kesan:

- elegan
- aesthetic
- feminine tetapi tetap profesional
- premium
- terpercaya

Gunakan whitespace yang cukup.

Gunakan card dengan border-radius yang moderat.

Gunakan shadow secara ringan.

Jangan menggunakan terlalu banyak gradient.

Jangan menggunakan animasi berlebihan.

Gunakan animasi hanya jika membantu UX.

Gunakan typography yang modern dan mudah dibaca.

---

# 6. WARNA

Gunakan palet warna yang elegan.

Default:

- putih / off-white sebagai background
- warna gelap untuk teks
- warna champagne / gold sebagai accent
- warna netral sebagai secondary

Hindari penggunaan warna yang terlalu mencolok.

Buat seluruh warna menggunakan design tokens / CSS variables sehingga mudah diubah.

---

# 7. PUBLIC WEBSITE

Buat halaman public berikut:

```text
/
├── Home
├── layanan
├── layanan/[slug]
├── galeri
├── tentang
├── kontak
└── order
```

---

# 8. HOME PAGE

Home page harus memiliki section berikut:

## Header

Mobile:

```text
Logo Paris Decoration       ☰
```

Desktop:

```text
Logo | Home | Layanan | Galeri | Tentang | Kontak | Pesan Sekarang
```

Header harus sticky jika sesuai dengan desain.

---

## Hero Section

Tampilkan:

- headline
- subheadline
- CTA
- gambar dekorasi utama

Contoh:

"Create Beautiful Moments"

"Jadikan setiap momen istimewa dengan dekorasi yang elegan dan berkesan."

CTA:

"Pesan Sekarang"

CTA kedua:

"Lihat Layanan"

Gunakan gambar dekorasi yang berasal dari data database.

---

# 9. SECTION LAYANAN

Tampilkan layanan unggulan.

Setiap card:

- foto
- nama layanan
- kategori
- harga mulai
- deskripsi singkat
- tombol detail

Contoh:

```text
Dekorasi Pernikahan

Mulai dari
Rp 5.000.000

[ Lihat Detail ]
```

Gunakan responsive grid.

Mobile:

1 card per row.

Tablet:

2 card.

Desktop:

3-4 card sesuai ukuran.

---

# 10. SECTION GALERI

Tampilkan foto hasil dekorasi.

Buat gallery layout yang menarik.

Klik gambar dapat membuka image preview / lightbox.

Data gambar berasal dari database dan Google Drive.

---

# 11. SECTION TENTANG

Berisi:

- deskripsi Paris Decoration
- pengalaman
- keunggulan
- visi
- alasan memilih Paris Decoration

---

# 12. SECTION KEUNGGULAN

Contoh:

- Dekorasi Elegan
- Konsep Custom
- Tim Profesional
- Harga Transparan
- Pelayanan Terpercaya

---

# 13. SECTION TESTIMONI

Tampilkan:

- nama pelanggan
- rating
- komentar
- foto jika tersedia

Testimoni hanya ditampilkan jika statusnya aktif.

---

# 14. SECTION CTA

Ajakan melakukan pemesanan.

Contoh:

"Siap membuat momen Anda lebih istimewa?"

Button:

"Pesan Sekarang"

---

# 15. FOOTER

Footer berisi:

- logo
- deskripsi singkat
- navigasi
- kontak
- WhatsApp
- Instagram
- alamat
- copyright

Semua informasi footer dapat dikelola admin.

---

# 16. HALAMAN LAYANAN

Route:

```text
/layanan
```

Fitur:

- daftar semua layanan
- filter kategori
- pencarian
- sorting harga
- card layanan

Filter harus nyaman digunakan di mobile.

---

# 17. DETAIL LAYANAN

Route:

```text
/layanan/[slug]
```

Tampilkan:

- galeri foto
- nama layanan
- kategori
- harga
- deskripsi
- fasilitas
- informasi tambahan
- CTA order

Contoh:

```text
Dekorasi Wedding Premium

Mulai dari
Rp 7.500.000

Fasilitas:

✓ Pelaminan
✓ Backdrop
✓ Bunga dekorasi
✓ Lighting
✓ Dekorasi meja
✓ Konsultasi konsep

[ Pesan Layanan Ini ]
```

---

# 18. SISTEM ORDER

Buat sistem pemesanan online.

Route:

```text
/order
```

Form:

```text
Nama Lengkap
Nomor WhatsApp
Email
Layanan
Tanggal Acara
Lokasi Acara
Jumlah / kebutuhan
Catatan
```

Jika user datang dari halaman detail layanan, layanan harus otomatis terisi.

Validasi:

- nama wajib
- nomor WhatsApp wajib
- layanan wajib
- tanggal wajib
- lokasi wajib

Tanggal acara tidak boleh tanggal yang sudah lewat.

---

# 19. REVIEW ORDER

Sebelum submit, tampilkan halaman review:

```text
DETAIL PESANAN

Nama:
Ahmad

WhatsApp:
08xxxxxxxx

Layanan:
Dekorasi Wedding Premium

Tanggal:
20 Oktober 2026

Lokasi:
Sumenep

Catatan:
...
```

Button:

"Konfirmasi Pesanan"

---

# 20. ORDER CODE

Setiap pesanan harus mendapatkan kode unik.

Format:

```text
PD-20261006-0001
```

Kode harus unique.

Jangan menggunakan ID database secara langsung sebagai kode pesanan.

---

# 21. STATUS ORDER

Gunakan status:

```text
PENDING
CONFIRMED
PROCESSING
COMPLETED
CANCELLED
```

Alur normal:

```text
PENDING
↓
CONFIRMED
↓
PROCESSING
↓
COMPLETED
```

Pesanan dapat dibatalkan:

```text
PENDING → CANCELLED
CONFIRMED → CANCELLED
```

---

# 22. KONFIRMASI ORDER

Setelah order berhasil:

Tampilkan:

```text
Pesanan Berhasil Dibuat

Kode Pesanan:
PD-20261006-0001

Silakan simpan kode pesanan Anda.

Admin akan menghubungi Anda untuk konfirmasi lebih lanjut.
```

Sediakan tombol:

"Hubungi WhatsApp"

Jika WhatsApp digunakan, buat nomor dan pesan menggunakan environment/configuration yang dapat diubah.

---

# 23. DATABASE

Gunakan Neon PostgreSQL + Prisma.

Model minimal:

```text
User
Category
Service
ServiceImage
Order
OrderItem
Gallery
Testimonial
SiteSetting
```

---

# 24. USER MODEL

Admin menggunakan User.

Field:

```text
id
name
email
password/hash atau Auth.js compatible fields
role
createdAt
updatedAt
```

Role:

```text
ADMIN
```

Untuk tahap awal tidak perlu membuat role kompleks.

---

# 25. CATEGORY MODEL

Field:

```text
id
name
slug
description
createdAt
updatedAt
```

Contoh:

```text
Wedding
Engagement
Birthday
Aqiqah
Khitan
Event
```

Admin dapat membuat kategori sendiri.

---

# 26. SERVICE MODEL

Field:

```text
id
categoryId
name
slug
description
price
status
createdAt
updatedAt
```

Status:

```text
ACTIVE
INACTIVE
```

---

# 27. SERVICE IMAGE

Field:

```text
id
serviceId
fileName
driveFileId
driveUrl
createdAt
updatedAt
```

Satu service dapat memiliki banyak gambar.

---

# 28. ORDER MODEL

Field:

```text
id
orderCode
customerName
phone
email
eventDate
eventLocation
notes
totalPrice
status
createdAt
updatedAt
```

---

# 29. ORDER ITEM

Field:

```text
id
orderId
serviceId
quantity
price
subtotal
```

Simpan harga pada saat order dibuat.

Jangan hanya mengambil harga terbaru dari Service.

Dengan demikian perubahan harga layanan tidak mengubah histori order lama.

---

# 30. GALLERY

Field:

```text
id
title
description
categoryId
driveFileId
driveUrl
status
createdAt
updatedAt
```

---

# 31. TESTIMONIAL

Field:

```text
id
customerName
rating
message
image
status
createdAt
updatedAt
```

Status:

```text
PENDING
PUBLISHED
HIDDEN
```

---

# 32. SITE SETTINGS

Gunakan satu model untuk konfigurasi website.

Contoh:

```text
siteName
description
phone
whatsapp
email
instagram
address
logo
heroTitle
heroDescription
heroImage
footerDescription
```

Jika perlu, gunakan key-value architecture.

---

# 33. PRISMA

Buat:

```text
prisma/schema.prisma
```

Gunakan:

- relation yang benar
- index pada field yang sering dicari
- unique constraint pada slug
- unique constraint pada orderCode
- cascade delete jika memang aman
- Decimal untuk harga
- DateTime untuk tanggal
- enum untuk status

Buat juga:

```text
prisma/seed.ts
```

Seed harus membuat:

- admin
- kategori contoh
- beberapa layanan
- beberapa gallery
- testimonial contoh
- site settings

Jangan memasukkan password asli ke source code.

Gunakan environment variable untuk credential seed admin.

---

# 34. GOOGLE DRIVE STORAGE

Gambar TIDAK disimpan di database.

Gambar disimpan di Google Drive.

Database hanya menyimpan:

```text
driveFileId
driveUrl
fileName
```

---

# 35. GOOGLE APPS SCRIPT

Buat folder:

```text
google-apps-script/
```

Buat:

```text
Code.gs
appsscript.json
```

Google Apps Script bertugas sebagai API upload Google Drive.

Endpoint harus mendukung minimal:

```text
POST
```

untuk upload gambar.

Request:

```json
{
  "fileName": "wedding-01.jpg",
  "mimeType": "image/jpeg",
  "base64": "..."
}
```

Response:

```json
{
  "success": true,
  "fileId": "...",
  "fileName": "...",
  "url": "..."
}
```

Buat juga endpoint/action jika diperlukan untuk:

- delete file
- mendapatkan file information

Jangan menaruh Google Drive credential secara langsung di frontend.

---

# 36. IMAGE UPLOAD FLOW

Alur:

```text
Admin
 ↓
Pilih gambar
 ↓
Frontend validation
 ↓
Next.js API
 ↓
Google Apps Script
 ↓
Google Drive
 ↓
Return File ID + URL
 ↓
Next.js
 ↓
Prisma
 ↓
Neon
```

Validasi:

- tipe file
- ukuran file
- nama file
- error handling

Minimal support:

```text
JPG
JPEG
PNG
WEBP
```

Batasi ukuran file sesuai kebutuhan aplikasi.

---

# 37. ADMIN AUTHENTICATION

Admin harus login.

Route:

```text
/admin/login
```

Setelah login:

```text
/admin/dashboard
```

Semua route `/admin/*` harus protected kecuali:

```text
/admin/login
```

Jika belum login:

```text
/admin/*
↓
/admin/login
```

Gunakan middleware / Auth.js sesuai arsitektur Next.js yang digunakan.

Jangan hanya menyembunyikan halaman admin di frontend.

Authorization harus dilakukan di server.

---

# 38. ADMIN DASHBOARD

Dashboard menampilkan:

```text
Total Layanan
Total Pesanan
Pesanan Pending
Pesanan Selesai
```

Tambahkan:

- order terbaru
- layanan populer jika datanya tersedia
- statistik sederhana
- status order

Jangan membuat dashboard terlalu kompleks.

---

# 39. ADMIN LAYANAN

Route:

```text
/admin/layanan
```

Fitur:

- list layanan
- search
- filter kategori
- tambah
- edit
- delete
- activate/deactivate

Table desktop harus berubah menjadi card/list yang nyaman di mobile.

---

# 40. ADMIN KATEGORI

Route:

```text
/admin/kategori
```

CRUD:

- tambah
- edit
- delete

Jangan mengizinkan kategori dihapus jika masih memiliki layanan tanpa konfirmasi yang jelas.

---

# 41. ADMIN GALERI

Route:

```text
/admin/galeri
```

Fitur:

- upload
- preview
- edit
- delete
- kategori
- publish/hide

Upload melalui Google Apps Script → Google Drive.

---

# 42. ADMIN PESANAN

Route:

```text
/admin/pesanan
```

Tampilkan:

```text
Kode
Pelanggan
Layanan
Tanggal acara
Total
Status
```

Admin dapat membuka detail.

Detail:

```text
Data pelanggan
Detail layanan
Tanggal
Lokasi
Catatan
Total
Status
```

Admin dapat mengubah status order.

---

# 43. ADMIN TESTIMONIAL

CRUD:

- tambah
- edit
- delete
- publish
- hide

---

# 44. ADMIN SITE SETTINGS

Admin dapat mengubah:

- nama website
- deskripsi
- WhatsApp
- email
- Instagram
- alamat
- hero title
- hero description
- footer
- social media

---

# 45. API

Gunakan API routes / Server Actions sesuai kebutuhan.

Pisahkan logic:

```text
Database logic
Business logic
UI logic
```

Jangan memasukkan semua logic ke component.

Buat helper/service jika diperlukan.

---

# 46. SECURITY

Terapkan:

- server-side validation
- authentication
- authorization
- input sanitization
- rate limiting untuk endpoint order jika memungkinkan
- validasi upload
- batas ukuran file
- jangan expose secret
- jangan expose database URL ke client
- jangan expose Google Apps Script secret jika ada
- gunakan environment variable

Environment:

```env
DATABASE_URL=
DIRECT_URL=

AUTH_SECRET=

GOOGLE_APPS_SCRIPT_URL=

GOOGLE_DRIVE_UPLOAD_SECRET=

NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

Jangan memasukkan nilai asli.

Buat:

```text
.env.example
```

---

# 47. ERROR HANDLING

Semua proses penting harus memiliki:

- loading state
- empty state
- error state
- success feedback

Contoh:

```text
Uploading...
Mengunggah gambar...
```

Jika gagal:

```text
Gagal mengunggah gambar.
Silakan coba lagi.
```

Jangan menampilkan error database mentah kepada user.

---

# 48. FORM VALIDATION

Gunakan library validation yang sesuai, misalnya Zod.

Validasi:

- order
- service
- category
- testimonial
- settings
- upload

Error harus ditampilkan dekat dengan field terkait.

---

# 49. COMPONENT SYSTEM

Buat reusable components:

```text
Button
Input
Textarea
Select
Modal
Dialog
Card
Badge
Table
Pagination
Dropdown
Navbar
Footer
ImageUploader
ConfirmDialog
Loading
EmptyState
ErrorState
```

Jangan mengulang component yang sama di banyak halaman.

---

# 50. RESPONSIVE ADMIN

Admin desktop:

```text
Sidebar
Content
```

Admin mobile:

```text
Topbar
Content
Bottom / Drawer navigation
```

Jangan memaksakan sidebar desktop pada layar mobile.

---

# 51. ACCESSIBILITY

Perhatikan:

- semantic HTML
- label form
- alt image
- keyboard navigation
- contrast
- focus state
- button accessibility
- aria-label jika diperlukan

---

# 52. SEO

Public pages harus memiliki:

- title
- description
- Open Graph
- favicon
- metadata
- semantic HTML

Setiap layanan:

```text
/layanan/[slug]
```

harus memiliki metadata dinamis berdasarkan layanan.

Gunakan structured metadata jika sesuai.

---

# 53. PERFORMANCE

Optimalkan:

- Next.js Image
- lazy loading
- server components jika memungkinkan
- caching
- database query
- pagination
- image dimensions

Jangan mengambil seluruh data database jika hanya membutuhkan beberapa record.

---

# 54. IMAGE HANDLING

Karena gambar berasal dari Google Drive:

Pastikan frontend dapat menampilkan gambar dengan benar.

Jika menggunakan `next/image`, konfigurasi domain/image source sesuai kebutuhan.

Jangan membuat seluruh gambar menggunakan `<img>` tanpa alasan.

---

# 55. DATA FETCHING

Gunakan Server Components untuk data public jika sesuai.

Gunakan Client Components hanya jika membutuhkan:

- interaction
- form state
- modal
- filter client-side
- upload
- animation

Jangan menjadikan seluruh aplikasi `"use client"`.

---

# 56. RESPONSIVE DESIGN RULE

Gunakan breakpoint Tailwind secara mobile-first:

```text
default = mobile
sm
md
lg
xl
```

Contoh:

```text
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
```

Bukan desktop-first.

---

# 57. EMPTY STATES

Jika belum ada layanan:

```text
Belum ada layanan tersedia.
```

Jika belum ada gallery:

```text
Galeri akan segera diperbarui.
```

Jika admin belum memiliki order:

```text
Belum ada pesanan.
```

---

# 58. LOADING

Gunakan skeleton/loading UI untuk:

- daftar layanan
- gallery
- admin table
- dashboard
- detail layanan

Jangan membuat user melihat halaman kosong ketika data sedang dimuat.

---

# 59. NOTIFICATION

Gunakan toast/notification untuk:

```text
Layanan berhasil dibuat
Layanan berhasil diperbarui
Pesanan berhasil dikonfirmasi
Gambar berhasil diunggah
Gambar berhasil dihapus
```

---

# 60. ORDER WHATSAPP

Setelah order berhasil, berikan opsi:

```text
Kirim ke WhatsApp
```

Pesan WhatsApp otomatis berisi:

```text
Halo Paris Decoration,

Saya ingin melakukan pemesanan.

Kode Pesanan:
PD-20261006-0001

Nama:
Ahmad

Layanan:
Dekorasi Wedding Premium

Tanggal Acara:
20 Oktober 2026

Lokasi:
Sumenep

Terima kasih.
```

Gunakan URL encoding dengan benar.

---

# 61. BUSINESS LOGIC

Jangan menganggap order langsung berarti booking sudah dikonfirmasi.

Saat pelanggan submit:

```text
PENDING
```

Admin yang menentukan:

```text
CONFIRMED
```

Dengan demikian Paris Decoration masih dapat memeriksa:

- ketersediaan tanggal
- ketersediaan dekorasi
- lokasi
- kebutuhan pelanggan

sebelum menerima order.

---

# 62. DATE VALIDATION

Tanggal acara:

- tidak boleh di masa lalu
- simpan menggunakan format DateTime
- tampilkan dalam format Indonesia

Contoh:

```text
20 Oktober 2026
```

Pastikan timezone Indonesia ditangani dengan benar.

---

# 63. DATABASE QUERY

Gunakan Prisma dengan query yang efisien.

Tambahkan index pada:

```text
Service.slug
Service.categoryId
Order.orderCode
Order.status
Order.eventDate
Order.createdAt
Gallery.status
```

Jika diperlukan.

---

# 64. SEED DATA

Buat seed untuk development.

Contoh kategori:

```text
Wedding
Engagement
Birthday
Aqiqah
Event
```

Contoh layanan:

```text
Dekorasi Wedding Elegant
Dekorasi Wedding Premium
Dekorasi Engagement
Dekorasi Birthday
Dekorasi Aqiqah
```

Jangan menggunakan gambar dummy yang tidak valid.

Jika gambar belum tersedia, gunakan placeholder yang jelas dan mudah diganti.

---

# 65. CODE QUALITY

Gunakan:

- TypeScript strict mode
- reusable components
- clean naming
- no unnecessary duplication
- no any jika dapat dihindari
- proper error handling
- proper typing
- modular code

Jangan membuat kode yang terlalu kompleks untuk kebutuhan sederhana.

---

# 66. HALAMAN YANG HARUS SELESAI

Public:

```text
/
 /layanan
 /layanan/[slug]
 /galeri
 /tentang
 /kontak
 /order
```

Admin:

```text
/admin/login
/admin/dashboard
/admin/layanan
/admin/layanan/tambah
/admin/layanan/[id]
/admin/kategori
/admin/galeri
/admin/pesanan
/admin/pesanan/[id]
/admin/testimonial
/admin/pengaturan
```

---

# 67. OUTPUT YANG DIHARAPKAN

Jangan hanya memberikan desain atau pseudo-code.

Implementasikan aplikasi secara nyata.

Hasil akhir harus memiliki:

1. Next.js application
2. Prisma schema
3. Neon PostgreSQL integration
4. Authentication
5. Admin dashboard
6. Public website
7. Service management
8. Category management
9. Gallery management
10. Order system
11. Testimonial management
12. Site settings
13. Google Apps Script API
14. Google Drive upload
15. Responsive UI
16. Mobile-first design
17. Validation
18. Error handling
19. Loading states
20. Seed data
21. Environment configuration
22. README

---

# 68. IMPLEMENTATION ORDER

Kerjakan secara bertahap dengan urutan:

## Phase 1

Setup project:

- Next.js
- TypeScript
- Tailwind
- dependencies
- environment

## Phase 2

Database:

- Prisma
- Neon
- schema
- migration
- seed

## Phase 3

UI foundation:

- design tokens
- typography
- button
- input
- card
- modal
- toast
- navbar
- footer

## Phase 4

Public website:

- Home
- Layanan
- Detail layanan
- Galeri
- Tentang
- Kontak

## Phase 5

Authentication:

- Admin login
- Session
- Protected routes
- Authorization

## Phase 6

Admin:

- Dashboard
- Layanan
- Kategori
- Galeri
- Pesanan
- Testimonial
- Settings

## Phase 7

Order:

- Order form
- Validation
- Order creation
- Order code
- Status
- Confirmation

## Phase 8

Google Drive:

- Google Apps Script
- Upload API
- Drive integration
- Database integration
- Delete image

## Phase 9

Testing:

- authentication
- CRUD
- upload
- order
- validation
- responsive layout
- error handling

## Phase 10

Final:

- SEO
- performance
- security
- README
- deployment configuration

---

# 69. IMPORTANT DEVELOPMENT RULES

Jangan menghapus fitur yang sudah dibuat ketika mengerjakan fitur berikutnya.

Jangan mengubah database schema secara sembarangan.

Jika schema berubah, buat migration.

Jangan menyimpan file gambar ke database.

Jangan menyimpan credential Google Drive di frontend.

Jangan membuat password admin hardcoded.

Jangan menggunakan data palsu untuk menggantikan fitur yang seharusnya sudah terhubung ke database.

Jangan membuat tombol yang tidak mempunyai fungsi.

Semua tombol utama harus benar-benar bekerja.

Semua form harus mempunyai validation.

Semua CRUD admin harus terhubung dengan database.

---

# 70. HASIL AKHIR

Paris Decoration harus terasa seperti website bisnis dekorasi profesional, bukan aplikasi CRUD biasa.

Public website harus mengutamakan:

**visual + katalog + kepercayaan + kemudahan order.**

Admin harus mengutamakan:

**kemudahan mengelola layanan + gambar + pesanan.**

Prioritas keseluruhan:

```text
Mobile UX
   ↓
Visual
   ↓
Usability
   ↓
Performance
   ↓
Security
   ↓
Maintainability
```

Bangun aplikasi secara bertahap dan pastikan setiap tahap tetap dapat dijalankan.

Jika terdapat keputusan teknis yang belum ditentukan, pilih solusi yang paling sederhana, aman, maintainable, dan sesuai dengan stack yang telah ditentukan.

Jangan menambahkan teknologi tambahan tanpa alasan yang kuat.