import { useState } from 'react'
import { format, addDays, parse } from 'date-fns'

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
    nextDay,
    date
  } = flight

  const [showDetails, setShowDetails] = useState(false)

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

  return (
    <div className={`bg-white rounded-2xl border ${isSelected ? 'border-[#2563eb] ring-1 ring-[#2563eb]' : 'border-[#e8edf5]'} overflow-hidden transition-all duration-300`}>
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
          <div className="w-[90px] shrink-0 text-right pt-0.5">
            <p className="text-[16px] font-bold text-[#1a1a2e] leading-none tracking-tight">{price}</p>
            <p className="text-[9px] text-[#8a94a6] mt-0.5">VND</p>
            <button 
              onClick={() => onSelect(flight)}
              className={`mt-3 w-full font-bold py-[9px] rounded-lg text-[11px] active:scale-95 transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-[#10b981] text-white' 
                  : 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
              }`}
            >
              {isSelected ? 'Đã chọn' : 'Chọn mua'}
            </button>
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
    </div>
  )
}

export default FlightCard
