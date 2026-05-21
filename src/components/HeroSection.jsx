import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ZaloPermissionModal, { ZALO_USER } from './ZaloPermissionModal'

const UserFallbackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#d1d5db" viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
)

const saveZaloUser = () => {
  localStorage.setItem('zalo_user', JSON.stringify({
    name: ZALO_USER.name,
    phone: ZALO_USER.phone
  }))
}

function HeroSection() {
  const [showPermissionPopup, setShowPermissionPopup] = useState(false)
  const [zaloUser, setZaloUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('zalo_user')
    if (savedUser) {
      setZaloUser(ZALO_USER)
      saveZaloUser()
    }
  }, [])

  const handleAllow = () => {
    saveZaloUser()
    setZaloUser(ZALO_USER)
    setShowPermissionPopup(false)
    toast.success('Đăng nhập thành công')
  }

  const handleDecline = () => {
    setShowPermissionPopup(false)
    toast.error('Bạn cần cho phép truy cập thông tin Zalo để đăng nhập')
  }

  return (
    <div className="relative h-[220px] overflow-hidden bg-transparent">
      <div className="relative z-10 flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
            {zaloUser ? (
              <img src={ZALO_USER.avatar} alt={zaloUser.name} className="w-full h-full object-cover" />
            ) : (
              <UserFallbackIcon />
            )}
          </div>

          <button
            type="button"
            onClick={() => !zaloUser && setShowPermissionPopup(true)}
            className={zaloUser
              ? 'text-white font-extrabold text-[18px] leading-none drop-shadow-sm cursor-default'
              : 'bg-white text-[#2563eb] font-extrabold text-[13px] px-6 py-2 rounded-full shadow-sm active:scale-95 transition-transform cursor-pointer'
            }
          >
            {zaloUser ? zaloUser.name : 'Đăng nhập'}
          </button>
        </div>

        <div className="flex items-center bg-black/15 backdrop-blur-md border border-white/20 rounded-full px-[2px] py-[2px] h-[34px]">
          <button className="px-2 h-full flex items-center justify-center hover:bg-white/10 rounded-l-full transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-5 h-5 opacity-90">
              <circle cx="6" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="18" cy="12" r="1.5" />
            </svg>
          </button>
          <div className="w-[1px] h-4 bg-white/25 mx-0.5"></div>
          <button className="px-2 h-full flex items-center justify-center hover:bg-white/10 rounded-r-full transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-[16px] h-[16px] opacity-90">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {showPermissionPopup && (
        <ZaloPermissionModal
          onAllow={handleAllow}
          onDecline={handleDecline}
        />
      )}
    </div>
  )
}

export default HeroSection
