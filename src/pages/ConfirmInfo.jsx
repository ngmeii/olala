import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import background2 from '../assets/images/background2.png'
import logoSun from '../assets/icons/sun-phuquoc-airways.png'
import logoVietjet from '../assets/icons/vietjet air.png'
import logoVNA from '../assets/icons/logo vietnam airlines.png'
import logoBamboo from '../assets/icons/bamboo.png'
import { saveBookingTicket } from '../utils/ticketStorage'

const CONFIRM_ERROR_CODES = {
  '1': {
    type: 'error',
    message: 'Chuyến bay đã hết chỗ hoặc không còn khả dụng'
  },
  '2': {
    type: 'warning',
    message: 'Giá vé đã thay đổi, vui lòng xác nhận lại'
  },
  '3': {
    type: 'error',
    message: 'Dịch vụ/hành lý đã chọn không còn khả dụng'
  }
}

const getConfirmErrorCode = (searchData) => {
  const stateErrorCode = searchData.confirmErrorCode || searchData.errorCode
  if (stateErrorCode) return String(stateErrorCode)

  try {
    return sessionStorage.getItem('confirmInfoErrorCode') || sessionStorage.getItem('confirmErrorCode')
  } catch {
    return null
  }
}

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

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
  </svg>
)

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.1a1.5 1.5 0 00-1.029-1.424l-3.64-1.213a1.5 1.5 0 00-1.607.407l-.853.853a11.25 11.25 0 01-5.894-5.894l.853-.853a1.5 1.5 0 00.407-1.607l-1.213-3.64A1.5 1.5 0 006.6 3H5.5A2.25 2.25 0 003.25 5.25v1.5z" />
  </svg>
)

const BagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6A2.25 2.25 0 0110.5 3.75h3A2.25 2.25 0 0115.75 6v1.5M5.25 7.5h13.5A1.5 1.5 0 0120.25 9v9.75a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V9a1.5 1.5 0 011.5-1.5z" />
  </svg>
)

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.75V9.75A2.25 2.25 0 0018.75 7.5H5.25A2.25 2.25 0 003 9.75v8.25A2.25 2.25 0 005.25 20.25h13.5A2.25 2.25 0 0021 18v-3m0-1.5h-4.5a1.5 1.5 0 000 3H21v-3zM6 7.5V6a2.25 2.25 0 012.25-2.25h8.25" />
  </svg>
)

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M12 8.25h.008v.008H12V8.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.5a4.5 4.5 0 00-9 0v3m-.75 0h10.5A1.5 1.5 0 0118.75 12v6.75a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5z" />
  </svg>
)

const StepIndicator = ({ number, label, state }) => (
  <div className={`confirm-step ${state || ''}`}>
    <span className="confirm-step-dot">{state === 'done' ? <CheckIcon /> : number}</span>
    <span>{label}</span>
  </div>
)

const getLogo = (airline = '') => {
  const lower = airline.toLowerCase()
  if (lower.includes('vietjet')) return logoVietjet
  if (lower.includes('vietnam')) return logoVNA
  if (lower.includes('bamboo')) return logoBamboo
  return logoSun
}

const formatMoney = (value) => `${Math.max(0, value || 0).toLocaleString('vi-VN')}đ`

const formatDob = (value) => {
  if (!value) return ''
  if (value.includes('/')) return value
  const parts = value.split('-')
  if (parts.length !== 3) return value
  return `${parts[2]}/${parts[1]}/${parts[0]}`
}

const formatDuration = (value) => {
  if (!value) return '1h 50m'
  if (value.includes(':')) {
    const [hours, minutes] = value.split(':')
    return `${Number(hours)}h ${minutes}m`
  }
  return value
}

const getPassengerKind = (index, searchData) => {
  const adults = searchData.adults || 1
  const children = searchData.children || 0
  if (index < adults) return 'Người lớn'
  if (index < adults + children) return 'Trẻ em 2-12 tuổi'
  return 'Trẻ em dưới 2 tuổi'
}

const getPassengerGenderLabel = (gender = '') => {
  if (gender === 'Nam') return 'Nam'
  if (gender === 'Nữ') return 'Nữ'
  return gender
}

const getSegmentName = (segmentId) => segmentId === 'return' ? 'chiều về' : 'chiều đi'

const getBaggageInfo = (value) => {
  if (!value || value === 'none') return { text: 'Không mua hành lý', price: 0 }
  const match = value.match(/xwbg-(\d+)/)
  const kg = match ? Number(match[1]) : 0
  return { text: `${kg}kg`, price: kg * 13000 }
}

