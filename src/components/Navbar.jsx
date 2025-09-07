import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";
import { HiBookOpen } from "react-icons/hi";
import { LuBookOpenText } from "react-icons/lu";

function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* اللوجو */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <h1 className="font-bold text-3xl text-[#059669] hover:text-[#047857] transition-colors duration-200">
                تقوى
              </h1>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center gap-5">
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
          
          {/* للأجهزة الصغيرة */}
          <div className="md:hidden">
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
          <div className="md:hidden">
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
          </div>
        )}
      </div>
    </nav>
  )
}


export default Navbar
