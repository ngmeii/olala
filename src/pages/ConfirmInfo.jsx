import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import background2 from '../assets/images/background2.png'
import logoSun from '../assets/icons/sun-phuquoc-airways.png'
import logoVietjet from '../assets/icons/vietjet air.png'
import logoVNA from '../assets/icons/logo vietnam airlines.png'
import logoBamboo from '../assets/icons/bamboo.png'
import { saveBookingTicket } from '../utils/ticketStorage'

const CONFIRM_ERROR_CODES = {
  '1': {
    type: 'error',
    message: 'Chuyến bay đã hết chỗ hoặc không còn khả dụng'
  },
  '2': {
    type: 'warning',
    message: 'Giá vé đã thay đổi, vui lòng xác nhận lại'
  },
  '3': {
    type: 'error',
    message: 'Dịch vụ/hành lý đã chọn không còn khả dụng'
  }
}

const getConfirmErrorCode = (searchData) => {
  const stateErrorCode = searchData.confirmErrorCode || searchData.errorCode
  if (stateErrorCode) return String(stateErrorCode)

  try {
    return sessionStorage.getItem('confirmInfoErrorCode') || sessionStorage.getItem('confirmErrorCode')
  } catch {
    return null
  }
}

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)

const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" />
  </svg>
)

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.1a1.5 1.5 0 00-1.029-1.424l-3.64-1.213a1.5 1.5 0 00-1.607.407l-.853.853a11.25 11.25 0 01-5.894-5.894l.853-.853a1.5 1.5 0 00.407-1.607l-1.213-3.64A1.5 1.5 0 006.6 3H5.5A2.25 2.25 0 003.25 5.25v1.5z" />
  </svg>
)

const BagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6A2.25 2.25 0 0110.5 3.75h3A2.25 2.25 0 0115.75 6v1.5M5.25 7.5h13.5A1.5 1.5 0 0120.25 9v9.75a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V9a1.5 1.5 0 011.5-1.5z" />
  </svg>
)

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.75V9.75A2.25 2.25 0 0018.75 7.5H5.25A2.25 2.25 0 003 9.75v8.25A2.25 2.25 0 005.25 20.25h13.5A2.25 2.25 0 0021 18v-3m0-1.5h-4.5a1.5 1.5 0 000 3H21v-3zM6 7.5V6a2.25 2.25 0 012.25-2.25h8.25" />
  </svg>
)

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M12 8.25h.008v.008H12V8.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7.5a4.5 4.5 0 00-9 0v3m-.75 0h10.5A1.5 1.5 0 0118.75 12v6.75a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5z" />
  </svg>
)

const StepIndicator = ({ number, label, state }) => (
  <div className={`confirm-step ${state || ''}`}>
    <span className="confirm-step-dot">{state === 'done' ? <CheckIcon /> : number}</span>
    <span>{label}</span>
  </div>
)

