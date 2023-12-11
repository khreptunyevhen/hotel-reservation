import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Navigation from "./Navigation"

function Layout() {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  function handleOpenMenu() {
    setIsOpenMenu(isOpen => !isOpen)
  }

  return (
    <>
      <Header isOpenMenu={isOpenMenu} onHandleOpenMenu={handleOpenMenu} />
      <div className="flex gap-4 container px-4 mx-auto">
        <Navigation isOpenMenu={isOpenMenu} />
        <main className="bg-secondary w-full py-8 px-4">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Layout