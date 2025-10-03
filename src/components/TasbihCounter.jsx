import { useState, useEffect } from 'react'

const TasbihCounter = () => {
  const [selectedTasbih, setSelectedTasbih] = useState(0)
  const [count, setCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showRipple, setShowRipple] = useState(false)

  const tasbihTypes = [
    {
        text: "التسبيح",
        translation: "التسبيح",
        color: "from-emerald-500 to-teal-600",
        icon: "🌟",
        target: Infinity
    },
    {
      text: "سُبْحَانَ اللهِ",
      translation: "سبحان الله",
      color: "from-emerald-500 to-teal-600",
      icon: "🌟",
      target: 33
    },
    {
      text: "الْحَمْدُ للهِ",
      translation: "الحمد لله",
      color: "from-blue-500 to-indigo-600",
      icon: "🤲",
      target: 33
    },
    {
      text: "اللهُ أَكْبَرُ",
      translation: "الله أكبر",
      color: "from-purple-500 to-pink-600",
      icon: "☪️",
      target: 34
    },
    {
      text: "لَا إِلَهَ إِلَّا اللهُ",
      translation: "لا إله إلا الله",
      color: "from-amber-500 to-orange-600",
      icon: "✨",
      target: 100
    },
    {
      text: "أَسْتَغْفِرُ اللهَ",
      translation: "أستغفر الله",
      color: "from-rose-500 to-red-600",
      icon: "🤍",
      target: 100
    }
  ]

  const currentTasbih = tasbihTypes[selectedTasbih]

  const handleCount = () => {
    setIsAnimating(true)
    setShowRipple(true)
    setCount(prev => prev < currentTasbih.target ? prev + 1 : prev)
    setTotalCount(prev => prev + 1)
    
    // Reset animation after a short delay
    setTimeout(() => {
      setIsAnimating(false)
      setShowRipple(false)
    }, 300)
  }

  const resetCount = () => {
    setCount(0)
  }

  const resetAll = () => {
    setCount(0)
    setTotalCount(0)
  }

  const progress = (count / currentTasbih.target) * 100

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          مسبحة إلكترونية
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          اختر نوع التسبيح وابدأ العد
        </p>
      </div>

      {/* Tasbih Selection */}
      <div className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {tasbihTypes.map((tasbih, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedTasbih(index)
                setCount(0)
              }}
              className={`p-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                selectedTasbih === index
                  ? `bg-gradient-to-r ${tasbih.color} text-white shadow-lg scale-105`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <span>{tasbih.icon}</span>
                <span className="text-sm md:text-md lg:text-lg">{tasbih.translation}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Tasbih Display */}
      <div className="text-center mb-8">
        <div className={`bg-gradient-to-r ${currentTasbih.color} text-white rounded-2xl p-6 shadow-lg`}>
          <div className="text-3xl mb-2">{currentTasbih.icon}</div>
          <div className="text-2xl font-bold mb-2 font-['Amiri_Quran']">
            {currentTasbih.text}
          </div>
          <div className="text-sm opacity-90">
            {currentTasbih.translation}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        {currentTasbih.target === Infinity ? (
          <div className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              التسبيح الحر - لا حدود
            </div>
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              العدد الحالي: {count}
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>التقدم</span>
              <span>{count} / {currentTasbih.target}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className={`bg-gradient-to-r ${currentTasbih.color} h-3 rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            {count >= currentTasbih.target && (
              <div className="text-center mt-2">
                <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
                  ✅ تم إكمال العدد المطلوب! بارك الله فيك
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Counter Display */}
      <div className="text-center mb-8">
        <div className="relative">
          <div className={`text-6xl font-bold ${isAnimating ? 'scale-110' : 'scale-100'} transition-transform duration-300 text-gray-800 dark:text-gray-200`}>
            {count}
          </div>
          {showRipple && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-20 h-20 bg-gradient-to-r ${currentTasbih.color} rounded-full opacity-30 animate-ping`}></div>
            </div>
          )}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          إجمالي التسبيحات: {totalCount}
        </div>
      </div>

      {/* Counter Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleCount}
          className={`w-32 h-32 rounded-full bg-gradient-to-r ${currentTasbih.color} text-white text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-200 relative overflow-hidden`}
        >
          <span className="relative z-10">اضغط للعد</span>
          {showRipple && (
            <div className="absolute inset-0 bg-white opacity-30 rounded-full animate-ping"></div>
          )}
        </button>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col md:flex-row gap-3 justify-center">
        <button
          onClick={resetCount}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors duration-200"
        >
          إعادة تعيين العداد
        </button>
        <button
          onClick={resetAll}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors duration-200"
        >
          إعادة تعيين الكل
        </button>
      </div>

      {/* Islamic Decoration */}
      <div className="text-center mt-6 text-emerald-600 dark:text-emerald-400 text-2xl">
        ۞
      </div>
    </div>
  )
}

export default TasbihCounter
