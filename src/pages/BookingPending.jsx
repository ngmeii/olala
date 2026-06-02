import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import background2 from '../assets/images/background2.png'

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
)

const TicketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7.5a2 2 0 012-2h11a2 2 0 012 2v2.25a2.25 2.25 0 000 4.5v2.25a2 2 0 01-2 2h-11a2 2 0 01-2-2v-2.25a2.25 2.25 0 000-4.5V7.5zM9 9h.01M9 12h.01M9 15h.01" />
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3.5 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M5.25 5.25h13.5A1.5 1.5 0 0120.25 6.75v12A1.5 1.5 0 0118.75 20.25H5.25A1.5 1.5 0 013.75 18.75v-12A1.5 1.5 0 015.25 5.25z" />
  </svg>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
  </svg>
)

const ChildIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM8.25 21l1.5-7.5-2.25 2.25L6 14.25l4.5-4.5h3l4.5 4.5-1.5 1.5-2.25-2.25 1.5 7.5M9.75 13.5h4.5" />
  </svg>
)

const BabyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM5.25 13.5a6.75 6.75 0 1113.5 0v1.5a6.75 6.75 0 11-13.5 0v-1.5zM9.75 14.25h.008M14.25 14.25h.008M10.5 17.25a2.5 2.5 0 003 0" />
  </svg>
)

const ReceiptIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3.75h12v16.5l-2.25-1.5-2.25 1.5-2.25-1.5L9 20.25l-2.25-1.5L4.5 20.25V5.25A1.5 1.5 0 016 3.75zM8.25 8.25h7.5M8.25 12h7.5M8.25 15.75h4.5" />
  </svg>
)

const CardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5A2.25 2.25 0 016 5.25h12A2.25 2.25 0 0120.25 7.5v9A2.25 2.25 0 0118 18.75H6A2.25 2.25 0 013.75 16.5v-9zM3.75 9.75h16.5M7.5 15h3" />
  </svg>
)

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M12 8.25h.008v.008H12V8.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const StepIndicator = ({ number, label, state }) => (
  <div className={`pending-step ${state || ''}`}>
    <span className="pending-step-dot">{state === 'done' ? <CheckIcon /> : number}</span>
    <span>{label}</span>
  </div>
)

const formatMoney = (value) => `${Math.max(0, value || 0).toLocaleString('vi-VN')}đ`

