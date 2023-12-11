import { useState } from "react"
import { jsPDF } from "jspdf"
import autoTable from 'jspdf-autotable'
import { useReservationData } from "../context/reservationDataContext"
import { Link } from "react-router-dom"
import Title from "../components/Title"

const importantColumns = [
  "owner", "unit", "price", "owner email"
]

function Reports() {
  const [error, setError] = useState(null)
  const { accessibleReservationRooms } = useReservationData()

  // TODO: fix error when click before upload file
  function generatePDF() {
    const report = new jsPDF()

    report.text(`Hello ${"main"}!`, 20, 20)

    report.autoTable({
      head: [importantColumns.map(header => header)],
      body: accessibleReservationRooms.map(row =>
        importantColumns.map(col => row[col])
      ),
      startY: 40,
    })

    if (accessibleReservationRooms) {
      report.save(`${"main"}-report.pdf`)
      setError(null)
    } else {
      setError("Check your an excel file!")
    }
  }

  return (
    <section>
      <Title>Reports</Title>
      <button onClick={generatePDF} type="button">Download report</button>
      {
        error ? <p>{error}</p> : null
      }
      {
        accessibleReservationRooms ? <p>The file is uploaded! You can download your report!</p> : <p>No file is uploaded yet! You can upload <Link to="/">here</Link>.</p>
      }
    </section>
  )
}

export default Reports