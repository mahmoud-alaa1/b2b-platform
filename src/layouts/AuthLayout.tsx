import Image from "next/image";
import LOGO from '../../public/Logo.png'
import Shape1 from '../../public/auth-shape-1.png'
import Shape2 from '../../public/auth-shape-2.png'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen overflow-hidden relative flex flex-col bg-[#F3F4F6]">
            <header className="p-2 shadow ">
                <Image src={LOGO} alt="منصة B2B" sizes="(max-width: 768px) 100vw, 50vw" className="size-10" placeholder="blur" />
            </header>
            <main className="flex-1 flex  justify-center w-full sm:pt-6 pt-4">
                {children}
            </main>
            <Image placeholder="blur" src={Shape1} className="absolute  -bottom-0 size-[clamp(150px,30vw,300px)] -left-5 " alt="شكل 1 للديكور" />
            <Image placeholder="blur" src={Shape2} className="absolute  -bottom-10 -right-5 size-[clamp(150px,30vw,300px)] -left-5 " alt="شكل 1 للديكور" />
        </div>
    )
}
