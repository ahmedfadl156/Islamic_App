import { FaBook } from "react-icons/fa";
import { useState } from "react";
import { useAddBookmark } from "../services/useAddBookmark";
import { useBookmarks } from "../services/useBookmarks";
import { useDeleteBookmark } from "../services/useDeleteBookmark";


function SurahData({ surahData, selectedSura, handleTafsirClick }) {
  const {addBookmark , isAdding} = useAddBookmark();
  const {bookmarks = []} = useBookmarks(); 
  const {deleteBookmark , isDeleting} = useDeleteBookmark();


  function handleDeleteBookmark(bookmarkId){
    deleteBookmark(bookmarkId);
  }

  const handleAddBookmark = (ayahNumber) => {
    const ayahData = surahData.find(ayah => ayah.numberInSurah === ayahNumber);
    if (!ayahData) return;

    addBookmark({
      surah_number: selectedSura.number,
      surah_name: selectedSura.name,
      ayah_number_in_surah: ayahNumber,
      ayah_number: ayahData.number, 
      bookmark_name: `${selectedSura.name} - آية ${ayahNumber}`,
      ayah_text: ayahData.text
    });
  };

  function goToAyah(ayahNumber){
    const ayahElement = document.querySelector(`[data-ayah-number="${ayahNumber}"]`);
    
    if (ayahElement) {
      ayahElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
      
      ayahElement.classList.add('highlight-ayah');
      
      setTimeout(() => {
        ayahElement.classList.remove('highlight-ayah');
      }, 3000);
    }
  }

  const isAyahBookmarked = (ayahNumber) => {
    if (!bookmarks || !Array.isArray(bookmarks)) return false;
    return bookmarks.some(bookmark => 
      bookmark?.surah_number === selectedSura?.number && 
      bookmark?.ayah_number_in_surah === ayahNumber
    );
  };
  return (
    surahData?.map((ayah, index) => (
      <div key={ayah.number} className="group" data-ayah-number={ayah.numberInSurah}>
        <div className="flex items-start gap-3 lg:gap-4 p-3 lg:p-4 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="bg-emerald-100 text-emerald-700 w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center rounded-full text-xs lg:text-sm font-semibold flex-shrink-0 mt-1">
            {ayah.numberInSurah}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row items-start justify-between gap-3 mb-3 lg:mb-4">
              <p className="text-xl lg:text-2xl font-semibold leading-relaxed text-gray-800 font-arabic flex-1" style={{fontFamily: 'Amiri, serif', lineHeight: '2.2'}}>
                {ayah.text}
              </p>
              <div className="action-buttons flex gap-3 items-center">
              <button 
                onClick={() => isAyahBookmarked(ayah.numberInSurah) ? handleDeleteBookmark(bookmarks.find(bookmark => bookmark.ayah_number_in_surah === ayah.numberInSurah).id) : handleAddBookmark(ayah.numberInSurah)}
                disabled={isAdding || isDeleting}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex-shrink-0 mt-1 ${
                  isAyahBookmarked(ayah.numberInSurah)
                    ? "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 hover:from-amber-200 hover:to-yellow-200 border border-amber-200 shadow-sm" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-700 border border-gray-200"
                } ${isAdding || isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={isAyahBookmarked(ayah.numberInSurah) ? "إزالة من المفضلة" : "إضافة للمفضلة"}
              >
                {isAyahBookmarked(ayah.numberInSurah) ? (
                  <>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                    </svg>
                    <span className="hidden sm:inline">إزالة</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                    </svg>
                    <span className="hidden sm:inline">حفظ</span>
                  </>
                )}
              </button>
              <button
                onClick={() => handleTafsirClick(ayah.number)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 flex-shrink-0 mt-1"
                title="عرض التفسير"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                تفسير
              </button>
              </div>
            </div>
            {ayah.audio && (
              <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-emerald-700">استمع للآية</span>
                  </div>
                  <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                    {selectedSura?.edition?.name || 'مشاري العفاسي'}
                  </span>
                </div>
                <audio 
                  controls 
                  className="w-full h-8 lg:h-10 rounded-lg"
                  style={{
                    filter: 'sepia(20%) saturate(70%) hue-rotate(88deg) brightness(100%) contrast(119%)'
                  }}
                >
                  <source src={ayah.audio} type="audio/mpeg" />
                  متصفحك لا يدعم تشغيل الصوت
                </audio>
              </div>
            )}
          </div>
        </div>
      </div>
    ))
  )
}

export default SurahData
