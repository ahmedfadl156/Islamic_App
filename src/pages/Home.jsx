import { Link } from "react-router-dom"
import ZakrniCard from "../components/ZakrniCard"
import SectionsCards from "../components/SectionsCards"
import TestEmailConfirmation from "../components/TestEmailConfirmation"

function Home() {
  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 h-[60vh]">
        {/* الباك جراوند */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-repeat -z-10" data-id="element-20" style={{
          backgroundImage: "url('background.avif')",
          backgroundSize: "500px",
          mixBlendMode: "soft-light"
        }}></div>
        {/* الهيدر */}
        <div className="text flex flex-col justify-center items-center text-center h-full gap-7 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold">لا تفوّت صلاة بعد اليوم</h1>
          <p className="text-4xl text-teal-100 font-semibold">رفيقك الروحاني هنا معك</p>
          <p className="text-xl text-white font-semibold">ابقَ متصلاً بإيمانك مع مواقيت صلاة دقيقة، وقراءة القرآن، وإرشادات روحية.</p>
          <div className="buttons mt-10 flex flex-col md:flex-row gap-5 items-center">
            <Link to="/prayer-times" className="bg-white text-[#059669] px-10 py-4 rounded-lg font-semibold">اعرف مواقيت الصلاة</Link>
            <Link to="/quran" className="bg-transparent border border-white text-white px-10 py-4 rounded-lg font-semibold">اقرأ القرآن</Link>
          </div>
        </div>
      </div>
      <ZakrniCard />
      <SectionsCards />
    </>
  )
}

export default Home
