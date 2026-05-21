import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import background2 from '../assets/images/background2.png'
import logoSun from '../assets/icons/sun-phuquoc-airways.png'
import logoVietjet from '../assets/icons/vietjet air.png'
import logoVNA from '../assets/icons/logo vietnam airlines.png'
import logoBamboo from '../assets/icons/bamboo.png'
import logoZaloPay from '../assets/icons/zalopay.png'
import logoMoMo from '../assets/icons/momo.png'

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

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M12 8.25h.008v.008H12V8.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const TicketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7.5a2 2 0 012-2h11a2 2 0 012 2v2.25a2.25 2.25 0 000 4.5v2.25a2 2 0 01-2 2h-11a2 2 0 01-2-2v-2.25a2.25 2.25 0 000-4.5V7.5zM9 9h.01M9 12h.01M9 15h.01" />
  </svg>
)

const CardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5A2.25 2.25 0 016 5.25h12A2.25 2.25 0 0120.25 7.5v9A2.25 2.25 0 0118 18.75H6A2.25 2.25 0 013.75 16.5v-9zM3.75 9.75h16.5M7.5 15h3" />
  </svg>
)

const ReceiptIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3.75h12v16.5l-2.25-1.5-2.25 1.5-2.25-1.5L9 20.25l-2.25-1.5L4.5 20.25V5.25A1.5 1.5 0 016 3.75zM8.25 8.25h7.5M8.25 12h7.5M8.25 15.75h4.5" />
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

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.5a4.5 4.5 0 00-9 0v3m-.75 0h10.5A1.5 1.5 0 0118.75 12v6.75a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5z" />
  </svg>
)

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75l7.5 3v5.7c0 4.55-3.2 7.85-7.5 9.3-4.3-1.45-7.5-4.75-7.5-9.3v-5.7l7.5-3zM9.75 12.25l1.5 1.5 3.25-3.5" />
  </svg>
)

const StepIndicator = ({ number, label, state }) => (
  <div className={`payment-step ${state || ''}`}>
    <span className="payment-step-dot">{state === 'done' ? <CheckIcon /> : number}</span>
    <span>{label}</span>
  </div>
)

const formatMoney = (value) => `${Math.max(0, value || 0).toLocaleString('vi-VN')}đ`

const formatCountdown = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

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
  return { city: match[1], code: match[2] }
}

