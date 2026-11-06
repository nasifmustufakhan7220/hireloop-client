"use client"
import { Mail } from "lucide-react"

import { PasswordInput } from "@/components/auth/password-input"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
const SignInForm = () => {
  const handelSignIn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formObject = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >
    const { data:signInData, error } = await authClient.signIn.email({
      email: formObject.email,
      password: formObject.password, 
      rememberMe: true, 
      callbackURL: "/", 
    });
    console.log(signInData, error);
  }
  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={handelSignIn}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-white/80">
            Email
          </label>
          <div className="relative">
            <Mail
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-white/35"
            />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl border border-white/10 bg-white/4 pr-4 pl-11 text-sm text-white transition-colors outline-none placeholder:text-white/30 focus:border-[#5C53FE]/70 focus:bg-white/6 focus:ring-2 focus:ring-[#5C53FE]/20"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-white/80"
            >
              Password
            </label>
            <Link
              href="#"
              className="text-xs font-medium text-[#8b85ff] transition-colors hover:text-white"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
          />
        </div>

        {/* Remember me */}
        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white/60 select-none">
          <input
            type="checkbox"
            name="remember"
            className="size-4 rounded border-white/20 bg-white/5 accent-[#5C53FE]"
          />
          Remember me for 30 days
        </label>

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#5C53FE] text-sm font-semibold text-white transition-colors hover:bg-[#4b43e8] focus-visible:ring-2 focus-visible:ring-[#5C53FE]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0e] focus-visible:outline-none"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default SignInForm
