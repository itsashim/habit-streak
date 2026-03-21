import { router, usePage } from '@inertiajs/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import AppBrand from '@/components/app-brand';
import { Input } from '@/components/ui/input';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';

function Header() {
    const { auth, filters = {} } = usePage().props as any;
    const [search, setSearch] = useState(filters?.search || "");

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (search !== (filters?.search || "")) {
                router.get(
                    '/',
                    { search },
                    {
                        preserveState: true,
                        replace: true,
                    }
                );
            }
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <header className='py-3'>
            <div className="flex items-center justify-between">
                <AppBrand />
                <div className='flex items-center gap-3'>
                    <Input 
                        type='text' 
                        className='max-w-70' 
                        placeholder='Search here...' 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className='min-w-max'>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='flex items-center gap-2'>
                                <UserInfo user={auth.user} />
                                <ChevronDown />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
