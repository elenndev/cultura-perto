'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header({username}: {username: string | null}){
    const pathname = usePathname()

    return(
        <header className='w-screen h-fit py-[10px] flex flex-row justify-center items-center bg-[#2c3b4d]'>
            {pathname === "/" ? (<>
                {username ? (<a href={`/perfil/${username}`} className='cursor-pointer'>Ver perfil</a>):(<a href='/login'className='cursor-pointer'>Entrar como artista</a>)}
            </>)
            :(
                <Link href='/' aria-label="Ir para página inicial" className='cursor-pointer'>Página inicial</Link>
            )}
        </header>
    )
}