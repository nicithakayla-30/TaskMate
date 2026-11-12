# TaskMate ♡ — My College Task Manager

TaskMate adalah aplikasi web untuk membantu mahasiswa mengelola tugas kuliah dengan tampilan Cute Pastel yang sederhana, menarik, dan responsif.

Aplikasi dibuat menggunakan Vite dan TypeScript. Data tugas disimpan secara lokal menggunakan LocalStorage tanpa memerlukan database.

## Fitur Utama

- Melihat ringkasan total tugas, tugas selesai, dan tugas tertunda.
- Menambahkan tugas baru.
- Mengedit dan menghapus tugas.
- Mengubah status penyelesaian tugas.
- Menentukan mata kuliah, deskripsi, deadline, dan prioritas.
- Mencari dan memfilter tugas.
- Melihat progress penyelesaian tugas.
- Tampilan responsif untuk desktop dan HP.
- Menyimpan data menggunakan LocalStorage.

## Teknologi yang Digunakan

- HTML dan CSS: struktur dan tampilan aplikasi.
- TypeScript: bahasa pemrograman dengan sistem tipe.
- Vite: development server dan build tool.
- npm: mengelola package dan dependencies.
- LocalStorage: penyimpanan data pada browser.
- Git dan GitHub: version control dan kolaborasi kode.

## Instalasi dan Menjalankan Aplikasi

Pastikan Node.js dan npm sudah terpasang.

```bash
npm install
npm run dev
```

Buka alamat localhost yang ditampilkan di terminal.

## Build Production

```bash
npm run build
npm run preview
```

Hasil build tersedia di folder `dist/`. Untuk deployment pada hosting statis, unggah isi folder tersebut ke direktori website.

## Struktur Project

```text
TaskMate/
├── src/
│   ├── data/
│   ├── examples/
│   │   └── typescript-examples.ts
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── main.ts
│   ├── style.css
│   └── vite-env.d.ts
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## TypeScript

Contoh penerapan TypeScript pada project:

1. Primitive Types: `string`, `number`, dan `boolean`.
2. Array: `string[]` dan `Task[]`.
3. Interface: `Student` dan `Task`.
4. Type Alias: `TaskStatus`.
5. Union Type: `"Pending" | "Completed" | "In Progress"`.
6. Generic: fungsi `getData<T>()`.

Contoh kode dapat dilihat pada `src/examples/typescript-examples.ts`.

## npm, Vite, dan TypeScript

- **npm:** package manager untuk memasang dan mengelola dependencies.
- **Vite:** menyediakan development server dan proses build aplikasi.
- **TypeScript:** menambahkan sistem tipe pada JavaScript.
- **Compiler:** memeriksa dan menerjemahkan kode TypeScript menjadi JavaScript.
- **Transpiler:** mengubah kode dari satu bentuk bahasa ke bentuk lain, seperti TypeScript ke JavaScript.
- **Bundler:** menggabungkan dan mengoptimalkan file aplikasi untuk production.

## Git dan GitHub

Git digunakan untuk mencatat perubahan kode, sedangkan GitHub digunakan untuk menyimpan repository secara online.

Pengembangan project menerapkan:
- Repository GitHub.
- Branch `main` dan branch fitur.
- Commit untuk mencatat perubahan.
- Push dan pull untuk sinkronisasi.
- Pull Request untuk menggabungkan perubahan.
- Merge conflict dan penyelesaiannya.

## Environment Variables

Project menyediakan `.env.example` sebagai contoh konfigurasi environment.

Variabel konfigurasi:
- `VITE_APP_NAME`
- `VITE_APP_VERSION`

Buat file `.env` berdasarkan `.env.example` jika diperlukan.

File `.env` tidak dimasukkan ke repository. Jangan menyimpan password atau API secret pada variabel berawalan `VITE_` karena nilainya dapat diakses melalui browser.

## Penyimpanan Data

TaskMate menggunakan LocalStorage sehingga data tersimpan pada browser dan perangkat yang digunakan. Data tidak otomatis tersinkronisasi ke perangkat lain.

## Screenshot Aplikasi

Tambahkan screenshot aplikasi pada folder `screenshots/`.

Contoh:

```text
screenshots/
├── dashboard.png
└── task-form.png
```

Tampilkan screenshot menggunakan Markdown:

![TaskMate Dashboard](screenshots/dashboard.png)

## Deployment

Aplikasi dapat diakses melalui:

https://nicithakayladewima.infinityfree.me/taskmate/

## Repository

GitHub: https://github.com/nicithakayla-30/TaskMate
