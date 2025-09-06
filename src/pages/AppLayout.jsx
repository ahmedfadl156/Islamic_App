import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function AppLayout() {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  )
}

export default AppLayout
