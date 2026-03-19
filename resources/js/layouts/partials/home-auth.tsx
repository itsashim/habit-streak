import { Link } from "@inertiajs/react";
import { show } from "@/routes/habit";
import type { Habit, PaginatedData } from "../dashboard/habits/types"
import Header from "./Header"

function HomeAuth({ habits }: { habits: PaginatedData<Habit> }) {
    console.log(habits);

    return (
        <>
            <Header />
            <ul className="grid grid-cols-3 mt-4">
                {habits.data.map((habit, index) => {
                    return <li className="py-5">
                        <Link href={show(habit.id)}>{index + 1}. {habit.name}</Link>
                    </li>
                })}
            </ul>

        </>
    )
}

export default HomeAuth
