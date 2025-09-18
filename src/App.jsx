import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Analytics } from '@vercel/analytics/react'
import AppLayout from "./pages/AppLayout"
import PrayerTimes from "./pages/PrayerTimes"
import Quran from "./pages/Quran"
import Home from "./pages/Home"
import Azkar from "./pages/Azkar"
import Stories from "./pages/Stories"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import StoryPage from "./pages/StoryPage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Bookmarks from "./pages/Bookmarks"
import toast, { Toaster } from 'react-hot-toast';
import Confirm from "./pages/Confirm";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/home" element={<Home />} />
      <Route path="/prayer-times" element={<PrayerTimes />} />
      <Route path="/quran" element={<Quran />} />
      <Route path="/azkar" element={<Azkar />} />
      <Route path="/stories" element={<Stories />} />
      <Route path="/story/:id" element={<StoryPage />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/confirm" element={<Confirm />} />
    </Routes>
    </BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
    <Analytics />
    </QueryClientProvider>
  )
}

export default App
