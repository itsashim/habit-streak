import { Link } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { show } from "@/routes/habit";
import type { Habit, PaginatedData } from "../dashboard/habits/types";
import Header from "./Header";

function HomeAuth({ habits }: { habits: PaginatedData<Habit> }) {
    // Initialize local state from props safely during render
    const [checkedState, setCheckedState] = useState<Record<number, boolean>>(
        () => {
            const initialState: Record<number, boolean> = {};
            habits.data.forEach((habit) => {
                initialState[habit.id] = !!habit.tracked_today;
            });

            return initialState;
        }
    );

    function handleChecked(habitId: number, checked: boolean) {
        // Optimistic UI update
        setCheckedState((prev) => ({ ...prev, [habitId]: checked }));

        if (checked) {
            axios.post("/track", { habit_id: habitId })
                .then(() => toast.success("Habit tracked! ✅"))
                .catch(() => {
                    toast.error("Failed to track habit ❌");
                    // rollback
                    setCheckedState((prev) => ({ ...prev, [habitId]: false }));
                });
        } else {
            axios.delete(`/track/${habitId}`)
                .then(() => toast.success("Habit untracked!"))
                .catch(() => {
                    toast.error("Failed to untrack habit ❌");
                    // rollback
                    setCheckedState((prev) => ({ ...prev, [habitId]: true }));
                });
        }
    }

    return (
        <>
            <Header />
            <ul className="grid grid-cols-3 mt-4 gap-3">
                {habits.data.map((habit, index) => (
                    <li key={habit.id} className="py-5 flex items-center gap-3">
                        <Link href={show(habit.id)}>
                            {index + 1}. {habit.name}
                        </Link>
                        <input
                            type="checkbox"
                            checked={checkedState[habit.id] || false}
                            onChange={(e) => handleChecked(habit.id, e.target.checked)}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default HomeAuth;
