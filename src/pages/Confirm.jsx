import React, { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useEmailConfirmation } from '../services/useEmailConfirmation'

export default function Confirm() {
  const [searchParams] = useSearchParams()
  const { confirmationStatus, userEmail, countdown, handleEmailConfirmation } = useEmailConfirmation()
  
  useEffect(() => {
    handleEmailConfirmation(searchParams)
  }, [searchParams])

  const LoadingState = () => (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6 animate-pulse">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">جاري تأكيد البريد الإلكتروني...</h2>
      <p className="text-gray-600">يرجى الانتظار بينما نقوم بتأكيد حسابك</p>
    </div>
  )

  const SuccessState = () => (
    <div className="text-center">
      {/* Success Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6 animate-bounce">
        <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-4">تم تأكيد البريد الإلكتروني بنجاح! 🎉</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        مرحباً بك في التطبيق الإسلامي! تم تفعيل حسابك بنجاح ويمكنك الآن الاستفادة من جميع الميزات المتاحة.
      </p>

      {userEmail && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
          <p className="text-sm text-emerald-800">
            <span className="font-semibold">البريد المؤكد:</span> {userEmail}
          </p>
        </div>
      )}

      {/* العد التنازلي */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
        <p className="text-sm text-blue-800">
          سيتم توجيهك إلى الصفحة الرئيسية خلال <span className="font-bold text-lg">{countdown}</span> ثانية
        </p>
      </div>

      <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        <Link
          to="/login"
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
          </svg>
          تسجيل الدخول
        </Link>
        
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transform hover:scale-105 transition-all duration-200"
        >
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          الصفحة الرئيسية
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L20 9.27L14.18 13.97L15.64 20.73L12 17.27L8.36 20.73L9.82 13.97L4 9.27L10.91 8.26L12 2Z"/>
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">القرآن الكريم</h3>
          <p className="text-sm text-gray-600">اقرأ واستمع للقرآن الكريم بصوت أفضل القراء</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">أوقات الصلاة</h3>
          <p className="text-sm text-gray-600">تابع مواقيت الصلاة حسب موقعك الجغرافي</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">الأذكار والأدعية</h3>
          <p className="text-sm text-gray-600">مجموعة شاملة من الأذكار والأدعية اليومية</p>
        </div>
      </div>
    </div>
  )

  const ErrorState = () => (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-4">فشل في تأكيد البريد الإلكتروني</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        عذراً، لم نتمكن من تأكيد بريدك الإلكتروني. قد يكون الرابط منتهي الصلاحية أو غير صحيح.
      </p>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 max-w-md mx-auto text-right">
        <h3 className="font-semibold text-red-800 mb-3">الأسباب المحتملة:</h3>
        <ul className="text-sm text-red-700 space-y-2">
          <li>• انتهت صلاحية رابط التأكيد (24 ساعة)</li>
          <li>• تم استخدام الرابط من قبل</li>
          <li>• رابط غير صحيح أو تالف</li>
        </ul>
      </div>

      <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        <Link
          to="/register"
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          إنشاء حساب جديد
        </Link>
        
        <Link
          to="/login"
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-white text-emerald-600 font-semibold rounded-lg border-2 border-emerald-600 hover:bg-emerald-50 transform hover:scale-105 transition-all duration-200"
        >
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
          </svg>
          تسجيل الدخول
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L20 9.27L14.18 13.97L15.64 20.73L12 17.27L8.36 20.73L9.82 13.97L4 9.27L10.91 8.26L12 2Z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">التطبيق الإسلامي</h1>
          <p className="text-gray-600">رفيقك في الرحلة الإيمانية</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          {confirmationStatus === 'loading' && <LoadingState />}
          {confirmationStatus === 'success' && <SuccessState />}
          {confirmationStatus === 'error' && <ErrorState />}
        </div>
      </div>
    </div>
  )
}
