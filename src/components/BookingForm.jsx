import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PassengerCounter from './PassengerCounter'
import iconDi from '../assets/icons/đi.png'
import iconVe from '../assets/icons/về.png'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import toast from 'react-hot-toast'

const PlaneUpIcon = () => (
  <div className="flex flex-col items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-[28px] h-[28px]">
      <path d="M21.57 9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-1.93.51 4.14 7.17-4.97 1.33-1.97-1.54-1.45.39 1.82 3.16.77 1.33 1.6-.43 15.31-4.09c.8-.21 1.28-1.03 1.07-1.83z" />
    </svg>
    <div className="w-[24px] h-[2px] bg-[#2563eb] mt-[1px] rounded-full"></div>
  </div>
)

const PlaneDownIcon = () => (
  <div className="flex flex-col items-center translate-y-[2px]">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-[28px] h-[28px]">
      <path d="M2.43 14.64c.21.8 1.04 1.28 1.84 1.06L9.08 14l6.9 6.43 1.93-.51-4.14-7.17 4.97-1.33 1.97 1.54 1.45-.39-1.82-3.16-.77-1.33-1.6.43-15.31 4.09c-.8.21-1.28 1.03-1.07 1.83z" />
    </svg>
    <div className="w-[24px] h-[2px] bg-[#2563eb] mt-[1px] rounded-full"></div>
  </div>
)

const CalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2563eb" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
)

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#64748b" className="w-4 h-4 shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)

const AdultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2563eb" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
)

const ChildIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2563eb" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
  </svg>
)

const BabyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#2563eb" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
)

const SelectorBox = React.forwardRef(({ icon, title, subtitle, onClick, value }, ref) => {
  const displayTitle = title || value;
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="w-full bg-[#f8fafc] rounded-2xl border border-transparent p-2.5 flex items-center gap-2.5 hover:bg-[#f1f5f9] transition-all cursor-pointer group text-left"
    >
      <div className="w-[44px] h-[44px] rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <p className="text-[14px] font-extrabold text-black leading-tight truncate">{displayTitle}</p>
        {subtitle && (
          <p className="text-[12px] text-gray-500 mt-0.5 font-medium leading-tight truncate">{subtitle}</p>
        )}
      </div>
      <ChevronRight />
    </button>
  )
})

const locations = [
  { id: 'HAN', title: 'Hà Nội (HAN)', subtitle: 'Sân bay Nội Bài' },
  { id: 'SGN', title: 'Hồ Chí Minh (SGN)', subtitle: 'Sân bay Tân Sơn Nhất' },
  { id: 'DAD', title: 'Đà Nẵng (DAD)', subtitle: 'Sân bay Đà Nẵng' },
  { id: 'CXR', title: 'Nha Trang (CXR)', subtitle: 'Sân bay Cam Ranh' },
  { id: 'PQC', title: 'Phú Quốc (PQC)', subtitle: 'Sân bay Phú Quốc' },
]

