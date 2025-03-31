'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header({username}: {username: string | null}){
    // caso o usuario nao esteja logado o username é null
    const pathname = usePathname()

    return(
        <header className='w-screen h-14 flex flex-row justify-center items-center bg-[#2c3b4d]'>
            {pathname === "/" ? (<>
                {username ? (<a href={`/perfil/${username}`}>Ver perfil</a>):(<a href='/login'>Entrar como artista</a>)}
            </>)
            :(
                <Link href='/' aria-label="Ir para página inicial">Página inicial</Link>
            )}
        </header>
    )
}