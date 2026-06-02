import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logoSun from '../assets/icons/sun-phuquoc-airways.png'
import logoVietjet from '../assets/icons/vietjet air.png'
import logoVNA from '../assets/icons/logo vietnam airlines.png'
import logoBamboo from '../assets/icons/bamboo.png'
import background2 from '../assets/images/background2.png'
import { saveBookingTicket } from '../utils/ticketStorage'

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v5.25M12 16.5h.008M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992V4.356M20.05 9.348A8.25 8.25 0 006.314 5.746M7.977 14.652H2.985v4.992M3.95 14.652a8.25 8.25 0 0013.736 3.602" />
  </svg>
)

const CardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5A2.25 2.25 0 016 5.25h12A2.25 2.25 0 0120.25 7.5v9A2.25 2.25 0 0118 18.75H6A2.25 2.25 0 013.75 16.5v-9zM3.75 9.75h16.5M7.5 15h3" />
  </svg>
)

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.125 1.125 0 011.592 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-6.75h4.5V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
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
  if (!value || value === 'none') return { price: 0 }
  const match = value.match(/xwbg-(\d+)/)
  const kg = match ? Number(match[1]) : 0
  return { price: kg * 13000 }
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
    duration: dep.duration || '1h 50m',
    fareClass: dep.fareClass || 'Economy'
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
      duration: ret?.duration || dep.duration || '1h 50m',
      fareClass: ret?.fareClass || dep.fareClass || 'Economy'
    })
  }

  return segments
}

function PaymentFailure() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchData = useMemo(() => location.state || {}, [location.state])
  const passengers = useMemo(() => (
    Array.isArray(searchData.passengers) ? searchData.passengers : []
  ), [searchData.passengers])
  const baggageSelections = useMemo(() => searchData.baggageSelections || {}, [searchData.baggageSelections])
  const adults = searchData.adults || 1
  const children = searchData.children || 0
  const babies = searchData.babies || 0

  const segments = useMemo(() => getPaymentSegments(searchData), [searchData])
  const baggageTotal = useMemo(() => passengers.reduce((total, passenger, passengerIndex) => (
    total + segments.reduce((segmentTotal, segment) => {
      const key = `${passenger.id || passengerIndex + 1}_${segment.id}`
      return segmentTotal + getBaggageInfo(baggageSelections[key]).price
    }, 0)
  ), 0), [passengers, segments, baggageSelections])

  const ticketTotal = (searchData.selectedDep?.priceValue || 0) + (searchData.selectedRet?.priceValue || 0)
  const feeTotal = searchData.feeTotal || 0
  const grandTotal = ticketTotal + baggageTotal + feeTotal

  const retryPayment = () => navigate('/payment', { state: searchData })
  const chooseOtherMethod = () => navigate('/payment', { state: { ...searchData, changePaymentMethod: true } })

  useEffect(() => {
    if (Object.keys(searchData).length > 0) {
      saveBookingTicket(searchData, 'waiting')
    }
  }, [searchData])

  return (
    <div className="failure-page">
      <div className="failure-background" style={{ backgroundImage: `url(${background2})` }}>
        <div className="failure-background-overlay" />
      </div>

      <section className="failure-hero">
        <span className="failure-confetti c1"></span>
        <span className="failure-confetti c2"></span>
        <span className="failure-confetti c3"></span>
        <span className="failure-confetti c4"></span>
        <span className="failure-confetti c5"></span>
        <span className="failure-confetti c6"></span>
        <div className="failure-x-rings">
          <div className="failure-x"><XIcon /></div>
        </div>
        <h1>Thanh toán không thành công</h1>
        <p>Rất tiếc, giao dịch của bạn đã thất bại.</p>
        <p>Vui lòng thử lại hoặc chọn phương thức thanh toán khác.</p>
      </section>

      <main className="failure-main">
        <section className="failure-card failure-payment-card">
          <div className="failure-section-title"><ReceiptIcon /><h2>Chi tiết thanh toán</h2></div>
          <div className="failure-total-lines">
            <div><span>Giá vé ({adults} Người lớn)</span><strong>{formatMoney(ticketTotal)}</strong></div>
            <div><span>Hành lý</span><strong>{formatMoney(baggageTotal)}</strong></div>
            <div><span>Thuế & phí</span><strong>{formatMoney(feeTotal)}</strong></div>
            <div className="payment-status-row"><span>Trạng thái thanh toán</span><strong>Thanh toán thất bại</strong></div>
          </div>
          <div className="failure-grand-total"><span>Tổng cộng</span><strong>{formatMoney(grandTotal)}</strong></div>
        </section>

        <section className="failure-card failure-booking-card">
          <div className="failure-section-title"><TicketIcon /><h2>Thông tin đặt vé</h2></div>
          <div className="failure-flight-list">
            {segments.map((segment, index) => (
              <div key={segment.id} className={`failure-flight-row ${index > 0 ? 'with-divider' : ''}`}>
                <img src={segment.logo} alt={segment.airline} />
                <div className="failure-airport"><strong>{segment.fromCode}</strong><span>{segment.fromCity}</span></div>
                <div className="failure-flight-line">
                  <span>{segment.departureTime}</span>
                  <PlaneIcon />
                  <span>{segment.arrivalTime}</span>
                  <small>{formatDuration(segment.duration)}</small>
                  <small>Hạng vé: {segment.fareClass}</small>
                </div>
                <div className="failure-airport"><strong>{segment.toCode}</strong><span>{segment.toCity}</span></div>
              </div>
            ))}
          </div>
          <div className="failure-trip-meta">
            <span><CalendarIcon />{formatDate(searchData.departureDate)}</span>
            <span><UserIcon />{adults} Người lớn</span>
            <span><ChildIcon />{children} Trẻ em</span>
            <span><BabyIcon />{babies} Em bé</span>
          </div>
        </section>

        <section className="failure-reason-card">
          <div className="failure-reason-icon"><AlertIcon /></div>
          <div>
            <h2>Lý do thanh toán thất bại</h2>
            <p>Giao dịch bị từ chối hoặc đã hết thời gian thanh toán.</p>
            <p>Vui lòng kiểm tra lại thông tin thẻ/ví hoặc thử phương thức khác.</p>
          </div>
        </section>

        <button className="failure-retry-btn" type="button" onClick={retryPayment}><RefreshIcon />Thử lại thanh toán</button>
        <button className="failure-method-btn" type="button" onClick={chooseOtherMethod}><CardIcon />Chọn phương thức khác</button>
        <button className="failure-home-btn" type="button" onClick={() => navigate('/')}><HomeIcon />Về trang chủ</button>
      </main>
    </div>
  )
}

export default PaymentFailure
