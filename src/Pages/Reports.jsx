import { useState } from "react"
import { jsPDF } from "jspdf"
import autoTable from 'jspdf-autotable'
import { useReservationData } from "../context/reservationDataContext"

const importantColumns = [
  "owner", "unit", "price", "owner email"
]

function Reports() {
  const [error, setError] = useState(null)
  const { reservationData } = useReservationData()

  const accessibleReservationRoom = reservationData?.filter(reservation => reservation.status !== "canceled")

  function generatePDF() {
    const report = new jsPDF()

    report.text(`Hello ${"main"}!`, 20, 20)

    report.autoTable({
      head: [importantColumns.map(header => header)],
      body: accessibleReservationRoom.map(row =>
        importantColumns.map(col => row[col])
      ),
      startY: 40,
    })

    if (reservationData) {
      report.save(`${"main"}-report.pdf`)
      setError(null)
    } else {
      setError("Check your an excel file!")
    }
  }

  return (
    <section>
      <h2>Reports</h2>
      <button onClick={generatePDF} type="button">Download report</button>
      {
        error ? <p>{error}</p> : null
      }
    </section>
  )
}

export default Reports