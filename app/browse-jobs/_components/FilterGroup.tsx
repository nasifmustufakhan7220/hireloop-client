import type { ReactNode } from "react"

type FilterGroupProps = {
  title: string
  children: ReactNode
}

export function FilterGroup({ title, children }: FilterGroupProps) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <div className="flex flex-col gap-0.5">{children}</div>
    </section>
  )
}
