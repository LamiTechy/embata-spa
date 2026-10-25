export default function SectionDivider({
  variant = "default",
}: {
  variant?: "default" | "dark" | "light";
}) {
  const bg =
    variant === "dark"
      ? "bg-charcoal"
      : variant === "light"
      ? "bg-cream/40"
      : "bg-warm-white";

  return (
    <div className={`relative ${bg} py-2`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cream-dark to-transparent" />
          <div className="flex items-center gap-1.5">
            <div className="h-1 w-1 rounded-full bg-terracotta/40" />
            <div className="h-1.5 w-1.5 rounded-full bg-terracotta/60" />
            <div className="h-1 w-1 rounded-full bg-terracotta/40" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cream-dark to-transparent" />
        </div>
      </div>
    </div>
  );
}
