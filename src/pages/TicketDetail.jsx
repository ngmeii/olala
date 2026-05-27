import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import logoSun from '../assets/icons/sun-phuquoc-airways.png'
import logoVietjet from '../assets/icons/vietjet air.png'
import logoVNA from '../assets/icons/logo vietnam airlines.png'
import logoBamboo from '../assets/icons/bamboo.png'
import background2 from '../assets/images/background2.png'
import { getSavedTickets, saveBookingTicket } from '../utils/ticketStorage'

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
)

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 8.25h9a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5h-9a1.5 1.5 0 01-1.5-1.5v-9a1.5 1.5 0 011.5-1.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 8.25v-3a1.5 1.5 0 00-1.5-1.5h-9a1.5 1.5 0 00-1.5 1.5v9a1.5 1.5 0 001.5 1.5h1.5" />
  </svg>
)

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

const CardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5A2.25 2.25 0 016 5.25h12A2.25 2.25 0 0120.25 7.5v9A2.25 2.25 0 0118 18.75H6A2.25 2.25 0 013.75 16.5v-9zM3.75 9.75h16.5M7.5 15h3" />
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3.5 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.4} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M12 8.25h.008v.008H12V8.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const EDeckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 7.5a2 2 0 012-2h11a2 2 0 012 2v2.25a2.25 2.25 0 000 4.5v2.25a2 2 0 01-2 2h-11a2 2 0 01-2-2v-2.25a2.25 2.25 0 000-4.5V7.5zM8.25 9h7.5M8.25 15h7.5" />
  </svg>
)

const BanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 115.636 5.636a9 9 0 0112.728 12.728zM6.75 6.75l10.5 10.5" />
  </svg>
)

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.1a1.5 1.5 0 00-1.029-1.424l-3.64-1.213a1.5 1.5 0 00-1.607.407l-.853.853a11.25 11.25 0 01-5.894-5.894l.853-.853a1.5 1.5 0 00.407-1.607l-1.213-3.64A1.5 1.5 0 006.6 3H5.5A2.25 2.25 0 003.25 5.25v1.5z" />
  </svg>
)

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5v9A2.25 2.25 0 0119.5 18.75h-15A2.25 2.25 0 012.25 16.5v-9A2.25 2.25 0 014.5 5.25h15A2.25 2.25 0 0121.75 7.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l8.25 5.5a1.5 1.5 0 001.5 0L21 7" />
  </svg>
)

const ContactUserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
  </svg>
)

const GenderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM12 12v8.25M8.75 17h6.5" />
  </svg>
)

const CancelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l6 6M15 9l-6 6M8.25 3.75h7.5M9.75 3.75l.75 2.25h3l.75-2.25M5.25 6h13.5l-1.05 13.125a2.25 2.25 0 01-2.243 2.075H8.543A2.25 2.25 0 016.3 19.125L5.25 6z" />
  </svg>
)

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25h5.25M7.5 10.5h9M21 11.625c0 4.349-4.03 7.875-9 7.875a10.46 10.46 0 01-3.928-.749L3 20.25l1.4-4.198C3.52 14.78 3 13.26 3 11.625 3 7.276 7.03 3.75 12 3.75s9 3.526 9 7.875z" />
  </svg>
)

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

const formatPaymentDeadline = (date) => {
  const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  const dateText = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
  return `${time} ngày ${dateText}`
}

