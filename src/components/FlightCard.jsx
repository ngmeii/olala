import { useState } from 'react'
import { format, addDays, parse } from 'date-fns'

const getNumberValue = (...values) => {
  const value = values.find(item => item !== undefined && item !== null && item !== '')
  if (typeof value === 'number') return value
  return Number(String(value || '').replace(/\D/g, '')) || 0
}

const normalizeTextList = (value) => {
  if (!value) return []
  if (Array.isArray(value)) return value.flatMap(normalizeTextList)
  if (typeof value === 'object') {
    return Object.values(value).flatMap(normalizeTextList)
  }
  return String(value)
    .split(/\r?\n|;|\|/)
    .map(item => item.trim())
    .filter(Boolean)
}

const getFareName = (fare) => (
  fare.name || fare.fareName || fare.fareClass || fare.className || fare.ticketClass || fare.bookingClass || fare.code || 'Hạng vé'
)

const getFareId = (fare, index) => (
  fare.id || fare.fareId || fare.optionId || fare.classCode || fare.code || `${getFareName(fare)}-${index}`
)

const getFarePrice = (fare, basePrice) => getNumberValue(
  fare.priceValue,
  fare.totalPrice,
  fare.totalFare,
  fare.amount,
  fare.price,
  fare.fare,
  basePrice
)

const getFareConditionLines = (fare, flight) => {
  const conditionSources = [
    fare.conditions,
    fare.condition,
    fare.rules,
    fare.rule,
    fare.rulesText,
    fare.fareRules,
    fare.baggageConditions,
    fare.ticketConditions,
    fare.services,
    fare.baggage,
    fare.baggageInfo,
    fare.checkedBaggage,
    fare.freeBaggage,
    fare.allowanceBaggage,
    fare.carryOnBaggage,
    fare.handBaggage,
    fare.changeCondition,
    fare.refundCondition,
    fare.holdCondition,
    flight.fareConditions,
    flight.conditions
  ]

  const lines = conditionSources.flatMap(normalizeTextList)
  return [...new Set(lines)]
}

