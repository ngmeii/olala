const TICKETS_STORAGE_KEY = 'olalaMyTickets'

const parseSelectedLocation = (value, fallbackCode, fallbackCity) => {
  if (!value) return { code: fallbackCode, city: fallbackCity }
  const match = String(value).match(/^(.*)\s+\(([^)]+)\)$/)
  if (!match) return { code: fallbackCode, city: value || fallbackCity }
  return { city: match[1], code: match[2] }
}

const formatDate = (value) => {
  if (!value) return ''
  if (String(value).includes('/')) return value
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
  return `${weekdays[date.getDay()]}, ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
}

const formatDuration = (value) => {
  if (!value) return '1h 50m'
  if (value.includes(':')) {
    const [hours, minutes] = value.split(':')
    return `${Number(hours)}h ${minutes}m`
  }
  return value
}

const getLogoKey = (airline = '') => {
  const lower = airline.toLowerCase()
  if (lower.includes('vietjet')) return 'vietjet'
  if (lower.includes('vietnam')) return 'vietnam'
  if (lower.includes('bamboo')) return 'bamboo'
  return 'sun'
}

const getBaggageInfo = (value) => {
  if (!value || value === 'none') return { text: 'Không mua hành lý', count: 0, price: 0 }
  const match = String(value).match(/xwbg-(\d+)/)
  const kg = match ? Number(match[1]) : 0
  return { text: `${kg}kg`, count: kg > 0 ? 1 : 0, price: kg * 13000 }
}

const getPaymentSummary = (searchData = {}) => {
  const dep = searchData.selectedDep || {}
  const ret = searchData.selectedRet || null
  const passengers = Array.isArray(searchData.passengers) ? searchData.passengers : []
  const baggageSelections = searchData.baggageSelections || {}
  const segmentIds = ['departure', ...(ret || searchData.returnDate ? ['return'] : [])]
  const ticketTotal = (dep.priceValue || 0) + (ret?.priceValue || 0)
  const feeTotal = searchData.feeTotal || 0

  const baggageSummary = passengers.reduce((summary, passenger, passengerIndex) => (
    segmentIds.reduce((currentSummary, segmentId) => {
      const key = `${passenger.id || passengerIndex + 1}_${segmentId}`
      const baggage = getBaggageInfo(baggageSelections[key])
      return {
        count: currentSummary.count + baggage.count,
        price: currentSummary.price + baggage.price
      }
    }, summary)
  ), { count: 0, price: 0 })

  return {
    baggageCount: baggageSummary.count,
    baggagePrice: baggageSummary.price,
    ticketTotal,
    feeTotal,
    grandTotal: ticketTotal + baggageSummary.price + feeTotal
  }
}

const createBookingCode = () => Math.random().toString(36).slice(2, 8).toUpperCase()

const getFareClassSummary = (dep = {}, ret = null) => [
  dep.fareClass,
  ret?.fareClass && ret.fareClass !== dep.fareClass ? ret.fareClass : null
].filter(Boolean).join(' / ') || 'Economy'

export const getSavedTickets = () => {
  try {
    const rawTickets = localStorage.getItem(TICKETS_STORAGE_KEY)
    const tickets = rawTickets ? JSON.parse(rawTickets) : []
    if (!Array.isArray(tickets)) return []

    return tickets.map(ticket => {
      if (!ticket?.rawSearchData) return ticket

      const summary = getPaymentSummary(ticket.rawSearchData)
      return {
        ...ticket,
        fareClass: ticket.fareClass || getFareClassSummary(ticket.rawSearchData.selectedDep || {}, ticket.rawSearchData.selectedRet || null),
        baggagePrice: ticket.baggagePrice || summary.baggagePrice,
        ticketTotal: ticket.ticketTotal || summary.ticketTotal,
        feeTotal: ticket.feeTotal || summary.feeTotal,
        grandTotal: ticket.grandTotal || summary.grandTotal
      }
    })
  } catch {
    return []
  }
}

export const buildTicketFromSearchData = (searchData = {}, status = 'waiting') => {
  const dep = searchData.selectedDep || {}
  const ret = searchData.selectedRet || null
  const departureLocation = parseSelectedLocation(searchData.from, dep.departureCode || 'HAN', dep.departureCity || 'Hà Nội')
  const arrivalLocation = parseSelectedLocation(searchData.to, dep.arrivalCode || 'SGN', dep.arrivalCity || 'Hồ Chí Minh')
  const passengers = Array.isArray(searchData.passengers) ? searchData.passengers : []
  const passengerCount = (searchData.adults || 0) + (searchData.children || 0) + (searchData.babies || 0) || passengers.length || 1
  const paymentSummary = getPaymentSummary(searchData)

  const bookingCode = searchData.bookingCode || createBookingCode()
  const selectedAirline = dep.airline || 'Sun PhuQuoc'
  const fareClass = getFareClassSummary(dep, ret)

  return {
    status,
    code: bookingCode,
    logoKey: getLogoKey(selectedAirline),
    fromCode: departureLocation.code,
    fromCity: departureLocation.city,
    toCode: arrivalLocation.code,
    toCity: arrivalLocation.city,
    time: `${dep.departureTime || '08:30'} - ${dep.arrivalTime || '10:20'}`,
    duration: formatDuration(dep.duration),
    date: formatDate(searchData.departureDate),
    passengers: `${passengerCount} Hành khách`,
    fareClass,
    children: searchData.children || 0,
    babies: searchData.babies || 0,
    seat: searchData.seat || '',
    baggage: `${paymentSummary.baggageCount} Túi ký gửi`,
    baggagePrice: paymentSummary.baggagePrice,
    ticketTotal: paymentSummary.ticketTotal,
    feeTotal: paymentSummary.feeTotal,
    grandTotal: paymentSummary.grandTotal,
    rawSearchData: { ...searchData, bookingCode },
    updatedAt: Date.now()
  }
}

export const saveBookingTicket = (searchData = {}, status = 'waiting', extraTicketFields = {}) => {
  const ticket = {
    ...buildTicketFromSearchData(searchData, status),
    ...extraTicketFields
  }

  try {
    const existingTickets = getSavedTickets()
    const nextTickets = [
      ticket,
      ...existingTickets.filter(existingTicket => existingTicket.code !== ticket.code)
    ]
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(nextTickets))
  } catch {
    // Ignore storage errors; navigation should still work.
  }

  return ticket
}
