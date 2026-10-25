import { loginAction } from "../actions";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

const fieldClass =
  "w-full rounded-xl border border-cream-dark bg-white px-4 py-3.5 text-sm text-charcoal placeholder:text-stone-light transition-all focus:border-terracotta focus:outline-none focus:ring-4 focus:ring-terracotta/10";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string; from?: string };
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal px-5 py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#1a1a1a] to-charcoal" />
      <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-terracotta/[0.08] blur-[100px]" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/[0.08] bg-warm-white p-8 shadow-2xl sm:p-10">
        <div className="mb-8">
          <span className="font-serif text-2xl font-bold text-charcoal">
            Embata
          </span>
          <span className="ml-2 text-[10px] uppercase tracking-[0.3em] text-stone-light">
            Admin
          </span>
          <h1 className="mt-5 font-serif text-2xl font-bold text-charcoal">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-stone">
            Bookings and payments live behind this door.
          </p>
        </div>

        {searchParams.error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {searchParams.error}
          </div>
        )}

        <form action={loginAction} className="space-y-5">
          <input type="hidden" name="from" value={searchParams.from ?? ""} />

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-charcoal"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className={fieldClass}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-charcoal"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={fieldClass}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-terracotta px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-terracotta/20 transition-all hover:bg-terracotta-dark"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-stone-light">
          Credentials are set in <code className="text-stone">ADMIN_EMAIL</code>{" "}
          and <code className="text-stone">ADMIN_PASSWORD</code>.
        </p>
      </div>
    </div>
  );
}