const getPaymentSegments = (searchData) => {
  const dep = searchData.selectedDep || {}
  const ret = searchData.selectedRet || null
  const departureLocation = parseSelectedLocation(searchData.from, dep.departureCode || 'HAN', dep.departureCity || 'Hà Nội')
  const arrivalLocation = parseSelectedLocation(searchData.to, dep.arrivalCode || 'SGN', dep.arrivalCity || 'TP. Hồ Chí Minh')

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

const PAYMENT_METHODS = [
  { id: 'zalopay', title: 'ZaloPay', subtitle: 'Thanh toán qua ví ZaloPay', logo: logoZaloPay },
  { id: 'momo', title: 'MoMo', subtitle: 'Thanh toán qua ví MoMo', logo: logoMoMo },
  { id: 'international', title: 'Thẻ quốc tế', subtitle: 'Visa, MasterCard, JCB' },
  { id: 'domestic-card', title: 'Thẻ nội địa', subtitle: 'ATM/NAPAS' },
  { id: 'bank-transfer', title: 'Chuyển khoản ngân hàng', subtitle: 'Thanh toán qua tài khoản ngân hàng' }
]

const PAYMENT_RESULT_TOGGLE_KEY = 'paymentResultToggle'

function PaymentPage() {
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
  const [selectedMethod, setSelectedMethod] = useState('zalopay')
  const [secondsLeft, setSecondsLeft] = useState(15 * 60)
  const expiredHandledRef = useRef(false)
  const isCountdownPaused = true

  const segments = useMemo(() => getPaymentSegments(searchData), [searchData])
  const baggageTotal = useMemo(() => passengers.reduce((total, passenger, passengerIndex) => (
    total + segments.reduce((segmentTotal, segment) => {
      const key = `${passenger.id || passengerIndex + 1}_${segment.id}`
      return segmentTotal + getBaggageInfo(baggageSelections[key]).price
    }, 0)
  ), 0), [passengers, segments, baggageSelections])

  const ticketTotal = (searchData.selectedDep?.priceValue || 0) + (searchData.selectedRet?.priceValue || 0)
  const feeTotal = 0
  const grandTotal = ticketTotal + baggageTotal + feeTotal

  const handleSubmitPayment = () => {
    let shouldShowSuccess

    try {
      shouldShowSuccess = sessionStorage.getItem(PAYMENT_RESULT_TOGGLE_KEY) !== 'success'
      sessionStorage.setItem(PAYMENT_RESULT_TOGGLE_KEY, shouldShowSuccess ? 'success' : 'failure')
    } catch {
      shouldShowSuccess = true
    }

    navigate(shouldShowSuccess ? '/payment-success' : '/payment-failure', {
      state: { ...searchData, selectedPaymentMethod: selectedMethod }
    })
  }

  useEffect(() => {
    if (isCountdownPaused) return undefined

    if (secondsLeft <= 0) {
      if (expiredHandledRef.current) return undefined

      expiredHandledRef.current = true
      try {
        sessionStorage.removeItem('passengerInfoDraft')
      } catch {
        // Ignore storage errors and still release the UI flow back to booking.
      }

      window.alert('Thời gian thanh toán đã hết. Booking của quý khách đã tự động bị hủy.')
      navigate('/', { replace: true })
      return undefined
    }

    const timerId = window.setTimeout(() => {
      setSecondsLeft(currentSeconds => Math.max(currentSeconds - 1, 0))
    }, 1000)

    return () => window.clearTimeout(timerId)
  }, [isCountdownPaused, secondsLeft, navigate])

  return (
    <div className="payment-page">
      <div className="payment-background" style={{ backgroundImage: `url(${background2})` }}>
        <div className="payment-background-overlay" />
      </div>

      <header className="payment-header">
        <div className="payment-title-row">
          <button onClick={() => navigate(-1)} aria-label="Quay lại"><ChevronLeft /></button>
          <h1>Thanh toán</h1>
        </div>
        <div className="payment-steps">
          <StepIndicator number="1" label="Nhập thông tin" state="done" />
          <span className="payment-step-line"></span>
          <StepIndicator number="2" label="Mua dịch vụ" state="done" />
          <span className="payment-step-line"></span>
          <StepIndicator number="3" label="Thanh toán" state="active" />
        </div>
      </header>

      <main className="payment-main">
        <section className="payment-deadline">
          <InfoIcon />
          <div>
            <h2>Hoàn tất thanh toán trong {formatCountdown(secondsLeft)}</h2>
            <p>Chúng tôi đang giữ chỗ cho bạn. Vui lòng thanh toán trước khi thời gian hết hạn.</p>
          </div>
          <strong>{formatCountdown(secondsLeft)}</strong>
        </section>

        <section className="payment-card payment-booking-card">
          <div className="payment-section-title">
            <TicketIcon />
            <h2>Thông tin đặt vé</h2>
            <button type="button">Xem chi tiết⌄</button>
          </div>
          <div className="payment-flight-box">
            {segments.map((segment, index) => (
              <div key={segment.id} className={`payment-flight-row ${index > 0 ? 'with-divider' : ''}`}>
                <img src={segment.logo} alt={segment.airline} />
                <div><strong>{segment.fromCode}</strong><span>{segment.fromCity}</span></div>
                <div className="payment-flight-line">
                  <span>{segment.departureTime}</span>
                  <PlaneIcon />
                  <span>{segment.arrivalTime}</span>
                  <small>{formatDuration(segment.duration)}</small>
                </div>
                <div><strong>{segment.toCode}</strong><span>{segment.toCity}</span></div>
              </div>
            ))}
            <div className="payment-trip-info">
              <span><CalendarIcon />{formatDate(searchData.departureDate)}</span>
              <span><UserIcon />{adults} Người lớn</span>
              <span><ChildIcon />{children} Trẻ em</span>
              <span><BabyIcon />{babies} Em bé</span>
            </div>
          </div>
        </section>

        <section className="payment-card">
          <div className="payment-section-title"><CardIcon /><h2>Phương thức thanh toán</h2></div>
          <div className="payment-method-list">
            {PAYMENT_METHODS.map(method => (
              <button
                key={method.id}
                type="button"
                className={`payment-method ${method.id} ${selectedMethod === method.id ? 'selected' : ''}`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <span className="payment-radio"></span>
                {method.logo ? (
                  <img className={`payment-method-logo ${method.id}`} src={method.logo} alt={method.title} />
                ) : (
                  <span className={`payment-method-icon ${method.id}`}>
                    {method.id === 'international' ? '●●' : method.id === 'domestic-card' ? 'ATM' : <CardIcon />}
                  </span>
                )}
                <span className="payment-method-text"><strong>{method.title}</strong>{method.subtitle && <small>{method.subtitle}</small>}</span>
                {method.badge && <b className={`payment-method-badge ${method.id}`}>{method.badge}</b>}
              </button>
            ))}
          </div>
          <p className="payment-secure"><LockIcon />Giao dịch được bảo mật và mã hóa tuyệt đối.</p>
        </section>

        <section className="payment-card payment-total-card">
          <div className="payment-section-title"><ReceiptIcon /><h2>Chi tiết thanh toán</h2></div>
          <div className="payment-total-lines">
            <div><span>Giá vé ({adults} Người lớn)</span><strong>{formatMoney(ticketTotal)}</strong></div>
            <div><span>Hành lý</span><strong>{formatMoney(baggageTotal)}</strong></div>
            <div><span>Thuế & phí</span><strong>{formatMoney(feeTotal)}</strong></div>
          </div>
          <div className="payment-grand-total"><span>Tổng cộng</span><strong>{formatMoney(grandTotal)}</strong></div>
        </section>

        <button
          className="payment-submit-btn"
          onClick={handleSubmitPayment}
        >
          <LockIcon />Thanh toán {formatMoney(grandTotal)}
        </button>
        <div className="payment-safe"><ShieldIcon />An toàn - Bảo mật - Được bảo vệ bởi SSL 256-bit</div>
      </main>
    </div>
  )
}

export default PaymentPage
