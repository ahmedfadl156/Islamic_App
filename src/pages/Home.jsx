import { Link } from "react-router-dom"
import ZakrniCard from "../components/ZakrniCard"
import SectionsCards from "../components/SectionsCards"

function Home() {
  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-gray-900 dark:to-slate-900 h-[60vh]">
        {/* الباك جراوند */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-repeat -z-10" data-id="element-20" style={{
          backgroundImage: "url('background.avif')",
          backgroundSize: "500px",
          mixBlendMode: "soft-light"
        }}></div>
        {/* الهيدر */}
        <div className="text flex flex-col justify-center items-center text-center h-full gap-7 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white dark:text-gray-100 font-bold">لا تفوّت صلاة بعد اليوم</h1>
          <p className="text-4xl text-teal-100 dark:text-gray-300 font-semibold">رفيقك الروحاني هنا معك</p>
          <p className="text-xl text-white dark:text-gray-200 font-semibold">ابقَ متصلاً بإيمانك مع مواقيت صلاة دقيقة، وقراءة القرآن، وإرشادات روحية.</p>
          <div className="buttons mt-10 flex flex-col md:flex-row gap-5 items-center">
            <Link to="/prayer-times" className="bg-white dark:bg-gray-800 text-[#059669] dark:text-emerald-400 px-10 py-4 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">اعرف مواقيت الصلاة</Link>
            <Link to="/quran" className="bg-transparent border border-white dark:border-gray-300 text-white dark:text-gray-200 px-10 py-4 rounded-lg font-semibold hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors">اقرأ القرآن</Link>
          </div>
        </div>
      </div>
      <ZakrniCard />
      <SectionsCards />
    </>
  )
}

export default Home
