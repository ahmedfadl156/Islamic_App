import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../services/useUser';
import toast from 'react-hot-toast';

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // إذا انتهى التحميل ولا يوجد مستخدم مسجل
    if (!isLoading && !user?.user) {
      toast.error('يجب تسجيل الدخول أولاً للوصول إلى هذه الصفحة', {
        duration: 4000,
        style: {
          background: '#DC2626',
          color: '#fff',
          fontFamily: 'Amiri Quran',
          fontSize: '16px',
          padding: '16px',
          borderRadius: '8px',
        },
        icon: '🔒',
      });
      navigate('/login', { replace: true });
    }
  }, [user, isLoading, navigate]);

  // عرض شاشة التحميل أثناء التحقق من المستخدم
  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-xl font-semibold" style={{ fontFamily: 'Amiri Quran' }}>
            جاري التحقق من الحساب...
          </p>
        </div>
      </div>
    );
  }

  // إذا كان المستخدم مسجل، عرض المحتوى
  if (user?.user) {
    return children;
  }

  // في حالة عدم وجود مستخدم، لا نعرض شيء (سيتم التوجيه في useEffect)
  return null;
}
