import BottomNav from '../components/BottomNav'
import background2 from '../assets/images/background2.png'

const GiftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25A1.5 1.5 0 0 1 19.5 21H4.5A1.5 1.5 0 0 1 3 19.5v-8.25M12 7.5V21M3.75 7.5h16.5A1.5 1.5 0 0 1 21.75 9v.75a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5V9a1.5 1.5 0 0 1 1.5-1.5ZM12 7.5H8.625A2.625 2.625 0 1 1 12 4.125V7.5Zm0 0h3.375A2.625 2.625 0 1 0 12 4.125V7.5Z" />
  </svg>
)

function OffersPage() {
  return (
    <div className="offers-page">
      <div className="offers-background" style={{ backgroundImage: `url(${background2})` }}>
        <div className="offers-background-overlay" />
      </div>

      <header className="offers-header">
        <h1>Ưu đãi</h1>
      </header>

      <main className="offers-main">
        <section className="offers-empty-card">
          <div className="offers-empty-icon">
            <GiftIcon />
          </div>
          <h2>Hiện tại đang không có ưu đãi gì</h2>
          <p>Các chương trình mới sẽ được cập nhật tại đây khi có.</p>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}

export default OffersPage
