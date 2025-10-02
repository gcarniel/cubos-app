import { cn } from '@/lib/utils'

interface MovieLabelProps {
  label: string
  value: string | number
  className?: string
}

export function MovieLabel({ label, value, className }: MovieLabelProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-4 bg-[#232225BF] rounded-sm uppercase w-full h-fit',
        className,
      )}
    >
      <span className="font-montserrat text-xs font-bold text-[#B5B2BC]">
        {label}
      </span>
      <span className="font-montserrat text-xs font-bold text-white">
        {value}
      </span>
    </div>
  )
}
