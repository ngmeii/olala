import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logoSun from '../assets/icons/sun-phuquoc-airways.png'
import logoVietjet from '../assets/icons/vietjet air.png'
import logoVNA from '../assets/icons/logo vietnam airlines.png'
import logoBamboo from '../assets/icons/bamboo.png'
import background2 from '../assets/images/background2.png'
import { saveBookingTicket } from '../utils/ticketStorage'

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
)

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v5.25M12 16.5h.008" />
  </svg>
)

const ReceiptIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3.75h12v16.5l-2.25-1.5-2.25 1.5-2.25-1.5L9 20.25l-2.25-1.5L4.5 20.25V5.25A1.5 1.5 0 016 3.75zM8.25 8.25h7.5M8.25 12h7.5M8.25 15.75h4.5" />
  </svg>
)

const TicketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7.5a2 2 0 012-2h11a2 2 0 012 2v2.25a2.25 2.25 0 000 4.5v2.25a2 2 0 01-2 2h-11a2 2 0 01-2-2v-2.25a2.25 2.25 0 000-4.5V7.5zM9 9h.01M9 12h.01M9 15h.01" />
  </svg>
)

const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
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

const SuitcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6V4.5A1.5 1.5 0 019.75 3h4.5a1.5 1.5 0 011.5 1.5V6M4.5 6h15A1.5 1.5 0 0121 7.5v10.125a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5V7.5A1.5 1.5 0 014.5 6zM7.5 10.5v4.125M16.5 10.5v4.125" />
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3.5 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75l7.5 3v5.7c0 4.55-3.2 7.85-7.5 9.3-4.3-1.45-7.5-4.75-7.5-9.3v-5.7l7.5-3zM9.75 12.25l1.5 1.5 3.25-3.5" />
  </svg>
)

const CardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5A2.25 2.25 0 016 5.25h12A2.25 2.25 0 0120.25 7.5v9A2.25 2.25 0 0118 18.75H6A2.25 2.25 0 013.75 16.5v-9zM3.75 9.75h16.5M7.5 15h3" />
  </svg>
)

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75h.008v.008h-.008V9.75zm3.375 0h.008v.008H12V9.75zm3.375 0h.008v.008h-.008V9.75zM4.5 5.25h15A1.5 1.5 0 0121 6.75v7.5a1.5 1.5 0 01-1.5 1.5h-7.125L7.5 19.5v-3.75h-3A1.5 1.5 0 013 14.25v-7.5a1.5 1.5 0 011.5-1.5z" />
  </svg>
)

const formatMoney = (value) => `${Math.max(0, value || 0).toLocaleString('vi-VN')}đ`

