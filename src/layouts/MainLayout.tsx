import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <header className='p-3 bg-gray-900 text-white shadow-md flex justify-between items-center'>
                <Logo />
                <nav>
                    <ul className='flex gap-4'>
                        <li><Link href="/">الرئيسي</Link></li>
                        <li><Link href="/about">حول</Link></li>
                        <li><Link href="/contact">اتصل بنا</Link></li>
                    </ul>
                </nav>

                <div className='flex gap-2'>
                    <Button>
                        <Link href="/login" className="text-white">
                            تسجيل الدخول
                        </Link>
                    </Button>
                    <Button>
                        <Link href="/register" className="text-white">
                            تسجيل حساب جديد
                        </Link>
                    </Button>
                </div>
            </header>

            {children}
        </>
    )
}
