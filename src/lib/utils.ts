import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number | null | undefined): string {
  if (!value) return '$0'

  const absValue = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  // Bilhões
  if (absValue >= 1_000_000_000) {
    const billions = absValue / 1_000_000_000
    return billions % 1 === 0
      ? `${sign}$${Math.round(billions)}B`
      : `${sign}$${billions.toFixed(2)}B`
  }

  // Milhões
  if (absValue >= 1_000_000) {
    const millions = absValue / 1_000_000
    return millions % 1 === 0
      ? `${sign}$${Math.round(millions)}M`
      : `${sign}$${millions.toFixed(2)}M`
  }

  // Milhares
  if (absValue >= 1_000) {
    const thousands = absValue / 1_000
    return thousands % 1 === 0
      ? `${sign}$${Math.round(thousands)}K`
      : `${sign}$${thousands.toFixed(2)}K`
  }

  return `${sign}$${absValue.toFixed(2)}`
}
