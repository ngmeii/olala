import { useState } from 'react'
import TripTypeTabs from './TripTypeTabs'

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
)

function SearchForm({ onSearch }) {
  const [tripType, setTripType] = useState('one-way')
  const [from, setFrom] = useState('Hà Nội (HAN)')
  const [to, setTo] = useState('TP. Hồ Chí Minh (SGN)')
  const [departureDate, setDepartureDate] = useState('Thứ Sáu, 30/05/2025')
  const [returnDate, setReturnDate] = useState('Chủ Nhật, 01/06/2025')
  const [passengers, setPassengers] = useState('1 Người lớn')

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
  }

  const handleSearch = () => {
    if (onSearch) {
      const searchData = { tripType, from, to, departureDate, passengers }
      if (tripType === 'round-trip') searchData.returnDate = returnDate
      onSearch(searchData)
    }
  }

  const isRoundTrip = tripType === 'round-trip'

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Trip Type Tabs */}
      <div className="flex justify-center">
        <TripTypeTabs activeTab={tripType} onTabChange={setTripType} />
      </div>

      {/* Search Fields */}
      <div className="bg-card rounded-2xl shadow-lg shadow-primary/5 border border-border/50 overflow-hidden divide-y divide-border/50">
        {/* From - To */}
        <div className="relative">
          {/* From */}
          <div className="px-4 py-3 border-b border-border/50">
            <label className="text-xs text-text-light font-medium">Điểm đi</label>
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="text-base font-semibold text-text bg-transparent outline-none w-full"
              />
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-primary-light rounded-full flex items-center justify-center border-2 border-white shadow-md hover:bg-primary hover:text-white transition-all duration-300 group cursor-pointer"
            aria-label="Hoán đổi điểm đi và điểm đến"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary group-hover:text-white transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
            </svg>
          </button>

          {/* To */}
          <div className="px-4 py-3">
            <label className="text-xs text-text-light font-medium">Điểm đến</label>
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="text-base font-semibold text-text bg-transparent outline-none w-full"
              />
            </div>
          </div>
        </div>

        {/* Date Section */}
        {isRoundTrip ? (
          /* Round Trip: Two date fields side by side */
          <div className="flex divide-x divide-border/50">
            {/* Departure Date */}
            <div className="flex-1 px-4 py-3">
              <label className="text-xs text-text-light font-medium">Ngày đi</label>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-base font-semibold text-text">{departureDate}</p>
                <div className="w-8 h-8 flex items-center justify-center rounded-full text-text-light hover:bg-primary-light hover:text-primary transition-colors shrink-0">
                  <CalendarIcon />
                </div>
              </div>
            </div>

            {/* Return Date */}
            <div className="flex-1 px-4 py-3">
              <label className="text-xs text-text-light font-medium">Ngày về</label>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-base font-semibold text-primary">{returnDate}</p>
                <div className="w-8 h-8 flex items-center justify-center rounded-full text-text-light hover:bg-primary-light hover:text-primary transition-colors shrink-0">
                  <CalendarIcon />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* One Way: Single date field */
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <label className="text-xs text-text-light font-medium">Ngày bay</label>
              <p className="text-base font-semibold text-text">{departureDate}</p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-text-light hover:bg-primary-light hover:text-primary transition-colors">
              <CalendarIcon />
            </div>
          </div>
        )}

        {/* Passengers */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <label className="text-xs text-text-light font-medium">Số hành khách</label>
            <p className="text-base font-semibold text-text">{passengers}</p>
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full text-text-light hover:bg-primary-light hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 active:scale-[0.98] cursor-pointer text-base"
      >
        Tìm kiếm
      </button>
    </div>
  )
}

export default SearchForm
