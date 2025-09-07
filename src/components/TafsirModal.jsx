import { useEffect, useState } from 'react';
import { tafsirSources } from '../services/getQuran';

function cleanHtmlContent(htmlString) {
  if (!htmlString) return '';
  
  // Remove HTML tags but preserve some structure
  let cleanText = htmlString
    // Remove script and style elements completely
    .replace(/<(script|style)[^>]*>.*?<\/(script|style)>/gi, '')
    // Replace paragraph tags with line breaks
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<p[^>]*>/gi, '')
    // Replace line breaks
    .replace(/<br\s*\/?>/gi, '\n')
    // Remove span tags but keep content
    .replace(/<\/?span[^>]*>/gi, '')
    // Remove reference brackets
    .replace(/\[\s*ص:\s*\d+\s*\]/gi, '')
    .replace(/\[\s*سورة[^[\]]*\]/gi, '')
    // Remove all other HTML tags
    .replace(/<[^>]*>/gi, '')
    // Clean up extra whitespace
    .replace(/\s+/g, ' ')
    // Clean up multiple line breaks
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
    
  return cleanText;
}

function TafsirModal({ isOpen, onClose, tafsirData, ayahNumber, onTafsirChange }) {
  const [selectedTafsirId, setSelectedTafsirId] = useState(14); // Default to Ibn Kathir
  
  const handleTafsirChange = (tafsirId) => {
    setSelectedTafsirId(tafsirId);
    onTafsirChange(tafsirId);
  };
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">تفسير الآية</h2>
                <p className="text-emerald-100 text-sm">الآية رقم {ayahNumber}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
              title="إغلاق"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {tafsirData ? (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <h3 className="text-blue-800 font-bold text-sm">اختر مصدر التفسير</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tafsirSources.map((source) => (
                    <button
                      key={source.id}
                      onClick={() => handleTafsirChange(source.id)}
                      className={`p-3 rounded-lg text-right transition-all duration-200 ${
                        selectedTafsirId === source.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white hover:bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                      title={source.description}
                    >
                      <div className="text-sm font-medium">{source.name}</div>
                      <div className={`text-xs mt-1 ${
                        selectedTafsirId === source.id ? 'text-blue-100' : 'text-blue-600'
                      }`}>
                        {source.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {tafsirData.ayah && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-emerald-700 font-medium text-sm">نص الآية</span>
                  </div>
                  <p className="text-2xl font-semibold text-gray-800 leading-relaxed font-arabic text-center" 
                  style={{fontFamily: 'Amiri, serif', lineHeight: '2.5'}}>
                {tafsirData.ayah}
                  </p>
                </div>
              )}

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="border-b border-gray-100 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <h3 className="text-lg font-bold text-gray-800">التفسير</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  {tafsirData.text ? (
                    <div className="prose prose-lg max-w-none">
                      <div className="text-gray-700 leading-relaxed text-justify font-medium" 
                          style={{lineHeight: '2.2', direction: 'rtl'}}>
                        {cleanHtmlContent(tafsirData.text).split('\n\n').map((paragraph, index) => (
                          paragraph.trim() && (
                            <p key={index} className="mb-4 text-lg">
                              {paragraph.trim()}
                            </p>
                          )
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-lg">لا يوجد تفسير متاح لهذه الآية حالياً</p>
                      <p className="text-gray-400 text-sm mt-2">يرجى المحاولة مرة أخرى لاحقاً</p>
                    </div>
                  )}
                </div>
              </div>

              {tafsirData.source && (
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/>
                    </svg>
                    <span className="text-blue-700 font-medium text-sm">المصدر</span>
                  </div>
                  <p className="text-gray-600 text-sm">{tafsirData.source}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 text-lg font-medium">جاري تحميل التفسير...</p>
              <p className="text-gray-400 text-sm mt-2">يرجى الانتظار قليلاً</p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>تطبيق إسلامي</span>
            </div>
            <button
              onClick={onClose}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TafsirModal;
