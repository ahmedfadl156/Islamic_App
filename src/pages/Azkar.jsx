import { useState } from 'react'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import AzkarCard from "../components/AzkarCard"
import AzkarModal from "../components/AzkarModal"
import AzkarElsabah from "../services/AzkarElsabah"
import AzkarElMasaa from "../services/AzkarElmasaa"
import AzkarAfterPrayer from "../services/AzkarAfterPrayer"

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
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-6 mx-auto max-w-6xl py-20 px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">الأذكار</h1>
        <p className="text-xl font-semibold">أذكار الصباح والمساء وأذكار ما بعد الصلاة</p>
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
