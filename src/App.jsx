import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./pages/AppLayout"
import PrayerTimes from "./pages/PrayerTimes"
import Quran from "./pages/Quran"
import Home from "./pages/Home"
import Azkar from "./pages/Azkar"

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/home" element={<Home />} />
      <Route path="/prayer-times" element={<PrayerTimes />} />
      <Route path="/quran" element={<Quran />} />
      <Route path="/azkar" element={<Azkar />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
