const SERVICES = [
  {
    title: 'Design',
    description:
      'Spatial layouts, materials and finishes developed around how you live and where you travel.',
  },
  {
    title: 'Engineering',
    description:
      'Chassis, structure and systems engineered for the road and for the long term.',
  },
  {
    title: 'Craft',
    description:
      'Interior fitting and assembly, finished in-house to a precise, measured standard.',
  },
]

function Services() {
  return (
    <section
      className="min-h-svh bg-nz-ink px-6 pb-24 pt-40 sm:px-10 lg:px-16"
      aria-label="Services"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-nz-accent">
          What we do
        </p>
        <h1 className="mb-8 max-w-2xl text-4xl font-light tracking-tight text-nz-cream sm:text-5xl">
          Services
        </h1>
        <p className="mb-16 max-w-2xl text-base leading-relaxed text-nz-cream/70">
          From first sketch to final assembly, one studio carries the entire
          build.
        </p>

        <div className="grid gap-px border-t border-nz-cream/10 sm:grid-cols-3">
          {SERVICES.map((service) => (
            <article key={service.title} className="border-b border-nz-cream/10 py-8 pr-6">
              <h2 className="mb-3 text-xl font-light tracking-tight text-nz-cream">
                {service.title}
              </h2>
              <p className="text-sm leading-relaxed text-nz-cream/60">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
