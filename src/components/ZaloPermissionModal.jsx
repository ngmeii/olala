import { useState } from 'react'
import { createPortal } from 'react-dom'
import zaloAvatar from '../assets/images/ngoc_mai_avatar.png'

export const ZALO_USER = {
  name: 'Nguyễn Văn A',
  subtitle: 'Tên, ảnh đại diện Zalo',
  phone: '0987 654 321',
  avatar: zaloAvatar
}

const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 20.25l10.5-10.5m0 0l-7.5-.75m7.5.75l-.75 7.5M4.5 12.75l3.25 1.25M9.25 8L8 4.75m5.75.75l4.75-1.25a1 1 0 011.25 1.25l-1.25 4.75" />
  </svg>
)

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a1.125 1.125 0 01-1.21.38 12.035 12.035 0 01-7.143-7.143 1.125 1.125 0 01.38-1.21l1.293-.97c.36-.27.527-.728.417-1.173L6.963 3.102A1.125 1.125 0 005.872 2.25H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
)

function ZaloPermissionModal({ onAllow, onDecline }) {
  const [permissions, setPermissions] = useState({
    profile: true,
    phone: false
  })
  const canAllow = permissions.profile && permissions.phone

  const togglePermission = (key) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return createPortal(
    <div className="zalo-modal-backdrop" role="presentation">
      <div className="zalo-permission-modal" role="dialog" aria-modal="true" aria-labelledby="zalo-permission-title">
        <div className="zalo-modal-handle" />

        <div className="zalo-app-icon">
          <PlaneIcon />
        </div>

        <h2 id="zalo-permission-title">Cho phép Vé Máy Bay nhận các thông tin của bạn</h2>
        <p className="zalo-modal-desc">
          Vé Máy Bay cần truy cập các thông tin dưới đây từ tài khoản Zalo của bạn để phục vụ hơn trong quá trình sử dụng <button type="button">Tìm hiểu thêm</button>
        </p>

        <div className="zalo-permission-list">
          <button
            type="button"
            className="zalo-permission-row"
            onClick={() => togglePermission('profile')}
            aria-pressed={permissions.profile}
          >
            <img src={ZALO_USER.avatar} alt="" className="zalo-permission-avatar" />
            <span>
              <strong>{ZALO_USER.name}</strong>
              <small>{ZALO_USER.subtitle}</small>
            </span>
            <span className={`zalo-switch ${permissions.profile ? 'active' : ''}`} aria-hidden="true" />
          </button>

          <button
            type="button"
            className="zalo-permission-row"
            onClick={() => togglePermission('phone')}
            aria-pressed={permissions.phone}
          >
            <span className="zalo-phone-icon"><PhoneIcon /></span>
            <span>
              <strong>{ZALO_USER.phone}</strong>
            </span>
            <span className={`zalo-switch ${permissions.phone ? 'active' : ''}`} aria-hidden="true" />
          </button>
        </div>

        <div className="zalo-modal-actions">
          <button type="button" className="zalo-decline-btn" onClick={onDecline}>Từ chối</button>
          <button type="button" className="zalo-allow-btn" onClick={onAllow} disabled={!canAllow}>Cho phép</button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ZaloPermissionModal
