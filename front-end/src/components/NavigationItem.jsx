import { NavLink } from "react-router-dom"

function NavigationItem({ menuItem }) {
  return (
    <li>
      <NavLink className="flex gap-4 w-full px-6 py-4 font-medium tracking-wide transition rounded-lg duration-300 hover:bg-secondary" to={menuItem.link}>
        {
          menuItem.icon
        }
        <span>{menuItem.text}</span>
      </NavLink>
    </li>
  )
}

export default NavigationItem