function FlightCard({ flight, isReturn, onSelect, isSelected, displayDate, overrideDeparture, overrideArrival }) {
  const {
    airline,
    logo,
    flightNumber,
    departureTime,
    departureCode,
    departureCity,
    departureAirport,
    arrivalTime,
    arrivalCode,
    arrivalCity,
    arrivalAirport,
    duration,
    flightType,
    price,
    priceValue,
    nextDay,
    date
  } = flight

  const [showDetails, setShowDetails] = useState(false)
  const [showFareModal, setShowFareModal] = useState(false)

  const formatMoney = (value) => Number(value || 0).toLocaleString('vi-VN')
  const basePrice = getNumberValue(priceValue, price)
  const apiFareOptions = flight.fareOptions || flight.fares || flight.fareClasses || flight.ticketClasses || flight.priceOptions || []
  const fareOptions = (apiFareOptions.length ? apiFareOptions : [{
    id: flight.fareId,
    name: flight.fareClass,
    priceValue: basePrice,
    conditions: flight.fareConditions || flight.conditions || []
  }]).map((fare, index) => ({
    ...fare,
    id: getFareId(fare, index),
    name: getFareName(fare),
    priceValue: getFarePrice(fare, basePrice)
  }))
  const selectedFare = fareOptions.find(option => option.id === flight.fareId || option.name === flight.fareClass) || fareOptions[0]
  const [draftFareId, setDraftFareId] = useState(selectedFare.id)
  const draftFare = fareOptions.find(option => option.id === draftFareId) || selectedFare
  const displayPrice = formatMoney(selectedFare.priceValue || basePrice)

  const buildSelectedFlight = (fare) => ({
    ...flight,
    fareClass: fare.name,
    fareId: fare.id,
    fareOptions,
    fareConditions: getFareConditionLines(fare, flight),
    selectedFare: fare,
    priceValue: fare.priceValue,
    price: formatMoney(fare.priceValue)
  })

  const openFareModal = () => {
    setDraftFareId(selectedFare.id)
    setShowFareModal(true)
  }

  const handleMainSelectClick = () => {
    if (isSelected) {
      onSelect(buildSelectedFlight(selectedFare))
      return
    }

    openFareModal()
  }

  const handleConfirmFare = () => {
    onSelect({
      ...buildSelectedFlight(draftFare)
    })
    setShowFareModal(false)
  }

  const showFareOptions = false
  const handleSelectFare = (fare) => {
    onSelect(buildSelectedFlight(fare))
  }

  const dCity = overrideDeparture?.city || departureCity;
  const dCode = overrideDeparture?.code || departureCode;
  const dAirport = overrideDeparture?.airport || departureAirport;

  const aCity = overrideArrival?.city || arrivalCity;
  const aCode = overrideArrival?.code || arrivalCode;
  const aAirport = overrideArrival?.airport || arrivalAirport;

  // Calculate arrival date if nextDay is true
  const getArrivalDate = () => {
    if (!displayDate) return "";
    const dateStr = displayDate.split(', ')[1]; // Extract "dd/MM/yyyy"
    if (!nextDay) return dateStr;
    try {
      const parsedDate = parse(dateStr, 'dd/MM/yyyy', new Date());
      const nextDate = addDays(parsedDate, 1);
      return format(nextDate, 'dd/MM/yyyy');
    } catch (e) {
      return dateStr;
    }
  };

  const depDateOnly = displayDate?.split(', ')[1] || "";
  const arrDateOnly = getArrivalDate();
  const fareConditions = getFareConditionLines(draftFare, flight)

  return (
    <div className={`bg-white rounded-2xl border ${isSelected ? 'border-[#2563eb] ring-1 ring-[#2563eb]' : 'border-[#e8edf5]'} overflow-visible transition-all duration-300 relative`}>
      {/* Main Content */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start gap-3">

          {/* Airline Logo + Name */}
          <div className="flex flex-col items-center w-[72px] shrink-0 pt-1">
            <div className="w-[56px] h-[40px] flex items-center justify-center mb-1.5">
              <img
                src={logo}
                alt={airline}
                className="max-w-full max-h-full object-contain"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
            <span className="text-[9px] font-semibold text-[#1e3a5f] text-center leading-tight">{airline}</span>
          </div>

          {/* Flight Info: Departure - Path - Arrival */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start">

              {/* Departure */}
              <div className="w-[72px] shrink-0">
                <p className="text-[17px] font-bold text-[#1a1a2e] leading-none mb-1">{departureTime}</p>
                <p className="text-[14px] font-bold text-[#1a1a2e] mb-0.5">{dCode}</p>
                <p className="text-[10px] text-[#8a94a6] leading-tight">{dCity}</p>
                <p className="text-[9px] text-[#a8b0bf] leading-tight truncate">{dAirport}</p>
              </div>

              {/* Path Indicator */}
              <div className="flex-1 flex flex-col items-center justify-center pt-2 px-1 min-w-[50px]">
                <div className="w-full flex items-center">
                  <div className="w-[5px] h-[5px] rounded-full border-[1.5px] border-[#c0c8d4]"></div>
                  <div className="flex-1 relative">
                    <div className="border-t border-dashed border-[#c0c8d4] w-full"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#3b82f6]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-[14px] h-[14px] rotate-90">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-[5px] h-[5px] rounded-full bg-[#c0c8d4]"></div>
                </div>
                <p className="text-[10px] text-[#8a94a6] mt-1">{duration}</p>
                <p className="text-[9px] text-[#a8b0bf]">{flightType}</p>
              </div>

              {/* Arrival */}
              <div className="w-[72px] shrink-0 text-right">
                <p className="text-[17px] font-bold text-[#1a1a2e] leading-none mb-1">
                  {arrivalTime}
                  {nextDay && <sup className="text-[9px] text-[#3b82f6] font-bold ml-0.5">+1</sup>}
                </p>
                <p className="text-[14px] font-bold text-[#1a1a2e] mb-0.5">{aCode}</p>
                <p className="text-[10px] text-[#8a94a6] leading-tight">{aCity}</p>
                <p className="text-[9px] text-[#a8b0bf] leading-tight truncate">{aAirport}</p>
              </div>
            </div>
          </div>

          {/* Price + Button */}
          <div className="w-[90px] shrink-0 text-right pt-0.5 relative">
            <p className="text-[16px] font-bold text-[#1a1a2e] leading-none tracking-tight">{displayPrice}</p>
            <p className="text-[9px] text-[#8a94a6] mt-0.5">VND</p>
            <div className={`mt-3 w-full rounded-lg overflow-hidden flex ${
              isSelected ? 'bg-[#10b981] text-white' : 'bg-[#2563eb] text-white'
            }`}>
              <button
                type="button"
                onClick={handleMainSelectClick}
                className={`flex-1 font-bold py-[9px] text-[11px] active:scale-95 transition-all cursor-pointer ${
                  isSelected ? 'hover:bg-emerald-600' : 'hover:bg-[#1d4ed8]'
                }`}
              >
                {isSelected ? 'Đã chọn' : 'Chọn mua'}
              </button>
              <button
                type="button"
                onClick={openFareModal}
                className={`w-[28px] flex items-center justify-center border-l active:scale-95 transition-all cursor-pointer ${
                  isSelected ? 'border-white/25 hover:bg-emerald-600' : 'border-white/25 hover:bg-[#1d4ed8]'
                }`}
                aria-label="Chọn hạng vé"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
            {showFareOptions && (
              <div className="absolute right-0 top-[72px] w-[190px] bg-white rounded-2xl border border-[#e2e8f0] shadow-[0_16px_40px_rgba(15,23,42,0.18)] z-30 overflow-hidden text-left">
                {fareOptions.map((fare) => {
                  const activeFare = isSelected && selectedFare.id === fare.id
                  return (
                    <button
                      key={fare.id}
                      type="button"
                      onClick={() => handleSelectFare(fare)}
                      className={`w-full px-3.5 py-3 flex items-center justify-between gap-3 transition-colors ${
                        activeFare ? 'bg-[#eff6ff]' : 'hover:bg-[#f8fafc]'
                      }`}
                    >
                      <span>
                        <span className={`block text-[12px] font-bold ${activeFare ? 'text-[#2563eb]' : 'text-[#0f172a]'}`}>{fare.name}</span>
                        <span className="block text-[10px] text-[#64748b] mt-0.5">Hạng vé</span>
                      </span>
                      <span className={`text-[12px] font-black whitespace-nowrap ${activeFare ? 'text-[#2563eb]' : 'text-[#0f172a]'}`}>
                        {formatMoney(fare.priceValue)}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="px-6 py-6 border-t border-[#eef1f6] bg-white animate-in slide-in-from-top duration-300">
          <div className="flex gap-6 relative">
            {/* Left Column: Times and Dates */}
            <div className="w-[100px] flex flex-col justify-between py-1">
              <div>
                <p className="text-[15px] font-bold text-[#1a1a2e]">{departureTime}</p>
                <p className="text-[11px] text-[#64748b] mt-0.5">{depDateOnly}</p>
              </div>
              
              <div className="my-6">
                <p className="text-[11px] text-[#94a3b8] font-medium">{duration}</p>
              </div>

              <div>
                <p className="text-[15px] font-bold text-[#1a1a2e]">{arrivalTime}</p>
                <p className="text-[11px] text-[#64748b] mt-0.5">{arrDateOnly}</p>
              </div>
            </div>

            {/* Middle Column: Timeline */}
            <div className="flex flex-col items-center py-2 relative">
              <div className="w-[8px] h-[8px] rounded-full bg-[#94a3b8] z-10 shadow-[0_0_0_2px_#fff]"></div>
              <div className="flex-1 border-l-2 border-dotted border-[#cbd5e1] my-1 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-2 z-10 text-[#64748b]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-[16px] h-[16px] rotate-90">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                  </svg>
                </div>
              </div>
              <div className="w-[8px] h-[8px] rounded-full bg-[#94a3b8] z-10 shadow-[0_0_0_2px_#fff]"></div>
            </div>

            {/* Right Column: Airports and Airline */}
            <div className="flex-1 flex flex-col justify-between py-0.5">
              <div>
                <p className="text-[14px] font-bold text-[#1e293b] leading-tight">{dAirport} ({dCode})</p>
                <p className="text-[11px] text-[#64748b] mt-0.5">{dCity}</p>
              </div>

              <div className="flex items-center gap-3 my-4">
                <div className="w-[40px] h-[28px] flex items-center justify-center">
                  <img src={logo} alt={airline} className="max-w-full max-h-full object-contain" />
                </div>
                <p className="text-[12px] text-[#64748b] font-medium">
                  Hãng bay: <span className="text-[#1e293b] font-bold">{airline}</span> ({flightNumber})
                </p>
              </div>

              <p className="text-[12px] text-[#64748b] font-medium mb-4">
                Hạng vé: <span className="text-[#1e293b] font-bold">{selectedFare.name}</span>
              </p>

              <div>
                <p className="text-[14px] font-bold text-[#1e293b] leading-tight">{aAirport} ({aCode})</p>
                <p className="text-[11px] text-[#64748b] mt-0.5">{aCity}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#f8fafc] px-4 py-2.5 border-t border-[#eef1f6] flex items-center justify-between">
        <div className="flex items-center gap-4 text-[10px] text-[#8a94a6]">
          <span>Số hiệu chuyến bay: <b className="text-[#4a5568] uppercase">{flightNumber}</b></span>
          <span>{isReturn ? 'Ngày về' : 'Ngày đi'}: <b className="text-[#4a5568]">{displayDate || date}</b></span>
          <span>Hạng vé: <b className="text-[#4a5568]">{selectedFare.name}</b></span>
        </div>
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-[9px] text-[#2563eb] font-bold flex items-center gap-0.5 cursor-pointer hover:underline"
        >
          {showDetails ? 'Thu gọn' : 'Chi tiết chuyến bay'}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`w-2.5 h-2.5 transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>

      {showFareModal && (
        <>
          <div className="fixed inset-0 bg-black/45 z-[220] backdrop-blur-[2px]" onClick={() => setShowFareModal(false)}></div>
          <div className="fixed inset-x-0 bottom-0 z-[230] flex justify-center">
            <div className="w-full max-w-[450px] bg-white rounded-t-[22px] shadow-[0_-18px_50px_rgba(15,23,42,0.25)] overflow-hidden animate-in slide-in-from-bottom duration-300">
              <div className="px-5 py-3 border-b border-[#e5e7eb] text-center">
                <h3 className="text-[17px] font-extrabold text-[#245da8]">Chuyến đi của bạn</h3>
              </div>

              <div className="px-5 py-4 border-b border-[#eef1f6]">
                <div className="grid grid-cols-[92px_28px_1fr] gap-3">
                  <div className="space-y-7">
                    <p className="text-[13px] font-extrabold text-[#4b5563]">{departureTime} <span>{depDateOnly}</span></p>
                    <p className="text-[10px] text-[#c4cad3]">{duration}</p>
                    <p className="text-[13px] font-extrabold text-[#4b5563]">{arrivalTime} <span>{arrDateOnly}</span></p>
                  </div>

                  <div className="flex flex-col items-center pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b7bfca]"></span>
                    <span className="flex-1 border-l-2 border-dotted border-[#b7bfca] my-1 relative">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rotate-90 text-[#9aa3af] bg-white">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                      </svg>
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b7bfca]"></span>
                  </div>

                  <div className="space-y-6 min-w-0">
                    <p className="text-[14px] font-extrabold text-[#4b5563] leading-tight">{dAirport} ({dCode})</p>
                    <div className="flex items-center gap-3">
                      <img src={logo} alt={airline} className="w-[42px] h-[28px] object-contain" />
                      <p className="text-[12px] text-[#9aa3af] leading-tight">
                        Hãng bay: <span className="text-[#7b8491]">{airline}</span><br />
                        <span>({flightNumber})</span>
                      </p>
                    </div>
                    <p className="text-[14px] font-extrabold text-[#4b5563] leading-tight">{aAirport} ({aCode})</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 px-5 py-4 border-b border-[#eef1f6]">
                {fareOptions.map((fare) => {
                  const isActive = draftFare.id === fare.id
                  return (
                    <button
                      key={fare.id}
                      type="button"
                      onClick={() => setDraftFareId(fare.id)}
                      className={`h-[62px] rounded-[8px] border px-3 text-center shadow-[0_4px_12px_rgba(15,23,42,0.12)] transition-all ${
                        isActive
                          ? 'bg-[#5bb6e2] border-[#5bb6e2] text-white'
                          : 'bg-white border-[#e5e7eb] text-[#8a8f98]'
                      }`}
                    >
                      <span className="block text-[13px] font-medium truncate">{fare.name}</span>
                      <span className="block text-[14px] mt-1">{formatMoney(fare.priceValue)} VND</span>
                    </button>
                  )
                })}
              </div>

              <div className="px-4 py-4 min-h-[210px]">
                <h4 className="text-[16px] font-extrabold text-[#20242c] mb-2">Điều kiện hành lý và vé</h4>
                <ul className="space-y-1.5 text-[12px] leading-relaxed text-[#4b5563] list-disc pl-4">
                  {fareConditions.length > 0 ? (
                    fareConditions.map((condition) => (
                      <li key={condition}>{condition}</li>
                    ))
                  ) : (
                    <li>Chưa có dữ liệu điều kiện từ hãng vé.</li>
                  )}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 px-5 py-4 border-t border-[#eef1f6]">
                <button
                  type="button"
                  onClick={() => setShowFareModal(false)}
                  className="h-[36px] rounded-[4px] border border-[#245da8] text-[#1f2937] text-[13px] font-extrabold"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={handleConfirmFare}
                  className="h-[36px] rounded-[4px] bg-[#245da8] text-white text-[13px] font-extrabold"
                >
                  Chọn
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default FlightCard
