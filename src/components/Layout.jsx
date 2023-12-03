import { Outlet } from "react-router-dom"
import Header from "./Header"
import Navigation from "./Navigation"
import Footer from "./Footer"

function Layout() {
  return (
    <div className="container px-4 mx-auto grid grid-cols-1 grid-rows-[auto_auto_1fr_auto] min-h-screen md:grid-cols-2 md:grid-rows-[auto_1fr_auto]">
      <Header />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout