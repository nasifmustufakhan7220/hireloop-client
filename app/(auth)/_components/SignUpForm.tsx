"use client"
import { Mail, User } from "lucide-react"

import { PasswordInput } from "@/components/auth/password-input"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

const SignUpForm = () => {
  const handelSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formObject = Object.fromEntries(formData.entries()) as Record<string, string>
    const { data:signUpData, error } = await authClient.signUp.email({
      name: formObject.name,
      email: formObject.email, 
      password: formObject.password, 
      callbackURL: "/",
    });

    console.log(signUpData,error);
  }
  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={handelSignUp}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-white/80">
            Full name
          </label>
          <div className="relative">
            <User
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-white/35"
            />
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              className="h-12 w-full rounded-xl border border-white/10 bg-white/4 pr-4 pl-11 text-sm text-white transition-colors outline-none placeholder:text-white/30 focus:border-[#5C53FE]/70 focus:bg-white/6 focus:ring-2 focus:ring-[#5C53FE]/20"
            />
          </div>
        </div>

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
          <label
            htmlFor="password"
            className="text-sm font-medium text-white/80"
          >
            Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="new-password"
            placeholder="Create a password"
          />
        </div>

        {/* Terms */}
        <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-relaxed text-white/60 select-none">
          <input
            type="checkbox"
            name="terms"
            className="mt-0.5 size-4 shrink-0 rounded border-white/20 bg-white/5 accent-[#5C53FE]"
          />
          <span>
            I agree to the{" "}
            <Link
              href="#"
              className="font-medium text-[#8b85ff] transition-colors hover:text-white"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="font-medium text-[#8b85ff] transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        <button
          type="submit"
          className="h-12 w-full rounded-xl bg-[#5C53FE] text-sm font-semibold text-white transition-colors hover:bg-[#4b43e8] focus-visible:ring-2 focus-visible:ring-[#5C53FE]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0e] focus-visible:outline-none"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default SignUpForm
