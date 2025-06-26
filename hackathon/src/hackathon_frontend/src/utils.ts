import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, fromUnixTime } from 'date-fns'
import { id } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DateFormat = (value?: string | number, withTime = false) => {
  let dateValue: Date

  if (typeof value === 'number') {
    // If the value is a number/UNIX time, assume it's a timestamp and convert it to a Date object
    dateValue = fromUnixTime(value)
  } else {
    // If the value is a string or undefined, create a Date object based on it
    dateValue = value ? new Date(value) : new Date()
  }

  if (isNaN(dateValue.getTime())) {
    // If the resulting date is invalid, you can handle the error accordingly
    console.error('Invalid date value:', value)
    return 'Invalid Date'
  }

  if (withTime) {
    return format(dateValue, 'PPPpppp OOOO', { locale: id })
  }

  return format(dateValue, 'PPP', { locale: id })
}

export const IDRFormat = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
    .format(value)
    .split(',')[0]
}
