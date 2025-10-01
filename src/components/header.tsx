import { ThemeToggle } from './theme-toggle'

import { Button } from './ui/button'
import { LogoSvg } from './logo'

export default function Header() {
  return (
    <header className="border-b">
      <div className="flex items-center justify-between h-18 p-4 container max-w-[1366px] min-w-[414px] mx-auto">
        <div className="flex items-center gap-4 flex-1">
          <LogoSvg className="text-black dark:text-white" />
          <span className="text-xl font-bold hidden md:block">Movies</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button>Logout</Button>
        </div>
      </div>
    </header>
  )
}
