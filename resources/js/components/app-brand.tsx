import { Link } from "@inertiajs/react"
import { home } from "@/routes"

function AppBrand() {
  return (
    <Link href={home()} className="text-3xl">HabitTracker</Link>
  )
}

export default AppBrand
