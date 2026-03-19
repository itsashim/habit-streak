import type { Habit, PaginatedData } from "../dashboard/habits/types"
import Header from "./Header"

function HomeAuth({ habits }: { habits: PaginatedData<Habit> }) {
    console.log(habits);

    return (
        <>
            <Header />
            <ul className="grid grid-cols-4 mt-4">
                {habits.data.map((habit,index) => {
                    return <li className="py-5">{index + 1}. {habit.name}</li>
                })}
            </ul>

        </>
    )
}

export default HomeAuth
