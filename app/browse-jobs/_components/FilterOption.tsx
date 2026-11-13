"use client"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

type FilterOptionProps = {
  /** Form field name, e.g. "jobType" */
  name: string
  /** Value submitted for this option. Defaults to the label. */
  value?: string
  label: string
  /** Optional number shown on the right, e.g. matching job count. */
  count?: number
  /**
   * Controlled checked state. When provided, the option is fully controlled
   * (used by single-select groups); otherwise it behaves as a plain checkbox.
   */
  checked?: boolean
  /** Toggle handler for controlled usage. */
  onToggle?: () => void
  className?: string
}

export function FilterOption({
  name,
  value,
  label,
  count,
  checked,
  onToggle,
  className,
}: FilterOptionProps) {
  const router = useRouter();
  const isControlled = checked !== undefined;
  const onChangeFilters = (e: React.ChangeEvent<HTMLInputElement>)=>{
    console.log(name,e.target.value);

    const params = new URLSearchParams(window.location.search);
    params.set(name, e.target.value);
    router.push(`browse-jobs?${params.toString()}`);


  }

  return (
    <label
      className={cn(
        "flex min-w-0 cursor-pointer items-center gap-2.5 rounded-md py-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
        className
      )}
    >
      <input
        type="checkbox"
        name={name}
        value={value ?? label}
        {...(isControlled ? { checked, onChange: onToggle } : {})}
        className="peer sr-only"
        onChange={onChangeFilters}
      />
      {/* Custom option box, styled via the peer input */}
      <span
        aria-hidden
        className="flex size-4 shrink-0 items-center justify-center rounded border border-input bg-transparent transition-colors peer-checked:border-violet-500 peer-checked:bg-violet-500 peer-checked:[&>svg]:opacity-100"
      >
        <Check className="size-3 text-white opacity-0 transition-opacity" />
      </span>

      <span className="flex-1 truncate">{label}</span>

      {count !== undefined && (
        <span className="text-xs text-muted-foreground/80">
          {count.toLocaleString("en-US")}
        </span>
      )}
    </label>
  )
}
