import { usePage } from '@inertiajs/react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import AppBrand from '@/components/app-brand';
import { Input } from '@/components/ui/input';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';

function Header() {
    const { auth } = usePage().props;

    return (
        <header className='container py-3'>
            <div className="flex items-center justify-between">
                <AppBrand />
                <div className='flex items-center gap-3'>
                    <Input type='text' className='max-w-70' placeholder='Search here...' />
                    <div className='min-w-max'>
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
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
