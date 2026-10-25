interface PageHeroProps {
  eyebrow: string;
  title: string;
  highlight: string;
  description?: string;
}

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-charcoal pb-20 pt-36 lg:pb-28 lg:pt-44">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#1a1a1a] to-charcoal" />
      <div className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-terracotta/[0.07] blur-[100px]" />
      <div className="absolute -right-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-white/[0.04]" />
      <div className="absolute -right-14 top-1/2 h-[270px] w-[270px] -translate-y-1/2 rounded-full border border-white/[0.03]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <span className="mb-6 inline-block rounded-full border border-terracotta/20 bg-terracotta/10 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-terracotta-light">
          {eyebrow}
        </span>

        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          {title}
          <br />
          <span className="bg-gradient-to-r from-terracotta-light via-terracotta to-terracotta-light bg-clip-text text-transparent">
            {highlight}
          </span>
        </h1>

        {description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
