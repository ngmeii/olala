import { useNavigate, useParams } from 'react-router-dom'
import eTicketImage from '../../design/vé điện tử.jpg'

function ETicketImage() {
  const navigate = useNavigate()
  const { bookingCode } = useParams()

  return (
    <main className="eticket-image-page">
      <button
        type="button"
        className="eticket-image-back"
        onClick={() => navigate(`/tickets/${bookingCode}`)}
        aria-label="Quay lại"
      >
        ←
      </button>
      <img src={eTicketImage} alt="Vé điện tử" />
    </main>
  )
}

export default ETicketImage
