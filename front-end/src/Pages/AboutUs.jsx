import { Link } from "react-router-dom"
import { useReservationData } from "../context/reservationDataContext"
import Title from "../components/Title"
import AboutUsDescription from "../components/AboutUsDescription"
import UploadFileForm from "../components/UploadFileForm"
import AdditionalNotification from "../components/UI/AdditionalNotification"
import Notification from "../components/UI/Notification"
import { ThumbsUp } from 'lucide-react'

function AboutUs() {
  const { error, reservationData } = useReservationData()

  return (
    <section>
      <Title>Who are we?</Title>
      <AboutUsDescription />
      <UploadFileForm />
      {
        reservationData && !error ? <Notification>
          <ThumbsUp className="text-green-500" />
          <p role="alert" className="mb-0">The file was uploaded successfully!</p>
        </Notification> : null
      }
      {
        reservationData && !error ? <AdditionalNotification>
          <p>Now you can see <Link className="underline font-medium hover:text-primary transition duration-300" to="future-reservations">future reservations</Link> for your units or download <Link className="underline font-medium hover:text-primary transition duration-300" to="reports">reports</Link>.</p>
        </AdditionalNotification> : null
      }
    </section>
  )
}

export default AboutUs