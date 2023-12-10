import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import { useReservationData } from "../context/reservationDataContext"

const importantColumns = [
  "owner", "unit", "check-in", "check-out"
]

const BASE_URL = "http://localhost:7000/"

function Reservation() {
  const { reservationData } = useReservationData()
  const [error, setError] = useState(null)

  const accessibleReservationRoom = reservationData?.filter(reservation => reservation.status !== "canceled")

  const importantReservationData = accessibleReservationRoom?.map(reservation => {
    const pureReservationInfo = {}

    importantColumns.forEach(column => {
      pureReservationInfo[column] = reservation[column]
    })

    return pureReservationInfo
  })

  // TODO: fix error when click before upload file
  const sendEmails = async () => {
    try {
      const emailAddresses = Array.from(new Set(reservationData.map((reservation) => reservation['owner email'])));

      const response = await axios.post(`${BASE_URL}send-emails`, {
        emails: emailAddresses,
        subject: 'Your Subject',
        body: 'Your Email Body',
      });

      if (response.data.success) {
        setError(null);
        console.log('Emails sent successfully!');
      } else {
        setError('Unsuccessfully response');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to send emails');
    }
  };

  return (
    <section>
      <h2>Future reservation</h2>
      <div>
        {
          reservationData ? <table>
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