export default function Footer() {
  return (
    <footer className="border-t p-8  ">
      <p className="text-center container max-w-[1366px] min-w-[414px] mx-auto font-montserrat text-muted">
        {new Date().getFullYear()} © Todos os direitos reservados a{' '}
        <span className="font-bold">Cubos Movies</span>
      </p>
    </footer>
  )
}
