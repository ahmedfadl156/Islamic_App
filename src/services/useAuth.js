import { useState, useEffect } from 'react'
import supabase from './supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // الحصول على الجلسة الحالية
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // الاستماع لتغييرات المصادقة
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, session?.user?.email)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}

// دالة للتحقق من تأكيد البريد الإلكتروني
export function useEmailConfirmationStatus() {
  const { user } = useAuth()
  
  return {
    isEmailConfirmed: user?.email_confirmed_at !== null,
    user
  }
}
