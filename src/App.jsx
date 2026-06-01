import { Routes, Route } from 'react-router-dom'
import BookingPage from './pages/BookingPage'
import FlightSearch from './pages/FlightSearch'
import PassengerInfo from './pages/PassengerInfo'
import ServiceSelection from './pages/ServiceSelection'
import ConfirmInfo from './pages/ConfirmInfo'
import BookingPending from './pages/BookingPending'
import PaymentPage from './pages/PaymentPage'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailure from './pages/PaymentFailure'
import PaymentIncomplete from './pages/PaymentIncomplete'
import MyTickets from './pages/MyTickets'
import TicketDetail from './pages/TicketDetail'
import ETicketImage from './pages/ETicketImage'
import AccountPage from './pages/AccountPage'
import OffersPage from './pages/OffersPage'

import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="min-h-screen bg-slate-200 flex justify-center">
      <div className="w-full max-w-[450px] bg-white min-h-screen shadow-2xl relative overflow-x-hidden">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<BookingPage />} />
          <Route path="/search" element={<FlightSearch />} />
          <Route path="/passenger-info" element={<PassengerInfo />} />
          <Route path="/services" element={<ServiceSelection />} />
          <Route path="/confirm" element={<ConfirmInfo />} />
          <Route path="/booking-pending" element={<BookingPending />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failure" element={<PaymentFailure />} />
          <Route path="/payment-incomplete" element={<PaymentIncomplete />} />
          <Route path="/tickets" element={<MyTickets />} />
          <Route path="/tickets/:bookingCode/e-ticket" element={<ETicketImage />} />
          <Route path="/tickets/:bookingCode" element={<TicketDetail />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
