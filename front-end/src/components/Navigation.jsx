import { Home, BookOpenCheck, FileOutput, HelpCircle, Contact } from 'lucide-react'
import NavigationItem from './NavigationItem'

const menuItems = [
  {
    id: 0,
    text: "About us",
    link: "/",
    icon: <Home />
  },
  {
    id: 1,
    text: "Reservations",
    link: "future-reservations",
    icon: <BookOpenCheck />
  },
  {
    id: 2,
    text: "Reports",
    link: "reports",
    icon: <FileOutput />
  },
  {
    id: 3,
    text: "FAQ",
    link: "faq",
    icon: <HelpCircle />
  },
  {
    id: 4,
    text: "Contacts",
    link: "contacts",
    icon: <Contact />
  },
]

function Navigation() {
  return (
    <nav className="hidden md:block md:w-1/4 shrink-0 bg-background pt-8">
      <ul className="flex flex-col">
        {
          menuItems.map(menuItem => <NavigationItem key={menuItem.id} menuItem={menuItem} />)
        }
      </ul>
    </nav>
  )
}

export default Navigation