const LEGAL_CONTENT = {
  policy: {
    title: 'Chính sách bảo mật',
    intro: 'Khách hàng đồng ý về việc thu thập và bảo vệ thông tin cá nhân do Zalo Mini App Olala xây dựng nhằm quy định cách thức thu thập và trách nhiệm bảo vệ thông tin cá nhân khách hàng với nội dung như sau:',
    sections: [
      {
        title: '1. Mục đích thu thập thông tin',
        text: 'Olala thu thập và xử lý thông tin cá nhân của khách hàng nhằm các mục đích sau:',
        items: [
          'Hỗ trợ khách hàng trong các hoạt động sử dụng dịch vụ trên Olala.',
          'Liên hệ khách hàng để giải quyết các vấn đề phát sinh trong quá trình sử dụng dịch vụ như hỗ trợ trực tiếp, thông báo trạng thái đơn hàng, hoàn tiền, v.v.',
          'Gửi thông tin khuyến mãi, ưu đãi hoặc chương trình chăm sóc khách hàng mới nhất tới khách hàng.',
          'Thông tin của trẻ em và em bé chỉ được sử dụng cho mục đích xử lý booking, xuất vé, hỗ trợ khách hàng và các nghĩa vụ pháp lý liên quan; không sử dụng cho mục đích quảng cáo, khuyến mãi hoặc marketing.'
        ]
      },
      {
        title: '2. Phạm vi thu thập thông tin',
        text: 'Tùy theo chức năng khách hàng sử dụng, Olala có thể thu thập các thông tin sau:',
        items: [
          'Họ và tên.', 'Số điện thoại.', 'Email.',
          'Thông tin hành khách: họ tên, giới tính, ngày sinh, loại hành khách.',
          'Thông tin chuyến bay: điểm đi, điểm đến, ngày bay, hãng bay, hạng vé, hành lý, mã booking.',
          'Thông tin thanh toán: số tiền, phương thức thanh toán, mã giao dịch, trạng thái giao dịch.',
          'Thông tin xuất hóa đơn nếu khách hàng có yêu cầu.',
          'Nội dung trao đổi với bộ phận hỗ trợ qua Zalo OA, điện thoại, email hoặc các kênh liên hệ khác.',
          'Đối với hành khách là trẻ em hoặc em bé, Olala có thể thu thập các thông tin cần thiết như họ tên, giới tính, ngày sinh, loại hành khách và thông tin người lớn đi kèm nhằm phục vụ việc tìm kiếm chuyến bay, đặt vé, xuất vé, kiểm tra điều kiện bay và tuân thủ yêu cầu của hãng hàng không/đối tác cung cấp vé.'
        ]
      },
      {
        title: '3. Cách thức thu thập thông tin',
        items: [
          'Từ Zalo Mini App Olala: Khách hàng trực tiếp để lại thông tin liên lạc trong quá trình sử dụng dịch vụ. Thông tin này giúp xác định đơn hàng và hỗ trợ giao dịch.',
          'Từ các cuộc trao đổi với khách hàng qua Zalo OA, gọi điện, mạng xã hội: Nhân viên chăm sóc khách hàng trao đổi và thu thập thông tin để hỗ trợ khách hàng sử dụng dịch vụ, thanh toán hoặc bất kỳ hỗ trợ liên quan nào.'
        ]
      },
      {
        title: '4. Cách thức lưu trữ thông tin',
        items: [
          'Thông tin cá nhân được lưu trữ tại hệ thống cơ sở dữ liệu của Olala và được bảo mật chặt chẽ trên nền tảng điện toán đám mây uy tín, tuân thủ theo quy định pháp luật Việt Nam.',
          'Trong quá trình khách hàng truy cập ứng dụng, chúng tôi có thể lưu trữ thông tin tạm thời qua cookie hoặc các công cụ lưu trữ dữ liệu tương tự nhằm tăng trải nghiệm sử dụng sản phẩm.'
        ],
        closing: 'Olala không sử dụng thông tin cá nhân của khách hàng cho mục đích trái pháp luật hoặc ngoài phạm vi đã thông báo nếu chưa có sự đồng ý của khách hàng.'
      },
      {
        title: '5. Cách thức bảo mật thông tin',
        text: 'Olala áp dụng các biện pháp bảo mật phù hợp để bảo vệ thông tin cá nhân của khách hàng, bao gồm:',
        items: [
          'Giới hạn quyền truy cập thông tin theo vai trò và mục đích xử lý.',
          'Bảo vệ dữ liệu trong quá trình truyền tải và lưu trữ.',
          'Kiểm soát việc truy cập, sử dụng và xử lý dữ liệu của nhân sự nội bộ.',
          'Ghi nhận nhật ký hệ thống khi cần thiết để phục vụ kiểm tra và bảo mật.',
          'Bảo vệ thông tin tích hợp với Zalo, cổng thanh toán và đối tác vé máy bay.',
          'Rà soát và cập nhật biện pháp bảo mật trong quá trình vận hành.'
        ]
      },
      {
        title: '6. Thời gian lưu trữ thông tin',
        text: 'Olala lưu trữ thông tin cá nhân trong thời gian cần thiết để cung cấp dịch vụ và đáp ứng các yêu cầu pháp lý liên quan.',
        items: [
          'Thông tin tài khoản và booking được lưu trong thời gian khách hàng sử dụng dịch vụ.',
          'Thông tin giao dịch, thanh toán, hóa đơn và khiếu nại có thể được lưu theo thời hạn pháp luật yêu cầu.',
          'Khi không còn cần thiết hoặc khi có yêu cầu hợp lệ từ khách hàng, Olala sẽ xem xét xóa, ẩn danh hoặc hủy nhận dạng thông tin theo quy trình phù hợp.'
        ]
      },
      {
        title: '7. Cách thức xóa hoặc cập nhật thông tin',
        text: 'Khách hàng có thể yêu cầu Olala hỗ trợ cập nhật hoặc xóa thông tin cá nhân.',
        items: [
          'Yêu cầu có thể được gửi qua Zalo OA, email, hotline hoặc kênh hỗ trợ chính thức của Olala.',
          'Olala có thể yêu cầu xác minh thông tin trước khi xử lý yêu cầu.',
          'Olala sẽ thực hiện cập nhật, xóa hoặc ẩn danh thông tin nếu yêu cầu hợp lệ.',
          'Một số thông tin có thể chưa được xóa ngay nếu liên quan đến booking đang xử lý, thanh toán, hóa đơn, hoàn tiền, khiếu nại hoặc yêu cầu của cơ quan nhà nước có thẩm quyền.'
        ]
      },
      {
        title: '8. Nguyên tắc bảo mật thông tin',
        items: [
          'Dữ liệu cá nhân được xử lý đúng theo luật pháp và các cam kết trong văn bản này.',
          'Khi xảy ra sự cố bảo mật, Olala ưu tiên xử lý nhanh, đảm bảo không ảnh hưởng đến quyền lợi khách hàng.',
          'Hệ thống an toàn thông tin được giám sát và duy trì liên tục, không gây gián đoạn.'
        ]
      },
      {
        title: '9. Tổ chức, cá nhân có thể tiếp cận thông tin khách hàng',
        text: 'Thông tin cá nhân của khách hàng có thể được tiếp cận bởi các bên sau trong phạm vi cần thiết:',
        items: [
          'Nhân sự phụ trách chăm sóc khách hàng, vận hành booking và xử lý thanh toán của Olala.',
          'Đại lý vé máy bay, hãng hàng không hoặc đối tác cung cấp dịch vụ vé.',
          'Cổng thanh toán, ví điện tử, ngân hàng hoặc đơn vị trung gian thanh toán.',
          'Zalo OA, ZNS hoặc nền tảng gửi thông báo được tích hợp với Mini App.',
          'Đơn vị xuất hóa đơn, kế toán hoặc thuế nếu khách hàng có yêu cầu xuất hóa đơn.',
          'Đơn vị cung cấp hạ tầng kỹ thuật, lưu trữ dữ liệu hoặc bảo mật hệ thống.',
          'Cơ quan nhà nước có thẩm quyền khi có yêu cầu theo quy định pháp luật.'
        ],
        closing: 'Olala không bán thông tin cá nhân của khách hàng cho bên thứ ba.'
      },
      {
        title: '10. Quyền của khách hàng đối với thông tin cá nhân',
        text: 'Khách hàng có các quyền sau:',
        items: [
          'Được biết về việc thu thập, sử dụng và bảo vệ thông tin cá nhân.',
          'Yêu cầu truy cập, chỉnh sửa hoặc cập nhật thông tin cá nhân.',
          'Yêu cầu xóa thông tin cá nhân trong phạm vi pháp luật cho phép.',
          'Rút lại sự đồng ý đối với một số hoạt động xử lý dữ liệu nếu phù hợp.',
          'Từ chối nhận thông tin quảng cáo, khuyến mãi nếu không có nhu cầu.',
          'Gửi phản ánh hoặc khiếu nại liên quan đến việc xử lý thông tin cá nhân.'
        ],
        closing: 'Để thực hiện các quyền trên, khách hàng có thể liên hệ Olala qua Zalo OA hoặc các kênh hỗ trợ chính thức. Chính sách bảo mật này có thể được cập nhật theo thời gian. Mọi thay đổi sẽ được thông báo tới khách hàng qua kênh liên lạc chính thức của Olala.'
      }
    ]
  },
  terms: {
    title: 'Điều khoản đặt vé',
    sections: [
      {
        title: '1. Vai trò của Olala và nền tảng Zalo Mini App',
        items: [
          'Olala là đơn vị cung cấp giao diện đặt vé và/hoặc đại lý phân phối vé máy bay thông qua đối tác cung cấp dịch vụ vé. Zalo Mini App/Zalo chỉ là nền tảng kỹ thuật hỗ trợ người dùng truy cập và sử dụng Mini App.',
          'Zalo không phải là bên bán vé, hãng hàng không, đại lý vé máy bay, nhà cung cấp dịch vụ vận chuyển hoặc bên chịu trách nhiệm trực tiếp về giá vé, điều kiện vé, thanh toán, xuất vé, đổi vé, hủy vé, hoàn tiền hoặc các vấn đề phát sinh trong quá trình sử dụng dịch vụ.',
          'Mọi giao dịch đặt vé, thanh toán, xuất vé, đổi/hủy/hoàn vé và hỗ trợ khách hàng được thực hiện theo chính sách của Olala, đối tác cung cấp vé và hãng hàng không tương ứng.'
        ]
      },
      {
        title: '2. Quy định về thông tin hành khách và thông tin liên hệ',
        text: 'Khi đặt vé qua Olala, khách hàng tự chịu trách nhiệm về tính chính xác của toàn bộ thông tin đã cung cấp, bao gồm thông tin hành khách và thông tin liên hệ.',
        items: [
          'Thông tin của khách hàng (họ tên, ngày sinh, số giấy tờ tùy thân...) phải trùng khớp hoàn toàn với giấy xuất trình tại sân bay. Giấy tờ cần có hiệu lực trong suốt quá trình thực hiện.',
          'Nếu khách hàng cung cấp sai thông tin dẫn đến việc không thể lên máy bay hoặc bỏ lỡ thông báo thay đổi lịch bay, Olala không chịu trách nhiệm cho các tổn hại phát sinh.',
          'Nếu hãng hàng không có thay đổi về lịch trình của chuyến bay, hãng sẽ thông báo trực tiếp với bạn qua thông tin liên hệ.',
          'Trường hợp booking có hành khách là trẻ em hoặc em bé, người đặt vé xác nhận rằng mình là cha/mẹ, người giám hộ hợp pháp hoặc người được ủy quyền hợp lệ để cung cấp thông tin của trẻ em/em bé cho mục đích đặt vé máy bay.',
          'Người đặt vé chịu trách nhiệm đảm bảo thông tin trẻ em/em bé là chính xác, bao gồm họ tên, ngày sinh, loại hành khách và giấy tờ cần thiết nếu hãng hàng không yêu cầu.',
          'Mỗi em bé phải đi kèm với một hành khách người lớn theo quy định của hãng hàng không.'
        ]
      },
      {
        title: '3. Đổi vé và hủy đặt chỗ',
        text: 'Sau khi giao dịch đặt vé hoàn tất, mọi yêu cầu thay đổi đều phải tuân theo chính sách riêng của từng hãng hàng không.',
        items: [
          'Các thay đổi như điều chỉnh ngày, sửa đổi hoặc hủy đặt chỗ sẽ phát sinh phí theo quy định của hãng hàng không. Ngoài ra, Olala có thể thu thêm phí dịch vụ tương ứng cho từng trường hợp.',
          'Vé máy bay không được chuyển nhượng giá trị - chỉ có khách hàng có tên trên vé mới được sử dụng.',
          'Đối với các đơn hàng được áp dụng khuyến mãi, nếu phát hiện có hành vi gian lận hoặc lợi ích ưu đãi không đúng mục tiêu, Olala có quyền thu hồi khuyến mãi hoặc yêu cầu khách hàng thanh toán bù phần chênh lệch.'
        ]
      },
      {
        title: '4. Chính sách hoàn tiền',
        text: 'Khách hàng có thể được xem xét hoàn tiền trong các trường hợp như:',
        items: [
          'Khách hàng hủy vé và vé đủ điều kiện hoàn theo quy định của hãng hàng không.',
          'Hệ thống hoặc đối tác xử lý vé phát sinh lỗi khiến vé không thể xuất thành công.',
          'Giao dịch thanh toán bị lỗi, đã ghi nhận trừ tiền nhưng booking không được hoàn tất sau khi tra soát.',
          'Chuyến bay bị hủy hoặc thay đổi theo chính sách của hãng hàng không và khách hàng đủ điều kiện hoàn tiền.'
        ],
        closing: 'Thời gian nhận tiền có thể kéo dài đến 14 ngày làm việc, tùy thuộc vào quy trình xử lý của hãng hàng không và phương thức thanh toán khách hàng đã sử dụng.'
      },
      {
        title: '5. Quy định về xuất hóa đơn',
        items: [
          'Khách hàng có nhu cầu xuất hóa đơn cần cung cấp đầy đủ và chính xác thông tin xuất hóa đơn trong quá trình đặt vé hoặc gửi yêu cầu qua kênh hỗ trợ chính thức của Olala.',
          'Yêu cầu phải được gửi trong vòng 48 giờ kể từ thời điểm đặt vé thành công.',
          'Hóa đơn điện tử sẽ được gửi về địa chỉ email khách hàng đã cung cấp sau khi được xử lý.'
        ]
      },
      {
        title: '6. Quy định về thông báo chuyến bay',
        items: [
          'Các thay đổi liên quan đến chuyến bay như đổi giờ bay, chậm chuyến, hủy chuyến, thay đổi cửa bay hoặc điều chỉnh lịch trình có thể được hãng hàng không thông báo trực tiếp đến khách hàng qua thông tin liên hệ đã cung cấp.',
          'Olala có thể hỗ trợ gửi thông báo qua Mini App, Zalo OA, email hoặc các kênh liên hệ khác nếu hệ thống nhận được thông tin cập nhật từ đối tác/hãng bay.',
          'Khách hàng có trách nhiệm theo dõi thông báo từ Olala, hãng hàng không và kiểm tra tình trạng chuyến bay trước giờ khởi hành.'
        ]
      },
      {
        title: '7. Các trường hợp bất khả kháng',
        items: [
          'Trong các trường hợp bất khả kháng như thiên tai, dịch bệnh, chiến tranh, sự cố kỹ thuật, thay đổi chính sách vận chuyển, yêu cầu từ cơ quan nhà nước hoặc các sự kiện ngoài khả năng kiểm soát, chuyến bay có thể bị thay đổi, chậm, hủy hoặc ảnh hưởng đến quá trình xử lý booking.',
          'Trong các trường hợp này, Olala sẽ cố gắng hỗ trợ khách hàng trong phạm vi có thể, dựa trên thông tin và chính sách từ hãng hàng không, đối tác vé hoặc đơn vị liên quan.'
        ]
      },
      {
        title: '8. Quy định về hành vi gian lận và sử dụng dịch vụ',
        text: 'Khách hàng không được thực hiện các hành vi sau:',
        items: [
          'Cung cấp thông tin giả mạo hoặc sử dụng thông tin của người khác khi chưa được phép.',
          'Lợi dụng lỗi hệ thống, mã khuyến mãi hoặc chính sách ưu đãi để trục lợi.',
          'Thực hiện giao dịch gian lận, tranh chấp sai sự thật hoặc có hành vi chiếm đoạt tài sản.',
          'Can thiệp trái phép vào hệ thống, dữ liệu hoặc quy trình vận hành của Olala.'
        ],
        closing: 'Nếu phát hiện hành vi vi phạm, Olala có quyền từ chối cung cấp dịch vụ, hủy ưu đãi, yêu cầu thanh toán phần chênh lệch hoặc phối hợp với cơ quan có thẩm quyền xử lý theo quy định pháp luật.'
      }
    ]
  }
}

