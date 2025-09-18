import { useNavigate } from 'react-router-dom';

function StoryCard({ story }) {
  const navigate = useNavigate();

  const handleReadStory = () => {
    navigate(`/story/${story.id}`);
  };

  const preview = story.content?.substring(0, 150) + (story.content?.length > 150 ? '...' : '');
  
  const wordCount = story.content?.split(' ').length || 0;
  const readingTime = Math.ceil(wordCount / 200); 

  const getCategoryStyle = (category) => {
    const categories = {
      'prophets': {
        gradient: 'from-green-400 via-emerald-500 to-teal-600',
        hoverGradient: 'from-green-400/20 via-emerald-500/20 to-teal-600/20',
        iconGradient: 'from-green-400 to-emerald-600',
        buttonGradient: 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
        name: 'قصص الأنبياء',
        icon: (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      },
      'companions': {
        gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
        hoverGradient: 'from-emerald-400/20 via-teal-500/20 to-cyan-600/20',
        iconGradient: 'from-emerald-400 to-teal-600',
        buttonGradient: 'from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700',
        name: 'قصص الصحابة',
        icon: (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        )
      },
      'religious_lessons': {
        gradient: 'from-teal-400 via-cyan-500 to-emerald-600',
        hoverGradient: 'from-teal-400/20 via-cyan-500/20 to-emerald-600/20',
        iconGradient: 'from-teal-400 to-cyan-600',
        buttonGradient: 'from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700',
        name: 'دروس دينية',
        icon: (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        )
      },
      'islamic_history': {
        gradient: 'from-cyan-400 via-teal-500 to-green-600',
        hoverGradient: 'from-cyan-400/20 via-teal-500/20 to-green-600/20',
        iconGradient: 'from-cyan-400 to-teal-600',
        buttonGradient: 'from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700',
        name: 'التاريخ الإسلامي',
        icon: (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
          </svg>
        )
      }
    };
    
    return categories[category] || categories['prophets'];
  };

  const categoryStyle = getCategoryStyle(story.category);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-white/15">
      <div className={`absolute inset-0 bg-gradient-to-br ${categoryStyle.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className={`absolute inset-0 bg-gradient-to-br ${categoryStyle.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className="relative p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight">
              {story.title}
            </h3>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {readingTime} دقيقة
              </span>
              <span className="w-1 h-1 bg-white/50 rounded-full"></span>
              <span>{categoryStyle.name}</span>
            </div>
          </div>
          <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${categoryStyle.iconGradient} flex items-center justify-center shadow-lg`}>
            {categoryStyle.icon}
          </div>
        </div>

        <div className="flex-1 mb-6">
          <p className="text-white/90 leading-relaxed line-clamp-4 text-sm">
            {preview}
          </p>
        </div>

        <button
          onClick={handleReadStory}
          className={`group/btn w-full bg-gradient-to-r ${categoryStyle.buttonGradient} cursor-pointer text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2`}
        >
          <span>اقرأ القصة كاملة</span>
          <svg 
            className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-emerald-400/20 to-transparent rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-700"></div>
    </div>
  );
}

export default StoryCard;
