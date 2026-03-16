import { Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import HabitsCreateModal from "@/layouts/dashboard/habits/HabitsCreateModal";
import HabitsTable from "@/layouts/dashboard/habits/HabitsTable";
import habits from "@/routes/habits";
import type { BreadcrumbItem } from "@/types";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habits',
        href: habits.index(),
    },
];
interface HabitPageProps {
    habits: { id: number; name: string }[];
}
function Habit({ habits }: HabitPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Habits" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="ms-auto">
                    <HabitsCreateModal />
                </div>
                <HabitsTable habits={habits} />
            </div>
        </AppLayout>
    )
}

export default Habit
