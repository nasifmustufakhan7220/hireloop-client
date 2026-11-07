"use client"
import { Building2, Mail, Search, ShieldCheck, User } from "lucide-react"

import { PasswordInput } from "@/components/auth/password-input"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

const ROLES = [
  { value: "seeker" as const, label: "Job Seeker", icon: Search },
  { value: "recruiter" as const, label: "Recruiter", icon: Building2 },
  { value: "admin" as const, label: "Admin", icon: ShieldCheck },
]

type Role = (typeof ROLES)[number]["value"]

const SignUpForm = () => {
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formObject = Object.fromEntries(formData.entries()) as Record<string, string>
    const { data: signUpData, error } = await authClient.signUp.email({
      name: formObject.name,
      email: formObject.email,
      password: formObject.password,
      role: formObject.role as Role,
      callbackURL: "/",
    });

    console.log(signUpData, error)
    }
  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={handleSignUp}>
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

        {/* Role selector */}
        <div className="flex flex-col gap-2">
          <span id="role-label" className="text-sm font-medium text-white/80">
            I am signing up as
          </span>
          <div
            role="radiogroup"
            aria-labelledby="role-label"
            className="grid grid-cols-3 gap-2"
          >
            {ROLES.map((role) => {
              const Icon = role.icon
              return (
                <label
                  key={role.value}
                  className="group cursor-pointer rounded-xl border border-white/10 bg-white/4 px-2 py-3 transition-colors outline-none not-has-checked:hover:bg-white/8 has-checked:border-[#5C53FE]/70 has-checked:bg-[#5C53FE]/12 has-focus-visible:ring-2 has-focus-visible:ring-[#5C53FE]/40"
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    defaultChecked={role.value === "seeker"}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center gap-1.5">
                    <Icon
                      aria-hidden
                      className="size-5 text-white/45 transition-colors group-has-checked:text-[#8b85ff]"
                    />
                    <span className="text-xs font-medium text-white/60 transition-colors group-has-checked:text-white">
                      {role.label}
                    </span>
                  </div>
                </label>
              )
            })}
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
