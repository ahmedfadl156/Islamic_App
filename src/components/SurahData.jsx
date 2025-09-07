function SurahData({ surahData, selectedSura, handleTafsirClick }) {
  return (
    surahData?.map((ayah, index) => (
      <div key={ayah.number} className="group">
        <div className="flex items-start gap-3 lg:gap-4 p-3 lg:p-4 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="bg-emerald-100 text-emerald-700 w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center rounded-full text-xs lg:text-sm font-semibold flex-shrink-0 mt-1">
            {ayah.numberInSurah}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3 lg:mb-4">
              <p className="text-xl lg:text-2xl font-semibold leading-relaxed text-gray-800 font-arabic flex-1" style={{fontFamily: 'Amiri, serif', lineHeight: '2.2'}}>
                {ayah.text}
              </p>
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
