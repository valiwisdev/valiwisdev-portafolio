import Navbar from '@/components/Navbar/Navbar'
import Stars from '@/components/ui/Stars'

export default function PortfolioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <div
        className="fixed inset-0 -z-20 pointer-events-none print:hidden"
        style={{ transform: 'translateY(10vh)' }}
      >
        <Stars />
      </div>
      {children}
    </>
  )
}
