import { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { useReservationData } from "../context/reservationDataContext"
import Title from '../components/Title'
import Notification from "../components/UI/Notification"
import { AlertTriangle } from 'lucide-react'
import Button from '../components/UI/Button'
import ReservationsTable from '../components/ReservationsTable'

const BASE_URL = "http://localhost:7000/"

function Reservation() {
  const { accessibleReservationRooms } = useReservationData()
  const [error, setError] = useState(null)

  const countUniqueUnits = [...new Set(accessibleReservationRooms.map(reservation => reservation.unit)
  )].length;

  const countUniqueOwners = [...new Set(accessibleReservationRooms.map(reservation => reservation.owner)
  )].length;

  console.log(accessibleReservationRooms[0]["check-out"] - accessibleReservationRooms[0]["check-in"]);

  // TODO: fix error when click before upload file
  const sendEmails = async () => {
    try {
      const uniqueEmails = Array.from(new Set(accessibleReservationRooms.map((reservation) => reservation['owner email'])))

      for (const email of uniqueEmails) {
        const ownerReservations = accessibleReservationRooms.filter(reservation => reservation["owner email"] === email).sort((a, b) => a.unit - b.unit)
        const units = [...new Set(ownerReservations.map(unit => unit.unit))]

        const subject = `Your ${units.length === 1 ? "unit" : "units"} ${units.join(", ")} ${units.length === 1 ? "has" : "have"} been reserved!`

        const body = ownerReservations.map(reservation => `Unit: ${reservation.unit} Check-in: ${reservation['check-in']} Check-out: ${reservation['check-out']}`).join("\n")

        await axios.post(`${BASE_URL}send-emails`, {
          email,
          subject,
          body,
        });
      }

      setError(null)
    } catch (error) {
      console.error(error)
      setError('Failed to send emails')
    }
  };

  return (
    <section>
      <Title>Future reservations</Title>
      <div className="p-4 bg-background rounded-lg mb-4">
        {
          accessibleReservationRooms ? <>
            <div className="flex items-center justify-between mb-4">
              <h2>Details</h2>
              <form>
                <select>
                  <option>all owners</option>
                  <option>options</option>
                </select>
                <input type="search" placeholder='🔎 search' />
              </form>
            </div>
            <ReservationsTable />
            <p className="flex items-center justify-between mb-0">
              <span>Showing 1 to X of X reservations</span>
              <span className="cursor-pointer">prev 1 ... X next</span>
            </p>
          </> : <Notification>
            <AlertTriangle className='text-red-500' />
            <p className='mb-0'>No file is uploaded yet! You can upload <Link className="underline font-medium hover:text-primary transition duration-300" to="/">here</Link>.</p>
          </Notification>
        }
      </div>
      {
        accessibleReservationRooms ? <div>
          <p>You can send owners emails with all the information they need!</p>
          <Button onClick={sendEmails} type="button">
            Send Emails
          </Button>
        </div> : null
      }
      {error && <p>{error}</p>}
    </section>
  )
}

export default Reservation