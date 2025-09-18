import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center px-4">
      <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-repeat -z-10" style={{
        backgroundImage: "url('background.avif')",
        backgroundSize: "500px",
        mixBlendMode: "soft-light"
      }}></div>
      
      <div className="text-center relative z-10 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white/20 mb-4">404</h1>
          <div className="w-24 h-1 bg-white/30 mx-auto mb-6"></div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl text-white font-bold mb-4">
            الصفحة غير موجودة
          </h2>
          <p className="text-xl text-teal-100 font-semibold mb-2">
            لا تقلق، الطريق إلى الخير كثيرة
          </p>
          <p className="text-lg text-white/90 leading-relaxed">
            يبدو أن الصفحة التي تبحث عنها غير متوفرة. دعنا نساعدك في العثور على ما تحتاجه.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 text-white/40">
            <div className="w-8 h-px bg-current"></div>
            <div className="text-2xl">۞</div>
            <div className="w-8 h-px bg-current"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link 
            to="/" 
            className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>🏠</span>
            <span>العودة للرئيسية</span>
          </Link>
          
          <Link 
            to="/prayer-times" 
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>🕌</span>
            <span>مواقيت الصلاة</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <Link 
            to="/quran" 
            className="text-white/80 hover:text-white transition-colors duration-200 py-2"
          >
            📖 القرآن الكريم
          </Link>
          
          <Link 
            to="/azkar" 
            className="text-white/80 hover:text-white transition-colors duration-200 py-2"
          >
            📿 الأذكار
          </Link>
          
          <Link 
            to="/stories" 
            className="text-white/80 hover:text-white transition-colors duration-200 py-2"
          >
            📚 القصص
          </Link>
          
          <Link 
            to="/bookmarks" 
            className="text-white/80 hover:text-white transition-colors duration-200 py-2"
          >
            🔖 المحفوظات
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/70 italic text-sm">
            "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا"
          </p>
          <p className="text-white/50 text-xs mt-1">
            سورة الطلاق - آية 2
          </p>
        </div>
      </div>
    </div>
  )
}
