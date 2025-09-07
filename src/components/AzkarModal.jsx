import { useState, useEffect } from 'react'

function AzkarModal({ isOpen, onClose, azkarData, title, icon, gradient }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [currentRepeat, setCurrentRepeat] = useState(1)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setCurrentIndex(0)
      setCompletedCount(0)
      setCurrentRepeat(1)
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !azkarData) return null

  const currentZekr = azkarData[currentIndex]
  const progress = ((completedCount / azkarData.length) * 100).toFixed(1)

  const handleNext = () => {
    if (currentRepeat < currentZekr.repeat) {
      setCurrentRepeat(currentRepeat + 1)
    } else {
      if (currentIndex < azkarData.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setCompletedCount(completedCount + 1)
        setCurrentRepeat(1)
      } else {
        // Completed all azkar
        setCompletedCount(azkarData.length)
      }
    }
  }

  const handlePrevious = () => {
    if (currentRepeat > 1) {
      setCurrentRepeat(currentRepeat - 1)
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setCompletedCount(Math.max(0, completedCount - 1))
      setCurrentRepeat(azkarData[currentIndex - 1].repeat)
    }
  }

  const isCompleted = completedCount === azkarData.length && currentRepeat === currentZekr.repeat

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className={`${gradient} p-6 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-4 text-6xl opacity-30">{icon}</div>
            <div className="absolute bottom-4 left-4 text-4xl opacity-20">☪️</div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{title}</h2>
              <div className="flex items-center gap-4">
                <span className="text-white/90">
                  {currentIndex + 1} من {azkarData.length}
                </span>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-semibold">
                    {currentRepeat} من {currentZekr.repeat}
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-white/80 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {!isCompleted ? (
            <>
              <div className="mb-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                  <p className="text-xl leading-relaxed text-gray-800 text-right font-medium">
                    {currentZekr.zekr}
                  </p>
                </div>
              </div>

              {currentZekr.bless && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    فضل الذكر
                  </h4>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
                    <p className="text-gray-700 leading-relaxed text-right">
                      {currentZekr.bless}
                    </p>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                  <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0 && currentRepeat === 1}
                    className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800 mb-1">
                      {currentRepeat}
                    </div>
                    <div className="text-sm text-gray-600">
                      من {currentZekr.repeat}
                    </div>
                  </div>
                  
                  <button
                    onClick={handleNext}
                    className={`p-3 rounded-full transition-colors ${
                      currentRepeat === currentZekr.repeat && currentIndex === azkarData.length - 1
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                بارك الله فيك!
              </h3>
              <p className="text-gray-600 mb-6">
                لقد أتممت جميع الأذكار بنجاح
              </p>
              <button
                onClick={onClose}
                className={`${gradient} text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity`}
              >
                إغلاق
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AzkarModal
