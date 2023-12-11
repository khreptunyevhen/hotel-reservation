import { useReservationData } from "../context/reservationDataContext"
import { UploadCloud } from 'lucide-react'
import Button from "./UI/Button"

function UploadFileForm() {
  const { handleFile, handleSubmitFile, error } = useReservationData()

  return (
    <form className="flex items-center justify-between bg-background rounded-lg p-4 mb-4" onSubmit={handleSubmitFile}>
      <input name="file" className="hidden" id="file" type="file" required onChange={handleFile} />
      <label htmlFor="file" className="flex items-center gap-2 cursor-pointer px-4 py-2 border border-primary rounded-lg font-medium hover:bg-primary transition duration-300">
        <UploadCloud />
        <span>Choose file</span>
      </label>
      <Button type="submit">Upload</Button>
      {
        error ? <p role="alert">{error}</p> : null
      }
    </form>
  )
}

export default UploadFileForm