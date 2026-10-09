/*
Handle the toggling and scrolling 
*/

interface HandleToggleMenuParams {
  isMenuOpen: boolean
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>
}

export function handleToggleMenu(
  isMenuOpen: HandleToggleMenuParams['isMenuOpen'],
  setIsMenuOpen: HandleToggleMenuParams['setIsMenuOpen'],
  setIsAnimating: HandleToggleMenuParams['setIsAnimating'],
): void {
  if (isMenuOpen) {
    setIsAnimating(false)
    setTimeout(() => {
      setIsMenuOpen(false)
    }, 100)
  } else {
    setIsMenuOpen(true)
    setTimeout(() => setIsAnimating(true), 10)
  }
}

interface HandleSmoothScrollParams {
  href: string
}

export function handleSmoothScroll({ href }: HandleSmoothScrollParams) {
  const element = document.querySelector(href) as HTMLElement
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth',
    })
  }
}

/*
Navbar Items
*/

export const navbarItems = [
  { label: 'Skills', href: '#skills', name: 'skills' },
  { label: 'Experience', href: '#experience', name: 'experience' },
  { label: 'Contact', href: '#contact', name: 'contact' },
]
