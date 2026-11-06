import type { Metadata } from "next"
import Link from "next/link"
import SignInForm from "../_components/SignInForm"


export const metadata: Metadata = {
  title: "Sign In · HireLoop",
  description: "Sign in to your HireLoop account.",
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.86c2.26-2.09 3.56-5.17 3.56-8.87Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A11.99 11.99 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  )
}

export default function SignInPage() {
  return (
    <div className="w-full max-w-105 rounded-3xl border border-white/10 bg-[#0b0b0e]/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
      {/* Heading */}
      <div className="text-center">
        <h1 className="font-manrope text-2xl font-bold tracking-[-0.5px] text-white sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          Sign in to your HireLoop account to continue.
        </p>
      </div>

      {/* Social */}
      <button
        type="button"
        className="mt-7 flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/4 text-sm font-medium text-white transition-colors hover:bg-white/8"
      >
        <GoogleIcon className="size-4.5" />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3 text-xs text-white/35">
        <span className="h-px flex-1 bg-white/10" />
        or sign in with email
        <span className="h-px flex-1 bg-white/10" />
      </div>

      {/* Form */}
      
        <SignInForm/>
      {/* Switch to sign up */}
      <p className="mt-7 border-t border-white/10 pt-6 text-center text-sm text-white/55">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-[#8b85ff] transition-colors hover:text-white"
        >
          Sign up
        </Link>
      </p>
    </div>
  )
}
