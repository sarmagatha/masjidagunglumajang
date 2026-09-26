import { getSurahDetail } from '@/lib/quran';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Calendar, MapPin, HeartHandshake, BookOpen, Megaphone, ChevronRight, Play, Bookmark, BookMarked, Sparkles, } from 'lucide-react';

interface PageProps {
  params: Promise<{
    nomor: string;
  }>;
}

export default async function SuratDetailPage({ params }: PageProps) {
  // Unwrap params menggunakan await
  const resolvedParams = await params;
  const { nomor } = resolvedParams;
  
  const surat = await getSurahDetail(nomor);

  if (!surat) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
        <p>Maaf, data surat tidak ditemukan atau gagal dimuat.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* Header Surat */}
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

      {/* Detail Konten Surat */}
      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-6">
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-8 text-center space-y-3 shadow-xl relative overflow-hidden">
          <span className="bg-emerald-700/60 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Surat ke-{surat.nomor} • {surat.tempatTurun}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-arabic tracking-wide pt-2">
            {surat.nama}
          </h2>
          <p className="text-emerald-100 text-sm max-w-lg mx-auto">
            {surat.deskripsi?.replace(/<[^>]*>?/gm, '')}
          </p>
        </div>

        {/* Daftar Ayat */}
        <div className="space-y-4">
          {surat.ayat.map((item: { nomorAyat: number; teksArab: string; teksLatin: string; teksIndonesia: string }) => (
            <div key={item.nomorAyat} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  {item.nomorAyat}
                </div>
              </div>

              {/* Teks Arab */}
              <div className="text-right">
                <p className="font-arabic text-2xl md:text-3xl leading-loose text-slate-900">
                  {item.teksArab}
                </p>
              </div>

              {/* Terjemahan & Latin */}
              <div className="space-y-1 pt-2">
                <p className="text-xs text-emerald-700 font-medium italic">
                  {item.teksLatin}
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {item.teksIndonesia}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}