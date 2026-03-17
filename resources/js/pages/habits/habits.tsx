import { Head, router } from "@inertiajs/react"
import { useEffect, useState } from "react";
import PaginationWrapper from "@/components/app-pagination";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout"
import HabitsCreateModal from "@/layouts/dashboard/habits/HabitsCreateModal";
import HabitsTable from "@/layouts/dashboard/habits/HabitsTable";
import type { Habit, PaginatedData } from "@/layouts/dashboard/habits/types";
import habits from "@/routes/habits";
import type { BreadcrumbItem } from "@/types";

interface HabitPageProps {
    habits: PaginatedData<Habit>,
    filters: { search: string };

}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Habits',
        href: habits.index(),
    },
];

function Habit({ habits, filters }: HabitPageProps) {
    const [search, setSearch] = useState(filters.search || "");

    console.log(filters, "filters");

    // 🔥 Debounce logic
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                habits.path,
                { search },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 400); // 400ms debounce

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Habits" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search habits..."
                        className="w-64"
                    />
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
