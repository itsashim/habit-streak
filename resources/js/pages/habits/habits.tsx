import { Head } from "@inertiajs/react"
import PaginationWrapper from "@/components/app-pagination";
import AppLayout from "@/layouts/app-layout"
import HabitsCreateModal from "@/layouts/dashboard/habits/HabitsCreateModal";
import HabitsTable from "@/layouts/dashboard/habits/HabitsTable";
import type { Habit, PaginatedData } from "@/layouts/dashboard/habits/types";
import habits from "@/routes/habits";
import type { BreadcrumbItem } from "@/types";

interface HabitPageProps {
    habits: PaginatedData<Habit>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habits',
        href: habits.index(),
    },
];

function Habit({ habits }: HabitPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Habits" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="ms-auto">
                    <HabitsCreateModal />
                </div>
                <HabitsTable habits={habits} />
                {/* Pagination */}
                <PaginationWrapper links={habits.links} />
            </div>
        </AppLayout>
    )
}

export default Habit
