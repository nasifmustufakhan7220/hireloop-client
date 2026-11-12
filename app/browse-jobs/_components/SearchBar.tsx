"use client"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function SearchBar({ className }: { className?: string }) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: build the query from the form and apply the search
  }

  return (
    <form
      onSubmit={handleSearch}
      className={cn("flex items-center gap-3", className)}
    >
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          name="q"
          type="search"
          placeholder="Search by job title, company, or location..."
          className="h-10 pl-9 sm:h-12"
        />
      </div>

      <Button
        type="submit"
        className="h-10 shrink-0 bg-white px-5 text-[#2F3131] hover:bg-white/90 sm:h-12"
      >
        Search Jobs
      </Button>
    </form>
  )
}
