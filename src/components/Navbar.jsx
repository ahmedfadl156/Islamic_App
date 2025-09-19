import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiOutlineHome, HiOutlineCalendar, HiBookOpen } from "react-icons/hi";
import { LuBookOpenText } from "react-icons/lu";
import { SiStorybook } from "react-icons/si";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { useUser } from "../services/useUser";
import { useLogout } from "../services/useLogout";
import ToggleButton from "./ToggleButton";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = useUser();
  const { logout } = useLogout();

  const navItems = [
    { path: "/", icon: HiOutlineHome, label: "الرئيسية" },
    { path: "/prayer-times", icon: HiOutlineCalendar, label: "مواقيت الصلاة" },
    { path: "/quran", icon: HiBookOpen, label: "القرآن" },
    { path: "/azkar", icon: LuBookOpenText, label: "الأذكار" },
    { path: "/stories", icon: SiStorybook, label: "القصص" },
    { path: "/bookmarks", icon: BsFillBookmarkHeartFill, label: "مرجعياتي" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <h1 className="font-bold text-3xl text-[#059669] hover:text-[#047857] transition-colors duration-200">
                تقوى
              </h1>
            </Link>
          </div>

          <div className="hidden xl:block">
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
                        ? "bg-[#059669]/20 text-[#059669] shadow-sm"
                        : "text-gray-700 dark:text-white hover:bg-[#059669]/20 hover:text-[#059669]"
                    }`}
                  >
                    <Icon
                      className={`text-xl transition-colors duration-200 ${
                        active
                          ? "text-[#059669]"
                          : "text-gray-600 dark:text-white group-hover:text-[#059669]"
                      }`}
                    />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-4">
            <ToggleButton size="lg" showLabel={false} />

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="bg-[#059669] text-white px-4 py-2 rounded-lg hover:bg-[#047857] transition-colors duration-200"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="bg-[#059669] text-white px-4 py-2 rounded-lg hover:bg-[#047857] transition-colors duration-200"
                >
                  التسجيل
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2 border-emerald-600 border-2 hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.user?.user_metadata?.displayName
                        ?.charAt(0)
                        .toUpperCase()}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      مرحباً
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 max-w-32 truncate">
                      {user?.user?.user_metadata?.displayName}
                    </span>
                  </div>

                  <svg
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-800">الحساب</p>
                      <p className="text-xs text-gray-600 truncate">
                        {user?.user?.user_metadata?.displayName}
                      </p>
                    </div>

                    <button
                      className="w-full text-right px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2"
                      onClick={() => {
                        navigate("/account-info");
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      الملف الشخصي
                    </button>

                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
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

          <div className="flex items-center gap-2 xl:hidden">
            <ToggleButton size="sm" showLabel={false} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#059669] hover:bg-[#059669]/20 transition-colors duration-200"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="xl:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
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
                      ? "bg-[#059669]/20 text-[#059669] shadow-sm"
                      : "text-gray-700 dark:text-gray-300 hover:bg-[#059669]/20 hover:text-[#059669]"
                  }`}
                >
                  <Icon
                    className={`text-xl transition-colors duration-200 ${
                      active
                        ? "text-[#059669]"
                        : "text-gray-600 dark:text-gray-400 group-hover:text-[#059669]"
                    }`}
                  />
                  <span className="font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {!user ? (
            <div className="px-2 pb-3 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full block text-center bg-[#059669] text-white px-4 py-2 rounded-lg hover:bg-[#047857] transition-colors duration-200"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full block text-center bg-[#059669] text-white px-4 py-2 rounded-lg hover:bg-[#047857] transition-colors duration-200"
              >
                التسجيل
              </Link>
            </div>
          ) : (
            <div className="px-2 pb-3 border-t border-gray-100 pt-3">
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 mb-3 border-emerald-600 border-2">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.user?.user_metadata?.displayName
                      ?.charAt(0)
                      .toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">
                    مرحباً
                  </span>
                  <span className="text-xs text-gray-600 truncate">
                    {user?.user?.user_metadata?.displayName}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  className="w-full text-right px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3 rounded-lg"
                  onClick={() => {
                    navigate("/account-info");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  الملف الشخصي
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
    </nav>
  );
}

export default Navbar;
