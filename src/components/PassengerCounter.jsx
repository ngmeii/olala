function PassengerCounter({ icon, label, subtitle, count, onIncrement, onDecrement, min = 0 }) {
  return (
    <div className="flex items-center justify-between py-2.5 px-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Icon Circle */}
        <div className="w-[36px] h-[36px] rounded-full bg-[#f0f7ff] flex items-center justify-center text-[#2563eb] shrink-0">
          {icon}
        </div>
        {/* Text */}
        <div className="flex flex-col">
          <span className="text-[14px] font-bold text-[#0f172a] leading-tight">{label}</span>
          <span className="text-[11px] text-[#94a3b8] leading-tight">{subtitle}</span>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-4 bg-white border border-[#e2e8f0] rounded-xl px-3 py-1.5 shadow-sm">
        <button
          onClick={onDecrement}
          disabled={count <= min}
          className={`w-5 h-5 flex items-center justify-center text-[18px] font-bold transition-colors ${
            count <= min ? 'text-[#e2e8f0]' : 'text-[#2563eb] hover:bg-gray-50'
          }`}
        >
          −
        </button>
        <span className="text-[14px] font-bold text-[#0f172a] min-w-[12px] text-center">{count}</span>
        <button
          onClick={onIncrement}
          className="w-5 h-5 flex items-center justify-center text-[18px] font-bold text-[#2563eb] hover:bg-gray-50 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default PassengerCounter
