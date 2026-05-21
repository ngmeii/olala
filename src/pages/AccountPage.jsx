import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import BottomNav from '../components/BottomNav'
import ZaloPermissionModal, { ZALO_USER } from '../components/ZaloPermissionModal'
import logoZalo from '../assets/icons/zalo.png'
import background2 from '../assets/images/background2.png'

const DEFAULT_ACCOUNT = {
  name: 'Xin chào',
  email: '',
  phone: 'Đăng nhập ngay',
  avatar: null
}

const ZALO_ACCOUNT = {
  name: ZALO_USER.name,
  email: '',
  phone: ZALO_USER.phone,
  avatar: ZALO_USER.avatar
}

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5v9A2.25 2.25 0 0 1 19.5 18.75h-15A2.25 2.25 0 0 1 2.25 16.5v-9A2.25 2.25 0 0 1 4.5 5.25h15a2.25 2.25 0 0 1 2.25 2.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 8.25 5.5a1.5 1.5 0 0 0 1.5 0L21 7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
)

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5A2.25 2.25 0 0 0 21 19.5v-1.1a1.5 1.5 0 0 0-1.029-1.424l-3.64-1.213a1.5 1.5 0 0 0-1.607.407l-.853.853a11.25 11.25 0 0 1-5.894-5.894l.853-.853a1.5 1.5 0 0 0 .407-1.607l-1.213-3.64A1.5 1.5 0 0 0 6.6 3H5.5A2.25 2.25 0 0 0 3.25 5.25v1.5Z" />
  </svg>
)

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25h5.25M7.5 10.5h9M21 11.625c0 4.349-4.03 7.875-9 7.875a10.46 10.46 0 0 1-3.928-.749L3 20.25l1.4-4.198C3.52 14.78 3 13.26 3 11.625 3 7.276 7.03 3.75 12 3.75s9 3.526 9 7.875Z" />
  </svg>
)

const HeadsetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 13.5v-1.875a7.5 7.5 0 0 1 15 0V13.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 13.5h1.5A1.5 1.5 0 0 1 8.25 15v2.25a1.5 1.5 0 0 1-1.5 1.5h-.75a2.25 2.25 0 0 1-2.25-2.25v-.75a2.25 2.25 0 0 1 1.5-2.121ZM18.75 13.5h-1.5a1.5 1.5 0 0 0-1.5 1.5v2.25a1.5 1.5 0 0 0 1.5 1.5h.75a2.25 2.25 0 0 0 2.25-2.25v-.75a2.25 2.25 0 0 0-1.5-2.121Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 18.75c0 1.242-1.679 2.25-3.75 2.25" />
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75 19.5 7v5.7c0 4.55-3.2 7.85-7.5 9.3-4.3-1.45-7.5-4.75-7.5-9.3V7L12 3.75Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12.5v4h4.5v-4M10.5 12.5v-1.25a1.5 1.5 0 0 1 3 0v1.25" />
  </svg>
)

const AvatarIllustration = () => (
  <svg className="account-avatar-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true">
    <defs>
      <linearGradient id="avatarBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f3f8ff" />
        <stop offset="1" stopColor="#dfeeff" />
      </linearGradient>
      <linearGradient id="shirt" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#18a0ff" />
        <stop offset="1" stopColor="#0759f5" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="58" fill="url(#avatarBg)" />
    <path d="M23 111c8-26 23-37 37-37s29 11 37 37H23Z" fill="url(#shirt)" />
    <path d="M41 53c0-17 8-28 21-28s21 11 21 28c0 18-9 31-21 31S41 71 41 53Z" fill="#ffc19b" />
    <path d="M42 49c-2-11 4-24 17-27 11-3 25 2 29 14 1 4 0 10-4 16l-3-11c-8 1-18-2-25-9-3 7-8 11-14 17Z" fill="#161b24" />
    <path d="M45 48c-7 1-7 16 1 17l2-1-2-16Z" fill="#ffb98f" />
    <path d="M81 48c7 1 7 16-1 17l-2-1 2-16Z" fill="#ffb98f" />
    <circle cx="53" cy="56" r="2.3" fill="#1f2937" />
    <circle cx="70" cy="56" r="2.3" fill="#1f2937" />
    <path d="M61 57c-2 5-3 8 2 9" fill="none" stroke="#e8896a" strokeWidth="2" strokeLinecap="round" />
    <path d="M54 70c4 4 10 4 15 0" fill="none" stroke="#ef7d5d" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M49 47c3-3 7-4 10-2M68 45c4-2 8-1 10 2" fill="none" stroke="#1f2937" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
)

