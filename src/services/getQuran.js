export async function getQuran(){
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/quran/ar.alafasy`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if (data.data && data.data.surahs) {
      return data.data.surahs;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching Quran data:', error);
    return [];
  }
}

export async function getSurah(number){
  const res = await fetch(`http://api.alquran.cloud/v1/surah/${number}/ar.alafasy`);
  const surah = await res.json();
  return surah;
}