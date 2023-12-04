import { useReservationData } from "../context/reservationDataContext"

const importantColumns = [
  "owner", "unit", "check-in", "check-out"
]

function Reservation() {
  const { reservationData } = useReservationData()

  const accessibleReservationRoom = reservationData?.filter(reservation => reservation.status !== "canceled")

  const importantReservationData = accessibleReservationRoom?.map(reservation => {
    const pureReservationInfo = {}

    importantColumns.forEach(column => {
      pureReservationInfo[column] = reservation[column]
    })

    return pureReservationInfo
  })

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
          </table> : <p>No file is uploaded yet!</p>
        }
      </div>
    </section>
  )
}

export default Reservation