const formatDate = (value) => {
  if (!value) return ''
  if (String(value).includes('/')) return value
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
  return `${weekdays[date.getDay()]}, ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
}

const formatDuration = (value) => {
  if (!value) return '1h 50m'
  if (!String(value).includes(':')) return value
  const [hours, minutes] = value.split(':')
  return `${Number(hours)}h ${minutes}m`
}

const formatPaymentDeadline = (value) => {
  const date = new Date(value)
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ngày ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
}

const getLogo = (airline = '') => {
  const lower = airline.toLowerCase()
  if (lower.includes('vietjet')) return logoVietjet
  if (lower.includes('vietnam')) return logoVNA
  if (lower.includes('bamboo')) return logoBamboo
  return logoSun
}

const parseSelectedLocation = (value, fallbackCode, fallbackCity) => {
  if (!value) return { code: fallbackCode, city: fallbackCity }
  const match = String(value).match(/^(.*)\s+\(([^)]+)\)$/)
  return match ? { city: match[1], code: match[2] } : { code: fallbackCode, city: value || fallbackCity }
}

const getBaggageInfo = (value) => {
  if (!value || value === 'none') return { count: 0, price: 0 }
  const match = String(value).match(/xwbg-(\d+)/)
  const kg = match ? Number(match[1]) : 0
  return { count: kg > 0 ? 1 : 0, price: kg * 13000 }
}

const getPaymentSegments = (searchData) => {
  const dep = searchData.selectedDep || {}
  const ret = searchData.selectedRet || null
  const departure = parseSelectedLocation(searchData.from, dep.departureCode || 'HAN', dep.departureCity || 'Hà Nội')
  const arrival = parseSelectedLocation(searchData.to, dep.arrivalCode || 'SGN', dep.arrivalCity || 'Hồ Chí Minh')
  const segments = [{
    id: 'departure',
    airline: dep.airline || 'Sun PhuQuoc',
    logo: getLogo(dep.airline),
    fromCode: departure.code,
    fromCity: departure.city,
    toCode: arrival.code,
    toCity: arrival.city,
    departureTime: dep.departureTime || '08:30',
    arrivalTime: dep.arrivalTime || '10:20',
    duration: dep.duration || '1h 50m'
  }]

  if (ret || searchData.returnDate) {
    segments.push({
      id: 'return',
      airline: ret?.airline || dep.airline || 'Sun PhuQuoc',
      logo: getLogo(ret?.airline || dep.airline),
      fromCode: arrival.code,
      fromCity: arrival.city,
      toCode: departure.code,
      toCity: departure.city,
      departureTime: ret?.departureTime || '18:45',
      arrivalTime: ret?.arrivalTime || '20:35',
      duration: ret?.duration || dep.duration || '1h 50m'
    })
  }

  return segments
}

const getPaymentDeadlineAt = () => {
  const fallbackDeadline = Date.now() + 15 * 60 * 1000

  try {
    const storedDeadline = Number(sessionStorage.getItem('bookingPaymentDeadlineAt'))
    if (Number.isFinite(storedDeadline) && storedDeadline > Date.now()) return storedDeadline

    sessionStorage.setItem('bookingPaymentDeadlineAt', String(fallbackDeadline))
  } catch {
    // Use a fresh deadline when storage is unavailable.
  }
  return fallbackDeadline
}

function PaymentIncomplete() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchData = useMemo(() => location.state || {}, [location.state])
  const passengers = useMemo(() => Array.isArray(searchData.passengers) ? searchData.passengers : [], [searchData.passengers])
  const baggageSelections = useMemo(() => searchData.baggageSelections || {}, [searchData.baggageSelections])
  const segments = useMemo(() => getPaymentSegments(searchData), [searchData])
  const adults = searchData.adults || 1
  const ticketTotal = (searchData.selectedDep?.priceValue || 0) + (searchData.selectedRet?.priceValue || 0)
  const baggageSummary = useMemo(() => passengers.reduce((summary, passenger, passengerIndex) => (
    segments.reduce((currentSummary, segment) => {
      const baggage = getBaggageInfo(baggageSelections[`${passenger.id || passengerIndex + 1}_${segment.id}`])
      return { count: currentSummary.count + baggage.count, price: currentSummary.price + baggage.price }
    }, summary)
  ), { count: 0, price: 0 }), [baggageSelections, passengers, segments])
  const grandTotal = searchData.grandTotal || ticketTotal + baggageSummary.price + (searchData.feeTotal || 0)
  const paidAmount = Math.min(searchData.paidAmount || 0, grandTotal)
  const amountDue = Math.max(grandTotal - paidAmount, 0)
  const paymentDeadlineAt = useMemo(() => getPaymentDeadlineAt(), [])
  const paymentState = useMemo(() => ({ ...searchData, paidAmount, grandTotal }), [grandTotal, paidAmount, searchData])

  useEffect(() => {
    if (Object.keys(searchData).length > 0) {
      saveBookingTicket(paymentState, 'waiting', {
        paidAmount,
        grandTotal,
        note: 'Đã ghi nhận một phần thanh toán. Vui lòng thanh toán bổ sung số tiền còn thiếu.',
        rawSearchData: paymentState
      })
    }
  }, [grandTotal, paidAmount, paymentState, searchData])

  return (
    <div className="incomplete-page">
      <div className="incomplete-background" style={{ backgroundImage: `url(${background2})` }}><div className="incomplete-background-overlay" /></div>
      <button className="incomplete-back-btn" type="button" onClick={() => navigate(-1)} aria-label="Quay lại"><ChevronLeft /></button>
      <section className="incomplete-hero">
        <span className="incomplete-confetti c1"></span><span className="incomplete-confetti c2"></span><span className="incomplete-confetti c3"></span><span className="incomplete-confetti c4"></span>
        <div className="incomplete-alert-rings"><div className="incomplete-alert"><AlertIcon /></div></div>
        <h1>Thanh toán chưa hoàn tất</h1>
        <p><span className="incomplete-hero-lead">Chúng tôi đã ghi nhận một phần thanh toán của quý khách.</span>Vui lòng thanh toán bổ sung số tiền còn thiếu<br />để tiếp tục xử lý booking.</p>
      </section>

      <main className="incomplete-main">
        <section className="incomplete-card incomplete-payment-card">
          <div className="incomplete-section-title"><ReceiptIcon /><h2>Chi tiết thanh toán</h2></div>
          <div className="incomplete-total-lines">
            <div><span>Tổng tiền</span><strong>{formatMoney(grandTotal)}</strong></div>
            <div><span>Đã thanh toán</span><strong>{formatMoney(paidAmount)}</strong></div>
            <div className="amount-due"><span>Còn thiếu</span><strong>{formatMoney(amountDue)}</strong></div>
            <div className="payment-status-row"><span>Trạng thái thanh toán</span><strong>Thanh toán thiếu</strong></div>
          </div>
        </section>

        <section className="incomplete-deadline-card">
          <ClockIcon />
          <p><strong>Booking sẽ được giữ đến <em>{formatPaymentDeadline(paymentDeadlineAt)}.</em></strong><br />Nếu quá thời gian trên mà chưa thanh toán đủ, booking sẽ bị hủy và khoản tiền đã thanh toán sẽ được chuyển sang quy trình hoàn tiền.</p>
        </section>

        <section className="incomplete-card incomplete-booking-card">
          <div className="incomplete-section-title"><TicketIcon /><h2>Thông tin đặt vé</h2></div>
          <div className="incomplete-flight-list">
            {segments.map((segment, index) => (
              <div key={segment.id} className={`incomplete-flight-row ${index > 0 ? 'with-divider' : ''}`}>
                <img src={segment.logo} alt={segment.airline} />
                <div className="incomplete-airport"><strong>{segment.fromCode}</strong><span>{segment.fromCity}</span></div>
                <div className="incomplete-flight-line"><span>{segment.departureTime}</span><PlaneIcon /><span>{segment.arrivalTime}</span><small>{formatDuration(segment.duration)}</small></div>
                <div className="incomplete-airport"><strong>{segment.toCode}</strong><span>{segment.toCity}</span></div>
              </div>
            ))}
          </div>
          <div className="incomplete-trip-meta">
            <span><CalendarIcon />{formatDate(searchData.departureDate)}</span>
            <span><UserIcon />{adults} Người lớn</span>
            <span><SuitcaseIcon />{baggageSummary.count} Túi ký gửi</span>
          </div>
        </section>

        <section className="incomplete-card incomplete-safe-card"><div className="incomplete-safe-icon"><ShieldIcon /></div><div><h2>Giao dịch an toàn</h2><p>Thông tin thanh toán của bạn đã được bảo mật.</p></div></section>
        <button className="incomplete-pay-btn" type="button" onClick={() => navigate('/payment', { state: paymentState })}><CardIcon />Thanh toán bổ sung</button>
        <button className="incomplete-chat-btn" type="button"><ChatIcon />Chat với tư vấn viên</button>
      </main>
    </div>
  )
}

export default PaymentIncomplete
