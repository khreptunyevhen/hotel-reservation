import { useState } from "react"
import { jsPDF } from "jspdf"
import autoTable from 'jspdf-autotable'
import { useReservationData } from "../context/reservationDataContext"
import { Link } from "react-router-dom"

const importantColumns = [
  "owner", "unit", "price", "owner email"
]

function Reports() {
  const [error, setError] = useState(null)
  const { reservationData } = useReservationData()

  const accessibleReservationRoom = reservationData?.filter(reservation => reservation.status !== "canceled")

  // TODO: fix error when click before upload file
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
      {
        reservationData ? <p>The file is uploaded! You can download your report!</p> : <p>No file is uploaded yet! You can upload <Link to="/">here</Link>.</p>
      }
    </section>
  )
}

export default Reports