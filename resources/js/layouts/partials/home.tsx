import { Link } from '@inertiajs/react'
import React from 'react'
import { login, register } from '@/routes';

function Home({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <h1 className='text-[#1b1b18] dark:text-[#EDEDEC] mb-3 text-4xl'>Welcome to,  HabitStreak.</h1>
                <p className='text-[#1b1b18] dark:text-[#EDEDEC] mb-3'>Streak your habits. Solidify your habits.</p>
                <header className="mb-6 w-full text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-center gap-4">

                        <Link
                            href={login()}
                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                        >
                            Log in
                        </Link>
                        {canRegister && (
                            <Link
                                href={register()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Register
                            </Link>
                        )}
                    </nav>
                </header>
            </div>
        </>
    )
}

export default Home
