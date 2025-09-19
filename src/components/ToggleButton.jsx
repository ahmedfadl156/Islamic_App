import React from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useDarkMode } from '../hooks/useToggleTheme';

export default function ToggleButton({ 
  size = 'md',
  showLabel = false,
  className = '' 
}) {
  const [theme, setTheme] = useDarkMode();
  const isToggled = theme === 'dark';

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'w-12 h-6',
      circle: 'w-5 h-5',
      translate: '-translate-x-6',
      icon: 'text-xs',
      label: 'text-xs'
    },
    md: {
      container: 'w-16 h-8',
      circle: 'w-7 h-7',
      translate: '-translate-x-8',
      icon: 'text-sm',
      label: 'text-sm'
    },
    lg: {
      container: 'w-20 h-10',
      circle: 'w-9 h-9',
      translate: '-translate-x-10',
      icon: 'text-base',
      label: 'text-base'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Toggle Switch */}
      <div className="relative">
        <button
          onClick={handleToggle}
          className={`
            ${config.container}
            relative rounded-full p-1 transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-emerald-300
            ${isToggled 
              ? 'bg-gradient-to-r from-slate-700 to-slate-900 shadow-lg' 
              : 'bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg'
            }
            hover:shadow-xl transform hover:scale-105
          `}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* Stars for dark mode */}
            {isToggled && (
              <>
                <div className="absolute top-1 right-2 w-1 h-1 bg-yellow-200 rounded-full animate-pulse"></div>
                <div className="absolute top-2 right-4 w-0.5 h-0.5 bg-yellow-100 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-2 right-3 w-0.5 h-0.5 bg-yellow-200 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </>
            )}
            
            {/* Clouds for light mode */}
            {!isToggled && (
              <>
                <div className="absolute top-1 left-2 w-2 h-1 bg-white bg-opacity-30 rounded-full"></div>
                <div className="absolute bottom-1 left-4 w-1.5 h-0.5 bg-white bg-opacity-20 rounded-full"></div>
              </>
            )}
          </div>

          {/* Moving Circle with Icon */}
          <div
            className={`
              ${config.circle}
              bg-white rounded-full shadow-md flex items-center justify-center -translate-y-0.5
              transform transition-all duration-300 ease-in-out
              ${isToggled ? config.translate : 'translate-x-0'}
            `}
          >
            {isToggled ? (
              <HiMoon className={`${config.icon} text-slate-700 transition-all duration-300`} />
            ) : (
              <HiSun className={`${config.icon} text-amber-500 transition-all duration-300`} />
            )}
          </div>

          {/* Islamic decorative symbol */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white text-opacity-20 text-xs font-bold">۞</span>
          </div>
        </button>
      </div>

      {/* Label */}
      {showLabel && (
        <div className="flex flex-col items-start">
          <span className={`${config.label} font-semibold text-gray-700 transition-colors duration-300`}>
            {isToggled ? 'الوضع الليلي' : 'الوضع النهاري'}
          </span>
          <span className={`text-xs text-gray-500 transition-colors duration-300`}>
            {isToggled ? 'مفعل' : 'مفعل'}
          </span>
        </div>
      )}
    </div>
  );
}
