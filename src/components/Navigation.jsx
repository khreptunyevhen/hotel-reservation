import { NavLink } from "react-router-dom"

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">About us</NavLink>
        </li>
        <li>
          <NavLink to="future-reservation">Future reservation</NavLink>
        </li>
        <li>
          <NavLink to="reports">Reports</NavLink>
        </li>
        <li>
          <NavLink to="faq">FAQ</NavLink>
        </li>
        <li>
          <NavLink to="contacts">Contacts</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation