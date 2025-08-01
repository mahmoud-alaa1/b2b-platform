
import MainHeader from '@/components/main-header/MainHeader';

export default function MainLayout({ children }: { children: React.ReactNode }) {


    return (
        <>
            <MainHeader />


            <main className="min-h-screen">
                {children}
            </main>
        </>
    )
}
