export default function Footer() {
  return (
    <footer className="border-t p-6">
      <p className="text-center container max-w-[1366px] min-w-[414px] mx-auto font-montserrat text-muted text-base leading-5">
        {new Date().getFullYear()} © Todos os direitos reservados a{' '}
        <span className="font-semibold">Cubos Movies</span>
      </p>
    </footer>
  )
}
