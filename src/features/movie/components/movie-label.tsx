interface MovieLabelProps {
  label: string
  value: string | number
}

export function MovieLabel({ label, value }: MovieLabelProps) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-[#232225BF] rounded-sm uppercase w-full h-fit">
      <span className="font-montserrat text-xs font-bold text-[#B5B2BC]">
        {label}
      </span>
      <span className="font-montserrat text-xs font-bold text-white">
        {value}
      </span>
    </div>
  )
}