function AccountPage() {
  const [account, setAccount] = useState(DEFAULT_ACCOUNT)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [showPermissionPopup, setShowPermissionPopup] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('zalo_user')

    if (savedUser) {
      setIsLoggedIn(true)
      setAccount(ZALO_ACCOUNT)
      localStorage.setItem('zalo_user', JSON.stringify({
        name: ZALO_ACCOUNT.name,
        phone: ZALO_ACCOUNT.phone
      }))
    }
  }, [])

  const handleToggleLogout = () => {
    setShowLogout(prev => !prev)
  }

  const handleLogin = () => {
    setShowLogout(false)
    setShowPermissionPopup(true)
  }

  const handleAllowLogin = () => {
    localStorage.setItem('zalo_user', JSON.stringify({
      name: ZALO_ACCOUNT.name,
      phone: ZALO_ACCOUNT.phone
    }))
    setAccount(ZALO_ACCOUNT)
    setIsLoggedIn(true)
    setShowPermissionPopup(false)
    toast.success('Đăng nhập thành công')
  }

  const handleDeclineLogin = () => {
    setShowPermissionPopup(false)
    setShowLogout(false)
    toast.error('Bạn cần cho phép truy cập thông tin Zalo để đăng nhập')
  }

  const handleLogout = () => {
    localStorage.removeItem('zalo_user')
    setAccount(DEFAULT_ACCOUNT)
    setIsLoggedIn(false)
    setShowLogout(false)
  }

  return (
    <div className="account-page">
      <div className="account-background" style={{ backgroundImage: `url(${background2})` }}>
        <div className="account-background-overlay" />
      </div>

      <header className="account-header">
        <h1>Tài khoản</h1>
      </header>

      <main className="account-main">
        <div className="account-profile-panel">
          <button
            type="button"
            className="account-profile-card"
            onClick={handleToggleLogout}
            aria-expanded={showLogout}
          >
            <span className="account-avatar">
              {account.avatar ? (
                <img src={account.avatar} alt={account.name} />
              ) : (
                <AvatarIllustration />
              )}
            </span>
            <span className={`account-profile-content ${!isLoggedIn ? 'guest' : ''}`}>
              <strong>{account.name}</strong>
              {account.email && <span><MailIcon />{account.email}</span>}
              <span>{isLoggedIn && <PhoneIcon />}{account.phone}</span>
            </span>
            <span className={`account-profile-chevron ${showLogout ? 'open' : ''}`}>
              <ChevronRightIcon />
            </span>
          </button>

          {showLogout && isLoggedIn && (
            <button type="button" className="account-logout-button" onClick={handleLogout}>
              Đăng xuất
            </button>
          )}
          {showLogout && !isLoggedIn && (
            <button type="button" className="account-login-button" onClick={handleLogin}>
              Đăng nhập
            </button>
          )}
        </div>

        <section className="account-support-section">
          <h2>Hỗ trợ khách hàng</h2>

          <article className="account-zalo-card">
            <div className="account-support-row">
              <img className="account-zalo-logo" src={logoZalo} alt="Zalo" />
              <div>
                <h3>Chat với tư vấn viên</h3>
                <p>Trao đổi với tư vấn viên qua Zalo OA</p>
                <p>Hỗ trợ nhanh chóng, tận tâm 24/7</p>
              </div>
            </div>
            <button type="button" className="account-chat-button"><ChatIcon />Chat ngay</button>
          </article>

          <button type="button" className="account-support-card">
            <span className="account-support-icon"><HeadsetIcon /></span>
            <span className="account-support-copy">
              <strong>Gọi điện hỗ trợ</strong>
              <span>Kết nối trực tiếp với tư vấn viên</span>
              <em><PhoneIcon />Hotline 1900 1234</em>
            </span>
          </button>

          <button type="button" className="account-support-card">
            <span className="account-support-icon"><MailIcon /></span>
            <span className="account-support-copy">
              <strong>Email hỗ trợ</strong>
              <span>Gửi yêu cầu và nhận phản hồi qua email</span>
              <em><ClockIcon />Phản hồi trong 24 giờ</em>
            </span>
          </button>

          <article className="account-promise-card">
            <div className="account-shield-visual"><ShieldIcon /></div>
            <div>
              <h3>Cam kết của chúng tôi</h3>
              <p>Thông tin của bạn được bảo mật tuyệt đối.</p>
              <p>Chúng tôi hỗ trợ tận tâm để bạn yên tâm trên mọi hành trình.</p>
            </div>
          </article>
        </section>
      </main>

      <BottomNav />
      {showPermissionPopup && (
        <ZaloPermissionModal
          onAllow={handleAllowLogin}
          onDecline={handleDeclineLogin}
        />
      )}
    </div>
  )
}

export default AccountPage
