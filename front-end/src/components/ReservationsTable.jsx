import { useReservationData } from "../context/reservationDataContext"

const importantColumns = [
  "owner", "unit", "check-in", "check-out"
]

function ReservationsTable() {
  const { accessibleReservationRooms } = useReservationData()

  const importantReservationData = accessibleReservationRooms?.map(reservation => {
    const pureReservationInfo = {}

    importantColumns.forEach(column => {
      pureReservationInfo[column] = reservation[column]
    })

    return pureReservationInfo
  })

  return (
    <table className="w-full mb-4 border-separate border-spacing-y-2">
      <thead>
        <tr className="text-lg bg-accent text-background">
          {
            Object.keys(importantReservationData[0]).map((title, i) => <th className="py-2" key={`table-title-${i}`}>{title}</th>)
          }
        </tr>
      </thead>
      <tbody>
        {
          importantReservationData.map((reservationInfo, i) => (
            <tr className="bg-secondary text-center" key={`reservation-info-${i}`}>
              {
                Object.keys(reservationInfo).map((unit, i) => <td className="py-2" key={`unit-${i}`}>{reservationInfo[unit]}</td>)
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default ReservationsTable