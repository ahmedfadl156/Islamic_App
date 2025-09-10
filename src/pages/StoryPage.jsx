import { useParams, useNavigate } from "react-router-dom";
import { useStory } from "../services/useStories";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function StoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { story, isLoadingStory, error } = useStory(id);

  if (isLoadingStory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-xl text-emerald-700 font-semibold">جاري تحميل القصة...</p>
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <p className="text-xl text-red-600 font-semibold mb-4">عذراً، لم نتمكن من العثور على القصة</p>
          <button
            onClick={() => navigate('/stories')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            العودة للقصص
          </button>
        </div>
      </div>
    );
  }

  const wordCount = story.content?.split(' ').length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  const getCategoryName = (category) => {
    const categories = {
      'prophets': 'قصص الأنبياء',
      'companions': 'قصص الصحابة',
      'wisdom': 'حكم وعبر',
      'islamic': 'قصص إسلامية'
    };
    return categories[category] || 'قصة إسلامية';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <Navbar />
      
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-16">
          <button
            onClick={() => navigate('/stories')}
            className="group flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>العودة للقصص</span>
          </button>

          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{getCategoryName(story.category)}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {story.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{readingTime} دقيقة قراءة</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>{story.content?.split(' ').length || 0} كلمة</span>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-400/20 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="prose prose-lg prose-emerald max-w-none">
              <div className="text-gray-800 leading-relaxed text-lg" style={{ lineHeight: '2', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {story.content?.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-6 text-justify">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>

          {story.lesson && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 md:p-12 border-t border-emerald-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-emerald-800 mb-4">العبر والدروس المستفادة</h3>
                  <div className="text-emerald-700 leading-relaxed">
                    {story.lesson?.split('\n').map((lesson, index) => (
                      lesson.trim() && (
                        <p key={index} className="mb-3">
                          {lesson}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {story.tafseer && (
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-8 md:p-12 border-t border-cyan-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-cyan-800 mb-4">التفسير والتحليل</h3>
                  <div className="text-cyan-700 leading-relaxed">
                    {story.tafseer?.split('\n').map((tafseer, index) => (
                      tafseer.trim() && (
                        <p key={index} className="mb-3">
                          {tafseer}
                        </p>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-12">
          <button
            onClick={() => navigate('/stories')}
            className="group flex items-center gap-3 bg-white/80 backdrop-blur-sm hover:bg-white text-emerald-700 hover:text-emerald-800 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">جميع القصص</span>
          </button>

          <div className="flex gap-3">
            <button className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              <span className="font-semibold">مشاركة</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default StoryPage;
