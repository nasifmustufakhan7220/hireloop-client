import Image from "next/image"
import Link from "next/link"

import logo from "@/app/images/logo.png"

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-[#010103] text-white">
      {/* Ambient brand glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-130 w-205 -translate-x-1/2 rounded-full bg-[#5C53FE]/15 blur-[120px]" />
        <div className="absolute -right-40 bottom-[-10%] h-105 w-105 rounded-full bg-[#5C53FE]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] -left-40 h-105 w-105 rounded-full bg-[#ff00ff]/5 blur-[120px]" />
      </div>

      <header className="relative z-10 flex justify-center px-4 pt-6 sm:px-6 lg:pt-8">
        <Link href="/" aria-label="HireLoop home" className="inline-flex">
          <Image
            src={logo}
            alt="HireLoop"
            width={154}
            height={44}
            priority
            className="h-9 w-auto lg:h-11"
          />
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
        {children}
      </main>

      <p className="relative z-10 px-4 pb-6 text-center text-xs text-white/35">
        © {new Date().getFullYear()} HireLoop. All rights reserved.
      </p>
    </div>
  )
}
