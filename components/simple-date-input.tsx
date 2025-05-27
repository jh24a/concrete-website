"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SimpleDateInputProps {
  id?: string
  name?: string
  value?: string
  onChange?: (value: string) => void
  label?: string
  min?: string
  max?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export function SimpleDateInput({
  id,
  name,
  value,
  onChange,
  label,
  min,
  max,
  required = false,
  disabled = false,
  className,
}: SimpleDateInputProps) {
  return (
    <div className={className}>
      {label && (
        <Label htmlFor={id} className="text-base font-medium">
          {label} {required && "*"}
        </Label>
      )}
      <Input
        id={id}
        name={name}
        type="date"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        min={min}
        max={max}
        required={required}
        disabled={disabled}
        className="mt-1"
      />
    </div>
  )
}
