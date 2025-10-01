import { FieldErrors, FieldPath, FieldValues, get } from 'react-hook-form'

interface ShowErrorProps<T extends FieldValues> {
  errors: FieldErrors<T>
  name: FieldPath<T>
}

export function ShowError<T extends FieldValues>({
  errors,
  name,
}: ShowErrorProps<T>) {
  const fieldError = get(errors, name)

  if (!fieldError || typeof fieldError.message !== 'string') return null

  return <p className="text-xs text-destructive">{fieldError.message}</p>
}
