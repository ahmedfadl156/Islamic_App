import { TbCopy } from "react-icons/tb";
import { FiShare } from "react-icons/fi";
import { useEffect, useState } from "react";
import {getAyah} from "../services/getAyah";

function ZakrniCard() {
  const [copied, setCopied] = useState(false);
  const [ayah, setAyah] = useState(null);
  const [loading, setLoading] = useState(true);

  function randomAyah(){
    const randomAyah = Math.floor(Math.random() * 6236) + 1;
    return randomAyah;
  }

  useEffect(() => {
    async function fetchAyah(){
      try {
        const {data} = await getAyah(randomAyah());
        setAyah(data);
      } catch (error) {
        console.error('Error fetching ayah:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAyah();
  }, []);

  const handleCopy = () => {
    if (!ayah || !ayah[0] || !ayah[1]) return;
    const text = `${ayah[0].text}\n\n${ayah[1].text}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: ayah[0].surah.name,
        text: ayah[0].text + '\n\n' + ayah[1].text
      });
    }
  };

  return (
    <div className="relative -top-20 left-0 right-0 mx-auto z-50 bg-white/95 backdrop-blur-sm border border-emerald-100 shadow-2xl rounded-2xl p-6 w-[90%] max-w-4xl">
      {/* الهيدر */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <h2 className="text-emerald-700 font-bold text-xl">ذكرني بالله</h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleCopy}
            className="group relative bg-emerald-50 hover:bg-emerald-100 text-emerald-600 p-2.5 rounded-xl transition-all duration-200 hover:shadow-md"
            title="نسخ النص"
          >
            <TbCopy className="text-lg" />
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                تم النسخ!
              </span>
            )}
          </button>
          
          <button 
            onClick={handleShare}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 p-2.5 rounded-xl transition-all duration-200 hover:shadow-md"
            title="مشاركة"
          >
            <FiShare className="text-lg" />
          </button>
        </div>
      </div>

      {/* المحتوى */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-500">جاري تحميل الآية...</p>
          </div>
        ) : ayah && ayah[0] && ayah[1] ? (
          <>
            {/* النص العربي */}
            <div className="text-right">
              <p className="text-2xl leading-relaxed text-gray-800 font-medium mb-2">
                {ayah[0].text}
              </p>
            </div>
            
            {/* الترجمة الإنجليزية */}
            <div className="border-t border-emerald-100 pt-4">
              <p className="text-lg text-gray-600 italic leading-relaxed mb-2">
                {ayah[1].text}
              </p>
              
              {/* المصدر */}
              <div className="flex items-center justify-between">
                <span className="text-emerald-600 font-semibold text-sm bg-emerald-50 px-3 py-1 rounded-full">
                  {ayah[0].surah.name} - آية {ayah[0].surah.number}
                </span>
                <span className="text-gray-500 text-sm">
                  Quran {ayah[0].surah.number}:{ayah[0].number}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-red-500">حدث خطأ في تحميل الآية</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-emerald-600 hover:text-emerald-700 underline"
            >
              إعادة المحاولة
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ZakrniCard
