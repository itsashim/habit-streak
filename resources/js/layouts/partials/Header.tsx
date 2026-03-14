import { Link, usePage } from '@inertiajs/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { dashboard } from '@/routes';

function Header() {
    const { auth } = usePage().props;

    return (
        <>
            <Link
                href={dashboard()}
                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
            >
                Dashboard
            </Link >
            <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-2'>
                    <UserInfo user={auth.user} />
                    <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                >
                    <UserMenuContent user={auth.user} />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default Header
