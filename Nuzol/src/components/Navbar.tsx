import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/logo nuzol.png'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const activeIndex = Math.max(
    0,
    NAV_LINKS.findIndex((link) => link.to === pathname),
  )

  const navContainerRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const [indicator, setIndicator] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  })
  const [indicatorReady, setIndicatorReady] = useState(false)

  const measureIndicator = useCallback(() => {
    const container = navContainerRef.current
    const link = linkRefs.current[activeIndex]
    if (!container || !link) return
    const containerRect = container.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    setIndicator({
      top: linkRect.top - containerRect.top,
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
      height: linkRect.height,
    })
    setIndicatorReady(true)
  }, [activeIndex])

  useLayoutEffect(() => {
    measureIndicator()
    const remeasure = () => measureIndicator()
    window.addEventListener('resize', remeasure)
    const observer = new ResizeObserver(remeasure)
    if (navContainerRef.current) observer.observe(navContainerRef.current)
    return () => {
      window.removeEventListener('resize', remeasure)
      observer.disconnect()
    }
  }, [measureIndicator])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className="nz-nav fixed inset-x-0 top-0 z-[1000] text-nz-cream"
      style={{ animationDelay: '0.15s' }}
    >
      <div className="grid h-[76px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-[clamp(20px,4.5vw,56px)] max-sm:h-[68px]">
        <Link
          to="/"
          className="justify-self-start opacity-95 transition-opacity duration-300 hover:opacity-100"
          aria-label="NOZUL — home"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="NOZUL"
            className="h-[30px] w-auto max-sm:h-[26px]"
          />
        </Link>

        <nav
          className="justify-self-center max-[880px]:hidden"
          aria-label="Primary"
        >
          <div
            ref={navContainerRef}
            className="relative flex items-center rounded-[22px] border border-white/10 bg-white/[0.04] px-2 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_24px_-16px_rgba(0,0,0,0.4)] backdrop-blur-md"
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute rounded-[14px] border border-white/[0.07] bg-white/[0.09] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition-[top,left,width,height,opacity] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                indicatorReady ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                top: indicator.top,
                left: indicator.left,
                width: indicator.width,
                height: indicator.height,
              }}
            />
            {NAV_LINKS.map((link, index) => (
              <NavLink
                key={link.to}
                ref={(element) => {
                  linkRefs.current[index] = element
                }}
                to={link.to}
                className={`relative z-10 rounded-[14px] px-4 py-1.5 text-[0.8125rem] font-medium  tracking-[0.16em] transition-[color,background-color] duration-300 hover:bg-white/[0.03] hover:text-nz-cream/95 focus-visible:outline-offset-0 ${
                  activeIndex === index ? 'text-nz-cream' : 'text-nz-cream/60'
                }`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-6 justify-self-end">
          <Link
            to="/#start"
            className="group inline-flex items-center gap-1.5 whitespace-nowrap text-[0.75rem] font-medium  tracking-[0.14em] text-nz-cream/80 transition-colors duration-300 hover:text-nz-cream"
          >
            Start a project

          </Link>
          <button
            type="button"
            className={`group inline-flex h-[34px] w-[34px] flex-col items-center justify-center gap-[7px] p-1.5 text-nz-cream transition-colors duration-300 hover:text-nz-accent ${
              menuOpen ? 'text-nz-accent' : ''
            }`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`h-[1.5px] w-[22px] rounded-[1px] bg-current transition-all duration-300 ${
                menuOpen
                  ? 'translate-y-[4px] rotate-45'
                  : 'group-hover:-translate-y-[1px]'
              }`}
            />
            <span
              className={`h-[1.5px] w-[22px] rounded-[1px] bg-current transition-all duration-300 ${
                menuOpen
                  ? '-translate-y-[4.5px] -rotate-45'
                  : 'group-hover:translate-y-[1px]'
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 top-[76px] z-[999] flex flex-col justify-center gap-10 px-[clamp(20px,8vw,48px)] pb-[12vh] bg-nz-ink/95 transition-all duration-300 max-sm:top-[68px] ${
          menuOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {NAV_LINKS.map((link, index) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `border-b border-nz-cream/10 px-0 py-[0.85rem] text-[1.75rem] font-normal  tracking-[0.08em] transition-all duration-[400ms] hover:text-nz-accent ${
                  isActive ? 'text-nz-accent' : 'text-nz-cream/80'
                } ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0'}`
              }
              style={{ transitionDelay: `${(index + 1) * 50}ms` }}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/#start"
          className="group inline-flex items-center gap-1.5 self-start text-[0.8rem] font-bold text-2xl tracking-[0.14em] text-nz-cream/80 transition-colors duration-300 hover:text-nz-cream"
          onClick={closeMenu}
        >
          Start a project
          <svg
            className="size-3 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M1 6h10M7 2l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