const formatDate = (value) => {
  if (!value) return ''
  if (String(value).includes('/')) return value
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
  return `${weekdays[date.getDay()]}, ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
}

const formatPlainDate = (value) => {
  const dateText = formatDate(value)
  return dateText.includes(', ') ? dateText.split(', ')[1] : dateText
}

const formatMoney = (value) => `${Math.max(0, value || 0).toLocaleString('vi-VN')}đ`

const formatDuration = (value) => {
  if (!value) return '1h 50m'
  if (value.includes(':')) {
    const [hours, minutes] = value.split(':')
    return `${Number(hours)}h ${minutes}m`
  }
  return value
}

const parseSelectedLocation = (value, fallbackCode, fallbackCity) => {
  if (!value) return { code: fallbackCode, city: fallbackCity }
  const match = String(value).match(/^(.*)\s+\(([^)]+)\)$/)
  if (!match) return { code: fallbackCode, city: value || fallbackCity }
  return { city: match[1], code: match[2] }
}

const getLogo = (airline = '') => {
  const lower = airline.toLowerCase()
  if (lower.includes('vietjet')) return logoVietjet
  if (lower.includes('vietnam')) return logoVNA
  if (lower.includes('bamboo')) return logoBamboo
  return logoSun
}

const getAirportName = (code, city) => {
  if (code === 'HAN' || city?.includes('Hà Nội')) return 'Sân bay Nội Bài'
  if (code === 'SGN' || city?.includes('Hồ Chí Minh')) return 'Sân bay Tân Sơn Nhất'
  if (code === 'DAD' || city?.includes('Đà Nẵng')) return 'Sân bay Đà Nẵng'
  if (code === 'PQC' || city?.includes('Phú Quốc')) return 'Sân bay Phú Quốc'
  return city ? `Sân bay ${city}` : ''
}

const getBaggageInfo = (value) => {
  if (!value || value === 'none') return { text: 'Không mua hành lý', count: 0, price: 0 }
  const match = String(value).match(/xwbg-(\d+)/)
  const kg = match ? Number(match[1]) : 0
  return { text: `${kg}kg`, count: kg > 0 ? 1 : 0, price: kg * 13000 }
}

const getPassengerKind = (index, searchData) => {
  const adults = searchData.adults || 1
  const children = searchData.children || 0
  if (index < adults) return 'Người lớn'
  if (index < adults + children) return 'Trẻ em'
  return 'Em bé'
}

const getSegmentLabel = (segmentId) => segmentId === 'return' ? 'chiều về' : 'chiều đi'

const STATIC_TICKET_DETAILS = {
  M4P8Q1: {
    status: 'processing',
    code: 'M4P8Q1',
    airline: 'Vietjet Air',
    fromCode: 'SGN',
    fromCity: 'Hồ Chí Minh',
    toCode: 'DAD',
    toCity: 'Đà Nẵng',
    time: '10:20 - 11:35',
    duration: '1h 15m',
    date: 'T6, 15/05/2026',
    passengers: '1 Người lớn',
    seat: '12A',
    baggage: '0 Túi ký gửi',
    note: 'Chúng tôi đang xác nhận thông tin đặt chỗ của bạn.',
    ticketTotal: 980000,
    feeTotal: 120000,
    contactInfo: {
      name: 'Nguyễn Văn A',
      gender: 'Nam',
      phone: '0912 345 678',
      email: 'nguyenvana@gmail.com'
    },
    passengerList: [
      { id: 1, name: 'Nguyễn Văn A', gender: 'Nam', extra: '0912 345 678' }
    ],
    flightNumber: 'VJ 247',
    fareClass: 'Eco',
    aircraft: 'Airbus A320'
  },
  F3K8L9: {
    status: 'issued',
    code: 'F3K8L9',
    airline: 'Vietnam Airlines',
    fromCode: 'HAN',
    fromCity: 'Hà Nội',
    toCode: 'SGN',
    toCity: 'Hồ Chí Minh',
    time: '21:30 - 23:40',
    duration: '2h 10m',
    date: 'T3, 05/05/2026',
    passengers: '1 Người lớn',
    seat: '12A',
    baggage: '0 Túi ký gửi',
    note: 'Vé điện tử đã được gửi đến email của bạn.',
    ticketTotal: 1450000,
    feeTotal: 170000,
    contactInfo: {
      name: 'Nguyễn Văn A',
      gender: 'Nam',
      phone: '0912 345 678',
      email: 'nguyenvana@gmail.com'
    },
    passengerList: [
      { id: 1, name: 'Nguyễn Văn A', gender: 'Nam', extra: '0912 345 678' }
    ],
    flightNumber: 'VN 261',
    fareClass: 'Economy',
    aircraft: 'Airbus A321',
    eTicketNumber: '738 2456789012'
  },
  K7N2D8: {
    status: 'canceled',
    code: 'K7N2D8',
    airline: 'Vietjet Air',
    fromCode: 'SGN',
    fromCity: 'Hồ Chí Minh',
    toCode: 'PQC',
    toCity: 'Phú Quốc',
    time: '14:50 - 15:50',
    duration: '1h 00m',
    date: 'CN, 03/05/2026',
    passengers: '1 Người lớn',
    baggage: '0 Túi ký gửi',
    note: 'Chuyến bay đã được hủy theo yêu cầu của bạn.',
    ticketTotal: 930000,
    feeTotal: 120000,
    contactInfo: {
      name: 'Nguyễn Văn A',
      gender: 'Nam',
      phone: '0912 345 678',
      email: 'nguyenvana@gmail.com'
    },
    passengerList: [
      { id: 1, name: 'Nguyễn Văn A', gender: 'Nam', extra: '01/01/1990' }
    ],
    flightNumber: 'VJ 475',
    fareClass: 'Eco',
    aircraft: 'Airbus A320',
    cancellation: {
      reason: 'Khách hàng chủ động hủy chuyến',
      policy: 'Áp dụng theo điều kiện vé đã mua.',
      paymentStatus: 'Đã thanh toán',
      refundStatus: 'Đang xử lý'
    }
  },
  QH5R7T: {
    status: 'canceledDanger',
    code: 'QH5R7T',
    airline: 'Vietjet Air',
    fromCode: 'HAN',
    fromCity: 'Hà Nội',
    toCode: 'SGN',
    toCity: 'Hồ Chí Minh',
    time: '23:05 - 01:15',
    duration: '2h 10m',
    date: 'T5, 14/05/2026',
    passengers: '1 Người lớn',
    baggage: '0 Túi ký gửi',
    note: 'Đặt chỗ đã bị hủy do quá hạn thanh toán.',
    ticketTotal: 980000,
    feeTotal: 120000,
    contactInfo: {
      name: 'Nguyễn Văn A',
      gender: 'Nam',
      phone: '0912 345 678',
      email: 'nguyenvana@gmail.com'
    },
    passengerList: [
      { id: 1, name: 'Nguyễn Văn A', gender: 'Nam', extra: '0912 345 678' }
    ],
    flightNumber: 'VJ 123',
    fareClass: 'Eco',
    aircraft: 'Airbus A320',
    cancellation: {
      reason: 'Quá hạn thanh toán',
      policy: 'Không phát sinh hoàn tiền do giao dịch chưa thanh toán',
      paymentStatus: 'Chưa thanh toán',
      bookingStatus: 'Đã hủy'
    }
  }
}

const splitTicketTime = (value = '') => {
  const [departureTime = '08:30', arrivalTime = '10:20'] = String(value).split(' - ')
  return { departureTime, arrivalTime }
}

const buildSearchDataFromTicket = (ticket) => {
  if (!ticket) return {}

  const { departureTime, arrivalTime } = splitTicketTime(ticket.time)
  const contactInfo = ticket.contactInfo || {}
  const passengers = ticket.passengerList || [{
    id: 1,
    name: contactInfo.name || 'Nguyễn Văn A',
    gender: contactInfo.gender || 'Nam',
    extra: contactInfo.phone || '0912 345 678'
  }]

  return {
    bookingCode: ticket.code,
    from: `${ticket.fromCity} (${ticket.fromCode})`,
    to: `${ticket.toCity} (${ticket.toCode})`,
    departureDate: ticket.date,
    adults: passengers.length || 1,
    children: 0,
    babies: 0,
    passengers,
    contactInfo,
    seat: ticket.seat || '',
    feeTotal: ticket.feeTotal || 0,
    selectedDep: {
      airline: ticket.airline || 'Vietjet Air',
      departureCode: ticket.fromCode,
      departureCity: ticket.fromCity,
      arrivalCode: ticket.toCode,
      arrivalCity: ticket.toCity,
      departureTime,
      arrivalTime,
      duration: ticket.duration,
      flightNumber: ticket.flightNumber || 'VJ 247',
      aircraft: ticket.aircraft || '',
      fareClass: ticket.fareClass || 'Eco',
      priceValue: ticket.ticketTotal || 0
    }
  }
}

function TicketDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const { bookingCode } = useParams()
  const [localTicketOverride, setLocalTicketOverride] = useState(null)
  const routeTicket = location.state?.ticket
  const fallbackTicket = STATIC_TICKET_DETAILS[String(bookingCode || '').toUpperCase()]
  const routedTicket = routeTicket && fallbackTicket
    ? {
      ...fallbackTicket,
      ...routeTicket,
      contactInfo: routeTicket.contactInfo || fallbackTicket.contactInfo,
      passengerList: routeTicket.passengerList || fallbackTicket.passengerList,
      ticketTotal: routeTicket.ticketTotal || fallbackTicket.ticketTotal,
      feeTotal: routeTicket.feeTotal || fallbackTicket.feeTotal,
      airline: routeTicket.airline || fallbackTicket.airline,
      flightNumber: routeTicket.flightNumber || fallbackTicket.flightNumber,
      fareClass: routeTicket.fareClass || fallbackTicket.fareClass,
      aircraft: routeTicket.aircraft || fallbackTicket.aircraft,
      eTicketNumber: routeTicket.eTicketNumber || fallbackTicket.eTicketNumber,
      cancellation: routeTicket.cancellation || fallbackTicket.cancellation
    }
    : routeTicket
  const savedTicket = useMemo(() => (
    getSavedTickets().find(ticket => String(ticket.code) === String(bookingCode))
  ), [bookingCode])
  const mergedSavedTicket = savedTicket && fallbackTicket
    ? {
      ...fallbackTicket,
      ...savedTicket,
      contactInfo: savedTicket.contactInfo || fallbackTicket.contactInfo,
      passengerList: savedTicket.passengerList || fallbackTicket.passengerList,
      ticketTotal: savedTicket.ticketTotal || fallbackTicket.ticketTotal,
      feeTotal: savedTicket.feeTotal || fallbackTicket.feeTotal,
      airline: savedTicket.airline || fallbackTicket.airline,
      flightNumber: savedTicket.flightNumber || fallbackTicket.flightNumber,
      fareClass: savedTicket.fareClass || fallbackTicket.fareClass,
      aircraft: savedTicket.aircraft || fallbackTicket.aircraft,
      eTicketNumber: savedTicket.eTicketNumber || fallbackTicket.eTicketNumber,
      cancellation: savedTicket.cancellation || fallbackTicket.cancellation
    }
    : savedTicket
  const sourceTicket = localTicketOverride || mergedSavedTicket || routedTicket || fallbackTicket
  const searchData = sourceTicket?.rawSearchData || buildSearchDataFromTicket(sourceTicket)
  const selectedDep = searchData.selectedDep || {}
  const selectedRet = searchData.selectedRet || null
  const contactInfo = searchData.contactInfo || {}
  const baggageSelections = searchData.baggageSelections || {}
  const adults = searchData.adults || 1
  const passengers = Array.isArray(searchData.passengers) && searchData.passengers.length > 0
    ? searchData.passengers
    : [{ id: 1, name: contactInfo.name || 'Nguyễn Văn A', gender: contactInfo.gender || 'Nam', extra: contactInfo.phone || '0912 345 678' }]
  const passengerCount = (searchData.adults || 0) + (searchData.children || 0) + (searchData.babies || 0) || passengers.length || 1
  const ticketStatus = sourceTicket?.status || 'waiting'
  const isProcessing = ticketStatus === 'processing'
  const isIssued = ticketStatus === 'issued'
  const isExpiredCanceled = ticketStatus === 'canceledDanger'
  const isCanceled = ticketStatus === 'canceled' || isExpiredCanceled
  const selectedSeat = searchData.seat || sourceTicket?.seat || ''
  const [paymentDeadlineAt] = useState(getPaymentDeadlineAt)
  const [paymentSecondsLeft, setPaymentSecondsLeft] = useState(() => getSecondsUntilDeadline(paymentDeadlineAt))
  const paymentDeadline = useMemo(() => new Date(paymentDeadlineAt), [paymentDeadlineAt])
  const paymentCountdown = formatCountdown(paymentSecondsLeft)
  const departureLocation = parseSelectedLocation(
    searchData.from,
    selectedDep.departureCode || sourceTicket?.fromCode || 'HAN',
    selectedDep.departureCity || sourceTicket?.fromCity || 'Hà Nội'
  )
  const arrivalLocation = parseSelectedLocation(
    searchData.to,
    selectedDep.arrivalCode || sourceTicket?.toCode || 'SGN',
    selectedDep.arrivalCity || sourceTicket?.toCity || 'Hồ Chí Minh'
  )
  const flightSegments = (() => {
    const segments = [{
      id: 'departure',
      title: 'Chuyến bay chiều đi',
      flight: selectedDep,
      logo: getLogo(selectedDep.airline),
      fromCode: departureLocation.code,
      fromCity: departureLocation.city,
      fromAirport: getAirportName(departureLocation.code, departureLocation.city),
      toCode: arrivalLocation.code,
      toCity: arrivalLocation.city,
      toAirport: getAirportName(arrivalLocation.code, arrivalLocation.city),
      departureTime: selectedDep.departureTime || '08:30',
      departureDate: formatPlainDate(searchData.departureDate),
      arrivalTime: selectedDep.arrivalTime || '10:20',
      arrivalDate: formatPlainDate(searchData.departureDate),
      duration: formatDuration(selectedDep.duration),
      flightNumber: selectedDep.flightNumber || 'VJ 1234',
      aircraft: selectedDep.aircraft || '',
      fareClass: selectedDep.fareClass || 'Eco'
    }]

    if (selectedRet || searchData.returnDate) {
      segments.push({
        id: 'return',
        title: 'Chuyến bay chiều về',
        flight: selectedRet || {},
        logo: getLogo(selectedRet?.airline || selectedDep.airline),
        fromCode: arrivalLocation.code,
        fromCity: arrivalLocation.city,
        fromAirport: getAirportName(arrivalLocation.code, arrivalLocation.city),
        toCode: departureLocation.code,
        toCity: departureLocation.city,
        toAirport: getAirportName(departureLocation.code, departureLocation.city),
        departureTime: selectedRet?.departureTime || '18:45',
        departureDate: formatPlainDate(searchData.returnDate || searchData.departureDate),
        arrivalTime: selectedRet?.arrivalTime || '20:35',
        arrivalDate: formatPlainDate(searchData.returnDate || searchData.departureDate),
        duration: formatDuration(selectedRet?.duration || selectedDep.duration),
        flightNumber: selectedRet?.flightNumber || 'VJ 5678',
        aircraft: selectedRet?.aircraft || '',
        fareClass: selectedRet?.fareClass || selectedDep.fareClass || 'Eco'
      })
    }

    return segments
  })()
  const firstSegment = flightSegments[0]
  const detailPassengers = passengers.map((passenger, index) => ({
    id: passenger.id || index + 1,
    name: passenger.name || `Hành khách ${index + 1}`,
    displayName: (passenger.name || `Hành khách ${index + 1}`).toUpperCase(),
    gender: passenger.gender || '',
    detail: index < adults ? (passenger.extra || contactInfo.phone || '') : passenger.extra,
    type: getPassengerKind(index, searchData),
    baggage: flightSegments.map(segment => {
      const key = `${passenger.id || index + 1}_${segment.id}`
      const baggage = getBaggageInfo(baggageSelections[key])
      return `${baggage.text} ${getSegmentLabel(segment.id)}`
    })
  }))
  const baggageSummary = passengers.reduce((summary, passenger, passengerIndex) => (
    flightSegments.reduce((currentSummary, segment) => {
      const key = `${passenger.id || passengerIndex + 1}_${segment.id}`
      const baggage = getBaggageInfo(baggageSelections[key])
      return {
        count: currentSummary.count + baggage.count,
        price: currentSummary.price + baggage.price
      }
    }, summary)
  ), { count: 0, price: 0 })
  const computedTicketTotal = (selectedDep.priceValue || 0) + (selectedRet?.priceValue || 0)
  const ticketTotal = computedTicketTotal > 0 ? computedTicketTotal : (sourceTicket?.ticketTotal || 0)
  const baggageTotal = baggageSummary.price > 0 ? baggageSummary.price : (sourceTicket?.baggagePrice || 0)
  const computedFeeTotal = searchData.feeTotal || 0
  const feeTotal = computedFeeTotal > 0 ? computedFeeTotal : (sourceTicket?.feeTotal || 0)
  const computedGrandTotal = ticketTotal + baggageTotal + feeTotal
  const grandTotal = computedGrandTotal > 0 ? computedGrandTotal : (sourceTicket?.grandTotal || 0)
  const displayBookingCode = sourceTicket?.code || bookingCode || searchData.bookingCode || 'OLALA123456'
  const heroPassengerLabel = (isProcessing || isIssued || isCanceled) && passengerCount === 1 ? '1 Người lớn' : `${passengerCount} Hành khách`
  const detailModeClass = isExpiredCanceled ? 'expired' : isCanceled ? 'canceled' : isIssued ? 'issued' : isProcessing ? 'processing' : ''
  const cancellationInfo = sourceTicket?.cancellation || {
    reason: 'Khách hàng chủ động hủy chuyến',
    policy: 'Áp dụng theo điều kiện vé đã mua.',
    paymentStatus: 'Đã thanh toán',
    refundStatus: 'Đang xử lý'
  }
  const isUnpaidCanceled = isCanceled && !isExpiredCanceled && cancellationInfo.paymentStatus && cancellationInfo.bookingStatus
  const invoiceInfo = searchData.invoiceInfo || sourceTicket?.invoiceInfo
  const shouldShowInvoiceInfo = Boolean(searchData.exportInvoice && invoiceInfo && !isCanceled)

  const handleViewETicket = () => {
    navigate(`/tickets/${displayBookingCode}/e-ticket`, { state: { ticket: sourceTicket } })
  }

  const handleCancelBooking = () => {
    const canceledTicket = saveBookingTicket(searchData, 'canceled', {
      note: 'Chuyến bay đã được hủy theo yêu cầu của bạn.',
      ticketTotal,
      baggagePrice: baggageTotal,
      feeTotal,
      grandTotal,
      rawSearchData: {
        ...searchData,
        bookingCode: displayBookingCode,
        feeTotal,
        selectedDep: {
          ...selectedDep,
          priceValue: selectedDep.priceValue || ticketTotal
        }
      },
      cancellation: {
        reason: 'Khách hàng chủ động hủy chuyến',
        policy: 'Không phát sinh hoàn tiền do giao dịch chưa thanh toán',
        paymentStatus: 'Chưa thanh toán',
        bookingStatus: 'Đã hủy'
      }
    })

    setLocalTicketOverride(canceledTicket)
  }

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setPaymentSecondsLeft(getSecondsUntilDeadline(paymentDeadlineAt))
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [paymentDeadlineAt])

  return (
    <div className={`ticketdetail-page ${detailModeClass}`}>
      <div className="ticketdetail-background" style={{ backgroundImage: `url(${background2})` }}>
        <div className="ticketdetail-background-overlay" />
      </div>

      <header className="ticketdetail-header">
        <button type="button" onClick={() => navigate('/tickets')} aria-label="Quay lại"><ChevronLeft /></button>
        <h1>Chi tiết booking</h1>
      </header>

      <main className="ticketdetail-main">
        <div className="ticketdetail-status-row">
          <span className={`ticketdetail-status ${detailModeClass}`}>
            {isCanceled ? <BanIcon /> : isIssued ? <CheckIcon /> : <ClockIcon />}
            {isCanceled ? 'ĐÃ HỦY' : isIssued ? 'ĐÃ XUẤT VÉ' : isProcessing ? 'ĐANG XỬ LÝ' : 'CHỜ THANH TOÁN'}
            {!isProcessing && !isIssued && !isCanceled && <b>{paymentCountdown}</b>}
          </span>
          <span className="ticketdetail-code">Mã booking: <strong>{displayBookingCode}</strong><CopyIcon /></span>
        </div>

        <section className="ticketdetail-hero-card">
          <div className="ticketdetail-route">
            <img src={firstSegment.logo} alt={firstSegment.flight.airline || 'Airline'} />
            <div><strong>{firstSegment.fromCode}</strong><span>{firstSegment.fromCity}</span></div>
            <div className="ticketdetail-route-line"><PlaneIcon /><b>{firstSegment.departureTime} - {firstSegment.arrivalTime}</b><span>{firstSegment.duration}</span></div>
            <div><strong>{firstSegment.toCode}</strong><span>{firstSegment.toCity}</span></div>
          </div>
          <div className={`ticketdetail-meta ${selectedSeat ? 'has-seat' : ''}`}>
            <span><CalendarIcon />{formatDate(searchData.departureDate)}</span>
            <span><UserIcon />{heroPassengerLabel}</span>
            {selectedSeat && <span><SeatIcon />Ghế ngồi {selectedSeat}</span>}
            <span><BagIcon />{baggageSummary.count} Túi ký gửi</span>
          </div>
          <div className={`ticketdetail-hold-note ${detailModeClass}`}>
            {isCanceled ? <InfoIcon /> : isIssued ? <CheckIcon /> : isProcessing ? <InfoIcon /> : <ClockIcon />}
            {isExpiredCanceled ? (
              <span><strong>Đặt chỗ đã bị hủy do quá hạn thanh toán.</strong><br />Bạn chưa hoàn tất thanh toán trong thời gian quy định.<br />Vui lòng đặt lại chuyến bay nếu vẫn có nhu cầu.</span>
            ) : isCanceled ? (
              <span>Chuyến bay đã được hủy theo yêu cầu của bạn.</span>
            ) : isIssued ? (
              <span>Vé điện tử đã được gửi đến email của bạn.<br />Chúc bạn có chuyến bay tốt đẹp!</span>
            ) : isProcessing ? (
              <span>Chúng tôi đang xác nhận thông tin đặt chỗ của bạn.<br />Vui lòng chờ trong giây lát.</span>
            ) : (
              <span>Chúng tôi đang giữ chỗ cho bạn đến <strong>{formatPaymentDeadline(paymentDeadline)}.</strong><br />Vui lòng thanh toán trong <strong>{paymentCountdown}</strong> trước khi thời gian hết hạn.</span>
            )}
          </div>
          {isIssued ? (
            <button type="button" className="ticketdetail-issued-btn" onClick={handleViewETicket}><EDeckIcon />Xem vé điện tử</button>
          ) : isCanceled ? null : isProcessing ? (
            <button type="button" className="ticketdetail-confirming-btn" disabled><span className="ticketdetail-spinner" />Đang xác nhận</button>
          ) : (
            <button type="button" className="ticketdetail-pay-btn" onClick={() => navigate('/payment', { state: searchData })}><CardIcon />Thanh toán ngay</button>
          )}
        </section>

        <section className="ticketdetail-support-card">
          <h2>Thông tin liên hệ hỗ trợ</h2>
          <p>Khi cần hỗ trợ, vui lòng liên hệ để tư vấn viên biết đúng booking này.</p>
          <div className="ticketdetail-support-note">
            <InfoIcon />
            <span>
              Nội dung gửi sẵn: Tôi cần hỗ trợ booking mã <strong>{displayBookingCode}</strong>.<br />
              Hệ thống sẽ chuyển bạn tới Zalo OA.
            </span>
          </div>
          <button type="button" className="ticketdetail-support-outline-btn">
            <ChatIcon />Chat với tư vấn viên
          </button>
        </section>

        <section className="ticketdetail-section">
          <h2>Thông tin chuyến bay</h2>
          <div className="ticketdetail-flight-stack">
            {flightSegments.map(segment => (
              <div className="ticketdetail-flight-card" key={segment.id}>
                <h3>{segment.title}</h3>
                <div className="ticketdetail-flight-body">
                  <div className="ticketdetail-flight-time">
                    <strong>{segment.departureTime}</strong>
                    <span>{segment.departureDate}</span>
                    <em>{segment.duration}</em>
                    <strong>{segment.arrivalTime}</strong>
                    <span>{segment.arrivalDate}</span>
                  </div>
                  <div className="ticketdetail-flight-line"><i></i><i></i></div>
                  <div className="ticketdetail-flight-info">
                    <div><strong>{segment.fromCode}</strong><span>{segment.fromCity}</span><small>{segment.fromAirport}</small></div>
                    <div className="ticketdetail-airline-box">
                      <img src={segment.logo} alt={segment.flight.airline || 'Airline'} />
                      <p><strong>{segment.flightNumber}{segment.aircraft ? ` • ${segment.aircraft}` : ''}</strong><span>Hạng vé: {segment.fareClass}</span></p>
                    </div>
                    <div><strong>{segment.toCode}</strong><span>{segment.toCity}</span><small>{segment.toAirport}</small></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ticketdetail-section">
          <h2>Thông tin hành khách</h2>
          {detailPassengers.map(passenger => (
            <div className="ticketdetail-passenger-card" key={passenger.id}>
              <div className="ticketdetail-avatar"><UserIcon /></div>
              <div>
                <strong>{passenger.name}</strong>
                <p>
                  {passenger.gender && <span>{passenger.gender}</span>}
                  {passenger.gender && passenger.detail && <i></i>}
                  {passenger.detail && <span>{passenger.detail}</span>}
                </p>
              </div>
              <em>{passenger.type}</em>
            </div>
          ))}
        </section>

        <section className="ticketdetail-section">
          <h2>Dịch vụ đã chọn</h2>
          <div className="ticketdetail-service-card">
            <div className="ticketdetail-service-title"><BagIcon />Hành lý ký gửi</div>
            <div className="ticketdetail-service-list">
              {detailPassengers.map(passenger => (
                <div key={passenger.id}>
                  <strong>{passenger.displayName}:</strong>
                  {passenger.baggage.map(item => <span key={item}>{item}</span>)}
                </div>
              ))}
            </div>
          </div>
        </section>

        {!isExpiredCanceled && (
          <section className="ticketdetail-section">
            <h2>Thông tin thanh toán</h2>
            <div className="ticketdetail-payment-card">
              <div><span>Giá vé</span><strong>{formatMoney(ticketTotal)}</strong></div>
              <div><span>Hành lý</span><strong>{formatMoney(baggageTotal)}</strong></div>
              <div><span>Thuế & phí</span><strong>{formatMoney(feeTotal)}</strong></div>
              <div className="ticketdetail-total"><span>Tổng thanh toán</span><strong>{formatMoney(grandTotal)}</strong></div>
            </div>
          </section>
        )}

        {isCanceled && (
          <section className="ticketdetail-section">
            <h2>Thông tin hủy & hoàn tiền</h2>
            {isExpiredCanceled || isUnpaidCanceled ? (
              <div className="ticketdetail-refund-card expired">
                <div><span>Lý do hủy</span><strong>{cancellationInfo.reason}</strong></div>
                <div><span>Chính sách hoàn tiền</span><strong>{cancellationInfo.policy}</strong></div>
                <div><span>Trạng thái thanh toán</span><strong>{cancellationInfo.paymentStatus}</strong></div>
                <div><span>Trạng thái đặt chỗ</span><strong className="danger">{cancellationInfo.bookingStatus}</strong></div>
              </div>
            ) : (
              <div className="ticketdetail-refund-card">
                <div><InfoIcon /><span>Lý do hủy:</span><strong>{cancellationInfo.reason}</strong></div>
                <div><CheckIcon /><span>Chính sách hoàn tiền:</span><strong>{cancellationInfo.policy}</strong></div>
                <div><CardIcon /><span>Trạng thái thanh toán:</span><strong>{cancellationInfo.paymentStatus || 'Đã thanh toán'}</strong></div>
                <div><ClockIcon /><span>Trạng thái hoàn tiền:</span><strong><em>{cancellationInfo.refundStatus}</em></strong></div>
              </div>
            )}
          </section>
        )}

        <section className="ticketdetail-section">
          <h2>Thông tin liên hệ</h2>
          <div className="ticketdetail-contact-card">
            <span><ContactUserIcon />{contactInfo.name || detailPassengers[0]?.name || ''}</span>
            <span><GenderIcon />{contactInfo.gender || detailPassengers[0]?.gender || ''}</span>
            <span><PhoneIcon />{contactInfo.phone || detailPassengers[0]?.detail || ''}</span>
            <span><MailIcon />{contactInfo.email || ''}</span>
          </div>
        </section>

        {shouldShowInvoiceInfo && (
          <section className="ticketdetail-section">
            <h2>Thông tin xuất hóa đơn</h2>
            <div className="ticketdetail-invoice-card">
              <div><span>Tên công ty</span><strong>{invoiceInfo.companyName}</strong></div>
              <div><span>Mã số thuế</span><strong>{invoiceInfo.taxCode}</strong></div>
              <div><span>Địa chỉ</span><strong>{invoiceInfo.address}</strong></div>
              <div><span>Người nhận hóa đơn</span><strong>{invoiceInfo.recipientPhone}</strong></div>
            </div>
          </section>
        )}

        {isCanceled ? (
          <div className="ticketdetail-action-row">
            <button type="button" className="ticketdetail-cancel-btn" onClick={() => navigate('/tickets')}><ChevronLeft />Quay lại</button>
            <button type="button" className="ticketdetail-cancel-btn" onClick={() => navigate('/')}><CalendarIcon />Đặt lại chuyến bay</button>
          </div>
        ) : isProcessing || isIssued ? (
          <button type="button" className="ticketdetail-cancel-btn" onClick={() => navigate('/tickets')}><ChevronLeft />Quay lại</button>
        ) : (
          <button type="button" className="ticketdetail-cancel-btn" onClick={handleCancelBooking}><CancelIcon />Hủy đặt chỗ</button>
        )}
      </main>

      <BottomNav />
    </div>
  )
}

export default TicketDetail
