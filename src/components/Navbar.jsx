import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";
import { HiBookOpen } from "react-icons/hi";
import { LuBookOpenText } from "react-icons/lu";
import { SiStorybook } from "react-icons/si";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { useUser } from "../services/useUser";
import { useLogout } from "../services/useLogout";
function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const {user , isLoading} = useUser();
  const {logout} = useLogout();
  const navItems = [
    {
      path: "/",
      icon: HiOutlineHome,
      label: "الرئيسية"
    },
    {
      path: "/prayer-times",
      icon: HiOutlineCalendar,
      label: "مواقيت الصلاة"
    },
    {
      path: "/quran",
      icon: HiBookOpen,
      label: "القرآن"
    },
    {
      path: "/azkar",
      icon: LuBookOpenText,
      label: "الأذكار"
    },
    {
      path: "/stories",
      icon: SiStorybook,
      label: "القصص"
    },
    {
      path: "/bookmarks",
      icon: BsFillBookmarkHeartFill,
      label: "مرجعياتي"
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="px-10 py-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* اللوجو */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <h1 className="font-bold text-3xl text-[#059669] hover:text-[#047857] transition-colors duration-200">
                تقوى
              </h1>
            </Link>
          </div>
          
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-[#059669]/20 text-[#059669] shadow-sm'
                        : 'text-gray-700 hover:bg-[#059669]/20 hover:text-[#059669]'
                    }`}
                  >
                    <Icon className={`text-xl transition-colors duration-200 ${
                      active ? 'text-[#059669]' : 'text-gray-600 group-hover:text-[#059669]'
                    }`} />
                    <span className="font-semibold">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          {!user ? (
          <div className="flex items-center gap-2 hidden lg:flex">
            <button className="bg-[#059669] text-white px-4 py-2 rounded-lg hover:bg-[#047857] transition-colors duration-200">
              <Link to="/login">تسجيل الدخول</Link>
            </button>
            <button className="bg-[#059669] text-white px-4 py-2 rounded-lg hover:bg-[#047857] transition-colors duration-200">
              <Link to="/register">التسجيل</Link>
            </button>
          </div>
          ) : (
            <div className="relative flex items-center gap-4 hidden lg:flex">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 border-emerald-600 border-2 hover:bg-emerald-50 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.user?.user_metadata?.displayName?.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">مرحباً</span>
                  <span className="text-xs text-gray-600 max-w-32 truncate">
                    {user?.user?.user_metadata?.displayName}
                  </span>
                </div>

                <svg 
                  className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">الحساب</p>
                    <p className="text-xs text-gray-600 truncate">{user?.user?.user_metadata?.displayName}</p>
                  </div>
                  
                  <button 
                    className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
                    onClick={() => {
                      // Add profile functionality here
                      console.log('Profile clicked');
                      setIsUserMenuOpen(false);
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    الملف الشخصي
                  </button>
                  
                  <button 
                    className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
                    onClick={() => {
                      // Add settings functionality here
                      console.log('Settings clicked');
                      setIsUserMenuOpen(false);
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    الإعدادات
                  </button>
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button 
                      className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* للأجهزة الصغيرة */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#059669] hover:bg-[#059669]/20 transition-colors duration-200"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      active
                        ? 'bg-[#059669]/20 text-[#059669] shadow-sm'
                        : 'text-gray-700 hover:bg-[#059669]/20 hover:text-[#059669]'
                    }`}
                  >
                    <Icon className={`text-xl transition-colors duration-200 ${
                      active ? 'text-[#059669]' : 'text-gray-600 group-hover:text-[#059669]'
                    }`} />
                    <span className="font-semibold">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile Auth Section */}
            {!user ? (
              <div className="px-2 pb-3 space-y-2">
                <button className="w-full bg-[#059669] text-white px-4 py-2 rounded-lg hover:bg-[#047857] transition-colors duration-200">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>تسجيل الدخول</Link>
                </button>
                <button className="w-full bg-[#059669] text-white px-4 py-2 rounded-lg hover:bg-[#047857] transition-colors duration-200">
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>التسجيل</Link>
                </button>
              </div>
            ) : (
              <div className="px-2 pb-3 border-t border-gray-100 pt-3">
                {/* Mobile User Info */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 mb-3 border-emerald-600 border-2">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.user?.user_metadata?.displayName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800">مرحباً</span>
                    <span className="text-xs text-gray-600 truncate">
                      {user?.user?.user_metadata?.displayName}
                    </span>
                  </div>
                </div>
                
                {/* Mobile User Menu Options */}
                <div className="space-y-1">
                  <button 
                    className="w-full text-right px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3 rounded-lg"
                    onClick={() => {
                      console.log('Profile clicked');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    الملف الشخصي
                  </button>
                  
                  <button 
                    className="w-full text-right px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3 rounded-lg"
                    onClick={() => {
                      console.log('Settings clicked');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    الإعدادات
                  </button>
                  
                  <button 
                    className="w-full text-right px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-3 rounded-lg"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    تسجيل الخروج
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}


export default Navbar