const LocationDropdown = ({ isOpen, onSelect, onClose, currentSelection }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-[#f1f5f9] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="max-h-[300px] overflow-y-auto py-2">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => { onSelect(loc); onClose(); }}
              className={`w-full flex items-center gap-4 px-5 py-3.5 hover:bg-[#f8fafc] transition-colors text-left
                ${currentSelection?.id === loc.id ? 'bg-[#f0f7ff]' : ''}`}
            >
              <div className="w-[36px] h-[36px] rounded-lg bg-[#f1f5f9] flex items-center justify-center text-[#2563eb] shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[14px] font-bold ${currentSelection?.id === loc.id ? 'text-[#2563eb]' : 'text-slate-900'}`}>{loc.title}</p>
                <p className="text-[12px] text-slate-500 truncate">{loc.subtitle}</p>
              </div>
              {currentSelection?.id === loc.id && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="#2563eb" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function BookingForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const initialData = location.state || {}

  const [isRoundTrip, setIsRoundTrip] = useState(initialData.isRoundTrip ?? true)
  
  const findLoc = (title) => locations.find(l => l.title === title) || locations[0]
  const [from, setFrom] = useState(initialData.from ? findLoc(initialData.from) : locations[0])
  const [to, setTo] = useState(initialData.to ? findLoc(initialData.to) : locations[1])
  
  const [showFromList, setShowFromList] = useState(false)
  const [showToList, setShowToList] = useState(false)
  
  const [adults, setAdults] = useState(initialData.adults ?? 1)
  const [children, setChildren] = useState(initialData.children ?? 0)
  const [babies, setBabies] = useState(initialData.babies ?? 0)
  
  const [departureDate, setDepartureDate] = useState(initialData.departureDate ? new Date(initialData.departureDate) : new Date())
  const [returnDate, setReturnDate] = useState(initialData.returnDate ? new Date(initialData.returnDate) : new Date(new Date().setDate(new Date().getDate() + 2)))

  const formatDate = (date) => {
    if (!date) return { title: 'Chưa chọn', subtitle: 'Thứ ...' };
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const dayName = dayNames[date.getDay()];
    return {
      title: `${dayName}, ${format(date, 'dd/MM/yyyy')}`,
      subtitle: `Tháng ${format(date, 'MM')}, Năm ${format(date, 'yyyy')}`
    };
  }

  return (
    <div className="relative -mt-[110px] z-20 px-4 pb-28">
      <div className="bg-white rounded-[28px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-6 space-y-4">
        <div className="relative space-y-4">
          <div className="space-y-2 relative">
            <label className="text-[13px] font-bold text-[#2563eb] ml-1">Điểm đi</label>
            <SelectorBox 
              icon={<img src={iconDi} className="w-[28px] h-[28px] object-contain" alt="" />} 
              title={from.title} 
              subtitle={from.subtitle} 
              onClick={() => setShowFromList(!showFromList)}
            />
            <LocationDropdown 
              isOpen={showFromList} 
              onSelect={setFrom} 
              onClose={() => setShowFromList(false)}
              currentSelection={from}
            />
          </div>

          <div className="space-y-2 relative">
            <label className="text-[13px] font-bold text-[#2563eb] ml-1">Điểm đến</label>
            <SelectorBox 
              icon={<img src={iconVe} className="w-[28px] h-[28px] object-contain" alt="" />} 
              title={to.title} 
              subtitle={to.subtitle} 
              onClick={() => setShowToList(!showToList)}
            />
            <LocationDropdown 
              isOpen={showToList} 
              onSelect={setTo} 
              onClose={() => setShowToList(false)}
              currentSelection={to}
            />
          </div>

          <button 
            onClick={() => {
              const temp = from;
              setFrom(to);
              setTo(temp);
            }}
            className="absolute right-4 top-[calc(50%+10px)] -translate-y-1/2 w-[36px] h-[36px] bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-[#f1f5f9] flex items-center justify-center text-[#2563eb] z-10 active:scale-90 transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-[20px] h-[20px] rotate-90">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between ml-1">
            <label className="text-[13px] font-bold text-[#2563eb]">Ngày đi</label>
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-bold text-[#2563eb]">Khứ hồi</span>
              <button 
                onClick={() => setIsRoundTrip(!isRoundTrip)}
                className={`w-[48px] h-[26px] rounded-full transition-colors relative flex items-center px-1
                  ${isRoundTrip ? 'bg-[#2563eb]' : 'bg-[#e2e8f0]'}`}
              >
                <div className={`w-[20px] h-[20px] bg-white rounded-full transition-transform
                  ${isRoundTrip ? 'translate-x-[20px]' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
          <div className="relative">
            <DatePicker
              selected={departureDate}
              onChange={(date) => setDepartureDate(date)}
              dateFormat="dd-MM-yyyy"
              minDate={new Date()}
              wrapperClassName="w-full"
              className="w-full"
              customInput={
                <SelectorBox 
                  icon={<CalIcon />} 
                  title={formatDate(departureDate).title}
                  subtitle={formatDate(departureDate).subtitle} 
                />
              }
            />
          </div>
        </div>

        {isRoundTrip && (
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-[#2563eb] ml-1">Ngày về</label>
            <div className="relative">
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                dateFormat="dd-MM-yyyy"
                minDate={departureDate}
                wrapperClassName="w-full"
                className="w-full"
                customInput={
                  <SelectorBox 
                    icon={<CalIcon />} 
                    title={formatDate(returnDate).title}
                    subtitle={formatDate(returnDate).subtitle} 
                  />
                }
              />
            </div>
          </div>
        )}

        <div className="bg-[#f8fafc] rounded-2xl p-2.5 space-y-0">
          <PassengerCounter
            icon={<AdultIcon />}
            label="Người lớn"
            subtitle=">= 12 tuổi"
            count={adults}
            onIncrement={() => setAdults(adults + 1)}
            onDecrement={() => setAdults(adults - 1)}
            min={1}
          />
          <div className="border-t border-[#e2e8f0] mx-4 my-1"></div>
          <PassengerCounter
            icon={<ChildIcon />}
            label="Trẻ em"
            subtitle="2-12 tuổi"
            count={children}
            onIncrement={() => setChildren(children + 1)}
            onDecrement={() => setChildren(children - 1)}
          />
          <div className="border-t border-[#e2e8f0] mx-4 my-1"></div>
          <PassengerCounter
            icon={<BabyIcon />}
            label="Em bé"
            subtitle="< 2 tuổi"
            count={babies}
            onIncrement={() => setBabies(babies + 1)}
            onDecrement={() => setBabies(babies - 1)}
          />
        </div>

        <button 
          onClick={() => {
            if (from.title === to.title) {
              toast.error('Điểm đi và điểm đến không được trùng nhau', {
                style: { borderRadius: '12px', background: '#333', color: '#fff', fontSize: '13px', fontWeight: 'bold' }
              });
              return;
            }
            if (babies > adults) {
              toast.error('Số lượng em bé không được lớn hơn số lượng người lớn', {
                style: { borderRadius: '12px', background: '#333', color: '#fff', fontSize: '13px', fontWeight: 'bold' }
              });
              return;
            }
            const totalPassengers = adults + children + babies;
            if (totalPassengers > 9) {
              toast.error('Số lượng hành khách vượt quá giới hạn cho phép', {
                style: { borderRadius: '12px', background: '#333', color: '#fff', fontSize: '13px', fontWeight: 'bold' }
              });
              return;
            }
            navigate('/search', { 
              state: { 
                passengerCount: totalPassengers,
                adults,
                children,
                babies,
                from: from.title,
                to: to.title,
                departureDate: departureDate.toISOString(),
                returnDate: isRoundTrip ? returnDate.toISOString() : null,
                isRoundTrip
              } 
            });
          }}
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-extrabold py-4 rounded-2xl shadow-lg active:scale-[0.98] transition-all cursor-pointer text-[16px] flex items-center justify-center gap-3 mt-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-[24px] h-[24px] rotate-90">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
          Tìm chuyến bay
        </button>
      </div>
    </div>
  )
}

export default BookingForm
