// Dijalankan paling awal agar tema tersimpan langsung diterapkan (tanpa berkedip)
try { if (localStorage.getItem('theme') === 'light') document.documentElement.classList.add('light'); } catch (e) {}