const buildSegments = (searchData) => {
  const dep = searchData.selectedDep || {}
  const ret = searchData.selectedRet || {}
  const from = searchData.from || dep.departureCity || 'Hà Nội'
  const to = searchData.to || dep.arrivalCity || 'TP. Hồ Chí Minh'

  const segments = [
    {
      id: 'departure',
      title: 'Chuyến bay chiều đi',
      flight: dep,
      fromCity: dep.departureCity || from,
      toCity: dep.arrivalCity || to,
      fromCode: dep.departureCode || 'HAN',
      toCode: dep.arrivalCode || 'SGN'
    }
  ]

  if (searchData.returnDate || searchData.selectedRet) {
    segments.push({
      id: 'return',
      title: 'Chuyến bay chiều về',
      flight: ret,
      fromCity: ret.departureCity || to,
      toCity: ret.arrivalCity || from,
      fromCode: ret.departureCode || dep.arrivalCode || 'SGN',
      toCode: ret.arrivalCode || dep.departureCode || 'HAN'
    })
  }

  return segments
}

const FlightBlock = ({ segment }) => {
  const flight = segment.flight || {}

  return (
    <section className="confirm-flight-block">
      <h3>{segment.title}</h3>
      <div className="confirm-route-card">
        <div className="confirm-airline">
          <img src={getLogo(flight.airline)} alt={flight.airline || 'Airline'} />
        </div>
        <div className="confirm-airport left">
          <strong>{segment.fromCode}</strong>
          <span>{segment.fromCity}</span>
        </div>
        <div className="confirm-timeline">
          <div className="confirm-time-row">
            <span>{flight.departureTime || '08:30'}</span>
            <i><PlaneIcon /></i>
            <span>{flight.arrivalTime || '10:20'}</span>
          </div>
          <small>{formatDuration(flight.duration)}</small>
        </div>
        <div className="confirm-airport right">
          <strong>{segment.toCode}</strong>
          <span>{segment.toCity}</span>
        </div>
      </div>
      <div className="confirm-flight-meta">
        <div><span>Hãng bay</span><strong>{flight.airline || 'Vietnam Airlines'}</strong></div>
        <div><span>Chuyến bay</span><strong>{flight.flightNumber || 'VN1201'}</strong></div>
        <div><span>Giờ bay</span><strong>{flight.departureTime || '08:30'} - {flight.arrivalTime || '10:20'}</strong></div>
        <div><span>Hạng chỗ</span><strong>{flight.fareClass || 'Phổ thông'}</strong></div>
      </div>
    </section>
  )
}

