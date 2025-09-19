import React, { useState } from 'react'
import { FaBook, FaTrash, FaExternalLinkAlt, FaCopy, FaCheck } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { navigateAndScrollToAyah } from '../utils/navigation'
import { useDeleteBookmark } from '../services/useDeleteBookmark'

export default function BookmarkCard({ bookmark}) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const {deleteBookmark , isDeleting} = useDeleteBookmark()

  function handleDeleteBookmark() {
    deleteBookmark(bookmark.id)
  }
  const handleCopyAyah = async () => {
    try {
      await navigator.clipboard.writeText(bookmark.ayah_text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleNavigateToAyah = () => {
    navigateAndScrollToAyah(
      bookmark.surah_number, 
      bookmark.ayah_number_in_surah, 
      navigate
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden`}>
      <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-emerald-600">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="50" cy="50" r="10" fill="currentColor"/>
        </svg>
      </div>

      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
              <FaBook className="text-white text-sm" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg leading-tight dark:text-gray-200">
                {bookmark.bookmark_name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <MdLocationOn className="text-emerald-600 text-sm" />
                <span className="text-emerald-600 font-semibold text-sm dark:text-emerald-200">
                  سورة {bookmark.surah_name} - آية {bookmark.ayah_number_in_surah}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold border border-emerald-200">
            {bookmark.surah_number}
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-4 border-r-4 border-emerald-500 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-gray-800 text-lg leading-relaxed font-arabic text-right dark:text-black">
            {bookmark.ayah_text}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4 dark:text-gray-300">
          <span>تم الحفظ في: {formatDate(bookmark.created_at)}</span>
          <div className="h-1 w-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="flex gap-2">
          <button
            onClick={handleNavigateToAyah}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <FaExternalLinkAlt className="text-sm" />
            <span>اذهب للآية</span>
          </button>

          <button
            onClick={handleCopyAyah}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {copied ? <FaCheck className="text-sm" /> : <FaCopy className="text-sm" />}
            <span className="hidden sm:inline">{copied ? 'تم النسخ' : 'نسخ'}</span>
          </button>

          <button
            onClick={handleDeleteBookmark}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg ${
              isDeleting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700'
            }`}
          >
            <FaTrash className="text-sm" />
            <span className="hidden sm:inline">{isDeleting ? 'جاري الحذف...' : 'حذف'}</span>
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}
