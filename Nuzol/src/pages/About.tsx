function About() {
  return (
    <section
      className="min-h-svh bg-nz-ink px-6 pb-24 pt-40 sm:px-10 lg:px-16"
      aria-label="About"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-nz-accent">
          The studio
        </p>
        <h1 className="mb-10 max-w-2xl text-4xl font-light tracking-tight text-nz-cream sm:text-5xl">
          About NOZUL
        </h1>

        <div className="max-w-3xl space-y-6 text-base leading-relaxed text-nz-cream/70">
          <p>
            NOZUL is a design studio and manufacturer of modular caravans. We
            design, engineer and craft each unit in-house, treating the caravan
            as architecture — something to be lived in, not simply towed.
          </p>
          <p>
            Every build is composed of standardised, modular elements,
            configured to its owner. The result is a caravan that is precise,
            durable and unmistakably its own.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
