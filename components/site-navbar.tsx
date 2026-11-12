"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

import logo from "@/app/images/logo.png"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"



export function SiteNavbar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const closeMenu = () => setOpen(false)
  const { data: session } = authClient.useSession()
  const router = useRouter();
  const navLinks = [
  { label: "Browse Jobs", href: "/browse-jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
  { label: "Dashboard", href: `/dashboard/${session?.user?.role}` },
] as const

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in") // redirect to login page
        },
      },
    })
  }

  return (
    <header className={cn("w-full px-4 sm:px-6 lg:px-10 xl:px-15", className)}>
      {/* Figma: 1320x74 bar, bg #222222, radius 16, centered on a 1440 canvas */}
      <div className="mx-auto max-w-330">
        <nav
          className={cn(
            "flex items-center justify-between gap-4 rounded-2xl bg-[#3c3c44]/95 px-4 backdrop-blur-lg md:px-6",
            "h-17 lg:h-18.5"
          )}
        >
          {/* Logo */}
          <Link href="/" aria-label="HireLoop home" className="shrink-0">
            <Image
              src={logo}
              alt="HireLoop"
              width={154}
              height={44}
              priority
              className="h-9 w-auto lg:h-11"
            />
          </Link>

          {/* Desktop links + actions */}
          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-base leading-[1.8] tracking-[-0.2px] text-white transition-colors hover:text-[#5C53FE]",
                    pathname === link.href && "text-[#5C53FE]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Divider between links and actions */}
            <div className="h-6 w-px bg-[#a8a8a8]/40" />

            <div className="flex items-center gap-4">
              {session?.user ? (
                <>
                  <span>{session?.user && session?.user.name}</span>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    className="h-13 rounded-xl bg-transparent px-6 py-4 text-lg font-normal text-[#5C53FE] hover:bg-[#5C53FE]/10"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  {" "}
                  <Button
                    render={<Link href="/sign-in" />}
                    nativeButton={false}
                    variant="ghost"
                    className="h-13 rounded-xl bg-transparent px-6 py-4 text-lg font-normal text-[#5C53FE] hover:bg-[#5C53FE]/10"
                  >
                    Sign In
                  </Button>
                  <Button
                    render={<Link href="/sign-up" />}
                    nativeButton={false}
                    className="h-13 rounded-xl border border-[#090a15]/10 bg-[#5C53FE] px-6 py-4 text-lg font-normal text-white hover:bg-[#4b43e8]"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile / tablet hamburger (placed on the right) */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  className="size-10 rounded-xl text-[#ededef] hover:bg-white/10 lg:hidden"
                  aria-label="Open navigation menu"
                />
              }
            >
              <MenuIcon className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-70 border-white/10 bg-[#1a1a1f] p-0 text-[#ededef]"
            >
              <SheetHeader className="border-b border-white/10 p-4">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Link href="/" onClick={closeMenu} aria-label="HireLoop home">
                  <Image
                    src={logo}
                    alt="HireLoop"
                    width={154}
                    height={44}
                    className="h-9 w-auto"
                  />
                </Link>
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={cn(
                      "rounded-xl px-4 py-3 text-base leading-[1.8] tracking-[-0.2px] text-[#ededef] transition-colors hover:bg-white/10 hover:text-white",
                      pathname === link.href && "bg-[#5C53FE]/10 text-[#5C53FE]"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Separator className="bg-white/10" />
              <div className="flex flex-col gap-4 p-4">
                <Button
                  render={<Link href="/sign-in" onClick={closeMenu} />}
                  nativeButton={false}
                  variant="ghost"
                  className="h-11 w-full rounded-xl bg-transparent text-lg font-normal text-[#5C53FE] hover:bg-[#5C53FE]/10"
                >
                  Sign In
                </Button>
                <Button
                  render={<Link href="/sign-up" onClick={closeMenu} />}
                  nativeButton={false}
                  className="h-11 w-full rounded-xl border border-[#090a15]/10 bg-[#5C53FE] text-lg font-normal text-white hover:bg-[#4b43e8]"
                >
                  Get Started
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
