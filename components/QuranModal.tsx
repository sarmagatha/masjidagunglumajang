'use client';

import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface Surah {
  nomor: number;
  namaLatin: string;
  nama: string;
  arti: string;
  jumlahAyat: number;
}

export default function QuranToggleSection({ surahs = [] }: { surahs: Surah[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const safeSurahs = Array.isArray(surahs) ? surahs : [];

  const filteredSurahs = safeSurahs.filter((surah) =>
    (surah.namaLatin?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (surah.arti?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (surah.nomor?.toString() || '').includes(searchQuery)
  );

  return (
    <>
      {/* 1. Tombol Menu Al-Quran (Klik untuk buka/tutup daftar surat) */}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-emerald-50 transition w-full relative"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition shadow-inner overflow-hidden p-3.5">
          <img 
            src="https://quran.nu.or.id/_next/static/media/alquran.c832f1bd.svg" 
            alt="Al Quran" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex items-center space-x-1">
          <span className="font-bold text-slate-800 text-sm md:text-base">Al Quran</span>
          <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* 2. Container Daftar 114 Surat (Tampil secara inline di bawah menu saat dibuka) */}
      {isOpen && (
        <div className="col-span-full mt-6 bg-slate-50 rounded-2xl border border-slate-200 p-6 transition-all animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Daftar 114 Surat Al-Quran</h3>
              <p className="text-slate-500 text-sm">Pilih salah satu surat untuk membaca ayat lengkap terjemahan</p>
            </div>
            
            {/* Kolom Pencarian */}
            <div className="w-full md:w-72 bg-white border border-slate-200 rounded-xl flex items-center px-3 py-2 shadow-sm">
              <Search className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
              <input 
                type="text"
                placeholder="Cari surat (mis: Yasin)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none text-xs text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>

          {/* Grid 114 Surat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredSurahs.length > 0 ? (
              filteredSurahs.map((surah) => (
                <a 
                  key={surah.nomor}
                  href={`/quran/${surah.nomor}`}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-emerald-50 hover:border-emerald-200 transition group shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                      {surah.nomor}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs group-hover:text-emerald-900">{surah.namaLatin}</h4>
                      <p className="text-[10px] text-slate-500">{surah.arti} • {surah.jumlahAyat} Ayat</p>
                    </div>
                  </div>
                  <span className="font-arabic text-sm text-emerald-800 font-semibold">{surah.nama}</span>
                </a>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-400 text-sm">
                Surat tidak ditemukan.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}