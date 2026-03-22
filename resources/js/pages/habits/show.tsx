import { useMemo } from "react"
import Header from "@/layouts/partials/Header"

interface HabitDetailsProps {
    habit: any;
    trackedDates?: string[];
}

function HabitDetails({ habit, trackedDates = [] }: HabitDetailsProps) {
    const calendarDays = useMemo(() => {
        const days = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const dateString = `${year}-${month}-${day}`;

            days.push({
                dateString,
                date,
                isTracked: trackedDates.includes(dateString)
            });
        }

        return days;
    }, [trackedDates]);

    return (
        <div className="container">
            <Header />
            <main className="py-8">
                <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                    {habit.name}
                </h1>
                <strong className="text-xl flex items-end">Current Streak: x {trackedDates.length} days
                    <img className="w-12" src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjF6NXczdzRlNDl5aThibWloMm41NHR3MTQ2bWE4aXRqN2d1aTc4aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/1wPC7g6WN1HtqAiBq1/giphy.gif" alt="Streak Sticker" />
                </strong>

                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6 rounded-xl shadow-sm">
                    <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Tracking History (Last 365 Days)</h2>

                    <div className="overflow-x-auto pb-4">
                        <div className="grid grid-rows-7 grid-flow-col gap-[4px] w-max select-none">
                            {calendarDays.map((day) => (
                                <div
                                    key={day.dateString}
                                    title={`${day.dateString}${day.isTracked ? ' - Tracked' : ''}`}
                                    className={`
                                        w-[14px] h-[14px] rounded-sm cursor-pointer transition-colors duration-200
                                        ${day.isTracked
                                            ? 'bg-green-500 hover:bg-green-600'
                                            : 'bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700'}
                                    `}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-end mt-4 text-sm text-gray-500 dark:text-gray-400 space-x-2">
                        <span>Less</span>
                        <div className="flex gap-[4px]">
                            <div className="w-[14px] h-[14px] rounded-sm bg-gray-100 dark:bg-zinc-800"></div>
                            <div className="w-[14px] h-[14px] rounded-sm bg-green-200 dark:bg-green-900"></div>
                            <div className="w-[14px] h-[14px] rounded-sm bg-green-300 dark:bg-green-700"></div>
                            <div className="w-[14px] h-[14px] rounded-sm bg-green-400 dark:bg-green-600"></div>
                            <div className="w-[14px] h-[14px] rounded-sm bg-green-500"></div>
                        </div>
                        <span>More</span>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default HabitDetails
