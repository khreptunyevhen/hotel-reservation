import { createContext, useContext, useState } from "react"
import * as XLSX from "xlsx"

const importantColumns = [
  "owner", "unit", "check-in", "check-out"
]

const ReservationDataContext = createContext()

function ReservationDataProvider({ children }) {
  const [excelFile, setExcelFile] = useState(null)
  const [error, setError] = useState(null)
  const [reservationData, setReservationData] = useState(null)

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
      const isCorrectExcelFile = Object.keys(data[0]).filter(key => importantColumns.includes(key)).length === importantColumns.length;

      if (isCorrectExcelFile) {
        setReservationData(data)
        setError(null)
      } else {
        setReservationData(null)
        setError("Invalid excel file! Please check important columns!")
      }
    }
  }

  return (
    <ReservationDataContext.Provider value={{ error, reservationData, handleFile, handleSubmitFile }}>
      {children}
    </ReservationDataContext.Provider>
  )
}

function useReservationData() {
  const context = useContext(ReservationDataContext)

  if (context === undefined) {
    throw new Error("ReservationDataContext was used outside of ReservationDataProvider")
  }

  return context;
}

export { ReservationDataProvider, useReservationData }