const formatDate = (value) => {
  if (!value) return 'Thứ Tư, 14/05/2025'
  if (value.includes('/')) return value
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
  return `${weekdays[date.getDay()]}, ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
}

const formatDuration = (value) => {
  if (!value) return '1h 50m'
  if (value.includes(':')) {
    const [hours, minutes] = value.split(':')
    return `${Number(hours)}h ${minutes}m`
  }
  return value
}

const getBaggageInfo = (value) => {
  if (!value || value === 'none') return { price: 0 }
  const match = value.match(/xwbg-(\d+)/)
  const kg = match ? Number(match[1]) : 0
  return { price: kg * 13000 }
}

const parseSelectedLocation = (value, fallbackCode, fallbackCity) => {
  if (!value) return { code: fallbackCode, city: fallbackCity }

  const match = String(value).match(/^(.*)\s+\(([^)]+)\)$/)
  if (!match) return { code: fallbackCode, city: value || fallbackCity }

  return {
    city: match[1],
    code: match[2]
  }
}

const formatCountdown = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const PAYMENT_DEADLINE_STORAGE_KEY = 'bookingPaymentDeadlineAt'
const PAYMENT_HOLD_SECONDS = 15 * 60
const IS_PAYMENT_COUNTDOWN_PAUSED = true

const getPaymentDeadlineAt = () => {
  const fallbackDeadline = Date.now() + PAYMENT_HOLD_SECONDS * 1000

  try {
    const storedDeadline = Number(sessionStorage.getItem(PAYMENT_DEADLINE_STORAGE_KEY))
    if (Number.isFinite(storedDeadline) && storedDeadline > Date.now()) return storedDeadline

    sessionStorage.setItem(PAYMENT_DEADLINE_STORAGE_KEY, String(fallbackDeadline))
    return fallbackDeadline
  } catch {
    return fallbackDeadline
  }
}

const getSecondsUntilDeadline = (deadlineAt) => Math.max(Math.ceil((deadlineAt - Date.now()) / 1000), 0)

const formatPaymentDeadline = (date) => {
  const deadline = new Date(date)
  const now = new Date()
  const time = `${String(deadline.getHours()).padStart(2, '0')}:${String(deadline.getMinutes()).padStart(2, '0')}`
  const dateText = `${String(deadline.getDate()).padStart(2, '0')}/${String(deadline.getMonth() + 1).padStart(2, '0')}/${deadline.getFullYear()}`
  const isToday = deadline.toDateString() === now.toDateString()
  return `${time} ${isToday ? 'hôm nay' : 'ngày'} (${dateText})`
}

function BookingPending() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchData = useMemo(() => location.state || {}, [location.state])
  const passengers = useMemo(() => (
    Array.isArray(searchData.passengers) ? searchData.passengers : []
  ), [searchData.passengers])
  const baggageSelections = useMemo(() => searchData.baggageSelections || {}, [searchData.baggageSelections])
  const selectedDep = searchData.selectedDep || {}
  const selectedRet = searchData.selectedRet || null
  const adults = searchData.adults || 1
  const children = searchData.children || 0
  const babies = searchData.babies || 0

  const baggageTotal = useMemo(() => passengers.reduce((total, passenger, passengerIndex) => (
    total + ['departure', ...(selectedRet || searchData.returnDate ? ['return'] : [])].reduce((segmentTotal, segmentId) => {
      const key = `${passenger.id || passengerIndex + 1}_${segmentId}`
      return segmentTotal + getBaggageInfo(baggageSelections[key]).price
    }, 0)
  ), 0), [passengers, baggageSelections, selectedRet, searchData.returnDate])

  const ticketTotal = (selectedDep.priceValue || 0) + (selectedRet?.priceValue || 0)
  const feeTotal = 0
  const grandTotal = ticketTotal + baggageTotal + feeTotal
  const departureLocation = parseSelectedLocation(
    searchData.from,
    selectedDep.departureCode || 'HAN',
    selectedDep.departureCity || 'Hà Nội'
  )
  const arrivalLocation = parseSelectedLocation(
    searchData.to,
    selectedDep.arrivalCode || 'SGN',
    selectedDep.arrivalCity || 'TP. Hồ Chí Minh'
  )
  const fromCode = departureLocation.code
  const toCode = arrivalLocation.code
  const fromCity = departureLocation.city
  const toCity = arrivalLocation.city
  const fareClassSummary = [
    selectedDep.fareClass,
    selectedRet?.fareClass && selectedRet.fareClass !== selectedDep.fareClass ? selectedRet.fareClass : null
  ].filter(Boolean).join(' / ') || 'Economy'
  const bookingCode = searchData.bookingCode || 'OLALA123456'
  const [paymentDeadlineAt] = useState(getPaymentDeadlineAt)
  const [paymentSecondsLeft, setPaymentSecondsLeft] = useState(PAYMENT_HOLD_SECONDS)
  const paymentDeadline = useMemo(() => new Date(paymentDeadlineAt), [paymentDeadlineAt])

  useEffect(() => {
    if (IS_PAYMENT_COUNTDOWN_PAUSED) return undefined

    const timerId = window.setInterval(() => {
      setPaymentSecondsLeft(getSecondsUntilDeadline(paymentDeadlineAt))
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [paymentDeadlineAt])

  return (
    <div className="pending-page">
      <div className="pending-background" style={{ backgroundImage: `url(${background2})` }}>
        <div className="pending-background-overlay" />
      </div>

      <header className="pending-header">
        <div className="pending-title-row">
          <button onClick={() => navigate('/')} aria-label="Quay lại"><ChevronLeft /></button>
          <h1>Đặt vé thành công</h1>
        </div>
        <div className="pending-steps">
          <StepIndicator number="1" label="Nhập thông tin" state="done" />
          <span className="pending-step-line"></span>
          <StepIndicator number="2" label="Mua dịch vụ" state="done" />
          <span className="pending-step-line"></span>
          <StepIndicator number="3" label="Thanh toán" state="active" />
        </div>
      </header>

      <main className="pending-main">
        <section className="pending-card pending-success-card">
          <div className="pending-success-layout">
            <div className="pending-success-mark"><CheckIcon /></div>
            <div className="pending-success-content">
              <h2>Booking tạm đã được tạo thành công</h2>
              <div className="pending-code-row"><TicketIcon /><span>Mã booking:</span><strong>{bookingCode}</strong></div>
              <div className="pending-code-row"><ClockIcon /><span>Trạng thái:</span><strong className="pending-status">Chờ thanh toán</strong></div>
            </div>
          </div>
          <p className="pending-success-note">Vui lòng hoàn tất thanh toán để giữ chỗ và tiếp tục xử lý vé.</p>
          <div className="pending-deadline">
            <ClockIcon />
            <div>
              <strong>Thời hạn thanh toán còn lại:</strong>
              <span>Thanh toán trước {formatPaymentDeadline(paymentDeadline)}</span>
            </div>
            <b>{formatCountdown(paymentSecondsLeft)}</b>
          </div>
        </section>

        <section className="pending-card pending-flight-card">
          <div className="pending-section-title"><PlaneIcon /><h2>Thông tin chuyến bay</h2></div>
          <div className="pending-route">
            <div><strong>{fromCode}</strong><span>{fromCity}</span></div>
            <div className="pending-route-line"><PlaneIcon /><small>{formatDuration(selectedDep.duration)}</small></div>
            <div><strong>{toCode}</strong><span>{toCity}</span></div>
          </div>
          <div className="pending-trip-info">
            <span><CalendarIcon />{formatDate(searchData.departureDate)}</span>
            <span><UserIcon />{adults} Người lớn</span>
            <span><ChildIcon />{children} Trẻ em</span>
            <span><BabyIcon />{babies} Em bé</span>
            <span>Hạng vé: {fareClassSummary}</span>
          </div>
        </section>

        <section className="pending-card pending-total-card">
          <div className="pending-section-title"><ReceiptIcon /><h2>Tóm tắt thanh toán</h2></div>
          <div className="pending-total-lines">
            <div><span>Giá vé</span><strong>{formatMoney(ticketTotal)}</strong></div>
            <div><span>Hành lý</span><strong>{formatMoney(baggageTotal)}</strong></div>
            <div><span>Thuế & phí</span><strong>{formatMoney(feeTotal)}</strong></div>
            <div className="payment-status-row"><span>Trạng thái thanh toán</span><strong>Chưa thanh toán</strong></div>
          </div>
          <div className="pending-grand-total"><span>Tổng cộng</span><strong>{formatMoney(grandTotal)}</strong></div>
        </section>

        <button className="pending-pay-btn" onClick={() => navigate('/payment', { state: searchData })}><CardIcon />Tiếp tục thanh toán</button>
        <button className="pending-view-btn" onClick={() => navigate(`/tickets/${bookingCode}`)}><ReceiptIcon />Xem booking</button>

        <div className="pending-warning"><InfoIcon /><span>Nếu quý khách không hoàn tất thanh toán trước thời hạn, booking tạm có thể bị hủy và chỗ sẽ được giải phóng.</span></div>
      </main>
    </div>
  )
}

export default BookingPending
