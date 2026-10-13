import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Sections/Footer'
import Stars from '@/components/ui/Stars'
import { SocialMediaIconsProvider } from '@/context/SocialMediaIconsContext'

export default function PortfolioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SocialMediaIconsProvider>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[50px] h-px w-px"
        data-navbar-scroll-boundary
      />
      <Navbar />
      <div
        className="fixed inset-0 -z-20 pointer-events-none print:hidden"
        style={{ transform: 'translateY(10vh)' }}
      >
        <Stars />
      </div>
      {children}
      <Footer />
    </SocialMediaIconsProvider>
  )
}
