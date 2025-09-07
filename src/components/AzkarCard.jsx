import { useState } from 'react'

function AzkarCard({ title, description, icon, gradient, textColor, count, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${gradient} p-8 min-h-[280px] flex flex-col justify-between group`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 text-6xl opacity-20">
          {icon}
        </div>
        <div className="absolute bottom-4 left-4 text-4xl opacity-15">
          ☪️
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className={`text-4xl ${textColor} transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
            {icon}
          </div>
          {count && (
            <div className={`${textColor} bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold`}>
              {count} ذكر
            </div>
          )}
        </div>
        
        <h3 className={`text-2xl font-bold mb-3 ${textColor} leading-tight`}>
          {title}
        </h3>
        
        <p className={`${textColor} opacity-90 text-base leading-relaxed mb-6`}>
          {description}
        </p>
      </div>
      
      <div className="relative z-10">
        <div className={`flex items-center justify-center py-3 px-6 rounded-xl bg-white/20 backdrop-blur-sm border border-white border-opacity-30 transition-all duration-300 ${isHovered ? 'bg-opacity-30 transform translate-y-[-2px]' : ''}`}>
          <span className={`font-semibold ${textColor} ml-2`}>
            ابدأ الأذكار
          </span>
          <svg 
            className={`w-5 h-5 ${textColor} transition-transform duration-300 ${isHovered ? 'translate-x-[-4px]' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>
      
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 ${isHovered ? 'animate-pulse' : ''}`} 
           style={{
             background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
             transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
             transition: 'transform 0.6s ease-in-out'
           }}>
      </div>
    </div>
  )
}

export default AzkarCard
