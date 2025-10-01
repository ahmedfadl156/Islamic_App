import React from 'react';
import { FaCrown, FaStar, FaFire } from "react-icons/fa";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";

export default function TasksCompleted({ isOpen, onClose, completedCount, earnedPoints, currentLevel, currentStreak }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-gray-700 overflow-hidden">
          
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 py-8 text-center relative overflow-hidden">
            <div className="absolute top-2 left-2 text-emerald-200/30 text-6xl">۞</div>
            <div className="absolute bottom-2 right-2 text-emerald-200/30 text-6xl">۞</div>
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              aria-label="إغلاق"
            >
              <IoClose size={24} />
            </button>
            
            <div className="mb-4">
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <IoCheckmarkCircle className="text-4xl text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">مبروك! 🎉</h2>
            <p className="text-emerald-100 text-lg">لقد أكملت جميع مهامك اليوم</p>
          </div>
          
          <div className="p-6 space-y-6">
            
            <div className="text-center bg-emerald-50/80 dark:bg-gray-800/50 rounded-2xl p-4 border border-emerald-100/50 dark:border-gray-700/50">
              <p className="text-emerald-800 dark:text-emerald-200 font-semibold text-lg mb-2 font-arabic">
                "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا"
              </p>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                سورة الطلاق - آية 2
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center bg-white/70 dark:bg-gray-800/70 rounded-xl p-3 border border-emerald-100/50 dark:border-gray-700/50">
                <div className="text-emerald-600 text-2xl mb-1">
                  <IoCheckmarkCircle className="mx-auto" />
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">المهام</div>
                <div className="font-bold text-emerald-700 dark:text-emerald-300">{completedCount}</div>
              </div>
              
              <div className="text-center bg-white/70 dark:bg-gray-800/70 rounded-xl p-3 border border-emerald-100/50 dark:border-gray-700/50">
                <div className="text-yellow-500 text-2xl mb-1">
                  <FaStar className="mx-auto" />
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">النقاط</div>
                <div className="font-bold text-yellow-600 dark:text-yellow-400">+{earnedPoints}</div>
              </div>
              
              <div className="text-center bg-white/70 dark:bg-gray-800/70 rounded-xl p-3 border border-emerald-100/50 dark:border-gray-700/50">
                <div className="text-amber-500 text-2xl mb-1">
                  <FaCrown className="mx-auto" />
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">المستوى</div>
                <div className="font-bold text-amber-600 dark:text-amber-400">{currentLevel}</div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                بارك الله فيك! استمر على هذا الطريق المبارك
              </p>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                "إن الله لا يضيع أجر من أحسن عملاً"
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25"
              >
                الحمد لله 🤲
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
