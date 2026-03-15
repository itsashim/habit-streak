import { usePage } from '@inertiajs/react';
import ThemeToggle from '@/components/theme-toggle';
import Home from '@/layouts/partials/home';
import HomeAuth from '@/layouts/partials/home-auth';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    return (
        <>
            {auth.user ?
                (<HomeAuth />) : (<Home canRegister={canRegister} />)
            }
            <ThemeToggle />
        </>
    );
}
