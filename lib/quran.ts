// lib/quran.ts

export async function getQuranSurahs() {
  try {
    const res = await fetch('https://equran.id/api/v2/surat', {
      next: { revalidate: 86400 }, // Cache data selama 24 jam
    });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Gagal mengambil data Al-Quran:', error);
    return [];
  }
}

// FUNGSI BARU: Mengambil detail isi surat berdasarkan nomor (contoh: /api/v2/surat/1)
export async function getSurahDetail(nomor: string | number) {
  try {
    const res = await fetch(`https://equran.id/api/v2/surat/${nomor}`, {
      next: { revalidate: 86400 }, // Cache data selama 24 jam
    });
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error(`Gagal mengambil detail surat nomor ${nomor}:`, error);
    return null;
  }
}

// Fungsi baru untuk mengambil detail doa berdasarkan ID (Contoh: /api/doa/1)
export async function getDoaDetail(id: number | string) {
  try {
    const res = await fetch(`https://equran.id/api/doa/${id}`, {
      next: { revalidate: 86400 },
    });
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error(`Gagal mengambil data doa dengan ID ${id}:`, error);
    return null;
  }
}