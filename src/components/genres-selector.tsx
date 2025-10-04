import MultipleSelector from '@/components/ui/multiselect'

interface Option {
  id: string
  name: string
}

interface GenreSelectorProps {
  value: Option[]
  onChange: (value: Option[]) => void
  options: Option[]
}

export function GenreSelector({
  value,
  onChange,
  options,
}: GenreSelectorProps) {
  const opt = options
    ?.map((option) => ({
      value: option.id,
      label: option.name,
    }))
    .filter((option) => !value.some((value) => value.id === option.value))

  return (
    <div className="*:not-first:mt-2">
      <MultipleSelector
        commandProps={{
          label: 'Selecione os gêneros',
        }}
        value={value.map((value) => ({ value: value.id, label: value.name }))}
        defaultOptions={opt}
        placeholder="Selecione os gêneros"
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={
          <p className="text-center text-sm">Nenhum gênero encontrado</p>
        }
        onChange={(value) => {
          onChange(
            value.map((option) => ({ id: option.value, name: option.label })),
          )
        }}
      />
    </div>
  )
}
