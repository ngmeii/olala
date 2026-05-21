import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logoSun from '../assets/icons/sun-phuquoc-airways.png'
import logoVietjet from '../assets/icons/vietjet air.png'
import logoVNA from '../assets/icons/logo vietnam airlines.png'
import logoBamboo from '../assets/icons/bamboo.png'
import background2 from '../assets/images/background2.png'
import { saveBookingTicket } from '../utils/ticketStorage'

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
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
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6A2.25 2.25 0 0110.5 3.75h3A2.25 2.25 0 0115.75 6v1.5M5.25 7.5h13.5A1.5 1.5 0 0120.25 9v9.75a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V9a1.5 1.5 0 011.5-1.5z" />
  </svg>
)

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.125 1.125 0 011.592 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-6.75h4.5V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
  </svg>
)

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75l7.5 3v5.7c0 4.55-3.2 7.85-7.5 9.3-4.3-1.45-7.5-4.75-7.5-9.3v-5.7l7.5-3zM9.75 12.25l1.5 1.5 3.25-3.5" />
  </svg>
)

const formatMoney = (value) => `${Math.max(0, value || 0).toLocaleString('vi-VN')}đ`

const formatDate = (value) => {
  if (!value) return ''
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
  if (!match) return { code: fallbackCode, city: value || fallbackCity }
  return { city: match[1], code: match[2] }
}

const getBaggageInfo = (value) => {
  if (!value || value === 'none') return { price: 0, count: 0 }
  const match = value.match(/xwbg-(\d+)/)
  const kg = match ? Number(match[1]) : 0
  return { price: kg * 13000, count: kg > 0 ? 1 : 0 }
}

const getPaymentSegments = (searchData) => {
  const dep = searchData.selectedDep || {}
  const ret = searchData.selectedRet || null
  const departureLocation = parseSelectedLocation(searchData.from, dep.departureCode || 'HAN', dep.departureCity || 'Hà Nội')
  const arrivalLocation = parseSelectedLocation(searchData.to, dep.arrivalCode || 'SGN', dep.arrivalCity || 'Hồ Chí Minh')

  const segments = [{
    id: 'departure',
    airline: dep.airline || 'Sun PhuQuoc',
    logo: getLogo(dep.airline),
    fromCode: departureLocation.code,
    fromCity: departureLocation.city,
    toCode: arrivalLocation.code,
    toCity: arrivalLocation.city,
    departureTime: dep.departureTime || '08:30',
    arrivalTime: dep.arrivalTime || '10:20',
    duration: dep.duration || '1h 50m'
  }]

  if (ret || searchData.returnDate) {
    segments.push({
      id: 'return',
      airline: ret?.airline || dep.airline || 'Sun PhuQuoc',
      logo: getLogo(ret?.airline || dep.airline),
      fromCode: arrivalLocation.code,
      fromCity: arrivalLocation.city,
      toCode: departureLocation.code,
      toCity: departureLocation.city,
      departureTime: ret?.departureTime || '18:45',
      arrivalTime: ret?.arrivalTime || '20:35',
      duration: ret?.duration || dep.duration || '1h 50m'
    })
  }

  return segments
}

function PaymentSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchData = useMemo(() => location.state || {}, [location.state])
  const passengers = useMemo(() => (
    Array.isArray(searchData.passengers) ? searchData.passengers : []
  ), [searchData.passengers])
  const baggageSelections = useMemo(() => searchData.baggageSelections || {}, [searchData.baggageSelections])
  const adults = searchData.adults || 1

  const segments = useMemo(() => getPaymentSegments(searchData), [searchData])
  const baggageSummary = useMemo(() => passengers.reduce((summary, passenger, passengerIndex) => (
    segments.reduce((currentSummary, segment) => {
      const key = `${passenger.id || passengerIndex + 1}_${segment.id}`
      const baggage = getBaggageInfo(baggageSelections[key])
      return {
        price: currentSummary.price + baggage.price,
        count: currentSummary.count + baggage.count
      }
    }, summary)
  ), { price: 0, count: 0 }), [passengers, segments, baggageSelections])

  const ticketTotal = (searchData.selectedDep?.priceValue || 0) + (searchData.selectedRet?.priceValue || 0)
  const feeTotal = 0
  const grandTotal = ticketTotal + baggageSummary.price + feeTotal

  useEffect(() => {
    if (Object.keys(searchData).length > 0) {
      saveBookingTicket(searchData, 'processing')
    }
  }, [searchData])

  return (
    <div className="success-page">
      <div className="success-background" style={{ backgroundImage: `url(${background2})` }}>
        <div className="success-background-overlay" />
      </div>

      <section className="success-hero">
        <span className="success-confetti c1"></span>
        <span className="success-confetti c2"></span>
        <span className="success-confetti c3"></span>
        <span className="success-confetti c4"></span>
        <span className="success-confetti c5"></span>
        <span className="success-confetti c6"></span>
        <div className="success-check-rings">
          <div className="success-check"><CheckIcon /></div>
        </div>
        <h1>Thanh toán thành công</h1>
        <p>Cảm ơn bạn đã sử dụng dịch vụ.</p>
        <p>Chúc bạn có một chuyến đi an toàn và vui vẻ!</p>
      </section>

      <main className="success-main">
        <section className="success-card success-payment-card">
          <div className="success-section-title"><ReceiptIcon /><h2>Chi tiết thanh toán</h2></div>
          <div className="success-total-lines">
            <div><span>Giá vé ({adults} Người lớn)</span><strong>{formatMoney(ticketTotal)}</strong></div>
            <div><span>Hành lý</span><strong>{formatMoney(baggageSummary.price)}</strong></div>
            <div><span>Thuế & phí</span><strong>{formatMoney(feeTotal)}</strong></div>
          </div>
          <div className="success-grand-total"><span>Tổng cộng</span><strong>{formatMoney(grandTotal)}</strong></div>
        </section>

        <section className="success-card success-booking-card">
          <div className="success-section-title"><TicketIcon /><h2>Thông tin đặt vé</h2></div>
          <div className="success-flight-list">
            {segments.map((segment, index) => (
              <div key={segment.id} className={`success-flight-row ${index > 0 ? 'with-divider' : ''}`}>
                <img src={segment.logo} alt={segment.airline} />
                <div className="success-airport"><strong>{segment.fromCode}</strong><span>{segment.fromCity}</span></div>
                <div className="success-flight-line">
                  <span>{segment.departureTime}</span>
                  <PlaneIcon />
                  <span>{segment.arrivalTime}</span>
                  <small>{formatDuration(segment.duration)}</small>
                </div>
                <div className="success-airport"><strong>{segment.toCode}</strong><span>{segment.toCity}</span></div>
              </div>
            ))}
          </div>
          <div className="success-trip-meta">
            <span><CalendarIcon />{formatDate(searchData.departureDate)}</span>
            <span><UserIcon />{adults} Người lớn</span>
            <span><SuitcaseIcon />{baggageSummary.count} Túi ký gửi</span>
          </div>
        </section>

        <section className="success-card success-safe-card">
          <div className="success-safe-icon"><ShieldIcon /></div>
          <div>
            <h2>Giao dịch an toàn</h2>
            <p>Thông tin thanh toán của bạn đã được bảo mật.</p>
          </div>
        </section>

        <button className="success-home-btn" type="button" onClick={() => navigate('/')}><HomeIcon />Về trang chủ</button>
        <button className="success-history-btn" type="button" onClick={() => navigate('/tickets')}>Xem lịch sử đặt vé</button>
      </main>
    </div>
  )
}

export default PaymentSuccess
