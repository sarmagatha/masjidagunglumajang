export async function getLatestChannelVideo() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const HANDLE = 'masjidagunglumajang'; // Tanpa tanda @

  if (!API_KEY) {
    return null;
  }

  try {
    // 1. Ambil Channel ID berdasarkan Handle (@masjidagunglumajang) secara otomatis
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${HANDLE}&key=${API_KEY}`
    );
    const channelData = await channelRes.json();

    if (!channelData.items || channelData.items.length === 0) {
      console.error('Channel YouTube tidak ditemukan.');
      return null;
    }

    // Dapatkan Playlist ID "uploads" resmi dari channel tersebut
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // 2. Ambil 1 video terbaru dari playlist uploads tersebut
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=${uploadsPlaylistId}&key=${API_KEY}`,
      { next: { revalidate: 3600 } } // Cache diperbarui tiap 1 jam
    );
    
    const playlistData = await playlistRes.json();
    if (playlistData.items && playlistData.items.length > 0) {
      const item = playlistData.items[0].snippet;
      return {
        title: item.title,
        description: item.description,
        thumbnail: item.thumbnails.high?.url || item.thumbnails.medium?.url,
        videoId: item.resourceId.videoId,
        publishedAt: item.publishedAt,
      };
    }
  } catch (error) {
    console.error('Gagal mengambil video YouTube:', error);
  }
  return null;
}