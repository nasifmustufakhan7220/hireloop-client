"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"

import { cn } from "@/lib/utils"

type PasswordInputProps = {
  id: string
  name: string
  placeholder?: string
  autoComplete?: string
  className?: string
}

export function PasswordInput({
  id,
  name,
  placeholder = "Enter your password",
  autoComplete,
  className,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <Lock
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-white/35"
      />
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={cn(
          "h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] pr-12 pl-11 text-sm text-white transition-colors outline-none placeholder:text-white/30 focus:border-[#5C53FE]/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#5C53FE]/20",
          className
        )}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white/80 focus-visible:ring-2 focus-visible:ring-[#5C53FE]/40 focus-visible:outline-none"
      >
        {visible ? (
          <EyeOff aria-hidden className="size-4.5" />
        ) : (
          <Eye aria-hidden className="size-4.5" />
        )}
      </button>
    </div>
  )
}
