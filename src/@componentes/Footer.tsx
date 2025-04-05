import Link from "next/link";
import { Button_Principal } from "@/styles/Styles";

export default function Footer({username}: {username: string | null}){
    const pathname = usePathname()
    return(
        <header className='w-screen h-fit py-[10px] flex flex-row justify-center items-center bg-[#2c3b4d]'>
            {pathname === "/" ? (<>
                {username ? (<Button_Principal as='a' href={`/perfil/${username}`} className='cursor-pointer'>Ver perfil</Button_Principal>):(<a href='/login'className='cursor-pointer'>Entrar como artista</a>)}
            </>)
            :(
                <Link href='/' aria-label="Ir para página inicial" className='cursor-pointer'>Página inicial</Link>
            )}
        </header>
    )
}