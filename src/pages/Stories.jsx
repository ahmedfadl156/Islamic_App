import { useState, useMemo } from "react";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import StoryCard from "../components/StoryCard";
import { useStories } from "../services/useStories"

function Stories() {
  const {stories , isLoadingStories , error} = useStories();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  const filteredAndSortedStories = useMemo(() => {
    let filtered = stories;

    if (search.trim()) {
      filtered = filtered.filter(story => 
        story.title?.toLowerCase().includes(search.toLowerCase()) ||
        story.content?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(story => story.category === selectedCategory);
    }

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'title':
            return (a.title || '').localeCompare(b.title || '', 'ar');
          case 'category':
            return (a.category || '').localeCompare(b.category || '');
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [stories, search, selectedCategory, sortBy]);

  if (isLoadingStories) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-6 mx-auto max-w-6xl py-20 px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          قصص و عبر يومية
        </h1>
        <p className="text-xl font-semibold text-gray-500">
          استمتع بقراءة قصص من حياة الأنبياء وعبر يومية
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-8 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="ابحث في القصص..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl py-3 pr-10 pl-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl"
            />
          </div>

          <div className="relative">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-6 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl appearance-none cursor-pointer min-w-[200px]"
            >
              <option value="">جميع الفئات</option>
              <option value="prophets">قصص الأنبياء</option>
              <option value="companions">قصص الصحابة</option>
              <option value="religious_lessons">دروس دينية</option>
              <option value="islamic_history">التاريخ الإسلامي</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl py-3 px-6 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl appearance-none cursor-pointer min-w-[180px]"
            >
              <option value="">الترتيب</option>
              <option value="title">حسب العنوان</option>
              <option value="category">حسب الفئة</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <section className="stories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-10 mx-auto max-w-6xl px-8">
        {filteredAndSortedStories.length > 0 ? (
          filteredAndSortedStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">لا توجد قصص</h3>
            <p className="text-gray-500">
              {search || selectedCategory ? 
                'لم نجد قصص تطابق البحث المحدد. جرب تغيير معايير البحث.' : 
                'لا توجد قصص متاحة حالياً.'
              }
            </p>
            {(search || selectedCategory || sortBy) && (
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('');
                  setSortBy('');
                }}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                إعادة تعيين البحث
              </button>
            )}
          </div>
        )}
      </section>
      <Footer />
    </div>
  )
}

export default Stories
