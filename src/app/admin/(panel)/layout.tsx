import Link from "next/link";
import { logoutAction } from "../actions";
import { LayoutDashboard } from "lucide-react";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-cream-dark bg-warm-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-charcoal text-white">
              <LayoutDashboard size={16} />
            </span>
            <div>
              <div className="font-serif text-lg font-bold leading-none text-charcoal">
                Embata
              </div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-light">
                Admin Panel
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden text-sm font-medium text-stone transition-colors hover:text-terracotta sm:inline"
            >
              View site
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full border border-cream-dark bg-warm-white px-5 py-2 text-sm font-semibold text-charcoal transition-all hover:border-terracotta/40 hover:text-terracotta"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8">{children}</main>
    </div>
  );
}
