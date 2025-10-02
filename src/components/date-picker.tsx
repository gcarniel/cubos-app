'use client'

import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  className?: string
  value?: Date
  onChange?: (value: Date) => void
  disabled?: (date: Date) => boolean
}

export function DatePicker({
  className,
  value,
  onChange,
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className={cn('w-48 justify-between font-normal', className)}
        >
          {date ? date.toLocaleDateString('pt-BR') : 'Selecione uma data'}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          disabled={disabled}
          onSelect={(date) => {
            setDate(date)
            if (date && onChange) {
              onChange(date)
            }
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
