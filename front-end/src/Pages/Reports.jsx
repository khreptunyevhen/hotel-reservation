import { useState } from "react"
import { jsPDF } from "jspdf"
import autoTable from 'jspdf-autotable'
import { useReservationData } from "../context/reservationDataContext"
import { Link } from "react-router-dom"
import Title from "../components/Title"
import Notification from "../components/UI/Notification"
import { AlertTriangle, ThumbsUp } from 'lucide-react'
import Button from "../components/UI/Button"

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
      {
        accessibleReservationRooms ?
          <Notification>
            <ThumbsUp className="text-green-500" />
            <p className='mb-0'>The file is uploaded! You can download your report!</p>
          </Notification>
          :
          <Notification>
            <AlertTriangle className='text-red-500' />
            <p className='mb-0'>No file is uploaded yet! You can upload <Link className="underline font-medium hover:text-primary transition duration-300" to="/">here</Link>.</p>
          </Notification>
      }
      {
        accessibleReservationRooms ? <Button onClick={generatePDF} type="button">Download report</Button> : null
      }
      {
        error ? <p>{error}</p> : null
      }
    </section >
  )
}

export default Reports