import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import background2 from '../assets/images/background2.png'

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
)

const SuitcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6A2.25 2.25 0 0110.5 3.75h3A2.25 2.25 0 0115.75 6v1.5M5.25 7.5h13.5A1.5 1.5 0 0120.25 9v9.75a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V9a1.5 1.5 0 011.5-1.5zM8.25 7.5v12.75M15.75 7.5v12.75" />
  </svg>
)

const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 rotate-90">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
)

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M12 8.25h.008v.008H12V8.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const StepIndicator = ({ number, label, state }) => {
  const isDone = state === 'done'

  return (
    <div className={`service-step ${state}`}>
      <span className="service-step-dot">
        {isDone ? <CheckIcon /> : number}
      </span>
      <span className="service-step-label">
        {label}
      </span>
    </div>
  )
}

const ServiceHeader = ({ onBack }) => (
  <div className="service-header">
    <div className="service-top-row">
      <button
        onClick={onBack}
        className="service-back-btn"
        aria-label="Quay lại"
      >
        <ChevronLeft />
      </button>
      <h1 className="service-title">Mua dịch vụ</h1>
    </div>

    <div className="service-steps">
      <StepIndicator number="1" label="Nhập thông tin" state="done" />
      <span className="service-step-line"></span>
      <StepIndicator number="2" label="Mua dịch vụ" state="active" />
      <span className="service-step-line"></span>
      <StepIndicator number="3" label="Thanh toán" />
    </div>
  </div>
)

const formatPassengerName = (passenger, index) => {
  const name = passenger?.name?.trim()
  return name || `HÀNH KHÁCH ${index + 1}`
}

const getRouteText = (segment) => {
  const from = segment.fromAirport || segment.fromCity || segment.fromCode || 'Sân bay khởi hành'
  const to = segment.toAirport || segment.toCity || segment.toCode || 'Sân bay đến'
  return `Chuyến bay từ ${from} đến ${to}`
}

const buildSegments = (searchData) => {
  const dep = searchData.selectedDep || {}
  const ret = searchData.selectedRet || {}
  const from = searchData.from || dep.departureCity || 'Hà Nội'
  const to = searchData.to || dep.arrivalCity || 'Hồ Chí Minh'

  const segments = [
    {
      id: 'departure',
      airline: dep.airline || 'Sun PhuQuoc',
      fromCity: dep.departureCity || from,
      toCity: dep.arrivalCity || to,
      fromCode: dep.departureCode || 'HAN',
      toCode: dep.arrivalCode || 'SGN',
      fromAirport: dep.departureAirport || `Sân bay ${from}`,
      toAirport: dep.arrivalAirport || `Sân bay ${to}`
    }
  ]

  if (searchData.returnDate || searchData.selectedRet) {
    segments.push({
      id: 'return',
      airline: ret.airline || dep.airline || 'Sun PhuQuoc',
      fromCity: ret.departureCity || to,
      toCity: ret.arrivalCity || from,
      fromCode: ret.departureCode || dep.arrivalCode || 'SGN',
      toCode: ret.arrivalCode || dep.departureCode || 'HAN',
      fromAirport: ret.departureAirport || dep.arrivalAirport || `Sân bay ${to}`,
      toAirport: ret.arrivalAirport || dep.departureAirport || `Sân bay ${from}`
    })
  }

  return segments
}

const getBaggageOptions = (airline = '') => {
  return [
    { value: 'none', label: 'Không mua hành lý' },
    { value: 'xwbg-10-a', label: '10kg, XWBG - 130.000 vnđ' },
    { value: 'xwbg-20-a', label: '20kg, XWBG - 260.000 vnđ' },
    { value: 'xwbg-30-a', label: '30kg, XWBG - 390.000 vnđ' },
    { value: 'xwbg-40-a', label: '40kg, XWBG - 520.000 vnđ' },
    { value: 'xwbg-50-a', label: '50kg, XWBG - 650.000 vnđ' },
    { value: 'xwbg-60-a', label: '60kg, XWBG - 780.000 vnđ' },
    { value: 'xwbg-10-b', label: '10kg, XWBG - 130.000 vnđ' },
    { value: 'xwbg-20-b', label: '20kg, XWBG - 260.000 vnđ' },
    { value: 'xwbg-30-b', label: '30kg, XWBG - 390.000 vnđ' },
    { value: 'xwbg-40-b', label: '40kg, XWBG - 520.000 vnđ' },
    { value: 'xwbg-50-b', label: '50kg, XWBG - 650.000 vnđ' },
    { value: 'xwbg-60-b', label: '60kg, XWBG - 780.000 vnđ' }
  ]
}

function ServiceSelection() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchData = location.state || {}

  const passengers = useMemo(() => {
    if (Array.isArray(searchData.passengers) && searchData.passengers.length > 0) {
      return searchData.passengers
    }

    const total = (searchData.adults || 1) + (searchData.children || 0) + (searchData.babies || 0)
    return Array.from({ length: total }, (_, index) => ({ id: index + 1, name: '' }))
  }, [searchData])

  const segments = useMemo(() => buildSegments(searchData), [searchData])
  const [baggageSelections, setBaggageSelections] = useState({})

  const handleSelectBaggage = (passengerId, segmentId, value) => {
    setBaggageSelections(prev => ({
      ...prev,
      [`${passengerId}_${segmentId}`]: value
    }))
  }

  const handleContinue = () => {
    navigate('/confirm', {
      state: {
        ...searchData,
        baggageSelections
      }
    })
  }

  return (
    <div className="service-page">
      <div
        className="service-background"
        style={{ backgroundImage: `url(${background2})` }}
      >
        <div className="service-background-overlay" />
      </div>

      <ServiceHeader onBack={() => navigate(-1)} />

      <main className="service-main">
        <section className="service-baggage-card">
          <div className="service-section-title">
            <div className="service-title-icon">
              <SuitcaseIcon />
            </div>
            <h2>Chọn hành lý</h2>
          </div>

          <div className="service-passenger-list">
            {passengers.map((passenger, passengerIndex) => (
              <section key={passenger.id || passengerIndex} className="service-passenger-card">
                <h3>
                  Hành khách {passengerIndex + 1}: {formatPassengerName(passenger, passengerIndex)}
                </h3>

                <div className="service-segments">
                  {segments.map((segment, segmentIndex) => {
                    const key = `${passenger.id || passengerIndex + 1}_${segment.id}`
                    const options = getBaggageOptions()

                    return (
                      <div key={segment.id} className={`service-segment ${segmentIndex > 0 ? 'with-divider' : ''}`}>
                        <div className="service-route-row">
                          <span className="service-route-icon">
                            <PlaneIcon />
                          </span>
                          <p>{getRouteText(segment)}</p>
                        </div>

                        <select
                          value={baggageSelections[key] || 'none'}
                          onChange={(e) => handleSelectBaggage(passenger.id || passengerIndex + 1, segment.id, e.target.value)}
                          className="service-baggage-select"
                        >
                          {options.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="service-note">
          <div className="service-note-icon">
            <InfoIcon />
          </div>
          <div>
            <h3>Lưu ý</h3>
            <p>Bạn có thể mua thêm hành lý sau nếu thay đổi nhu cầu.</p>
          </div>
        </section>

        <div className="service-bottom-bar">
          <button
            onClick={handleContinue}
            className="service-continue-btn"
          >
            Tiếp tục
          </button>
        </div>
      </main>
    </div>
  )
}

export default ServiceSelection
