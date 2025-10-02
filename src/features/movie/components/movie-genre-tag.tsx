interface MovieGenreTagProps {
  label: string
}

export function MovieGenreTag({ label }: MovieGenreTagProps) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-secondary rounded-sm uppercase w-fit h-fit">
      <span className="font-montserrat text-xs font-bold text-white">
        {label}
      </span>
    </div>
  )
}
