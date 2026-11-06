import Image from "next/image"
import {
  ChartColumn,
  Disc3,
  MapPin,
  Search,
  SearchCheck,
  Star,
  UserSearch,
} from "lucide-react"

import globe from "@/app/images/globe.png"

const trendingChips = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
] as const

const stats = [
  { icon: SearchCheck, value: "50K", label: "Active Jobs" },
  { icon: ChartColumn, value: "12K", label: "Companies" },
  { icon: UserSearch, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
] as const

export function SiteHero({ className }: { className?: string }) {
  return (
    <section
      className={`relative overflow-hidden text-white ${className ?? ""}`}
    >
      {/* Planet background — shows the band of globe.png holding the starfield, the
          purple horizon bloom and the dark planet face; the band is pushed below the
          hero bottom edge so the arc apex sits ~855px from the page top, as designed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-23.2vw] z-0 h-[71.9vw] overflow-hidden"
      >
        <Image
          src={globe}
          alt=""
          width={1440}
          height={1882}
          sizes="100vw"
          className="absolute top-[-50.9vw] left-[3%] w-[94%]"
        />
        {/* Fade the band's top edge into the dark sky */}
        <div className="absolute inset-x-0 top-0 h-[10%] bg-linear-to-b from-[#010103] to-transparent" />
      </div>

      {/* Hero copy — Figma: Frame 2147234456, x=328 y=274, 784x395 */}
      <div className="relative z-10 pt-15 sm:pt-27.5 lg:pt-44">
        {/* Soft white halo around the overline badge */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-17.25 left-1/2 -z-10 h-135 w-135 -translate-x-1/2"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0) 70%)",
          }}
        />
        <div className="mx-auto flex max-w-196 flex-col items-center px-4 sm:px-0">
          {/* Overline badge — Figma: Frame 2147234462, 549x50 */}
          <div className="flex w-full max-w-137.25 items-center justify-center">
            <span className="hidden h-px w-16 shrink-0 bg-linear-to-r from-[#010123] to-[#a8a8a8] opacity-70 sm:block" />
            <div
              className="min-w-0 shrink-0 rounded-[24px] p-px"
              
            >
              <div className="flex items-center gap-3 rounded-[23px] bg-linear-to-b from-[#474747] to-[#010102] px-4 py-2.5 sm:gap-3.5 sm:px-5 sm:py-3">
                <Disc3 className="size-5 shrink-0 text-red-500 drop-shadow-[0_0_6px_rgba(255,20,60,0.9)] sm:size-6" />
                <span className="truncate font-space-mono text-[13px] leading-[1.2] text-white sm:text-base">
                  <span className="font-bold">50,000+</span>{" "}
                  <span className="tracking-wider text-white/75 uppercase">
                    new jobs this month
                  </span>
                </span>
              </div>
            </div>
            <span className="hidden h-px w-16 shrink-0 bg-linear-to-r from-[#010123] to-[#a8a8a8] opacity-70 sm:block" />
          </div>

          {/* Title + copy — Figma: Frame 2147234455 (gap 32) */}
          <div className="mt-8 flex flex-col items-center gap-4 text-center">
            <h1 className="font-manrope text-[34px] leading-[1.15] font-bold tracking-[-2px] text-balance sm:text-[44px] lg:text-[56px]">
              Find Your Dream Job Today
            </h1>
            <p className="max-w-196 font-manrope text-base leading-[1.6] sm:text-[20px]">
              HireLoop connects top talent with world-class companies. Browse
              thousands of curated opportunities and land your next role —
              faster.
            </p>
          </div>

          {/* Search bar — Figma: Frame 2147234454 (gap 24), Frame 1: 784x64 */}
          <div className="mt-12 w-full max-w-196">
            <div className="flex flex-col items-stretch gap-2 rounded-2xl border border-white/20 bg-[#101010] py-2 pr-2 pl-6 md:flex-row md:items-center md:gap-6 md:py-2">
              <div className="group flex min-w-0 flex-1 items-center gap-2">
                <Search className="size-6 shrink-0 text-white" />
                <input
                  type="text"
                  placeholder="Job title, skill or company"
                  className="w-full min-w-0 bg-transparent py-0.5 font-sans text-base leading-[1.7] text-white outline-none placeholder:text-white"
                />
              </div>
              {/* Divider — Figma: Line 1 */}
              <span className="hidden h-6 w-px shrink-0 bg-white/20 md:block" />
              <div className="group flex min-w-0 flex-1 items-center gap-2 border-t border-white/10 pt-3 md:border-0 md:pt-0">
                <MapPin className="size-6 shrink-0 text-white" />
                <input
                  type="text"
                  placeholder="Location or Remote"
                  className="w-full min-w-0 bg-transparent py-0.5 font-sans text-base leading-[1.7] text-white outline-none placeholder:text-white"
                />
              </div>
              {/* Search button — Figma: 48x48, #5c53fe */}
              <button
                type="button"
                aria-label="Search"
                className="flex size-12 shrink-0 items-center justify-center self-end rounded-xl bg-[#5c53fe] transition-colors hover:bg-[#4b43e8] md:self-auto"
              >
                <Search className="size-6 text-white" />
              </button>
            </div>

            {/* Trending chips — small pills under the search bar */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
              <span className="font-manrope text-[13px] leading-[1.3] text-white/90">
                Trending Position
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {trendingChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 bg-[#1a1a1b] px-3 py-1 font-manrope text-[13px] leading-normal text-white"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats — Figma: Frame 2147234448, y=955, 1440x550: pt-72, gap-48, pb-72 */}
      <div className="relative z-10 mt-35px-4 pt-12 pb-8 sm:mt-50 sm:px-8 lg:mt-71.5 lg:px-15 lg:pb-18">
        <p className="mx-auto max-w-150 text-center font-instrument text-[26px] leading-[1.3] font-medium tracking-[-1px] text-white/70 sm:text-[32px] lg:text-[40px]">
          Assisting over 15,000 job seekers find their dream positions.
        </p>
        {/* Cards — Figma: Container 1320x254, gap 24, cards 312x254 p-24 r-16 */}
        <div className="mx-auto mt-6 grid max-w-330 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex min-h-42.5 flex-col justify-between gap-10 rounded-2xl border border-white/10 bg-linear-to-b from-[#313131] to-[#010102] p-4 sm:p-6 lg:h-63.5"
            >
              <stat.icon className="size-6 text-white" />
              <div>
                <div className="font-jakarta text-[32px] leading-[1.15] font-semibold tracking-[-2px] text-white lg:text-[56px]">
                  {stat.value}
                </div>
                <div className="mt-2 font-inter-tight text-[15px] leading-[1.65] text-white lg:mt-4 lg:text-[18px]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
