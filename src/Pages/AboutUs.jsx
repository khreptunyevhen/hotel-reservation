import { Link } from "react-router-dom"
import { useReservationData } from "../context/reservationDataContext"

function AboutUs() {
  const { handleFile, handleSubmitFile, error, reservationData } = useReservationData()

  return (
    <div>
      <h2>Who are we?</h2>
      <p>ReservationPro is your trusted partner in efficient room reservation management. Our platform simplifies the booking process, provides a glimpse into future reservations, and generates detailed reports on earnings. Whether you are a hotel, resort, or property owner, maximize your efficiency and revenue with ReservationPro. Experience streamlined operations, increased financial visibility, and enhanced customer satisfaction. Join us today for a seamless reservation experience and optimized business performance.</p>
      <p>If you would like to know your reservation or reports please unload excel file.</p>
      <form onSubmit={handleSubmitFile}>
        <input type="file" required onChange={handleFile} />
        <button type="submit">Upload</button>
        {
          error ? <p role="alert">{error}</p> : null
        }
      </form>
      {
        reservationData && !error ? <p role="alert">The file was uploaded successfully!</p> : null
      }
      {
        reservationData && !error ? <p>Now you can go to <Link to="future-reservation">future reservation</Link> or <Link to="reports">reports</Link> pages to know more about your stuff.</p> : null
      }
    </div>
  )
}

export default AboutUs