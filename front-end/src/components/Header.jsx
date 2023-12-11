import { Link } from "react-router-dom"
import { AlignRight, X } from 'lucide-react'

function Header({ isOpenMenu, onHandleOpenMenu }) {
  return (
    <header className="py-8 max-h-28 shadow-xl bg-background relative">
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link to="/">
          <img src="/images/logo.svg" alt="werfy - we rent for you" />
        </Link>
        <button className="z-50 relative" onClick={onHandleOpenMenu}>
          {
            isOpenMenu ? <X className="h-10 w-10 md:hidden" /> : <AlignRight className="h-10 w-10 md:hidden" />
          }
        </button>
      </div>
    </header>
  )
}

export default Header