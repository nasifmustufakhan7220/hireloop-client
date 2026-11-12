"use client"
import { useState } from "react"

import { FilterGroup } from "./FilterGroup"
import { FilterOption } from "./FilterOption"

export type FilterChoice = {
  value: string
  label: string
  count?: number
}

type FilterSingleSelectGroupProps = {
  title: string
  /** Form field name shared by all options in the group. */
  name: string
  options: readonly FilterChoice[]
}

/**
 * A filter group where only one option can be selected at a time.
 * Clicking the selected option again clears the selection.
 * (Selection stays local — no URL/query change; wire up filtering
 * by lifting the state out when you implement it.)
 */
export function FilterSingleSelectGroup({
  title,
  name,
  options,
}: FilterSingleSelectGroupProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <FilterGroup title={title}>
      {options.map((option) => {
        const isChecked = selected === option.value
        return (
          <FilterOption
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            count={option.count}
            checked={isChecked}
            onToggle={() => setSelected(isChecked ? null : option.value)}
          />
        )
      })}
    </FilterGroup>
  )
}
