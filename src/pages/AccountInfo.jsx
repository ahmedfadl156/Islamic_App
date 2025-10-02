import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase  from '../services/supabase'
import { useUpdate } from '../services/useUpdate'
import toast from 'react-hot-toast'
import { useProfile } from '../services/useProfile'

export default function AccountInfo() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const {update, isUpdating} = useUpdate();
    const {profile , isLoading , error: profileError} = useProfile();

    function handleUpdate(){
        if (!user || !user.user) {
            toast.error('لا توجد بيانات مستخدم للتحديث');
            return;
        }
        
        const userData = {
            name: user.user.user_metadata?.displayName || '', 
            email: user.user.email || '', 
            phone: user.user.user_metadata?.Phone || ''
        };
        
        if (!userData.name.trim() && !userData.email.trim() && !userData.phone.trim()) {
            toast.error('يرجى إدخال البيانات المطلوب تحديثها');
            return;
        }
        
        update(userData);
    }

    async function getUser(){
        try {
            setLoading(true)
            const {data: userData, error} = await supabase.auth.getUser() 
            if(error){
                console.log(error)
                setError(error.message)
                return
            }
            setUser(userData)
        } catch (err) {
            console.error('Error fetching user:', err)
            setError('حدث خطأ في تحميل بيانات المستخدم')
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        getUser()
    }, [])

  if (loading) {
    return (
      <div className='bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen py-8 flex items-center justify-center'>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-emerald-700 text-lg">جاري تحميل بيانات الحساب...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen py-8 flex items-center justify-center'>
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">خطأ في التحميل</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={getUser}
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    )
  }

  if (!user || !user.user) {
    return (
      <div className='bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen py-8 flex items-center justify-center'>
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <div className="text-gray-400 text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">لم يتم العثور على بيانات المستخدم</h2>
          <p className="text-gray-600 mb-6">يرجى تسجيل الدخول أولاً</p>
          <Link 
            to="/"
            className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors inline-block"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen py-8'>
      <div className="absolute inset-0 opacity-5 bg-repeat -z-10" style={{
        backgroundImage: "url('background.avif')",
        backgroundSize: "500px",
        mixBlendMode: "soft-light"
      }}></div>

      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-emerald-700 font-bold mb-4">معلومات الحساب</h1>
          <div className="flex items-center justify-center space-x-2 text-emerald-500">
            <div className="w-12 h-px bg-current"></div>
            <div className="text-xl">۞</div>
            <div className="w-12 h-px bg-current"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {(user.user.user_metadata?.displayName || user.user.email || 'مستخدم').charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {user.user.user_metadata?.displayName || user.user.email || 'مستخدم'}
                </h2>
                <p className="text-gray-600 mb-4">{user.user.email || 'لا يوجد بريد إلكتروني'}</p>
                
                <div className="bg-emerald-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-emerald-700">
                    <span className="font-semibold">عضو منذ:</span> {user.user.created_at ? new Date(user.user.created_at).toLocaleString() : 'غير محدد'}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">آخر تسجيل دخول:</span> {user.user.last_sign_in_at ? new Date(user.user.last_sign_in_at).toLocaleString() : 'غير محدد'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="ml-2">🛡️</span>
                حالة الحساب
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">البريد الإلكتروني</span>
                  <div className="flex items-center">
                    {user.user.user_metadata?.email_verified ? (
                      <>
                        <span className="text-green-500 text-xs ml-1">✓</span>
                        <span className="text-green-600 text-sm font-semibold">مُتحقق</span>
                      </>
                    ) : (
                      <>
                        <span className="text-red-500 text-xs ml-1">✗</span>
                        <span className="text-red-600 text-sm font-semibold">غير مُتحقق</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">رقم الهاتف</span>
                  <div className="flex items-center">
                    {user.user.user_metadata?.phone_verified ? (
                      <>
                        <span className="text-green-500 text-xs ml-1">✓</span>
                        <span className="text-green-600 text-sm font-semibold">مُتحقق</span>
                      </>
                    ) : (
                      <>
                        <span className="text-orange-500 text-xs ml-1">⚠</span>
                        <span className="text-orange-600 text-sm font-semibold">غير مُتحقق</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">نوع الحساب</span>
                  <span className="text-emerald-600 text-sm font-semibold">
                    {user.user.is_anonymous ? 'مجهول' : 'مُسجل'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="ml-2">👤</span>
                المعلومات الشخصية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم الكامل</label>
                  <input 
                    type="text" 
                    value={user.user.user_metadata?.displayName || ''}
                    className="w-full outline-none px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    onChange={(e) => setUser(prev => ({
                      ...prev, 
                      user: {
                        ...prev.user,
                        user_metadata: {
                          ...prev.user.user_metadata,
                          displayName: e.target.value
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={user.user.email || ''}
                      className="w-full outline-none px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors pr-10"
                      onChange={(e) => setUser(prev => ({
                        ...prev,
                        user: {
                          ...prev.user,
                          email: e.target.value
                        }
                      }))}
                    />
                    {user.user.user_metadata?.email_verified && (
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-green-500 text-sm">✓</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">رقم الهاتف</label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      value={user.user.user_metadata?.Phone || ''}
                      className="w-full outline-none py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors px-10"
                      onChange={(e) => setUser(prev => ({
                        ...prev,
                        user: {
                          ...prev.user,
                          user_metadata: {
                            ...prev.user.user_metadata,
                            Phone: e.target.value
                          }
                        }
                      }))}
                    />
                    {user.user.user_metadata?.phone_verified ? (
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-green-500 text-sm">✓</span>
                      </div>
                    ) : (
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <span className="text-orange-500 text-sm">⚠</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">معرف المستخدم</label>
                  <input 
                    type="text" 
                    value={user.user.id || ''}
                    className="w-full outline-none px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    readOnly
                  />
                  <p className="text-xs text-gray-500 mt-1">معرف فريد لا يمكن تغييره</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="ml-2">📊</span>
                إحصائيات الحساب
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {Math.floor((new Date() - new Date(user.user.created_at)) / (1000 * 60 * 60 * 24))}
                  </div>
                  <div className="text-sm text-emerald-700">يوم في التطبيق</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {profile?.longest_streak || 0} أيام
                  </div>
                  <div className="text-sm text-blue-700">أطول فترة استريك</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {user.user.user_metadata?.email_verified ? '✓' : '✗'}
                  </div>
                  <div className="text-sm text-purple-700">حالة التحقق</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {user.user.role === 'authenticated' ? "موثق" : "عادي"}
                  </div>
                  <div className="text-sm text-orange-700">نوع العضوية</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="ml-2">🔐</span>
                معلومات الأمان
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-lg ml-3">📧</span>
                    <div>
                      <p className="font-semibold text-gray-800">مقدم الخدمة</p>
                      <p className="text-sm text-gray-600">{user.user.app_metadata?.provider || 'غير محدد'}</p>
                    </div>
                  </div>
                  <span className="text-green-500 font-semibold">نشط</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-lg ml-3">🔑</span>
                    <div>
                      <p className="font-semibold text-gray-800">آخر تحديث للحساب</p>
                      <p className="text-sm text-gray-600">
                        {user.user.updated_at ? new Date(user.user.updated_at).toLocaleString() : 'غير محدد'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-lg ml-3">📱</span>
                    <div>
                      <p className="font-semibold text-gray-800">تأكيد الحساب</p>
                      <p className="text-sm text-gray-600">
                        {user.user.confirmed_at ? new Date(user.user.confirmed_at).toLocaleString() : 'غير مؤكد'}
                      </p>
                    </div>
                  </div>
                  {user.user.confirmed_at && <span className="text-green-500 font-semibold">مؤكد</span>}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="ml-2">🔗</span>
                الصفحات المتاحة
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  to="/" 
                  className="flex items-center p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors group"
                >
                  <span className="text-2xl ml-3 group-hover:scale-110 transition-transform">🏠</span>
                  <div>
                    <h4 className="font-semibold text-emerald-700">الرئيسية</h4>
                    <p className="text-sm text-emerald-600">العودة للصفحة الرئيسية</p>
                  </div>
                </Link>

                <Link 
                  to="/prayer-times" 
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                >
                  <span className="text-2xl ml-3 group-hover:scale-110 transition-transform">🕌</span>
                  <div>
                    <h4 className="font-semibold text-blue-700">مواقيت الصلاة</h4>
                    <p className="text-sm text-blue-600">أوقات الصلوات الخمس</p>
                  </div>
                </Link>

                <Link 
                  to="/quran" 
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                >
                  <span className="text-2xl ml-3 group-hover:scale-110 transition-transform">📖</span>
                  <div>
                    <h4 className="font-semibold text-green-700">القرآن الكريم</h4>
                    <p className="text-sm text-green-600">قراءة وتلاوة القرآن</p>
                  </div>
                </Link>

                <Link 
                  to="/azkar" 
                  className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
                >
                  <span className="text-2xl ml-3 group-hover:scale-110 transition-transform">📿</span>
                  <div>
                    <h4 className="font-semibold text-purple-700">الأذكار</h4>
                    <p className="text-sm text-purple-600">أذكار الصباح والمساء</p>
                  </div>
                </Link>

                <Link 
                  to="/stories" 
                  className="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group"
                >
                  <span className="text-2xl ml-3 group-hover:scale-110 transition-transform">📚</span>
                  <div>
                    <h4 className="font-semibold text-orange-700">القصص</h4>
                    <p className="text-sm text-orange-600">قصص الأنبياء والصحابة</p>
                  </div>
                </Link>

                <Link 
                  to="/bookmarks" 
                  className="flex items-center p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors group"
                >
                  <span className="text-2xl ml-3 group-hover:scale-110 transition-transform">🔖</span>
                  <div>
                    <h4 className="font-semibold text-teal-700">المحفوظات</h4>
                    <p className="text-sm text-teal-600">المحتوى المحفوظ</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
              <button 
                onClick={handleUpdate}
                disabled={isUpdating}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  isUpdating 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700'
                }`}
              >
                {isUpdating ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    جاري الحفظ...
                  </>
                ) : (
                  '💾 حفظ التغييرات'
                )}
              </button>
              
              <button 
                onClick={() => getUser()}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🔄 إعادة تحميل البيانات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
