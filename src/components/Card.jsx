import { IoTimeOutline } from "react-icons/io5";
import { LuBookOpen } from "react-icons/lu";
import { FaQuran } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: <IoTimeOutline />,
    title: "مواقيت الصلاة",
    subtitle: "احصل على مواقيت الصلاة الدقيقة حسب موقعك الجغرافي مع التنبيهات الذكية",
    linkText: "استكشف المواقيت",
    link: "/prayer-times",
    gradient: "from-blue-500 via-purple-500 to-indigo-600",
    bgPattern: "bg-gradient-to-br from-blue-50 to-purple-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600"
  },
  {
    icon: <LuBookOpen />,
    title: "القرآن الكريم",
    subtitle: "اقرأ واستمع للقرآن الكريم بأصوات أشهر القراء مع التفسير والترجمة",
    linkText: "ابدأ القراءة",
    link: "/quran",
    gradient: "from-emerald-500 via-teal-500 to-green-600",
    bgPattern: "bg-gradient-to-br from-emerald-50 to-teal-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600"
  },
  {
    icon: <FaQuran />,
    title: "التفسير والتدبر",
    subtitle: "تعمق في فهم آيات القرآن الكريم مع تفاسير علماء الأمة المعتبرين",
    linkText: "اكتشف المعاني",
    link: "/tafsir",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    bgPattern: "bg-gradient-to-br from-amber-50 to-orange-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600"
  },
]

function Card() {
  return (
    <>
      {sections.map((section, index) => (
        <div key={index} className="group relative">
          <div className={`relative overflow-hidden rounded-2xl ${section.bgPattern} backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1`}>
            
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
            
            <div className="relative p-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 ${section.iconBg} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6`}>
                <div className={`text-3xl ${section.iconColor} group-hover:scale-125 transition-transform duration-300`}>
                  {section.icon}
                </div>
              </div>
              
              <div className={`absolute top-4 right-4 w-4 h-4 bg-gradient-to-r ${section.gradient} rounded-full opacity-60 animate-pulse group-hover:animate-ping`}></div>
            </div>
            
            <div className="px-8 pb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">
                {section.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-8 text-sm line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                {section.subtitle}
              </p>
              
              <Link to={section.link} className="block">
                <div className={`relative overflow-hidden bg-gradient-to-r ${section.gradient} rounded-xl p-4 text-white font-semibold text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group-hover:scale-110`}>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <span className="text-lg">{section.linkText}</span>
                    <HiArrowLeft className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </div>
              </Link>
            </div>
            
            <div className={`absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br ${section.gradient} opacity-10 rounded-full blur-xl group-hover:opacity-20 group-hover:scale-150 transition-all duration-500`}></div>
            <div className={`absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr ${section.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 group-hover:scale-125 transition-all duration-700`}></div>
          </div>
          
          <div className={`absolute inset-0 rounded-2xl ${section.bgPattern} opacity-20 blur-xl scale-105 -z-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500`}></div>
        </div>
      ))}
    </>
  )
}

export default Card
