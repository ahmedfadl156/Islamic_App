import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from './supabase'
import toast from 'react-hot-toast'

export function useEmailConfirmation() {
  const [confirmationStatus, setConfirmationStatus] = useState('loading')
  const [userEmail, setUserEmail] = useState('')
  const [countdown, setCountdown] = useState(3)
  const navigate = useNavigate()

  const handleEmailConfirmation = async (searchParams) => {
    try {
      // أولاً: التحقق من وجود access_token و refresh_token في URL parameters
      const accessToken = searchParams.get('access_token')
      const refreshToken = searchParams.get('refresh_token')
      
      // ثانياً: التحقق من وجود token_hash في URL hash
      const urlHash = window.location.hash
      const hashParams = new URLSearchParams(urlHash.substring(1))
      const hashAccessToken = hashParams.get('access_token')
      const hashRefreshToken = hashParams.get('refresh_token')
      
      console.log('URL Parameters:', { accessToken, refreshToken })
      console.log('Hash Parameters:', { hashAccessToken, hashRefreshToken })
      
      // استخدام التوكنز من URL parameters أو hash
      const finalAccessToken = accessToken || hashAccessToken
      const finalRefreshToken = refreshToken || hashRefreshToken
      
      if (finalAccessToken && finalRefreshToken) {
        console.log('Setting session with tokens...')
        
        // تعيين الجلسة باستخدام التوكنز
        const { data, error } = await supabase.auth.setSession({
          access_token: finalAccessToken,
          refresh_token: finalRefreshToken
        })
        
        if (error) {
          console.error('خطأ في تعيين الجلسة:', error)
          setConfirmationStatus('error')
          toast.error('حدث خطأ أثناء تأكيد البريد الإلكتروني: ' + error.message)
          return
        }
        
        if (data?.user) {
          console.log('User confirmed successfully:', data.user.email)
          setUserEmail(data.user.email)
          setConfirmationStatus('success')
          toast.success('تم تأكيد البريد الإلكتروني بنجاح!')
          
          // بدء العد التنازلي
          startCountdown()
        } else {
          console.error('No user data received')
          setConfirmationStatus('error')
        }
      } else {
        // محاولة الحصول على الجلسة الحالية (في حالة كان المستخدم مسجل دخول بالفعل)
        console.log('No tokens found, checking current session...')
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('خطأ في الحصول على الجلسة:', error)
          setConfirmationStatus('error')
          toast.error('حدث خطأ أثناء التحقق من الجلسة')
          return
        }
        
        if (data?.session?.user && data.session.user.email_confirmed_at) {
          console.log('User already confirmed:', data.session.user.email)
          setUserEmail(data.session.user.email)
          setConfirmationStatus('success')
          toast.success('البريد الإلكتروني مؤكد بالفعل!')
          startCountdown()
        } else {
          console.log('No valid session or unconfirmed email')
          setConfirmationStatus('error')
        }
      }
    } catch (error) {
      console.error('خطأ في تأكيد البريد الإلكتروني:', error)
      setConfirmationStatus('error')
      toast.error('حدث خطأ أثناء تأكيد البريد الإلكتروني')
    }
  }

  // دالة العد التنازلي
  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return {
    confirmationStatus,
    userEmail,
    countdown,
    handleEmailConfirmation
  }
}
