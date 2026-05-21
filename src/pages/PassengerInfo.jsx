import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import logoSun from '../assets/icons/sun-phuquoc-airways.png'
import logoVietjet from '../assets/icons/vietjet air.png'
import logoVNA from '../assets/icons/logo vietnam airlines.png'
import logoBamboo from '../assets/icons/bamboo.png'
import background2 from '../assets/images/background2.png'

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#2563eb" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
)

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#2563eb" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
)

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
)

const BookingStep = ({ number, label, active = false }) => (
  <div className="flex items-center gap-1.5 min-w-0">
    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${active ? 'bg-white text-[#1678f2]' : 'border border-white/85 text-white'}`}>
      {number}
    </span>
    <span className={`text-[12px] font-bold whitespace-nowrap ${active ? 'text-white' : 'text-white/85'}`}>
      {label}
    </span>
  </div>
)

const BookingHeader = ({ onBack }) => (
  <div className="sticky top-0 z-50 text-white">
    <div className="h-12 px-3 flex items-center gap-2">
      <button
        onClick={onBack}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/30 active:bg-white/40 transition-colors"
        aria-label="Quay lại"
      >
        <ChevronLeft />
      </button>

      <h1 className="text-[21px] font-black tracking-tight">Thông tin đặt vé</h1>

      <div className="ml-auto h-8 w-[78px] rounded-full bg-white/70 border border-white/50 text-slate-900 flex items-center justify-around shadow-sm">
        <span className="text-[22px] leading-none -mt-2">...</span>
        <span className="h-5 w-px bg-slate-400/60"></span>
        <span className="text-[22px] leading-none -mt-0.5">×</span>
      </div>
    </div>

    <div className="px-7 pb-2 flex items-center">
      <BookingStep number="1" label="Nhập thông tin" active />
      <span className="mx-1 h-px flex-1 min-w-4 max-w-8 bg-white/55"></span>
      <BookingStep number="2" label="Mua dịch vụ" />
      <span className="mx-1 h-px flex-1 min-w-4 max-w-8 bg-white/55"></span>
      <BookingStep number="3" label="Thanh toán" />
    </div>
  </div>
)

const PASSENGER_INFO_DRAFT_KEY = 'passengerInfoDraft'

const getPassengerInfoDraftKey = (searchData) => ([
  searchData.from || '',
  searchData.to || '',
  searchData.departureDate || '',
  searchData.returnDate || '',
  searchData.adults || 1,
  searchData.children || 0,
  searchData.babies || 0,
  searchData.selectedDep?.flightNumber || '',
  searchData.selectedRet?.flightNumber || ''
].join('|'))

const createDefaultPassengers = (totalPassengers, adults, children) => (
  Array.from({ length: totalPassengers }, (_, i) => {
    let type = 'Người lớn (12+)'
    if (i >= adults && i < adults + children) type = 'Trẻ em (2-12)'
    if (i >= adults + children) type = 'Em bé (< 2)'
    return { id: i + 1, type, gender: '', name: '', extra: '' }
  })
)

const getDefaultContactInfo = () => ({
  gender: '',
  name: '',
  phone: '',
  email: ''
})

const getDefaultInvoiceInfo = () => ({
  companyName: '',
  taxCode: '',
  address: '',
  recipientPhone: ''
})

const readPassengerInfoDraft = (searchData, bookingDraftKey) => {
  const stateDraft = searchData.passengerInfoDraft
  if (stateDraft?.bookingKey === bookingDraftKey) return stateDraft

  try {
    const rawDraft = sessionStorage.getItem(PASSENGER_INFO_DRAFT_KEY)
    if (!rawDraft) return null

    const draft = JSON.parse(rawDraft)
    return draft?.bookingKey === bookingDraftKey ? draft : null
  } catch {
    return null
  }
}

const DateInput = ({ value, onChange, error, onFocusClear }) => {
  const [isFocused, setIsFocused] = useState(false);

  // value is expected to be yyyy-mm-dd
  const displayValue = isFocused ? value : (value ? value.split('-').reverse().join('/') : '');

  return (
    <input
      type={isFocused ? "date" : "text"}
      placeholder="Ngày sinh (dd/mm/yyyy) (*)"
      className={`w-full bg-[#f8fafc] border ${error ? 'border-red-500' : 'border-slate-100'} rounded-xl px-4 py-3.5 text-[13px] outline-none focus:border-blue-500 transition-all placeholder:text-slate-400`}
      value={displayValue}
      onFocus={() => {
        setIsFocused(true);
        if (onFocusClear) onFocusClear();
      }}
      onBlur={() => setIsFocused(false)}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const FlightSummaryCard = ({ searchData }) => {
  const { 
    adults = 1, children = 0, babies = 0, 
    from = 'Hà Nội', to = 'Hồ Chí Minh', 
    departureDate = '13/05/2026', returnDate,
    selectedDep = { airline: 'Sun PhuQuoc', departureTime: '05:45', arrivalTime: '07:55', departureCode: 'HAN', arrivalCode: 'SGN' },
    selectedRet
  } = searchData;
  const isRoundTrip = !!returnDate || !!selectedRet;

  const formatDate = (isoString) => {
    if (!isoString) return '';
    if (isoString.includes('/')) return isoString; // already formatted
    try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return isoString;
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    } catch(e) {
      return isoString;
    }
  };

  const renderFlight = (title, flight, date, origin, dest, depAirport, arrAirport) => {
    if (!flight) return null;
    const flightNumber = flight.flightNumber || (title.includes('về') ? 'PQ202' : 'PQ101');
    const duration = flight.duration || '1h 25m';
    const displayDate = formatDate(date);
    
    const getLogo = (airline) => {
      if (!airline) return logoSun;
      const lower = airline.toLowerCase();
      if (lower.includes('vietjet')) return logoVietjet;
      if (lower.includes('vietnam airline')) return logoVNA;
      if (lower.includes('bamboo')) return logoBamboo;
      return logoSun;
    };

    return (
      <div className="flex flex-col pb-6 mb-6 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
        <h3 className="font-bold text-[17px] text-slate-800 mb-4">{title}</h3>
        
        {/* Route Card */}
        <div className="border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] rounded-[20px] p-4 bg-white flex items-center gap-4 mb-5">
          {/* Logo */}
          <div className="w-[70px] h-[70px] flex-shrink-0 flex items-center justify-center rounded-full border border-slate-100 p-2 shadow-sm">
            <img src={getLogo(flight.airline)} alt="logo" className="w-[50px] h-[50px] object-contain" />
          </div>
          
          {/* Timeline */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex justify-between items-start">
              <div className="text-center w-[65px]">
                <h4 className="text-[20px] font-black text-slate-800 leading-tight">{flight.departureCode || 'HAN'}</h4>
                <p className="text-[11px] text-slate-800 font-medium truncate w-[75px] -ml-2" title={origin}>{origin}</p>
                <p className="text-[10px] text-slate-400 truncate w-[75px] -ml-2 mt-0.5" title={depAirport}>{depAirport}</p>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-start pt-3 px-2 relative">
                <div className="w-full relative flex items-center justify-center">
                  <div className="absolute left-0 right-0 h-[2px] bg-blue-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 absolute left-0"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 absolute right-0"></div>
                  <div className="bg-white px-2 z-10 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500 rotate-90">
                      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                    </svg>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 font-medium">{duration}</span>
              </div>
              
              <div className="text-center w-[65px]">
                <h4 className="text-[20px] font-black text-slate-800 leading-tight">{flight.arrivalCode || 'SGN'}</h4>
                <p className="text-[11px] text-slate-800 font-medium truncate w-[75px] -ml-1" title={dest}>{dest}</p>
                <p className="text-[10px] text-slate-400 truncate w-[75px] -ml-1 mt-0.5" title={arrAirport}>{arrAirport}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-3 px-1">
              <span className="border border-blue-200 text-blue-600 bg-blue-50 rounded-lg px-3 py-1 text-[13px] font-semibold">{flight.departureTime}</span>
              <span className="border border-blue-200 text-blue-600 bg-blue-50 rounded-lg px-3 py-1 text-[13px] font-semibold">{flight.arrivalTime}</span>
            </div>
          </div>
        </div>

        {/* Details List */}
        <div className="space-y-1.5 px-2">
          <div className="flex items-start text-[12px]">
            <span className="text-slate-400 font-medium w-[110px]">Hãng vận chuyển:</span>
            <span className="font-semibold text-slate-800">{flight.airline || 'Sun PhuQuoc'}</span>
          </div>
          <div className="flex items-start text-[12px]">
            <span className="text-slate-400 font-medium w-[110px]">Chuyến bay:</span>
            <span className="font-semibold text-slate-800">{flightNumber}</span>
          </div>
          <div className="flex items-start text-[12px]">
            <span className="text-slate-400 font-medium w-[110px]">Giờ bay:</span>
            <span className="font-semibold text-slate-800">{flight.departureTime} {displayDate}</span>
          </div>
          <div className="flex items-start text-[12px]">
            <span className="text-slate-400 font-medium w-[110px]">Hạng chỗ:</span>
            <span className="font-semibold text-slate-800">Economy Classic</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-100 mb-6 p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#2563eb] rotate-45">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>
        <h2 className="text-[16px] font-bold text-slate-900">Chi tiết chuyến bay</h2>
      </div>

      {renderFlight('Chuyến bay chiều đi', selectedDep, departureDate, from, to, 'Sân bay Nội Bài', 'Sân bay Tân Sơn Nhất')}
      {isRoundTrip && renderFlight('Chuyến bay chiều về', selectedRet || { airline: 'Sun PhuQuoc', departureTime: '21:25', arrivalTime: '23:35', departureCode: 'SGN', arrivalCode: 'HAN' }, returnDate || '14/05/2026', to, from, 'Sân bay Tân Sơn Nhất', 'Sân bay Nội Bài')}
    </div>
  );
}

function PassengerInfo() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchData = location.state || {}

  const { adults = 1, children = 0, babies = 0 } = searchData
  const totalPassengers = adults + children + babies
  const bookingDraftKey = getPassengerInfoDraftKey(searchData)
  const savedDraft = readPassengerInfoDraft(searchData, bookingDraftKey)

  const [passengers, setPassengers] = useState(
    savedDraft?.passengers?.length === totalPassengers
      ? savedDraft.passengers
      : createDefaultPassengers(totalPassengers, adults, children)
  )

  const [contactInfo, setContactInfo] = useState(savedDraft?.contactInfo || getDefaultContactInfo())

  const [exportInvoice, setExportInvoice] = useState(savedDraft?.exportInvoice || false)
  const [invoiceInfo, setInvoiceInfo] = useState(savedDraft?.invoiceInfo || getDefaultInvoiceInfo())

  const [errors, setErrors] = useState({})

  const clearError = (key) => {
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const clearInvoiceErrors = () => {
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith('invoice_')) delete newErrors[key];
      });
      return newErrors;
    });
  };

  const formatName = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toUpperCase();
  };

  const getAge = (dobString) => {
    if (!dobString) return -1;
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return -1;
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  const handleSubmit = () => {
    let newErrors = {};
    let isValid = true;

    passengers.forEach((p, idx) => {
      // Validate Gender
      if (!p.gender) {
        newErrors[`p_${idx}_gender`] = 'Thiếu thông tin hành khách';
        isValid = false;
      }

      // Validate Name
      if (!p.name || p.name.trim() === '') {
        newErrors[`p_${idx}_name`] = 'Thiếu thông tin hành khách';
        isValid = false;
      } else if (p.name.trim().split(' ').length < 2) {
        newErrors[`p_${idx}_name`] = 'Họ và tên không hợp lệ';
        isValid = false;
      }

      // Validate Phone/DOB
      if (!p.extra || p.extra.trim() === '') {
        newErrors[`p_${idx}_extra`] = 'Thiếu thông tin hành khách';
        isValid = false;
      } else {
        if (idx < adults) {
          // Adult: check phone
          if (!/^\d{10,11}$/.test(p.extra.trim())) {
            newErrors[`p_${idx}_extra`] = 'Số điện thoại không hợp lệ';
            isValid = false;
          }
        } else {
          // Child / Baby: check DOB
          const age = getAge(p.extra);
          if (age === -1) {
            newErrors[`p_${idx}_extra`] = 'Ngày sinh không hợp lệ';
            isValid = false;
          } else if (idx < adults + children) {
            // Child
            if (age < 2 || age >= 12) {
              newErrors[`p_${idx}_extra`] = 'Trẻ em phải từ 2 đến 12 tuổi';
              isValid = false;
            }
          } else {
            // Baby
            if (age >= 2) {
              newErrors[`p_${idx}_extra`] = 'Em bé phải nhỏ hơn 2 tuổi';
              isValid = false;
            }
          }
        }
      }

      // Validate Accompanying Adult
      if (idx >= adults + children && !p.accompanying) {
        newErrors[`p_${idx}_accompanying`] = 'Chưa chọn người lớn đi kèm';
        isValid = false;
      }
    });

    // Contact Info Validation
    if (!contactInfo.gender) {
      newErrors['contact_gender'] = 'Thiếu thông tin hành khách';
      isValid = false;
    }

    if (!contactInfo.name || contactInfo.name.trim() === '') {
      newErrors['contact_name'] = 'Thiếu thông tin hành khách';
      isValid = false;
    } else if (contactInfo.name.trim().split(' ').length < 2) {
      newErrors['contact_name'] = 'Họ và tên không hợp lệ';
      isValid = false;
    }

    if (!contactInfo.phone || contactInfo.phone.trim() === '') {
      newErrors['contact_phone'] = 'Thiếu thông tin hành khách';
      isValid = false;
    } else if (!/^\d{10,11}$/.test(contactInfo.phone.trim())) {
      newErrors['contact_phone'] = 'Số điện thoại không hợp lệ';
      isValid = false;
    }

    if (!contactInfo.email || contactInfo.email.trim() === '') {
      newErrors['contact_email'] = 'Thiếu thông tin hành khách';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email.trim())) {
      newErrors['contact_email'] = 'Email không đúng định dạng';
      isValid = false;
    }

    if (exportInvoice) {
      if (!invoiceInfo.companyName || invoiceInfo.companyName.trim() === '') {
        newErrors['invoice_companyName'] = 'Vui lòng nhập đầy đủ thông tin xuất hóa đơn';
        isValid = false;
      }

      if (!invoiceInfo.taxCode || invoiceInfo.taxCode.trim() === '') {
        newErrors['invoice_taxCode'] = 'Vui lòng nhập đầy đủ thông tin xuất hóa đơn';
        isValid = false;
      } else if (!/^\d{10,13}$/.test(invoiceInfo.taxCode.trim())) {
        newErrors['invoice_taxCode'] = 'Mã số thuế không hợp lệ';
        isValid = false;
      }

      if (!invoiceInfo.address || invoiceInfo.address.trim() === '') {
        newErrors['invoice_address'] = 'Vui lòng nhập đầy đủ thông tin xuất hóa đơn';
        isValid = false;
      } else if (invoiceInfo.address.trim().length > 255) {
        newErrors['invoice_address'] = 'Địa chỉ không hợp lệ';
        isValid = false;
      }

      if (!invoiceInfo.recipientPhone || invoiceInfo.recipientPhone.trim() === '') {
        newErrors['invoice_recipientPhone'] = 'Vui lòng nhập đầy đủ thông tin xuất hóa đơn';
        isValid = false;
      } else if (!/^\d{10,11}$/.test(invoiceInfo.recipientPhone.trim())) {
        newErrors['invoice_recipientPhone'] = 'Người nhận hóa đơn không hợp lệ';
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (!isValid) {
      // Find first error message to show in toast
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError, {
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });

      // Auto scroll and focus to the first error element
      setTimeout(() => {
        const firstErrorEl = document.querySelector('.border-red-500');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstErrorEl.focus();
        }
      }, 100);

      return;
    }

    toast.success('Thông tin đã được lưu!', {
      style: { borderRadius: '12px', background: '#0f172a', color: '#fff' }
    })

    const passengerInfoDraft = {
      bookingKey: bookingDraftKey,
      passengers,
      contactInfo,
      exportInvoice,
      invoiceInfo
    }

    sessionStorage.setItem(PASSENGER_INFO_DRAFT_KEY, JSON.stringify(passengerInfoDraft))

    navigate('/services', {
      state: {
        ...searchData,
        passengers,
        contactInfo,
        exportInvoice,
        invoiceInfo: exportInvoice ? invoiceInfo : null,
        passengerInfoDraft
      }
    })
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f0f4fa] pb-28">
      <div
        className="absolute inset-x-0 top-0 z-0 h-[500px] bg-cover bg-top pointer-events-none"
        style={{
          backgroundImage: `url(${background2})`,
          backgroundPosition: 'center top'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[#f0f4fa]" />
      </div>
      <div className="relative z-10">
      <BookingHeader onBack={() => navigate(-1)} />

      <div className="p-4 space-y-6 max-w-[1200px] mx-auto">
        {/* Flight Summary Section */}
        <FlightSummaryCard searchData={searchData} />

        {/* Passenger Info Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <UserIcon />
            </div>
            <h2 className="text-[16px] font-bold text-slate-900">Thông tin hành khách</h2>
          </div>

          {passengers.map((p, idx) => (
            <div key={p.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-[#2563eb] text-[13px] font-bold flex items-center justify-center">
                  {p.id}
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-slate-900">Hành khách {p.id}</h3>
                  <p className="text-[11px] text-slate-400 font-medium">{p.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-4">
                  <select
                    className={`w-full bg-[#f8fafc] border ${errors[`p_${idx}_gender`] ? 'border-red-500' : 'border-slate-100'} rounded-xl px-3 py-3.5 text-[13px] outline-none focus:border-blue-500 transition-all appearance-none`}
                    value={p.gender}
                    onChange={(e) => {
                      const newPs = [...passengers]
                      newPs[idx].gender = e.target.value
                      setPassengers(newPs)
                      clearError(`p_${idx}_gender`)
                    }}
                  >
                    <option value="">Giới tính (*)</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                  {errors[`p_${idx}_gender`] && <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium">{errors[`p_${idx}_gender`]}</p>}
                </div>
                <div className="col-span-8">
                  <input
                    type="text"
                    placeholder="Họ và tên (*)"
                    className={`w-full bg-[#f8fafc] border ${errors[`p_${idx}_name`] ? 'border-red-500' : 'border-slate-100'} rounded-xl px-4 py-3.5 text-[13px] outline-none focus:border-blue-500 transition-all placeholder:text-slate-400`}
                    value={p.name}
                    onChange={(e) => {
                      const newPs = [...passengers]
                      newPs[idx].name = formatName(e.target.value)
                      setPassengers(newPs)
                      clearError(`p_${idx}_name`)
                    }}
                  />
                  {errors[`p_${idx}_name`] && <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium">{errors[`p_${idx}_name`]}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {idx < adults ? (
                  /* Adult: Phone */
                  <div>
                    <input
                      type="tel"
                      placeholder="Số điện thoại (*)"
                      className={`w-full bg-[#f8fafc] border ${errors[`p_${idx}_extra`] ? 'border-red-500' : 'border-slate-100'} rounded-xl px-4 py-3.5 text-[13px] outline-none focus:border-blue-500 transition-all placeholder:text-slate-400`}
                      value={p.extra}
                      onChange={(e) => {
                        const newPs = [...passengers]
                        newPs[idx].extra = e.target.value.replace(/\D/g, '')
                        setPassengers(newPs)
                        clearError(`p_${idx}_extra`)
                      }}
                    />
                    {errors[`p_${idx}_extra`] && <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium">{errors[`p_${idx}_extra`]}</p>}
                  </div>
                ) : (
                  /* Child/Baby: DOB */
                  <div>
                    <DateInput
                      value={p.extra}
                      error={errors[`p_${idx}_extra`]}
                      onChange={(val) => {
                        const newPs = [...passengers]
                        newPs[idx].extra = val
                        setPassengers(newPs)
                      }}
                      onFocusClear={() => clearError(`p_${idx}_extra`)}
                    />
                    {errors[`p_${idx}_extra`] && <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium">{errors[`p_${idx}_extra`]}</p>}
                  </div>
                )}

                {idx >= adults + children && (
                  /* Baby only: Accompanying Adult */
                  <div>
                    <select
                      className={`w-full bg-[#f8fafc] border ${errors[`p_${idx}_accompanying`] ? 'border-red-500' : 'border-slate-100'} rounded-xl px-3 py-3.5 text-[13px] outline-none focus:border-blue-500 transition-all appearance-none`}
                      value={p.accompanying}
                      onChange={(e) => {
                        const newPs = [...passengers]
                        newPs[idx].accompanying = e.target.value
                        setPassengers(newPs)
                        clearError(`p_${idx}_accompanying`)
                      }}
                    >
                      <option value="">Chọn người lớn đi kèm (*)</option>
                      {passengers.slice(0, adults).map((ap, aidx) => (
                        <option key={ap.id} value={ap.id}>Hành khách {ap.id} {ap.name ? `- ${ap.name}` : ''}</option>
                      ))}
                    </select>
                    {errors[`p_${idx}_accompanying`] && <p className="text-red-500 text-[11px] mt-1 ml-1 font-medium">{errors[`p_${idx}_accompanying`]}</p>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Info Section */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <PhoneIcon />
            </div>
            <h2 className="text-[16px] font-bold text-slate-900">Thông tin liên hệ</h2>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-700 ml-1">Giới tính<span className="text-red-500">(*)</span></label>
              <select
                className={`w-full bg-[#f8fafc] border ${errors.contact_gender ? 'border-red-500' : 'border-slate-100'} rounded-xl px-3 py-3.5 text-[13px] outline-none focus:border-blue-500 transition-all appearance-none`}
                value={contactInfo.gender}
                onChange={(e) => {
                  setContactInfo({ ...contactInfo, gender: e.target.value })
                  clearError('contact_gender')
                }}
              >
                <option value="">Giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
              {errors.contact_gender && <p className="text-red-500 text-[11px] ml-1 font-medium">{errors.contact_gender}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-700 ml-1">Họ và tên<span className="text-red-500">(*)</span></label>
              <input
                type="text"
                placeholder="Nhập họ và tên (*)"
                className={`w-full bg-[#f8fafc] border ${errors.contact_name ? 'border-red-500' : 'border-slate-100'} rounded-xl px-4 py-3.5 text-[13px] outline-none focus:border-blue-500 transition-all placeholder:text-slate-400`}
                value={contactInfo.name}
                onChange={(e) => {
                  setContactInfo({ ...contactInfo, name: formatName(e.target.value) })
                  clearError('contact_name')
                }}
              />
              {errors.contact_name && <p className="text-red-500 text-[11px] ml-1 font-medium">{errors.contact_name}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-700 ml-1">Điện thoại liên hệ<span className="text-red-500">(*)</span></label>
              <input
                type="tel"
                placeholder="Điện thoại liên hệ (*)"
                className={`w-full bg-[#f8fafc] border ${errors.contact_phone ? 'border-red-500' : 'border-slate-100'} rounded-xl px-4 py-3.5 text-[13px] outline-none focus:border-blue-500 transition-all placeholder:text-slate-400`}
                value={contactInfo.phone}
                onChange={(e) => {
                  setContactInfo({ ...contactInfo, phone: e.target.value.replace(/\D/g, '') })
                  clearError('contact_phone')
                }}
              />
              {errors.contact_phone && <p className="text-red-500 text-[11px] ml-1 font-medium">{errors.contact_phone}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-700 ml-1">Email liên hệ<span className="text-red-500">(*)</span></label>
              <input
                type="email"
                placeholder="Email liên hệ (*)"
                className={`w-full bg-[#f8fafc] border ${errors.contact_email ? 'border-red-500' : 'border-slate-100'} rounded-xl px-4 py-3.5 text-[13px] outline-none focus:border-blue-500 transition-all placeholder:text-slate-400`}
                value={contactInfo.email}
                onChange={(e) => {
                  setContactInfo({ ...contactInfo, email: e.target.value })
                  clearError('contact_email')
                }}
              />
              {errors.contact_email && <p className="text-red-500 text-[11px] ml-1 font-medium">{errors.contact_email}</p>}
            </div>

            <label className="md:col-span-2 flex w-fit items-center gap-2 text-[14px] font-semibold text-slate-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={exportInvoice}
                onChange={(e) => {
                  setExportInvoice(e.target.checked)
                  if (!e.target.checked) clearInvoiceErrors()
                }}
                className="h-4 w-4 rounded border-slate-300 text-[#2563eb] accent-[#2563eb]"
              />
              Xuất hóa đơn
            </label>

            {exportInvoice && (
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
                <h3 className="md:col-span-2 text-[16px] font-bold text-slate-900">Thông tin xuất hóa đơn</h3>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-bold text-slate-700 ml-1">Tên công ty<span className="text-red-500">(*)</span></label>
                  <input
                    type="text"
                    placeholder="Tên doanh nghiệp (*)"
                    className={`w-full bg-[#f8fafc] border ${errors.invoice_companyName ? 'border-red-500' : 'border-slate-100'} rounded-xl px-4 py-3.5 text-[13px] outline-none focus:border-blue-500 transition-all placeholder:text-slate-400`}
                    value={invoiceInfo.companyName}
                    onChange={(e) => {
                      setInvoiceInfo({ ...invoiceInfo, companyName: e.target.value })
                      clearError('invoice_companyName')
                    }}
                  />
                  {errors.invoice_companyName && <p className="text-red-500 text-[11px] ml-1 font-medium">{errors.invoice_companyName}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-bold text-slate-700 ml-1">Mã số thuế<span className="text-red-500">(*)</span></label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={13}
                    placeholder="Mã số thuế (*)"
                    className={`w-full bg-[#f8fafc] border ${errors.invoice_taxCode ? 'border-red-500' : 'border-slate-100'} rounded-xl px-4 py-3.5 text-[13px] outline-none focus:border-blue-500 transition-all placeholder:text-slate-400`}
                    value={invoiceInfo.taxCode}
                    onChange={(e) => {
                      setInvoiceInfo({ ...invoiceInfo, taxCode: e.target.value.replace(/\D/g, '') })
                      clearError('invoice_taxCode')
                    }}
                  />
                  {errors.invoice_taxCode && <p className="text-red-500 text-[11px] ml-1 font-medium">{errors.invoice_taxCode}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-bold text-slate-700 ml-1">Địa chỉ<span className="text-red-500">(*)</span></label>
                  <input
                    type="text"
                    maxLength={255}
                    placeholder="Địa chỉ (*)"
                    className={`w-full bg-[#f8fafc] border ${errors.invoice_address ? 'border-red-500' : 'border-slate-100'} rounded-xl px-4 py-3.5 text-[13px] outline-none focus:border-blue-500 transition-all placeholder:text-slate-400`}
                    value={invoiceInfo.address}
                    onChange={(e) => {
                      setInvoiceInfo({ ...invoiceInfo, address: e.target.value })
                      clearError('invoice_address')
                    }}
                  />
                  {errors.invoice_address && <p className="text-red-500 text-[11px] ml-1 font-medium">{errors.invoice_address}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-bold text-slate-700 ml-1">Người nhận hóa đơn<span className="text-red-500">(*)</span></label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={11}
                    placeholder="Số điện thoại (*)"
                    className={`w-full bg-[#f8fafc] border ${errors.invoice_recipientPhone ? 'border-red-500' : 'border-slate-100'} rounded-xl px-4 py-3.5 text-[13px] outline-none focus:border-blue-500 transition-all placeholder:text-slate-400`}
                    value={invoiceInfo.recipientPhone}
                    onChange={(e) => {
                      setInvoiceInfo({ ...invoiceInfo, recipientPhone: e.target.value.replace(/\D/g, '') })
                      clearError('invoice_recipientPhone')
                    }}
                  />
                  {errors.invoice_recipientPhone && <p className="text-red-500 text-[11px] ml-1 font-medium">{errors.invoice_recipientPhone}</p>}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-200 active:scale-95 transition-all text-[16px] mt-4"
        >
          Tiếp tục
        </button>
      </div>
      </div>
    </div>
  )
}

export default PassengerInfo
