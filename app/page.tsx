import { getLatestChannelVideo } from '@/lib/youtube';

import QuranModal from '@/components/QuranModal';
import QuranToggleSection from '@/components/QuranModal';
import { Calendar, MapPin, HeartHandshake, BookOpen, Megaphone, ChevronRight, Play, Bookmark, BookMarked, Sparkles, } from 'lucide-react';

export default async function Home() {
  // Mengambil tepat 1 video terbaru secara otomatis dari YouTube API
  const latestVideo = await getLatestChannelVideo();


  // Tanggal hari ini format Indonesia
  const currentDate = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const jadwalSholat = [
    { nama: 'Subuh', waktu: '04:15' },
    { nama: 'Dzuhur', waktu: '11:32' },
    { nama: 'Ashar', waktu: '14:48' },
    { nama: 'Maghrib', waktu: '17:35' },
    { nama: 'Isya', waktu: '18:44' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. HEADER / NAVBAR */}
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

      {/* 2. HERO SECTION & JADWAL SHOLAT */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <span className="bg-emerald-700/60 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            Selamat Datang di Website Resmi
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Memakmurkan Masjid, <br className="hidden sm:block"/>Membangun Peradaban Umat
          </h2>
          <p className="text-emerald-100/80 max-w-2xl mx-auto text-sm md:text-base">
            Temukan informasi jadwal sholat harian, agenda kajian Islam, laporan keuangan transparan, serta kegiatan sosial di lingkungan masjid kita.
          </p>

          <div id="jadwal" className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-4xl mx-auto mt-10 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-white/10 text-sm">
              <div className="flex items-center space-x-2 text-emerald-200">
                <Calendar className="h-4 w-4" />
                <span>{currentDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-200 mt-2 md:mt-0">
                <MapPin className="h-4 w-4" />
                <span>Wilayah Setempat</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {jadwalSholat.map((item, index) => (
                <div key={index} className="bg-emerald-900/40 border border-emerald-700/50 rounded-xl p-3 text-center">
                  <p className="text-xs text-emerald-300 font-medium">{item.nama}</p>
                  <p className="text-lg md:text-xl font-bold mt-1 text-white">{item.waktu}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION 1 VIDEO YOUTUBE TERBARU OTOMATIS */}
      <section id="kajian" className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Kolom Kiri: Thumbnail 1 Video Terakhir */}
            <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden shadow-md bg-slate-900 aspect-video flex items-center justify-center">
              {latestVideo ? (
                <>
                  <img 
                    src={latestVideo.thumbnail} 
                    alt={latestVideo.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 flex flex-col justify-between p-4 text-white">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs">M</div>
                      <span className="text-xs font-medium text-slate-200">Channel Resmi Masjid</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-base md:text-lg leading-snug text-white line-clamp-1">
                        {latestVideo.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Diunggah pada {new Date(latestVideo.publishedAt).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Tombol Play yang membuka video tersebut di YouTube */}
                  <a 
                    href={`https://www.youtube.com/watch?v=${latestVideo.videoId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative z-20 w-16 h-12 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center text-white shadow-lg transition transform group-hover:scale-105"
                  >
                    <span className="text-xl ml-0.5">▶</span>
                  </a>
                </>
              ) : (
                <div className="text-slate-400 text-sm p-6 text-center">
                  Menghubungkan ke YouTube API... (Pastikan YOUTUBE_API_KEY sudah disetel di .env.local)
                </div>
              )}
            </div>

            {/* Kolom Kanan: Informasi & Tombol Subscribe */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center space-x-1.5 text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                <span>UPDATE TERBARU</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                Kajian & Siaran Langsung Terbaru
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Saksikan live streaming terbaru kajian kitab, khutbah Jumat, dan video terbaru yang otomatis tersinkronisasi dari channel resmi Masjid Agung Lumajang di YouTube.
              </p>
              <div>
                <a 
                  href="https://www.youtube.com/@masjidagunglumajang?sub_confirmation=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-md transition"
                >
                  <span>SUBSCRIBE CHANNEL</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SECTION MENU & SURAT PILIHAN */}
      <section id="quran" className="max-w-6xl mx-auto px-4 mt-12 space-y-6">
        
        {/* Kartu Menu Utama */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            
            {/* Menu 1: Al-Quran (SVG Buku Terbuka) */}
            
            <a href="/quran" className="group flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-emerald-50 transition">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition shadow-inner overflow-hidden p-3.5">
                <img 
                  src="https://quran.nu.or.id/_next/static/media/alquran.c832f1bd.svg" 
                  alt="Al Quran" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-slate-800 text-sm md:text-base">Al Quran</span>
            </a>

            {/* Menu 2: Tahlil & Yasin */}
            <a href="#" className="group flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-emerald-50 transition">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition shadow-inner overflow-hidden p-3.5">
                <img 
                  src="https://quran.nu.or.id/_next/static/media/tahlil.91a46b2c.svg" 
                  alt="Tahlil & Yasin" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-slate-800 text-sm md:text-base">Tahlil & Yasin</span>
            </a>

            {/* Menu 3: Wirid & Doa (Menggunakan SVG Eksternal) */}
            <a href="#" className="group flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-emerald-50 transition">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition shadow-inner overflow-hidden p-3.5">
                <img 
                  src="https://quran.nu.or.id/_next/static/media/doa.cb10f7f5.svg" 
                  alt="Wirid & Doa" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-slate-800 text-sm md:text-base">Wirid & Doa</span>
            </a>

            {/* Menu 4: Maulid */}
            <a href="#" className="group flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-emerald-50 transition">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition shadow-inner overflow-hidden p-3.5">
                <img 
                  src="https://quran.nu.or.id/_next/static/media/maulid.46a50da0.svg"
                  alt="Maulid" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-slate-800 text-sm md:text-base">Maulid</span>
            </a>

          </div>
        </div>

        {/* Badge Pill Surat Pilihan Statis */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a href="http://localhost:3000/quran/36" className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold text-sm px-6 py-2.5 rounded-full shadow-sm transition transform hover:-translate-y-0.5">Yasin</a>
          <a href="#" className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold text-sm px-6 py-2.5 rounded-full shadow-sm transition transform hover:-translate-y-0.5">Al-Waqi'ah</a>
          <a href="#" className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold text-sm px-6 py-2.5 rounded-full shadow-sm transition transform hover:-translate-y-0.5">Al-Mulk</a>
          <a href="#" className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold text-sm px-6 py-2.5 rounded-full shadow-sm transition transform hover:-translate-y-0.5">Al-Kahfi</a>
          <a href="#" className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold text-sm px-6 py-2.5 rounded-full shadow-sm transition transform hover:-translate-y-0.5">Ar-Rahman</a>
          <a href="#" className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-semibold text-sm px-6 py-2.5 rounded-full shadow-sm transition transform hover:-translate-y-0.5">Ayat Kursi</a>
        </div>

      </section>
      
      

      {/* 5. SECTION KEGIATAN TERBARU */}
      <section id="kegiatan" className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center space-x-2 text-emerald-700 font-semibold text-sm mb-1">
              <Megaphone className="h-4 w-4" />
              <span>Agenda & Berita</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Kegiatan Terbaru Masjid</h3>
          </div>
          <a href="#" className="hidden sm:flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            <span>Lihat Semua</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
            <div className="h-40 bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-lg">
              Kajian Akbar
            </div>
            <div className="p-5 space-y-2">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">Babon Kitab</span>
              <h4 className="font-bold text-slate-800 text-lg">Kajian Kitab Kuning Rutin Ba'da Maghrib</h4>
              <p className="text-slate-500 text-sm line-clamp-2">Kajian rutin bersama Ustadz setempat membahas fiqih sehari-hari terbuka untuk umum.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
            <div className="h-40 bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-lg">
              Santunan Yatim
            </div>
            <div className="p-5 space-y-2">
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">Sosial</span>
              <h4 className="font-bold text-slate-800 text-lg">Program Santunan Anak Yatim & Dhuafa Bulanan</h4>
              <p className="text-slate-500 text-sm line-clamp-2">Penyaluran bantuan sosial kepada warga sekitar masjid yang membutuhkan.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
            <div className="h-40 bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-lg">
              Kebersihan Masjid
            </div>
            <div className="p-5 space-y-2">
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">Gotong Royong</span>
              <h4 className="font-bold text-slate-800 text-lg">Kerjabakti Pembersihan Area Utama Menjelang Jumat</h4>
              <p className="text-slate-500 text-sm line-clamp-2">Mari berpartisipasi menjaga kebersihan dan kenyamanan rumah Allah bersama.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p>&copy; 2026 Masjid Al-Hidayah. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition">Kontak Pengurus</a>
          </div>
        </div>
      </footer>

    </div>
  );
}