const LegalModal = ({ content, onClose }) => {
  useEffect(() => {
    if (!content) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [content, onClose])

  if (!content) return null

  return (
    <div className="legal-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="legal-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="legal-modal-grabber"></div>
        <header className="legal-modal-header">
          <h2 id="legal-modal-title">{content.title}</h2>
          <button type="button" onClick={onClose} aria-label="Đóng">×</button>
        </header>
        <div className="legal-modal-body">
          {content.intro && <p>{content.intro}</p>}
          {content.sections.map(section => (
            <section key={section.title}>
              <h3>{section.title}</h3>
              {section.text && <p>{section.text}</p>}
              {section.items && (
                <ul>
                  {section.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              )}
              {section.closing && <p>{section.closing}</p>}
            </section>
          ))}
        </div>
        <footer className="legal-modal-footer">
          <button type="button" onClick={onClose}>Tôi đã hiểu</button>
        </footer>
      </section>
    </div>
  )
}

const getLogo = (airline = '') => {
  const lower = airline.toLowerCase()
  if (lower.includes('vietjet')) return logoVietjet
  if (lower.includes('vietnam')) return logoVNA
  if (lower.includes('bamboo')) return logoBamboo
  return logoSun
}

const formatMoney = (value) => `${Math.max(0, value || 0).toLocaleString('vi-VN')}đ`

const formatDob = (value) => {
  if (!value) return ''
  if (value.includes('/')) return value
  const parts = value.split('-')
  if (parts.length !== 3) return value
  return `${parts[2]}/${parts[1]}/${parts[0]}`
}

const formatDuration = (value) => {
  if (!value) return '1h 50m'
  if (value.includes(':')) {
    const [hours, minutes] = value.split(':')
    return `${Number(hours)}h ${minutes}m`
  }
  return value
}

const getPassengerKind = (index, searchData) => {
  const adults = searchData.adults || 1
  const children = searchData.children || 0
  if (index < adults) return 'Người lớn'
  if (index < adults + children) return 'Trẻ em 2-12 tuổi'
  return 'Trẻ em dưới 2 tuổi'
}

const getPassengerGenderLabel = (gender = '') => {
  if (gender === 'Nam') return 'Nam'
  if (gender === 'Nữ') return 'Nữ'
  return gender
}

const getSegmentName = (segmentId) => segmentId === 'return' ? 'chiều về' : 'chiều đi'

const getBaggageInfo = (value) => {
  if (!value || value === 'none') return { text: 'Không mua hành lý', price: 0 }
  const match = value.match(/xwbg-(\d+)/)
  const kg = match ? Number(match[1]) : 0
  return { text: `${kg}kg`, price: kg * 13000 }
}

const buildSegments = (searchData) => {
  const dep = searchData.selectedDep || {}
  const ret = searchData.selectedRet || {}
  const from = searchData.from || dep.departureCity || 'Hà Nội'
  const to = searchData.to || dep.arrivalCity || 'TP. Hồ Chí Minh'

  const segments = [
    {
      id: 'departure',
      title: 'Chuyến bay chiều đi',
      flight: dep,
      fromCity: dep.departureCity || from,
      toCity: dep.arrivalCity || to,
      fromCode: dep.departureCode || 'HAN',
      toCode: dep.arrivalCode || 'SGN'
    }
  ]

  if (searchData.returnDate || searchData.selectedRet) {
    segments.push({
      id: 'return',
      title: 'Chuyến bay chiều về',
      flight: ret,
      fromCity: ret.departureCity || to,
      toCity: ret.arrivalCity || from,
      fromCode: ret.departureCode || dep.arrivalCode || 'SGN',
      toCode: ret.arrivalCode || dep.departureCode || 'HAN'
    })
  }

  return segments
}

const FlightBlock = ({ segment }) => {
  const flight = segment.flight || {}

  return (
    <section className="confirm-flight-block">
      <h3>{segment.title}</h3>
      <div className="confirm-route-card">
        <div className="confirm-airline">
          <img src={getLogo(flight.airline)} alt={flight.airline || 'Airline'} />
        </div>
        <div className="confirm-airport left">
          <strong>{segment.fromCode}</strong>
          <span>{segment.fromCity}</span>
        </div>
        <div className="confirm-timeline">
          <div className="confirm-time-row">
            <span>{flight.departureTime || '08:30'}</span>
            <i><PlaneIcon /></i>
            <span>{flight.arrivalTime || '10:20'}</span>
          </div>
          <small>{formatDuration(flight.duration)}</small>
        </div>
        <div className="confirm-airport right">
          <strong>{segment.toCode}</strong>
          <span>{segment.toCity}</span>
        </div>
      </div>
      <div className="confirm-flight-meta">
        <div><span>Hãng bay</span><strong>{flight.airline || 'Vietnam Airlines'}</strong></div>
        <div><span>Chuyến bay</span><strong>{flight.flightNumber || 'VN1201'}</strong></div>
        <div><span>Giờ bay</span><strong>{flight.departureTime || '08:30'} - {flight.arrivalTime || '10:20'}</strong></div>
        <div><span>Hạng chỗ</span><strong>{flight.fareClass || 'Phổ thông'}</strong></div>
      </div>
    </section>
  )
}

function ConfirmInfo() {
  const navigate = useNavigate()
  const location = useLocation()
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [activeLegal, setActiveLegal] = useState(null)
  const searchData = useMemo(() => location.state || {}, [location.state])
  const passengers = useMemo(() => (
    Array.isArray(searchData.passengers) ? searchData.passengers : []
  ), [searchData.passengers])
  const contactInfo = searchData.contactInfo || {}
  const baggageSelections = useMemo(() => searchData.baggageSelections || {}, [searchData.baggageSelections])
  const segments = useMemo(() => buildSegments(searchData), [searchData])

  const baggageTotal = useMemo(() => passengers.reduce((total, passenger, passengerIndex) => (
    total + segments.reduce((segmentTotal, segment) => {
      const key = `${passenger.id || passengerIndex + 1}_${segment.id}`
      return segmentTotal + getBaggageInfo(baggageSelections[key]).price
    }, 0)
  ), 0), [passengers, segments, baggageSelections])

  const ticketTotal = (searchData.selectedDep?.priceValue || 0) + (searchData.selectedRet?.priceValue || 0)
  const feeTotal = 0
  const grandTotal = ticketTotal + baggageTotal + feeTotal

  const handleConfirmPayment = () => {
    const errorCode = getConfirmErrorCode(searchData)
    const errorConfig = CONFIRM_ERROR_CODES[errorCode]

    if (!errorConfig) {
      const ticket = saveBookingTicket(searchData, 'waiting')
      navigate('/payment', { state: ticket.rawSearchData })
      return
    }

    if (errorConfig.type === 'warning') {
      if (window.confirm(errorConfig.message)) {
        const ticket = saveBookingTicket(searchData, 'waiting')
        navigate('/payment', { state: ticket.rawSearchData })
      }
      return
    }

    toast.error(errorConfig.message, {
      style: { borderRadius: '12px', background: '#333', color: '#fff' }
    })
  }

  return (
    <div className="confirm-page">
      <div
        className="confirm-background"
        style={{ backgroundImage: `url(${background2})` }}
      >
        <div className="confirm-background-overlay" />
      </div>

      <header className="confirm-header">
        <div className="confirm-title-row">
          <button onClick={() => navigate(-1)} aria-label="Quay lại"><ChevronLeft /></button>
          <h1>Xác nhận thông tin</h1>
          <div className="confirm-menu"><span>...</span><em></em><span>×</span></div>
        </div>
        <div className="confirm-steps">
          <StepIndicator number="1" label="Nhập thông tin" state="done" />
          <span className="confirm-step-line"></span>
          <StepIndicator number="2" label="Mua dịch vụ" state="done" />
          <span className="confirm-step-line"></span>
          <StepIndicator number="3" label="Thanh toán" state="active" />
        </div>
      </header>

      <main className="confirm-main">
        <section className="confirm-card confirm-flight-card">
          <div className="confirm-section-title"><PlaneIcon /><h2>Chi tiết chuyến bay</h2></div>
          {segments.map(segment => <FlightBlock key={segment.id} segment={segment} />)}
        </section>

        <section className="confirm-card confirm-passenger-card">
          <div className="confirm-section-title"><UserIcon /><h2>Thông tin hành khách</h2></div>
          <div className="confirm-passenger-table">
            {passengers.map((passenger, index) => (
              (() => {
                const passengerInfo = index < (searchData.adults || 1)
                  ? (passenger.extra || contactInfo.phone || '')
                  : formatDob(passenger.extra)
                const accompanyingInfo = passenger.accompanying
                  ? `Người lớn đi kèm: ${passengers.find(p => String(p.id) === String(passenger.accompanying))?.name || `Hành khách ${passenger.accompanying}`}`
                  : ''

                return (
              <div key={passenger.id || index} className="confirm-passenger-row">
                <span className="confirm-passenger-number">{index + 1}</span>
                <div className="confirm-passenger-name">
                  <strong>{passenger.name || `HÀNH KHÁCH ${index + 1}`}</strong>
                  <span>{[getPassengerGenderLabel(passenger.gender), getPassengerKind(index, searchData), passengerInfo].filter(Boolean).join(' - ')}</span>
                  {accompanyingInfo && <span>{accompanyingInfo}</span>}
                </div>
              </div>
                )
              })()
            ))}
          </div>
        </section>

        <div className="confirm-two-col">
          <section className="confirm-card confirm-small-card">
            <div className="confirm-section-title"><PhoneIcon /><h2>Thông tin liên hệ</h2></div>
            <dl className="confirm-info-list">
              <div><dt>Giới tính:</dt><dd>{contactInfo.gender === 'Nam' ? 'Ông' : contactInfo.gender === 'Nữ' ? 'Bà' : contactInfo.gender}</dd></div>
              <div><dt>Họ và tên:</dt><dd>{contactInfo.name}</dd></div>
              <div><dt>Điện thoại liên hệ:</dt><dd>{contactInfo.phone}</dd></div>
              <div><dt>Email liên hệ:</dt><dd>{contactInfo.email}</dd></div>
              <div className="with-line"><dt>Xuất hóa đơn:</dt><dd>{searchData.exportInvoice ? 'Có' : 'Không'}</dd></div>
            </dl>
          </section>

          <section className="confirm-card confirm-small-card">
            <div className="confirm-section-title"><BagIcon /><h2>Dịch vụ đã chọn</h2></div>
            <div className="confirm-service-list">
              {passengers.map((passenger, passengerIndex) => (
                <div key={passenger.id || passengerIndex}>
                  <strong>{passenger.name || `HÀNH KHÁCH ${passengerIndex + 1}`}:</strong>
                  <p>
                    {segments.map(segment => {
                      const key = `${passenger.id || passengerIndex + 1}_${segment.id}`
                      const selected = getBaggageInfo(baggageSelections[key])
                      return <span key={segment.id}>{selected.text} {getSegmentName(segment.id)}</span>
                    })}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="confirm-card confirm-total-card">
          <div className="confirm-section-title"><WalletIcon /><h2>Tổng tiền</h2></div>
          <div className="confirm-total-lines">
            <div><span>Giá vé</span><strong>{formatMoney(ticketTotal)}</strong></div>
            <div><span>Hành lý</span><strong>{formatMoney(baggageTotal)}</strong></div>
            <div><span>Thuế & phí</span><strong>{formatMoney(feeTotal)}</strong></div>
            <div className="payment-status-row"><span>Trạng thái thanh toán</span><strong>Chưa thanh toán</strong></div>
          </div>
          <div className="confirm-grand-total"><span>Tổng cộng</span><strong>{formatMoney(grandTotal)}</strong></div>
        </section>

        <div className="confirm-alert"><InfoIcon /><span>Vui lòng kiểm tra kỹ thông tin trước khi thanh toán.</span></div>
        <div className="confirm-terms">
          <label className="confirm-terms-toggle">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
            />
            <span className="confirm-terms-check" aria-hidden="true"></span>
          </label>
          <span className="confirm-terms-text">
            Đồng ý với <button type="button" onClick={() => setActiveLegal('terms')}>Điều khoản</button> và <button type="button" onClick={() => setActiveLegal('policy')}>Chính sách</button>
          </span>
        </div>
        <button
          className="confirm-later-btn"
          disabled={!acceptedTerms}
          onClick={() => {
            const ticket = saveBookingTicket(searchData, 'waiting')
            navigate('/booking-pending', { state: ticket.rawSearchData })
          }}
        >
          <WalletIcon />Chỉ xác nhận, thanh toán sau
        </button>
        <button className="confirm-pay-btn" disabled={!acceptedTerms} onClick={handleConfirmPayment}><LockIcon />Xác nhận và thanh toán</button>
      </main>
      <LegalModal content={LEGAL_CONTENT[activeLegal]} onClose={() => setActiveLegal(null)} />
    </div>
  )
}

export default ConfirmInfo
