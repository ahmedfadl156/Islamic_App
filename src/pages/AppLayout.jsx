import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function AppLayout() {
  return (
    <main className="dark:bg-gray-800">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  )
}

export default AppLayout
