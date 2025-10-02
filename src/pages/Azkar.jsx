import { useEffect, useState } from 'react'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import AzkarCard from "../components/AzkarCard"
import AzkarModal from "../components/AzkarModal"
import TasbihCounter from "../components/TasbihCounter"
import AzkarElsabah from "../services/AzkarElsabah"
import AzkarElMasaa from "../services/AzkarElmasaa"
import AzkarAfterPrayer from "../services/AzkarAfterPrayer"
import { getStories } from '../services/getStories'

function Azkar() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    azkarData: null,
    title: '',
    icon: '',
    gradient: ''
  })

  const openModal = (azkarData, title, icon, gradient) => {
    setModalState({
      isOpen: true,
      azkarData,
      title,
      icon,
      gradient
    })
  }

  const closeModal = () => {
    setModalState({
      isOpen: false,
      azkarData: null,
      title: '',
      icon: '',
      gradient: ''
    })
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-slate-900 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-6 mx-auto max-w-6xl py-20 px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-gray-200">الأذكار و التسبيح</h1>
        <p className="text-xl font-semibold dark:text-gray-300">أذكار الصباح والمساء وأذكار ما بعد الصلاة</p>
      </div>
      
      {/* Tasbih Counter Section */}
      <div className="mx-auto max-w-6xl px-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            المسبحة الإلكترونية
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            سبح الله واحصل على الأجر العظيم
          </p>
        </div>
        <TasbihCounter />
      </div>
      
      {/* Azkar Cards Section */}
      <div className="mx-auto max-w-6xl px-8 mb-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            مجموعة الأذكار
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            أذكار مختارة من السنة النبوية الشريفة
          </p>
        </div>
      </div>
      
      <div className="Azkar-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-6xl px-8 pb-20">
        <AzkarCard 
          title="أذكار الصباح"
          description="أذكار مباركة لبداية يوم جديد مليء بالبركة والخير والحماية من الله عز وجل"
          icon="🌅"
          gradient="bg-gradient-to-br from-amber-400 via-orange-500 to-red-500"
          textColor="text-white"
          count={AzkarElsabah.length}
          onClick={() => openModal(
            AzkarElsabah, 
            "أذكار الصباح", 
            "🌅", 
            "bg-gradient-to-br from-amber-400 via-orange-500 to-red-500"
          )}
        />
        
        <AzkarCard 
          title="أذكار المساء"
          description="أذكار مسائية مباركة لختام اليوم بالذكر والدعاء والاستغفار والحمد لله"
          icon="🌙"
          gradient="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600"
          textColor="text-white"
          count={AzkarElMasaa.length}
          onClick={() => openModal(
            AzkarElMasaa, 
            "أذكار المساء", 
            "🌙", 
            "bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600"
          )}
        />
        
        <AzkarCard 
          title="أذكار بعد الصلاة"
          description="أذكار مستجابة بعد كل صلاة للتقرب إلى الله والحصول على الأجر العظيم"
          icon="🕌"
          gradient="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600"
          textColor="text-white"
          count={AzkarAfterPrayer.length}
          onClick={() => openModal(
            AzkarAfterPrayer, 
            "أذكار بعد الصلاة", 
            "🕌", 
            "bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600"
          )}
        />
      </div>
      
      <AzkarModal 
        isOpen={modalState.isOpen}
        onClose={closeModal}
        azkarData={modalState.azkarData}
        title={modalState.title}
        icon={modalState.icon}
        gradient={modalState.gradient}
      />
      
      <Footer />
    </div>
  )
}

export default Azkar
