import { Link } from 'react-router-dom'
import heroBackground from '../assets/Background.png'
import heroCaravan from '../assets/remove carvan.png'

function Hero() {
  return (
    <section className="hero" aria-label="NOZUL modular caravans">
      <img
        className="hero-layer hero-bg"
        src={heroBackground}
        alt=""
        fetchPriority="high"
      />

      <div className="hero-brand" aria-hidden="true">
        <span>NOZUL</span>
      </div>

      <img className="hero-caravan" src={heroCaravan} alt="" />

      <div className="hero-content">
        <div className="hero-detail" aria-hidden="true">
          <span className="hero-detail-num">01</span>
          <span className="hero-detail-line" />
        </div>


        <p className="hero-discover">Discover</p>

        <h1 className="hero-title">NOZUL</h1>

        <span className="hero-divider" aria-hidden="true" />

        <p className="hero-subtitle">
          Modular spaces, built for life on the move.
        </p>

        <Link to="/projects" className="hero-cta">
          <span>Explore our caravans</span>
          <svg className="hero-cta-arrow" width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M0 6h14M10 1l5 5-5 5" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

export default Hero
