import { useNavigate } from 'react-router-dom'

function Header({ title = 'Tìm chuyến bay' }) {
  const navigate = useNavigate()

  return (
    <header className="bg-primary text-white px-4 py-3 flex items-center gap-3 sticky top-0 z-50 shadow-md">
      <button
        onClick={() => navigate(-1)}
        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-200 cursor-pointer"
        aria-label="Quay lại"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
    </header>
  )
}

export default Header
