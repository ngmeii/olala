import HeroSection from '../components/HeroSection'
import BookingForm from '../components/BookingForm'
import BottomNav from '../components/BottomNav'
import airplaneHero from '../assets/images/background.png'

function BookingPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-white">
      {/* Background image constrained to mobile frame */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          backgroundImage: `url(${airplaneHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          height: '550px' // Increased height to show more of the image
        }}
      >
        {/* Gradient transition to white at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero header - now transparent to show page background */}
        <HeroSection />

        {/* Booking form card - overlaps hero section */}
        <BookingForm />

        <div className="flex-grow"></div>
      </div>

      {/* Bottom navigation */}
      <BottomNav />
    </div>
  )
}

export default BookingPage
