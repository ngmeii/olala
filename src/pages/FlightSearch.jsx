import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import FlightCard from '../components/FlightCard'
import bg2 from '../assets/images/background2.png'
import iconDi from '../assets/icons/đi.png'
import iconVe from '../assets/icons/về.png'
import logoVN from '../assets/icons/logo vietnam airlines.png'
import logoVJ from '../assets/icons/vietjet air.png'
import logoBamboo from '../assets/icons/bamboo.png'
import logoSun from '../assets/icons/sun-phuquoc-airways.png'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import toast from 'react-hot-toast'

const departureFlights = [
  {
    id: 'vn6025',
    airline: 'Vietnam Airlines',
    logo: logoVN,
    flightNumber: 'VN6025',
    departureTime: '22:55',
    departureCode: 'HAN',
    departureCity: 'Hà Nội',
    departureAirport: 'Sân bay Nội Bài',
    arrivalTime: '01:10',
    arrivalCode: 'SGN',
    arrivalCity: 'Hồ Chí Minh',
    arrivalAirport: 'Sân bay Tân Sơn Nhất',
    duration: '02:15',
    flightType: 'Bay thẳng',
    price: '3.163.000',
    priceValue: 3163000,
    nextDay: true,
    date: 'Thứ 5, ngày 07/05/2026'
  },
  {
    id: 'vj162',
    airline: 'VietJet Air',
    logo: logoVJ,
    flightNumber: 'VJ162',
    departureTime: '23:05',
    departureCode: 'HAN',
    departureCity: 'Hà Nội',
    departureAirport: 'Sân bay Nội Bài',
    arrivalTime: '01:15',
    arrivalCode: 'SGN',
    arrivalCity: 'Hồ Chí Minh',
    arrivalAirport: 'Sân bay Tân Sơn Nhất',
    duration: '02:10',
    flightType: 'Bay thẳng',
    price: '2.490.000',
    priceValue: 2490000,
    nextDay: true,
    date: 'Thứ 5, ngày 07/05/2026'
  }
]

const returnFlights = [
  {
    id: 'qh242',
    airline: 'Bamboo Airways',
    logo: logoBamboo,
    flightNumber: 'QH242',
    departureTime: '20:50',
    departureCode: 'SGN',
    departureCity: 'Hồ Chí Minh',
    departureAirport: 'Sân bay Tân Sơn Nhất',
    arrivalTime: '23:05',
    arrivalCode: 'HAN',
    arrivalCity: 'Hà Nội',
    arrivalAirport: 'Sân bay Nội Bài',
    duration: '02:15',
    flightType: 'Bay thẳng',
    price: '3.090.000',
    priceValue: 3090000,
    nextDay: false,
    date: 'Thứ 7, ngày 09/05/2026'
  },
  {
    id: 'vj166',
    airline: 'VietJet Air',
    logo: logoVJ,
    flightNumber: 'VJ166',
    departureTime: '21:30',
    departureCode: 'SGN',
    departureCity: 'Hồ Chí Minh',
    departureAirport: 'Sân bay Tân Sơn Nhất',
    arrivalTime: '23:40',
    arrivalCode: 'HAN',
    arrivalCity: 'Hà Nội',
    arrivalAirport: 'Sân bay Nội Bài',
    duration: '02:10',
    flightType: 'Bay thẳng',
    price: '2.690.000',
    priceValue: 2690000,
    nextDay: false,
    date: 'Thứ 7, ngày 09/05/2026'
  }
]

/* ──────── Inline SVG Icons ──────── */
const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.375m2.25-13.5h.008v.008H14.625V4.5zm0 3h.008v.008H14.625V7.5zm0 3h.008v.008H14.625v-.008zM3.75 5.625c0-.621.504-1.125 1.125-1.125H9V3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V4.5h4.125c.621 0 1.125.504 1.125 1.125v14.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125V5.625z" />
  </svg>
)

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[14px] h-[14px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[14px] h-[14px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
)

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[14px] h-[14px]">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
  </svg>
)

