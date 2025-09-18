import Navbar from "../components/Navbar"
import BookmarkCard from "../components/BookmarkCard"
import { FaBookmark, FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useBookmarks } from "../services/useBookmarks"

export default function Bookmarks() {
    const {bookmarks = [], isLoading} = useBookmarks();

  if(isLoading){
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">جاري تحميل المرجعيات...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center gap-6 mx-auto max-w-6xl py-20 px-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
            <FaBookmark className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
            مرجعياتى
          </h1>
        </div>
        <p className="text-xl font-semibold text-gray-600 text-center max-w-3xl">
          هنا يمكنك اضافة أى أية من أى سورة توقفت عندها لترجع إليها في أي وقت
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-8 mb-8">
        <form className="relative">
          <div className="relative">
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="ابحث فى مرجعياتي (اسم المرجعية، السورة، أو النص)" 
              className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
            />
          </div>
          <button 
            type="submit"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            بحث
          </button>
        </form>
      </div>

      <div className="mx-auto max-w-6xl px-8 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            مرجعياتي ({bookmarks.length})
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.length > 0 ? (
                bookmarks.map((bookmark) => (
                    <BookmarkCard
                        key={bookmark.id}
                        bookmark={bookmark}
                        className="h-full"
                    />
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 px-8">
                    <div className="relative mb-8">
                        <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                            <div className="w-24 h-24 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full flex items-center justify-center">
                                <FaBookmark className="text-emerald-600 text-4xl" />
                            </div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full opacity-60"></div>
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full opacity-40"></div>
                        <div className="absolute top-1/2 -right-6 w-4 h-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full opacity-30"></div>
                    </div>

                    <h3 className="text-3xl font-bold text-gray-700 mb-4 text-center">
                        لا توجد مرجعيات محفوظة
                    </h3>
                    
                    <p className="text-lg text-gray-500 text-center max-w-md mb-8 leading-relaxed">
                        ابدأ رحلتك مع القرآن الكريم واحفظ آياتك المفضلة لتعود إليها في أي وقت
                    </p>

                    <Link to="/quran" className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                        <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>اذهب إلى القرآن الكريم</span>
                    </Link>

                    <div className="mt-12 flex items-center gap-4 opacity-30">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-300"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-300"></div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}
