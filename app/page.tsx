import { SiteNavbar } from "@/components/site-navbar"
import { SiteHero } from "@/components/site-hero"

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#010103] pt-6">
      {/* Top glow: light wash brightest toward the top-left, fading dark to the
          right and downward, matching the provided screenshot */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-0 h-140"
        style={{
          backgroundImage:
            "radial-gradient(75% 130% at 22% 0%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.07) 42%, rgba(255,255,255,0.02) 72%, rgba(255,255,255,0) 88%)",
        }}
      />
      {/* Figma: navbar sits 24px from the top edge */}
      <SiteNavbar className="relative z-10" />
      <SiteHero />
    </div>
  )
}
