import React, { useState } from 'react';
import { IoClose, IoCheckmarkCircle, IoArrowForward, IoArrowBack, IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { FaStar, FaCrown, FaFire, FaPlus, FaTasks } from "react-icons/fa";

export default function PlannerGuide({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: "مرحباً بك في المخطط الإسلامي! 🌟",
      content: (
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            المخطط هو رفيقك اليومي لتنظيم العبادات والأعمال الصالحة
          </p>
          <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-4 border border-emerald-200 dark:border-gray-700">
            <p className="text-emerald-800 dark:text-emerald-200 font-semibold">
              "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا"
            </p>
            <p className="text-emerald-600 dark:text-emerald-400 text-sm mt-1">
              سورة الطلاق - آية 2
            </p>
          </div>
        </div>
      )
    },
    {
      title: "إضافة المهام 📝",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-emerald-100 dark:bg-gray-800 rounded-full p-4">
              <FaPlus className="text-3xl text-emerald-600" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
              <p className="text-gray-700 dark:text-gray-300">اضغط على زر "إضافة مهمة جديدة"</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
              <p className="text-gray-700 dark:text-gray-300">اكتب اسم المهمة (مثل: صلاة الفجر، قراءة القرآن)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
              <p className="text-gray-700 dark:text-gray-300">اختر التصنيف والوصف</p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-3 border border-blue-200 dark:border-gray-700">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              💡 <strong>نصيحة:</strong> يمكنك أيضاً اختيار من المهام المقترحة الجاهزة!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "إكمال المهام ✅",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-emerald-100 dark:bg-gray-800 rounded-full p-4">
              <IoCheckmarkCircle className="text-3xl text-emerald-600" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300 text-center">
              لإكمال مهمة، اضغط على الدائرة بجانب اسم المهمة
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <IoCheckmarkCircle className="text-2xl text-emerald-600" />
                <div>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300 line-through">صلاة الفجر في وقتها</span>
                  <div className="text-sm text-gray-600 dark:text-gray-400">مهمة مكتملة</div>
                </div>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 ml-auto">+25 نقطة</span>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-gray-800 rounded-xl p-3 border border-yellow-200 dark:border-gray-700">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              ⚠️ <strong>تذكر:</strong> يمكنك إلغاء الإكمال بالضغط مرة أخرى على نفس الدائرة
            </p>
          </div>
        </div>
      )
    },
    {
      title: "نظام النقاط ⭐",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-yellow-100 dark:bg-gray-800 rounded-full p-4">
              <FaStar className="text-3xl text-yellow-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <FaStar className="text-yellow-500" />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">النقاط</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">كل مهمة لها نقاط (10-30 نقطة)</div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <FaCrown className="text-amber-500" />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">المستوى</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">كل 100 نقطة = مستوى جديد</div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <FaFire className="text-red-500" />
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">الاستريك</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">الأيام المتتالية لإكمال المهام</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "نظام الاستريك 🔥",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-100 dark:bg-gray-800 rounded-full p-4">
              <FaFire className="text-3xl text-red-500" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300 text-center font-semibold">
              كيف يعمل الاستريك؟
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 bg-green-50 dark:bg-gray-800 rounded-lg p-3">
                <span className="text-green-600">✅</span>
                <span className="text-gray-700 dark:text-gray-300">كمل مهمة اليوم → الاستريك +1</span>
              </div>
              <div className="flex items-center gap-3 bg-green-50 dark:bg-gray-800 rounded-lg p-3">
                <span className="text-green-600">🔥</span>
                <span className="text-gray-700 dark:text-gray-300">كمل مهمة غداً → الاستريك +1</span>
              </div>
              <div className="flex items-center gap-3 bg-red-50 dark:bg-gray-800 rounded-lg p-3">
                <span className="text-red-600">❌</span>
                <span className="text-gray-700 dark:text-gray-300">فوت يوم → الاستريك = 0</span>
              </div>
            </div>
          </div>
          <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-3 border border-emerald-200 dark:border-gray-700">
            <p className="text-emerald-800 dark:text-emerald-200 text-sm text-center">
              🎯 <strong>الهدف:</strong> حافظ على استريك طويل للاستمرارية في العبادة!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "مودل التهنئة 🎉",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-purple-100 dark:bg-gray-800 rounded-full p-4">
              <FaTasks className="text-3xl text-purple-600" />
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300 text-center">
              عند إكمال جميع المهام اليومية، ستحصل على:
            </p>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-4 text-white text-center">
              <div className="text-2xl mb-2">🎉</div>
              <div className="font-bold text-lg mb-1">مبروك!</div>
              <div className="text-emerald-100">لقد أكملت جميع مهامك اليوم</div>
              <div className="mt-3 text-sm bg-white/20 rounded-lg p-2">
                آية قرآنية + إحصائياتك + رسالة تحفيزية
              </div>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-3 border border-blue-200 dark:border-gray-700">
            <p className="text-blue-800 dark:text-blue-200 text-sm text-center">
              💫 المودل يظهر مرة واحدة فقط عند إكمال جميع المهام
            </p>
          </div>
        </div>
      )
    },
    {
      title: "نصائح للنجاح 💡",
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">🌟</div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              نصائح لتحقيق أقصى استفادة
            </h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-emerald-500 text-xl">🎯</span>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">ابدأ بالمهام الصغيرة</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">مثل الأذكار والدعاء قبل المهام الكبيرة</div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-blue-500 text-xl">⏰</span>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">حدد أوقات ثابتة</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">اجعل لكل عبادة وقت محدد في يومك</div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-purple-500 text-xl">🔄</span>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200">الاستمرارية أهم من الكمية</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">مهمة واحدة يومياً أفضل من 10 مهام أسبوعياً</div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-emerald-50 dark:bg-gray-800 rounded-xl p-4 border border-emerald-200 dark:border-gray-700 text-center">
            <p className="text-emerald-800 dark:text-emerald-200 font-semibold mb-2">
              "إن أحب الأعمال إلى الله أدومها وإن قل"
            </p>
            <p className="text-emerald-600 dark:text-emerald-400 text-sm">
              حديث شريف
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={handleClose}
      ></div>
      
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-gray-700 overflow-hidden">
          
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 py-6 text-center relative">
            <div className="absolute top-2 left-2 text-emerald-200/30 text-4xl">۞</div>
            <div className="absolute bottom-2 right-2 text-emerald-200/30 text-4xl">۞</div>
            
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              aria-label="إغلاق"
            >
              <IoClose size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-2">دليل المخطط الإسلامي</h2>
            <p className="text-emerald-100">تعلم كيفية استخدام المخطط بفعالية</p>
            
            <div className="flex justify-center mt-4 space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
              {steps[currentStep].title}
            </h3>
            
            <div className="min-h-[300px]">
              {steps[currentStep].content}
            </div>
          </div>
          
          <div className="px-6 pb-6">
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-gray-800'
                }`}
              >
                <IoArrowForwardCircle />
                السابق
              </button>
              
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentStep + 1} من {steps.length}
              </span>
              
              {currentStep === steps.length - 1 ? (
                <button
                  onClick={handleClose}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25"
                >
                  ابدأ الآن! 🚀
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200"
                >
                  التالي
                  <IoArrowBackCircle />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
