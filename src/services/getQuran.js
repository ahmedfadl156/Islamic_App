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
  const res = await fetch(`https://api.alquran.cloud/v1/surah/${number}/ar.alafasy`);
  const surah = await res.json();
  return surah;
}

export async function getTafsir(ayahNumber, tafsirId = 14){
  const res = await fetch(`https://api.quran.com/api/v4/tafsirs/${tafsirId}/by_ayah/${ayahNumber}`);
  const tafsir = await res.json();
  return tafsir;
}


export async function getReciters(){
  try {
    const res = await fetch(`https://mp3quran.net/api/v3/reciters?language=ar`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.reciters || [];
  } catch (error) {
    console.error('Error fetching reciters:', error);
    return [];
  }
}

export const tafsirSources = [
  {
    id: 14,
    name: 'تفسير ابن كثير',
    slug: 'ar-tafsir-ibn-kathir',
    description: 'من أشهر وأوثق التفاسير عند المسلمين'
  },
  {
    id: 15,
    name: 'تفسير الطبري',
    slug: 'ar-tafsir-al-tabari',
    description: 'مرجع أساسي وكلاسيكي في التفسير بالمأثور'
  },
  {
    id: 90,
    name: 'تفسير القرطبي',
    slug: 'ar-tafseer-al-qurtubi',
    description: 'تركيزه على الأحكام الفقهية مع التفسير'
  },
  {
    id: 91,
    name: 'تفسير السعدي',
    slug: 'ar-tafseer-al-saddi',
    description: 'مبسط وواضح، مناسب للقراءة اليومية'
  },
  {
    id: 94,
    name: 'تفسير البغوي',
    slug: 'ar-tafsir-al-baghawi',
    description: 'وسط بين الاختصار والتفصيل'
  },
  {
    id: 16,
    name: 'التفسير الميسر',
    slug: 'ar-tafsir-muyassar',
    description: 'مبسط جدًا، مناسب للمبتدئين أو الاستخدام السريع'
  },
  {
    id: 93,
    name: 'التفسير الوسيط (طنطاوي)',
    slug: 'ar-tafsir-al-wasit',
    description: 'معاصر ولغة سهلة'
  }
];