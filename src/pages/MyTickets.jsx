import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import BottomNav from '../components/BottomNav'
import ZaloPermissionModal, { ZALO_USER } from '../components/ZaloPermissionModal'
import logoVietjet from '../assets/icons/vietjet air.png'
import logoVNA from '../assets/icons/logo vietnam airlines.png'
import background2 from '../assets/images/background2.png'
import { getSavedTickets } from '../utils/ticketStorage'

const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
)

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M5.25 5.25h13.5A1.5 1.5 0 0120.25 6.75v12A1.5 1.5 0 0118.75 20.25H5.25A1.5 1.5 0 013.75 18.75v-12A1.5 1.5 0 015.25 5.25z" />
  </svg>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
  </svg>
)

const BagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6A2.25 2.25 0 0110.5 3.75h3A2.25 2.25 0 0115.75 6v1.5M5.25 7.5h13.5A1.5 1.5 0 0120.25 9v9.75a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V9a1.5 1.5 0 011.5-1.5z" />
  </svg>
)

const SeatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5v6.75a3 3 0 003 3h3.75M8.25 14.25v5.25M15 14.25l1.5 5.25M6.75 19.5h11.25" />
  </svg>
)

const TicketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7.5a2 2 0 012-2h11a2 2 0 012 2v2.25a2.25 2.25 0 000 4.5v2.25a2 2 0 01-2 2h-11a2 2 0 01-2-2v-2.25a2.25 2.25 0 000-4.5V7.5zM9 9h.01M9 12h.01M9 15h.01" />
  </svg>
)

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 8.25h9a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5h-9a1.5 1.5 0 01-1.5-1.5v-9a1.5 1.5 0 011.5-1.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 8.25v-3a1.5 1.5 0 00-1.5-1.5h-9a1.5 1.5 0 00-1.5 1.5v9a1.5 1.5 0 001.5 1.5h1.5" />
  </svg>
)

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M12 8.25h.008v.008H12V8.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.5a4.5 4.5 0 0 0-9 0v3M6.75 10.5h10.5a1.5 1.5 0 0 1 1.5 1.5v6.75a1.5 1.5 0 0 1-1.5 1.5H6.75a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5Z" />
  </svg>
)

const STATUS_CONFIG = {
  waiting: { label: 'CHỜ THANH TOÁN', color: '#f97316', badge: '#fff1e5', icon: 'clock' },
  processing: { label: 'ĐANG XỬ LÝ', color: '#0d6df2', badge: '#eaf2ff', icon: 'spin' },
  issued: { label: 'ĐÃ XUẤT VÉ', color: '#16a34a', badge: '#e6f8ee', icon: 'check' },
  canceled: { label: 'ĐÃ HỦY', color: '#64748b', badge: '#eef2f7', icon: 'x' },
  canceledDanger: { label: 'ĐÃ HỦY', color: '#ef1f35', badge: '#ffe8eb', icon: 'x' }
}

const LOGO_BY_KEY = {
  vietjet: logoVietjet,
  vietnam: logoVNA,
  sun: logoVietjet,
  bamboo: logoVietjet
}

const PAYMENT_DEADLINE_STORAGE_KEY = 'bookingPaymentDeadlineAt'
const PAYMENT_HOLD_SECONDS = 15 * 60

const formatCountdown = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

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

const tickets = [
  {
    status: 'waiting',
    code: 'Z6H7X2',
    logo: logoVietjet,
    fromCode: 'HAN',
    fromCity: 'Hà Nội',
    toCode: 'SGN',
    toCity: 'Hồ Chí Minh',
    time: '23:05 - 01:15',
    duration: '2h 10m',
    date: 'T5, 14/05/2026',
    fareClass: 'Eco',
    passengers: '1 Hành khách',
    baggage: '0 Túi ký gửi',
    ticketTotal: 5460000,
    feeTotal: 120000,
    grandTotal: 5580000,
    paidAmount: 2000000
  },
  {
    status: 'processing',
    code: 'M4P8Q1',
    logo: logoVietjet,
    fromCode: 'SGN',
    fromCity: 'Hồ Chí Minh',
    toCode: 'DAD',
    toCity: 'Đà Nẵng',
    time: '10:20 - 11:35',
    duration: '1h 15m',
    date: 'T6, 15/05/2026',
    fareClass: 'Economy',
    passengers: '1 Hành khách',
    seat: '12A',
    baggage: '0 Túi ký gửi',
    note: 'Chúng tôi đang xác nhận thông tin đặt chỗ của bạn.'
  },
  {
    status: 'issued',
    code: 'F3K8L9',
    logo: logoVNA,
    fromCode: 'HAN',
    fromCity: 'Hà Nội',
    toCode: 'SGN',
    toCity: 'Hồ Chí Minh',
    time: '21:30 - 23:40',
    duration: '2h 10m',
    date: 'T3, 05/05/2026',
    fareClass: 'Economy Classic',
    passengers: '1 Hành khách',
    seat: '12A',
    baggage: '0 Túi ký gửi'
  },
  {
    status: 'canceled',
    code: 'K7N2D8',
    logo: logoVietjet,
    fromCode: 'SGN',
    fromCity: 'Hồ Chí Minh',
    toCode: 'PQC',
    toCity: 'Phú Quốc',
    time: '14:50 - 15:50',
    duration: '1h 00m',
    date: 'CN, 03/05/2026',
    fareClass: 'Eco',
    passengers: '1 Hành khách',
    baggage: '0 Túi ký gửi',
    note: 'Chuyến bay đã được hủy theo yêu cầu của bạn.'
  },
  {
    status: 'canceledDanger',
    code: 'QH5R7T',
    logo: logoVietjet,
    fromCode: 'HAN',
    fromCity: 'Hà Nội',
    toCode: 'SGN',
    toCity: 'Hồ Chí Minh',
    time: '23:05 - 01:15',
    duration: '2h 10m',
    date: 'T5, 14/05/2026',
    fareClass: 'Eco',
    passengers: '1 Hành khách',
    baggage: '0 Túi ký gửi',
    note: 'Đặt chỗ đã bị hủy do quá hạn thanh toán.'
  }
]

const tabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'waiting', label: 'Chờ thanh toán' },
  { id: 'processing', label: 'Đang xử lý' },
  { id: 'issued', label: 'Đã xuất vé' },
  { id: 'canceled', label: 'Đã hủy' }
]

const StatusBadge = ({ status, countdownText, isPartialPayment }) => {
  const config = STATUS_CONFIG[status]
  return (
    <span className="ticket-status-badge" style={{ color: config.color, backgroundColor: config.badge }}>
      {config.icon === 'clock' && <span className="ticket-status-symbol">◷</span>}
      {config.icon === 'spin' && <span className="ticket-status-symbol">◌</span>}
      {config.icon === 'check' && <span className="ticket-status-symbol">✓</span>}
      {config.icon === 'x' && <span className="ticket-status-symbol">×</span>}
      {isPartialPayment ? 'THANH TOÁN THIẾU' : config.label}
      {countdownText && <b>{countdownText}</b>}
    </span>
  )
}

const getPassengerLabel = (ticket) => {
  const data = ticket.rawSearchData
  if (!data) return ticket.passengers

  const count = (data.adults || 0) + (data.children || 0) + (data.babies || 0)
  return `${count || 1} Hành khách`
}

function TicketCard({ ticket, paymentCountdown }) {
  const navigate = useNavigate()
  const config = STATUS_CONFIG[ticket.status]
  const ticketLogo = ticket.logo || LOGO_BY_KEY[ticket.logoKey] || logoVietjet
  const isWaiting = ticket.status === 'waiting'
  const isProcessing = ticket.status === 'processing'
  const isIssued = ticket.status === 'issued'
  const isCanceled = ticket.status === 'canceled' || ticket.status === 'canceledDanger'
  const isPartialPayment = isWaiting && ticket.paidAmount > 0 && ticket.paidAmount < ticket.grandTotal
  const paymentState = {
    ...(ticket.rawSearchData || {
      bookingCode: ticket.code,
      feeTotal: ticket.feeTotal || 0,
      selectedDep: { priceValue: ticket.ticketTotal || 0 }
    }),
    paidAmount: ticket.paidAmount || 0,
    grandTotal: ticket.grandTotal || 0
  }

  return (
    <article className="ticket-card" style={{ '--ticket-accent': config.color }}>
      <div className="ticket-card-top">
        <StatusBadge status={ticket.status} countdownText={ticket.status === 'waiting' ? paymentCountdown : ''} isPartialPayment={isPartialPayment} />
        <div className="ticket-code">Mã booking: <strong>{ticket.code}</strong><CopyIcon /></div>
      </div>

      <div className="ticket-route-row">
        <img src={ticketLogo} alt="Airline" />
        <div className="ticket-airport"><strong>{ticket.fromCode}</strong><span>{ticket.fromCity}</span></div>
        <div className="ticket-route-line">
          <PlaneIcon />
          <strong>{ticket.time}</strong>
          <span>{ticket.duration}</span>
        </div>
        <div className="ticket-airport"><strong>{ticket.toCode}</strong><span>{ticket.toCity}</span></div>
      </div>

      <div className={`ticket-meta ${ticket.seat ? 'with-seat' : ''}`}>
        <span><CalendarIcon />{ticket.date}</span>
        <span><UserIcon />{getPassengerLabel(ticket)}</span>
        {ticket.seat && <span><SeatIcon />{ticket.seat}</span>}
        <span><BagIcon />{ticket.baggage}</span>
      </div>

      {ticket.note && (
        <div className={`ticket-note ${ticket.status === 'canceledDanger' ? 'danger' : ''}`}>
          <InfoIcon />
          <span>
            <strong>{ticket.note}</strong>
          </span>
        </div>
      )}

      <div className={`ticket-actions ${isCanceled ? 'single-action' : ''}`}>
        <button
          type="button"
          className="ticket-outline-btn"
          onClick={() => navigate(`/tickets/${ticket.code}`, { state: { ticket } })}
        >
          <TicketIcon />Xem chi tiết
        </button>
        {isWaiting && (
          <button type="button" className="ticket-pay-btn" onClick={() => navigate('/payment', { state: paymentState })}><CardMiniIcon />{isPartialPayment ? 'Thanh toán bổ sung' : 'Thanh toán ngay'}</button>
        )}
        {isProcessing && <button type="button" className="ticket-confirm-btn">Đang xác nhận</button>}
        {isIssued && (
          <button
            type="button"
            className="ticket-issued-btn"
            onClick={() => navigate(`/tickets/${ticket.code}/e-ticket`, { state: { ticket } })}
          >
            ▦ Xem vé điện tử
          </button>
        )}
      </div>
    </article>
  )
}

const CardMiniIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5A2.25 2.25 0 016 5.25h12A2.25 2.25 0 0120.25 7.5v9A2.25 2.25 0 0118 18.75H6A2.25 2.25 0 013.75 16.5v-9zM3.75 9.75h16.5M7.5 15h3" />
  </svg>
)

function MyTickets() {
  const [activeTab, setActiveTab] = useState('all')
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('zalo_user')))
  const [showPermissionPopup, setShowPermissionPopup] = useState(false)
  const [savedTickets] = useState(() => getSavedTickets())
  const [paymentDeadlineAt] = useState(getPaymentDeadlineAt)
  const [paymentSecondsLeft, setPaymentSecondsLeft] = useState(() => getSecondsUntilDeadline(paymentDeadlineAt))
  const paymentCountdown = formatCountdown(paymentSecondsLeft)
  const allTickets = [
    ...savedTickets,
    ...tickets.filter(ticket => !savedTickets.some(savedTicket => savedTicket.code === ticket.code))
  ].map(ticket => {
    const isExpiredPartialPayment = paymentSecondsLeft === 0
      && ticket.status === 'waiting'
      && ticket.paidAmount > 0
      && ticket.paidAmount < ticket.grandTotal

    if (!isExpiredPartialPayment) return ticket

    return {
      ...ticket,
      status: 'canceledDanger',
      note: 'Đặt chỗ đã bị hủy do quá hạn thanh toán bổ sung.',
      cancellation: {
        reason: 'Quá hạn thanh toán bổ sung',
        policy: 'Khoản tiền đã nhận được chuyển sang trạng thái chờ hoàn tiền.',
        paymentStatus: `Đã thanh toán ${ticket.paidAmount.toLocaleString('vi-VN')}đ`,
        refundStatus: 'Đang xử lý',
        bookingStatus: 'Đã hủy'
      }
    }
  })
  const visibleTickets = activeTab === 'all'
    ? allTickets
    : allTickets.filter(ticket => {
      if (activeTab === 'canceled') return ticket.status === 'canceled' || ticket.status === 'canceledDanger'
      return ticket.status === activeTab
    })

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setPaymentSecondsLeft(getSecondsUntilDeadline(paymentDeadlineAt))
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [paymentDeadlineAt])

  const handleLogin = () => {
    setShowPermissionPopup(true)
  }

  const handleAllowLogin = () => {
    localStorage.setItem('zalo_user', JSON.stringify(ZALO_USER))
    setIsLoggedIn(true)
    setShowPermissionPopup(false)
    toast.success('Đăng nhập thành công')
  }

  const handleDeclineLogin = () => {
    setShowPermissionPopup(false)
    toast.error('Bạn cần cho phép truy cập thông tin Zalo để đăng nhập')
  }

  return (
    <div className="mytickets-page">
      <div className="mytickets-background" style={{ backgroundImage: `url(${background2})` }}>
        <div className="mytickets-background-overlay" />
      </div>

      <header className="mytickets-header">
        <h1>Vé của tôi</h1>
      </header>

      {isLoggedIn ? (
        <>
          <div className="mytickets-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                className={activeTab === tab.id ? 'active' : ''}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <main className="mytickets-list">
            {visibleTickets.map(ticket => <TicketCard key={ticket.code} ticket={ticket} paymentCountdown={paymentCountdown} />)}
          </main>
        </>
      ) : (
        <main className="mytickets-login-required">
          <section className="mytickets-login-card">
            <div className="mytickets-login-icon">
              <LockIcon />
            </div>
            <h2>Đăng nhập để xem lịch sử đặt vé</h2>
            <p>Bạn cần đăng nhập tài khoản để xem và quản lý các vé đã đặt.</p>
            <button type="button" onClick={handleLogin}>Đăng nhập</button>
          </section>
        </main>
      )}

      <BottomNav />
      {showPermissionPopup && (
        <ZaloPermissionModal
          onAllow={handleAllowLogin}
          onDecline={handleDeclineLogin}
        />
      )}
    </div>
  )
}

export default MyTickets
