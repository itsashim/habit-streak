import { Head, Link } from "@inertiajs/react"
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
                <Link href={habits.create()}>
                    <Button type="button" className="ms-auto max-w-35"><Plus /> Create Habit</Button>
                </Link>
                <HabitsTable />
            </div>
        </AppLayout>
    )
}

export default Habit