function ConfirmInfo() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchData = useMemo(() => location.state || {}, [location.state])
  const passengers = useMemo(() => (
    Array.isArray(searchData.passengers) ? searchData.passengers : []
  ), [searchData.passengers])
  const contactInfo = searchData.contactInfo || {}
  const baggageSelections = useMemo(() => searchData.baggageSelections || {}, [searchData.baggageSelections])
  const segments = useMemo(() => buildSegments(searchData), [searchData])

  const baggageTotal = useMemo(() => passengers.reduce((total, passenger, passengerIndex) => (
    total + segments.reduce((segmentTotal, segment) => {
      const key = `${passenger.id || passengerIndex + 1}_${segment.id}`
      return segmentTotal + getBaggageInfo(baggageSelections[key]).price
    }, 0)
  ), 0), [passengers, segments, baggageSelections])

  const ticketTotal = (searchData.selectedDep?.priceValue || 0) + (searchData.selectedRet?.priceValue || 0)
  const feeTotal = 0
  const grandTotal = ticketTotal + baggageTotal + feeTotal

  const handleConfirmPayment = () => {
    const errorCode = getConfirmErrorCode(searchData)
    const errorConfig = CONFIRM_ERROR_CODES[errorCode]

    if (!errorConfig) {
      const ticket = saveBookingTicket(searchData, 'waiting')
      navigate('/payment', { state: ticket.rawSearchData })
      return
    }

    if (errorConfig.type === 'warning') {
      if (window.confirm(errorConfig.message)) {
        const ticket = saveBookingTicket(searchData, 'waiting')
        navigate('/payment', { state: ticket.rawSearchData })
      }
      return
    }

    toast.error(errorConfig.message, {
      style: { borderRadius: '12px', background: '#333', color: '#fff' }
    })
  }

  return (
    <div className="confirm-page">
      <div
        className="confirm-background"
        style={{ backgroundImage: `url(${background2})` }}
      >
        <div className="confirm-background-overlay" />
      </div>

      <header className="confirm-header">
        <div className="confirm-title-row">
          <button onClick={() => navigate(-1)} aria-label="Quay lại"><ChevronLeft /></button>
          <h1>Xác nhận thông tin</h1>
          <div className="confirm-menu"><span>...</span><em></em><span>×</span></div>
        </div>
        <div className="confirm-steps">
          <StepIndicator number="1" label="Nhập thông tin" state="done" />
          <span className="confirm-step-line"></span>
          <StepIndicator number="2" label="Mua dịch vụ" state="done" />
          <span className="confirm-step-line"></span>
          <StepIndicator number="3" label="Thanh toán" state="active" />
        </div>
      </header>

      <main className="confirm-main">
        <section className="confirm-card confirm-flight-card">
          <div className="confirm-section-title"><PlaneIcon /><h2>Chi tiết chuyến bay</h2></div>
          {segments.map(segment => <FlightBlock key={segment.id} segment={segment} />)}
        </section>

        <section className="confirm-card confirm-passenger-card">
          <div className="confirm-section-title"><UserIcon /><h2>Thông tin hành khách</h2></div>
          <div className="confirm-passenger-table">
            {passengers.map((passenger, index) => (
              (() => {
                const passengerInfo = index < (searchData.adults || 1)
                  ? (passenger.extra || contactInfo.phone || '')
                  : formatDob(passenger.extra)
                const accompanyingInfo = passenger.accompanying
                  ? `Người lớn đi kèm: ${passengers.find(p => String(p.id) === String(passenger.accompanying))?.name || `Hành khách ${passenger.accompanying}`}`
                  : ''

                return (
              <div key={passenger.id || index} className="confirm-passenger-row">
                <span className="confirm-passenger-number">{index + 1}</span>
                <div className="confirm-passenger-name">
                  <strong>{passenger.name || `HÀNH KHÁCH ${index + 1}`}</strong>
                  <span>{[getPassengerGenderLabel(passenger.gender), getPassengerKind(index, searchData), passengerInfo].filter(Boolean).join(' - ')}</span>
                  {accompanyingInfo && <span>{accompanyingInfo}</span>}
                </div>
              </div>
                )
              })()
            ))}
          </div>
        </section>

        <div className="confirm-two-col">
          <section className="confirm-card confirm-small-card">
            <div className="confirm-section-title"><PhoneIcon /><h2>Thông tin liên hệ</h2></div>
            <dl className="confirm-info-list">
              <div><dt>Giới tính:</dt><dd>{contactInfo.gender === 'Nam' ? 'Ông' : contactInfo.gender === 'Nữ' ? 'Bà' : contactInfo.gender}</dd></div>
              <div><dt>Họ và tên:</dt><dd>{contactInfo.name}</dd></div>
              <div><dt>Điện thoại liên hệ:</dt><dd>{contactInfo.phone}</dd></div>
              <div><dt>Email liên hệ:</dt><dd>{contactInfo.email}</dd></div>
              <div className="with-line"><dt>Xuất hóa đơn:</dt><dd>{searchData.exportInvoice ? 'Có' : 'Không'}</dd></div>
            </dl>
          </section>

          <section className="confirm-card confirm-small-card">
            <div className="confirm-section-title"><BagIcon /><h2>Dịch vụ đã chọn</h2></div>
            <div className="confirm-service-list">
              {passengers.map((passenger, passengerIndex) => (
                <div key={passenger.id || passengerIndex}>
                  <strong>{passenger.name || `HÀNH KHÁCH ${passengerIndex + 1}`}:</strong>
                  <p>
                    {segments.map(segment => {
                      const key = `${passenger.id || passengerIndex + 1}_${segment.id}`
                      const selected = getBaggageInfo(baggageSelections[key])
                      return <span key={segment.id}>{selected.text} {getSegmentName(segment.id)}</span>
                    })}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="confirm-card confirm-total-card">
          <div className="confirm-section-title"><WalletIcon /><h2>Tổng thanh toán</h2></div>
          <div className="confirm-total-lines">
            <div><span>Giá vé</span><strong>{formatMoney(ticketTotal)}</strong></div>
            <div><span>Hành lý</span><strong>{formatMoney(baggageTotal)}</strong></div>
            <div><span>Thuế & phí</span><strong>{formatMoney(feeTotal)}</strong></div>
          </div>
          <div className="confirm-grand-total"><span>Tổng cộng</span><strong>{formatMoney(grandTotal)}</strong></div>
        </section>

        <div className="confirm-alert"><InfoIcon /><span>Vui lòng kiểm tra kỹ thông tin trước khi thanh toán.</span></div>
        <button
          className="confirm-later-btn"
          onClick={() => {
            const ticket = saveBookingTicket(searchData, 'waiting')
            navigate('/booking-pending', { state: ticket.rawSearchData })
          }}
        >
          <WalletIcon />Chỉ xác nhận, thanh toán sau
        </button>
        <button className="confirm-pay-btn" onClick={handleConfirmPayment}><LockIcon />Xác nhận và thanh toán</button>
      </main>
    </div>
  )
}

export default ConfirmInfo
