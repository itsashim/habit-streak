import { Head } from "@inertiajs/react"

import AppLayout from "@/layouts/app-layout"
import HabitsTable from "@/layouts/dashboard/habits/HabitsTable";
import habits from "@/routes/habits";
import type { BreadcrumbItem } from "@/types";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habits',
        href: habits.index(),
    },
];
function Habit() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Habits" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HabitsTable />
            </div>
        </AppLayout>
    )
}

export default Habit
