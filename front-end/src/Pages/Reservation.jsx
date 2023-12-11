import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import { useReservationData } from "../context/reservationDataContext"

const importantColumns = [
  "owner", "unit", "check-in", "check-out"
]

const BASE_URL = "http://localhost:7000/"

function Reservation() {
  const { accessibleReservationRooms } = useReservationData()
  const [error, setError] = useState(null)

  const importantReservationData = accessibleReservationRooms?.map(reservation => {
    const pureReservationInfo = {}

    importantColumns.forEach(column => {
      pureReservationInfo[column] = reservation[column]
    })

    return pureReservationInfo
  })

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
      console.log('Emails sent successfully!')

      // const response = await axios.post(`${BASE_URL}send-emails`, {
      //   emails: uniqueEmails,
      //   subject: 'Your Subject',
      //   body: 'Your Email Body',
      // });

      // if (response.data.success) {
      //   setError(null);
      //   console.log('Emails sent successfully!');
      // } else {
      //   setError('Unsuccessfully response');
      // }
    } catch (error) {
      console.error(error)
      setError('Failed to send emails')
    }
  };

  return (
    <section>
      <h2>Future reservation</h2>
      <div>
        {
          accessibleReservationRooms ? <table>
            <thead>
              <tr>
                {
                  Object.keys(importantReservationData[0]).map((title, i) => <th key={`table-title-${i}`}>{title}</th>)
                }
              </tr>
            </thead>
            <tbody>
              {
                importantReservationData.map((reservationInfo, i) => (
                  <tr key={`reservation-info-${i}`}>
                    {
                      Object.keys(reservationInfo).map((unit, i) => <td key={`unit-${i}`}>{reservationInfo[unit]}</td>)
                    }
                  </tr>
                ))
              }
            </tbody>
          </table> : <p>No file is uploaded yet! You can upload <Link to="/">here</Link>.</p>
        }
      </div>
      <button onClick={sendEmails} type="button">
        Send Emails
      </button>
      {error && <p>{error}</p>}
    </section>
  )
}

export default Reservation