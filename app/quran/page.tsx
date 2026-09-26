import { getQuranSurahs } from '@/lib/quran';
import { ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { Calendar, MapPin, HeartHandshake, BookOpen, Megaphone, ChevronRight, Play, Bookmark, BookMarked, Sparkles, } from 'lucide-react';

export default async function QuranIndexPage() {
  const surahs = await getQuranSurahs();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* Header */}
      <header className="bg-emerald-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-700 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-emerald-100" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Masjid Agung KH. Anas Machfudz</h1>
              <p className="text-xs text-emerald-200">Lumajang - Jawa Timur</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="http://localhost:3000/" className="hover:text-emerald-300 transition">Beranda</a>
            <a href="#profil" className="hover:text-emerald-300 transition">Profil</a>
            <a href="#galeri" className="hover:text-emerald-300 transition">Galeri</a>
            <a href="#kegiatan" className="hover:text-emerald-300 transition">Kegiatan</a>
            <a href="#layanan" className="hover:text-emerald-300 transition">Layanan</a>
            <a href="#kontak" className="hover:text-emerald-300 transition">Kontak</a>
          </nav>
          <a 
            href="#donasi" 
            className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow transition flex items-center space-x-1"
          >
            <HeartHandshake className="h-4 w-4" />
            <span>Infak / Donasi</span>
          </a>
        </div>
      </header>

      

      {/* Konten Daftar 114 Surat */}
      <main className="max-w-4xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">114 Surat Al-Quran</h2>
              <p className="text-slate-500 text-sm">Pilih salah satu surat untuk membaca ayat lengkap terjemahan</p>
            </div>
            <div className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-xl border border-emerald-200">
              Total: {surahs.length} Surat
            </div>
          </div>

          {/* Grid 114 Surat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {surahs.length > 0 ? (
              surahs.map((surah: { nomor: number; namaLatin: string; nama: string; arti: string; jumlahAyat: number }) => (
                <Link 
                  key={surah.nomor}
                  href={`/quran/${surah.nomor}`}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-emerald-50/60 hover:border-emerald-200 transition group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                      {surah.nomor}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-900">{surah.namaLatin}</h4>
                      <p className="text-xs text-slate-500">{surah.arti} • {surah.jumlahAyat} Ayat</p>
                    </div>
                  </div>
                  <span className="font-arabic text-lg text-emerald-800 font-semibold">{surah.nama}</span>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-400">
                Memuat daftar surat...
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}