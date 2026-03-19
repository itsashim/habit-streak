import { usePage } from '@inertiajs/react';
import ThemeToggle from '@/components/theme-toggle';
import Home from '@/layouts/partials/home';
import HomeAuth from '@/layouts/partials/home-auth';


export type PaginatedData<T> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    prev_page_url: string | null;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
};

export type Habit = {
    id: number;
    name: string;
};


export default function Welcome({
    canRegister = true,
    habits
}: {
    canRegister?: boolean;
    habits: PaginatedData<Habit>;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <main className='container'>
                {auth.user ?
                    (<HomeAuth habits={habits} />) : (<Home canRegister={canRegister} />)
                }
            </main>
            <ThemeToggle />
        </>
    );
}
