// Cek service worker di object navigator
if ('serviceWorker' in navigator) {
  // Jika ada Daftar service worker
  navigator.serviceWorker
    .register('sw.js', { scope: '/' })
    .then((reg) => console.log('Berhasil didaftarkan', reg))
    .catch((err) => console.log('ada error nich :', err));
} else {
  console.log('Browser not supported');
}
