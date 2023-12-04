import { useState } from "react"
import * as XLSX from "xlsx"

const importantColumns = [
  "owner", "unit", "check-in", "check-out"
]

function Reservation() {
  const [excelFile, setExcelFile] = useState(null)
  const [error, setError] = useState(null)
  const [reservationData, setReservationData] = useState(null)

  const accessibleReservationRoom = reservationData.filter(reservation => reservation.status !== "canceled")

  const importantReservationData = accessibleReservationRoom.map(reservation => {
    const pureReservationInfo = {};

    importantColumns.forEach(column => {
      pureReservationInfo[column] = reservation[column]
    })

    return pureReservationInfo
  })

  function handleFile(e) {
    let selectedFile = e.target.files[0];
    let fileTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", "text/csv"]

    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setError(null)
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile)
        reader.onload = (e) => { setExcelFile(e.target.result) }
      } else {
        setError("Please select only excel file!")
        setExcelFile(null)
      }

    } else {
      setError("Please select your file!")
    }
  }

  function handleSubmitFile(e) {
    e.preventDefault();

    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" })
      const worksheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[worksheetName]
      const data = XLSX.utils.sheet_to_json(worksheet)
      setReservationData(data)
    }
  }

  return (
    <section>
      <h2>Future reservation</h2>
      <form onSubmit={handleSubmitFile}>
        <input type="file" required onChange={handleFile} />
        <button type="submit">Upload</button>
        {
          error ? <p role="alert">{error}</p> : null
        }
      </form>
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