const PlaneUpIcon = () => (
  <div className="flex flex-col items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px]">
      <path d="M21.57 9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 15.31-4.09c.8-.21 1.28-1.03 1.07-1.83z" />
    </svg>
    <div className="w-[14px] h-[1.5px] bg-[#2563eb] mt-[1px] rounded-full"></div>
  </div>
)

const PlaneDownIcon = () => (
  <div className="flex flex-col items-center translate-y-[1px]">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px]">
      <path d="M2.43 14.64c.21.8 1.04 1.28 1.84 1.06L9.08 14l6.9 6.43 1.93-.51-4.14-7.17 4.97-1.33 1.97 1.54 1.45-.39-1.82-3.16-.77-1.33-1.6.43-15.31 4.09c-.8.21-1.28 1.03-1.07 1.83z" />
    </svg>
    <div className="w-[14px] h-[1.5px] bg-[#2563eb] mt-[1px] rounded-full"></div>
  </div>
)

function FlightSearch() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulation for Error 2: Randomly fail load
      if (Math.random() > 0.8) {
        toast.error('Có lỗi xảy ra khi tải dữ liệu chuyến bay', {
          style: { borderRadius: '12px', background: '#dc2626', color: '#fff', fontSize: '13px', fontWeight: 'bold' }
        });
      }
      setIsLoading(false)
    }, 1500)
    
    // Simulation for Error 4: Session expiry (Rule 8)
    // Using 60s for demo instead of 45m
    const expiryTimer = setTimeout(() => {
      toast.error('Phiên tìm kiếm đã hết hạn, vui lòng tìm kiếm lại', {
        duration: 5000,
        style: { borderRadius: '12px', background: '#333', color: '#fff', fontSize: '13px', fontWeight: 'bold' }
      });
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearTimeout(expiryTimer);
    }
  }, [])
  
  // Get data from navigation state
  const searchData = location.state || {}
  const passengerCount = searchData.passengerCount || 1
  const fromCity = searchData.from || 'Hà Nội'
  const toCity = searchData.to || 'Hồ Chí Minh'
  const isRoundTrip = searchData.isRoundTrip ?? true
  
  const depDate = searchData.departureDate ? new Date(searchData.departureDate) : new Date()
  const retDate = searchData.returnDate ? new Date(searchData.returnDate) : new Date()

  const formatDateShort = (date) => format(date, 'dd/MM')
  const formatDateLong = (date) => {
    const dayIndex = date.getDay();
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    return `${dayNames[dayIndex]}, ${format(date, 'dd/MM/yyyy')}`
  }

  const airportNames = {
    'HAN': { city: 'Hà Nội', airport: 'Sân bay Nội Bài' },
    'SGN': { city: 'Hồ Chí Minh', airport: 'Sân bay Tân Sơn Nhất' },
    'DAD': { city: 'Đà Nẵng', airport: 'Sân bay Đà Nẵng' },
    'CXR': { city: 'Nha Trang', airport: 'Sân bay Cam Ranh' },
    'PQC': { city: 'Phú Quốc', airport: 'Sân bay Phú Quốc' },
  }

  const parseLocation = (locStr) => {
    if (!locStr) return { city: '???', code: '???', airport: '???' };
    const match = locStr.match(/(.*) \((.*)\)/);
    if (match) {
      const code = match[2];
      return {
        city: match[1],
        code: code,
        airport: airportNames[code]?.airport || 'Sân bay địa phương'
      };
    }
    return { city: locStr, code: '???', airport: 'Sân bay địa phương' };
  }

  const fromInfo = parseLocation(fromCity);
  const toInfo = parseLocation(toCity);

  const [showSort, setShowSort] = useState(false)
  const [sortBy, setSortBy] = useState('price-low')
  const [selectedDep, setSelectedDep] = useState(null)
  const [selectedRet, setSelectedRet] = useState(null)
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({
    stops: 'all',
    timeSlots: [],
    airlines: []
  })

  const airlinesList = [
    { id: 'Bamboo Airways', name: 'Bamboo Airways', logo: logoBamboo },
    { id: 'VietJet Air', name: 'Vietjet Air', logo: logoVJ },
    { id: 'Vietnam Airlines', name: 'Vietnam Airlines', logo: logoVN },
    { id: '1G', name: '1G', logo: 'https://placehold.co/40x40/png?text=1G' },
    { id: 'Sun PhuQuoc', name: 'Sun PhuQuoc', logo: logoSun }
  ]

  const timeSlots = [
    { 
      id: 'early', 
      label: 'Sáng sớm', 
      time: '00:00-5:59', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 10a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4z"/>
          <path d="M2 18h20"/>
          <path d="M12 4v2M5.2 7.2l1.4 1.4M18.8 7.2l-1.4 1.4M2 14h2M20 14h2"/>
          <path d="M10 22h4"/>
        </svg>
      )
    },
    { 
      id: 'morning', 
      label: 'Sáng', 
      time: '06:00-11:59', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.07" x2="5.64" y2="17.66"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      )
    },
    { 
      id: 'afternoon', 
      label: 'Chiều', 
      time: '12:00-17:59', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 10a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4z"/>
          <path d="M2 18h20"/>
          <path d="M12 4v2M5.2 7.2l1.4 1.4M18.8 7.2l-1.4 1.4M2 14h2M20 14h2"/>
          <path d="M10 22h4"/>
        </svg>
      )
    },
    { 
      id: 'night', 
      label: 'Tối', 
      time: '18:00-23:59', 
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )
    }
  ]

  const handleSelectFlight = (flight, isReturn) => {
    if (isReturn) {
      setSelectedRet(selectedRet?.id === flight.id ? null : flight)
    } else {
      setSelectedDep(selectedDep?.id === flight.id ? null : flight)
    }
  }

  const sortOptions = [
    { id: 'price-low', label: 'Giá thấp nhất lên trên' },
    { id: 'price-high', label: 'Giá cao nhất lên trên' },
    { id: 'fastest', label: 'Bay nhanh nhất lên trên' },
    { id: 'earliest', label: 'Bay sớm nhất lên trên' },
    { id: 'latest', label: 'Bay muộn nhất lên trên' }
  ]

  const timeToMinutes = (timeStr) => {
    const [hrs, mins] = timeStr.split(':').map(Number);
    return hrs * 60 + mins;
  }

  const sortFlights = (flights) => {
    // First, apply filters
    let filtered = flights.filter(f => {
      // Airline filter
      if (filters.airlines.length > 0 && !filters.airlines.includes(f.airline)) return false;
      
      // Stop filter
      if (filters.stops === 'non-stop' && f.flightType !== 'Bay thẳng') return false;
      // ... (add more stop logic if data supports it)

      // Time slot filter
      if (filters.timeSlots.length > 0) {
        const minutes = timeToMinutes(f.departureTime);
        const inSlot = filters.timeSlots.some(slot => {
          if (slot === 'early') return minutes >= 0 && minutes < 360;
          if (slot === 'morning') return minutes >= 360 && minutes < 720;
          if (slot === 'afternoon') return minutes >= 720 && minutes < 1080;
          if (slot === 'night') return minutes >= 1080 && minutes < 1440;
          return false;
        });
        if (!inSlot) return false;
      }

      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.priceValue - b.priceValue;
        case 'price-high':
          return b.priceValue - a.priceValue;
        case 'fastest':
          return timeToMinutes(a.duration) - timeToMinutes(b.duration);
        case 'earliest':
          return timeToMinutes(a.departureTime) - timeToMinutes(b.departureTime);
        case 'latest':
          return timeToMinutes(b.departureTime) - timeToMinutes(a.departureTime);
        default:
          return 0;
      }
    });
  }

  const sortedDepartureFlights = sortFlights(departureFlights);
  const sortedReturnFlights = sortFlights(returnFlights);

  return (
    <div className="min-h-screen bg-[#f0f4fa] pb-28 relative overflow-x-hidden" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      
      {/* Background image - placed at the very back */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          backgroundImage: `url(${bg2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          height: '500px'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[#f0f4fa]"></div>
      </div>

      <div className="relative z-10">
        {/* ═══════ HEADER AREA ═══════ */}
        <div>
          {/* Transparent header area */}
          <div className="h-[240px] bg-transparent relative overflow-hidden">
          {/* Top controls */}
          <div className="flex justify-end pt-4 px-4">
            <div className="flex items-center bg-black/10 backdrop-blur-md rounded-full px-1 py-1 border border-white/20">
              <button className="w-[32px] h-[32px] flex items-center justify-center hover:bg-white/10 rounded-full cursor-pointer transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-5 h-5 opacity-90">
                  <circle cx="6" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="18" cy="12" r="1.5" />
                </svg>
              </button>
              <div className="w-[1px] h-[16px] bg-white/25 mx-[4px]"></div>
              <button onClick={() => navigate('/')} className="w-[32px] h-[32px] flex items-center justify-center hover:bg-white/10 rounded-full cursor-pointer transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-[16px] h-[16px] opacity-90">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ═══════ SUMMARY CARD ═══════ */}
        <div className="absolute top-[68px] left-4 right-4 z-10">
          <div className="bg-[#dce8f8]/80 backdrop-blur-xl rounded-[24px] p-5 border border-white/40 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            {/* Background airplane illustration */}
            <div className="absolute top-[20px] right-[24px] pointer-events-none opacity-40">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4b7fc2" strokeWidth="1.2" viewBox="0 0 24 24" className="w-[36px] h-[36px] rotate-[-30deg]">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            <div className="absolute top-[35px] right-[45px] pointer-events-none opacity-20">
              <svg width="50" height="20" viewBox="0 0 60 20" fill="none">
                <path d="M0 18 Q30 0 58 5" stroke="#4b7fc2" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* Label Row */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-[28px] h-[28px] rounded-[8px] bg-[#2563eb] flex items-center justify-center text-white">
                <ClipboardIcon />
              </div>
              <span className="text-[13px] font-semibold text-[#2563eb]">Hành trình của bạn</span>
            </div>

            {/* Route */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[20px] font-extrabold text-[#0f172a] tracking-tight whitespace-nowrap">{fromCity}</span>
              <span className="text-[18px] text-[#64748b] font-light">→</span>
              <span className="text-[20px] font-extrabold text-[#0f172a] tracking-tight whitespace-nowrap">{toCity}</span>
            </div>

            {/* Info Chips - Asymmetrical Layout */}
            <div className="flex gap-1.5 mb-1">
              <div className="flex-[1.4] flex items-center gap-[3px] bg-white rounded-2xl py-[10px] px-2 border border-[#d0ddf0]/30 min-w-0 shadow-sm">
                <span className="text-[#3b82f6] shrink-0"><CalendarIcon /></span>
                <span className="text-[10px] font-bold text-[#334155] whitespace-nowrap">Đi: {formatDateLong(depDate)}</span>
              </div>
              {isRoundTrip && (
                <div className="flex-[1.4] flex items-center gap-[3px] bg-white rounded-2xl py-[10px] px-2 border border-[#d0ddf0]/30 min-w-0 shadow-sm">
                  <span className="text-[#3b82f6] shrink-0"><CalendarIcon /></span>
                  <span className="text-[10px] font-bold text-[#334155] whitespace-nowrap">Về: {formatDateLong(retDate)}</span>
                </div>
              )}
              <div className="flex-[1] flex items-center gap-[3px] bg-white rounded-2xl py-[10px] px-2 border border-[#d0ddf0]/30 min-w-0 shadow-sm shrink-0">
                <span className="text-[#3b82f6] shrink-0"><UserIcon /></span>
                <span className="text-[10px] font-bold text-[#334155] whitespace-nowrap">{passengerCount} hành khách</span>
              </div>
            </div>

            {/* Edit Link */}
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => navigate('/', { state: searchData })}
                className="flex items-center gap-1.5 text-[#2563eb] text-[13px] font-semibold hover:opacity-70 transition-opacity cursor-pointer"
              >
                Chỉnh sửa
                <PencilIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ FLIGHT LISTS ═══════ */}
      <div className="px-4 mt-[100px] space-y-8 pb-24">
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 animate-pulse">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-24 h-4 bg-slate-100 rounded"></div>
                  <div className="w-16 h-4 bg-slate-100 rounded"></div>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-20 h-8 bg-slate-100 rounded"></div>
                  <div className="w-24 h-6 bg-slate-100 rounded"></div>
                  <div className="w-20 h-8 bg-slate-100 rounded"></div>
                </div>
                <div className="w-full h-12 bg-slate-100 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Outbound Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-[36px] h-[36px] rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <img src={iconDi} className="w-[28px] h-[28px] object-contain" alt="" />
                  </div>
                  <h2 className="text-[14px] font-bold text-[#0f172a]">
                    Chọn chiều đi <span className="font-normal text-[#94a3b8] ml-1">({formatDateShort(depDate)})</span>
                  </h2>
                </div>
                <p className="text-[10px] font-medium text-[#94a3b8]">
                  {fromCity} <span className="mx-1">→</span> {toCity}
                </p>
              </div>
              <div className="space-y-3">
                {sortedDepartureFlights.length > 0 ? (
                  sortedDepartureFlights
                    .filter(f => !selectedDep || selectedDep.id === f.id)
                    .map((f) => (
                      <FlightCard 
                        key={f.id} 
                        flight={f} 
                        isReturn={false} 
                        onSelect={(flight) => handleSelectFlight(flight, false)}
                        isSelected={selectedDep?.id === f.id}
                        displayDate={formatDateLong(depDate)}
                        overrideDeparture={fromInfo}
                        overrideArrival={toInfo}
                      />
                    ))
                ) : (
                  <div className="bg-slate-50 rounded-2xl p-8 text-center border border-dashed border-slate-200">
                    <p className="text-slate-400 text-[13px] font-medium">Không tìm thấy chuyến bay phù hợp</p>
                  </div>
                )}
              </div>
            </section>

            {/* Return Section */}
            {isRoundTrip && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-[36px] h-[36px] rounded-xl bg-white shadow-sm flex items-center justify-center">
                      <img src={iconVe} className="w-[28px] h-[28px] object-contain" alt="" />
                    </div>
                    <h2 className="text-[14px] font-bold text-[#0f172a]">
                      Chọn chiều về <span className="font-normal text-[#94a3b8] ml-1">({formatDateShort(retDate)})</span>
                    </h2>
                  </div>
                  <p className="text-[10px] font-medium text-[#94a3b8]">
                    {toCity} <span className="mx-1">→</span> {fromCity}
                  </p>
                </div>
                <div className="space-y-3">
                  {sortedReturnFlights.length > 0 ? (
                    sortedReturnFlights
                      .filter(f => !selectedRet || selectedRet.id === f.id)
                      .map((f) => (
                        <FlightCard 
                          key={f.id} 
                          flight={f} 
                          isReturn={true} 
                          onSelect={(flight) => handleSelectFlight(flight, true)}
                          isSelected={selectedRet?.id === f.id}
                          displayDate={formatDateLong(retDate)}
                          overrideDeparture={toInfo}
                          overrideArrival={fromInfo}
                        />
                      ))
                  ) : (
                    <div className="bg-slate-50 rounded-2xl p-8 text-center border border-dashed border-slate-200">
                      <p className="text-slate-400 text-[13px] font-medium">Không tìm thấy chuyến bay phù hợp</p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* ═══════ SELECTION SUMMARY & CONTINUE BUTTON (Rule 6) ═══════ */}
      {(selectedDep && (!isRoundTrip || selectedRet)) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-[#e2e8f0] p-4 z-[130] shadow-[0_-10px_40px_rgba(0,0,0,0.12)] animate-in slide-in-from-bottom duration-500 ease-out">
          <div className="max-w-[450px] mx-auto flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-[#64748b] font-bold uppercase tracking-wider mb-0.5">Tổng thanh toán</p>
              <div className="flex items-baseline gap-1">
                <p className="text-[20px] font-black text-[#2563eb]">
                  {(
                    (selectedDep?.priceValue || 0) + (isRoundTrip ? (selectedRet?.priceValue || 0) : 0)
                  ).toLocaleString('vi-VN')}
                </p>
                <span className="text-[11px] font-bold text-[#2563eb]">VND</span>
              </div>
            </div>
            <button 
              onClick={() => {
                // Simulation for Error 3: Price change
                if (Math.random() > 0.8) {
                  const confirmChange = window.confirm('Giá vé đã thay đổi, vui lòng xác nhận lại');
                  if (!confirmChange) return;
                }
                
                toast.success('Đang chuyển sang bước nhập thông tin...', {
                  duration: 2000,
                  style: { borderRadius: '16px', background: '#0f172a', color: '#fff', fontSize: '14px', padding: '16px 24px' }
                });

                setTimeout(() => {
                  navigate('/passenger-info', { 
                    state: { 
                      ...searchData,
                      selectedDep,
                      selectedRet
                    } 
                  });
                }, 1000);
              }}
              className="bg-[#2563eb] text-white font-black px-12 py-4 rounded-[20px] shadow-xl shadow-blue-200 active:scale-90 hover:bg-blue-700 transition-all cursor-pointer text-[15px] uppercase tracking-wide"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      )}

      {/* ═══════ BOTTOM STICKY BUTTONS ═══════ */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 z-[100]">
        <button 
          onClick={() => setShowSort(!showSort)}
          className={`font-bold px-7 py-3 rounded-full shadow-lg border flex items-center gap-2 text-[13px] active:scale-95 transition-all cursor-pointer
            ${showSort 
              ? 'bg-[#2563eb] text-white border-[#2563eb]' 
              : 'bg-white text-[#2563eb] border-[#2563eb]'
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-[18px] h-[18px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
          </svg>
          Sắp xếp
        </button>
        <button 
          onClick={() => setShowFilter(true)}
          className="bg-[#2563eb] text-white font-bold px-9 py-3 rounded-full shadow-lg flex items-center gap-2 text-[13px] active:scale-95 transition-transform cursor-pointer border border-blue-400/30">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-[18px] h-[18px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          Bộ lọc
        </button>
      </div>

      {/* ═══════ FILTER MODAL (Rule 5) ═══════ */}
      {showFilter && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[200] backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowFilter(false)}></div>
          <div className="fixed bottom-0 left-0 right-0 z-[210] flex justify-center">
            <div className="bg-white w-full max-w-[450px] rounded-t-[32px] overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-500 ease-out flex flex-col max-h-[70vh]">
              {/* Header */}
              <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
                <div className="w-10"></div>
                <h3 className="text-[18px] font-black text-slate-900 tracking-tight">Lọc</h3>
                <button onClick={() => setShowFilter(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-28">
                {/* Section 1: Stops */}
                <div>
                  <h4 className="text-[14px] font-bold text-[#0f172a] mb-3">Số điểm dừng</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { 
                        id: 'non-stop', 
                        label: 'Bay thẳng', 
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5s-2.5 0-4 1.5L13.5 8.5l-8.2-1.8c-.9-.2-1.8.1-2.4.8l-1.1 1.1 7 4.2-4.1 4.1-3.2-1.1L.5 17l2.5 2.5 2.5 2.5 1.1-1.1-1.1-3.2 4.1-4.1 4.2 7 1.1-1.1c.7-.6 1-1.5.8-2.4z"/>
                          </svg>
                        )
                      },
                      { 
                        id: '1-stop', 
                        label: '1 Điểm dừng', 
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
                          </svg>
                        )
                      },
                      { 
                        id: '2-plus', 
                        label: '2+ Điểm dừng', 
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                            <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
                          </svg>
                        )
                      }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setFilters({ ...filters, stops: opt.id })}
                        className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border-2 transition-all
                          ${filters.stops === opt.id 
                            ? 'border-[#2563eb] bg-[#f0f7ff] text-[#2563eb]' 
                            : 'border-[#f1f5f9] bg-white text-slate-500'}`}
                      >
                        <div className="text-[#2563eb]">
                          {opt.icon}
                        </div>
                        <span className="text-[11px] font-bold">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 2: Time Slots */}
                <div>
                  <h4 className="text-[14px] font-bold text-[#0f172a] mb-3">Giờ cất cánh chuyến đi</h4>
                  <div className="grid grid-cols-2 gap-2.5">
                    {timeSlots.map(slot => (
                      <button
                        key={slot.id}
                        onClick={() => {
                          const newSlots = filters.timeSlots.includes(slot.id)
                            ? filters.timeSlots.filter(s => s !== slot.id)
                            : [...filters.timeSlots, slot.id];
                          setFilters({ ...filters, timeSlots: newSlots });
                        }}
                        className={`flex items-center gap-2.5 p-3.5 rounded-xl border-2 transition-all text-left
                          ${filters.timeSlots.includes(slot.id)
                            ? 'border-[#2563eb] bg-[#f0f7ff]' 
                            : 'border-[#f1f5f9] bg-white'}`}
                      >
                        <div className="text-[#2563eb]">
                          {slot.icon}
                        </div>
                        <div>
                          <p className={`text-[12px] font-bold ${filters.timeSlots.includes(slot.id) ? 'text-[#2563eb]' : 'text-slate-900'}`}>{slot.label}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{slot.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 3: Airlines */}
                <div>
                  <h4 className="text-[14px] font-bold text-[#0f172a] mb-3">Hãng hàng không</h4>
                  <div className="space-y-0 border border-[#f1f5f9] rounded-xl overflow-hidden divide-y divide-[#f1f5f9]">
                    {airlinesList.map(airline => (
                      <label key={airline.id} className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div className="relative flex items-center">
                          <input 
                            type="checkbox" 
                            className="peer sr-only"
                            checked={filters.airlines.includes(airline.id)}
                            onChange={() => {
                              const newAirlines = filters.airlines.includes(airline.id)
                                ? filters.airlines.filter(a => a !== airline.id)
                                : [...filters.airlines, airline.id];
                              setFilters({ ...filters, airlines: newAirlines });
                            }}
                          />
                          <div className="w-5 h-5 border-2 border-slate-200 rounded-[6px] peer-checked:bg-[#2563eb] peer-checked:border-[#2563eb] transition-all flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="white" className="w-3.5 h-3.5 scale-0 peer-checked:scale-100 transition-transform">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                          </div>
                        </div>
                        <div className="w-14 h-9 flex items-center justify-center bg-white rounded-lg border border-slate-100 p-1.5 shadow-sm">
                          <img src={airline.logo} className="max-w-full max-h-full object-contain" alt="" />
                        </div>
                        <span className="text-[13px] font-bold text-slate-700 flex-1">{airline.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 bg-white border-t border-slate-100 grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setFilters({ stops: 'all', timeSlots: [], airlines: [] })}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-[#f1f5f9] text-slate-500 font-bold text-[14px] hover:bg-slate-50 transition-all active:scale-95"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                    <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
                  </svg>
                  Xóa bộ lọc
                </button>
                <button 
                  onClick={() => setShowFilter(false)}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#2563eb] text-white font-bold text-[14px] shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all active:scale-95"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                    <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
                  </svg>
                  Áp dụng
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══════ SORT DROPDOWN ═══════ */}
      {showSort && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 z-[110] animate-in fade-in duration-200"
            onClick={() => setShowSort(false)}
          ></div>
          
          {/* Options Container - Constrained to mobile width */}
          <div className="fixed bottom-[92px] left-1/2 -translate-x-1/2 w-full max-w-[450px] px-6 z-[120]">
            <div className="bg-white rounded-[28px] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom-8 duration-300">
              <div className="space-y-2">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setSortBy(opt.id); setShowSort(false); }}
                    className={`w-full py-3.5 px-6 rounded-2xl text-[13px] font-bold text-left transition-all relative overflow-hidden
                      ${sortBy === opt.id 
                        ? 'bg-[#f0f7ff] text-[#2563eb] border border-[#2563eb]/60' 
                        : 'bg-[#f8fafc] text-[#475569] border border-transparent hover:bg-gray-100'
                      }`}
                  >
                    {sortBy === opt.id && (
                      <div className="absolute top-0 left-0 w-0 h-0 border-t-[22px] border-t-[#2563eb] border-r-[22px] border-r-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="white" className="absolute -top-[20px] left-[1px] w-[9px] h-[9px]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </div>
                    )}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  )
}

export default FlightSearch
