export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-r from-[rgba(15,15,64,0.8)] to-[rgba(38,11,112,0.8)] px-4 py-6 backdrop-blur-md sm:px-6 md:px-8 md:py-8 print:hidden">
      <div className="mx-auto w-full max-w-7xl text-center md:text-left">
        <p className="font-mono text-lg font-bold text-white">VALIWISDEV</p>
        <p className="mt-1 text-xs text-white/55">
          © {new Date().getFullYear()} VALIWISDEV. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
