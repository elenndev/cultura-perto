'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button, Button_Principal, Menu as StyledMenu} from "@/styles/Styles";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { IconContext } from 'react-icons';


export default function Header({username}: {username: string | null}){
    const pathname = usePathname()
    const [menu, setMenu]= useState(false)    
    const Menu = () =>{
        return(
            <StyledMenu className='flex flex-col p-3 gap-3 md:flex-row justify-center items-center shadow-xl bg-[rgb(44,59,77)] md:shadow-none md:bg-transparent'>
                {pathname === "/" ? (<>
                    {username ? 
                        (<Button_Principal as='a' href={`/perfil/${username}`} className='cursor-pointer'>Ver perfil</Button_Principal>)
                        :
                        (<a href='/login'className='link cursor-pointer'>Entrar como artista</a>)}
                </>)
                :(
                    <Link href='/' aria-label="Ir para página inicial" className='link cursor-pointer'>Página inicial</Link>
                )}
                <Link href='/enviar-mensagem' aria-label='Ir para página "Enviar mensagem"' className='link cursor-pointer'>Enviar Sugestão/Reportar Erro</Link>
            </StyledMenu>
        )
    }
    return(
        <header className='relative w-screen h-[3rem] py-[10px] flex flex-row justify-end md:justify-center items-center bg-[#2c3b4d]'>
            <Button className='absolute right-10 flex flex-row items-center bg-[#ffb162] md:hidden' onClick={()=> setMenu(!menu)}>
                <IconContext.Provider value={{size: "2rem", color: '#a35139'}}>
                    {menu ? (<IoClose />) : (<TiThMenu />)}
                </IconContext.Provider>
            </Button>
            {menu && (
                <div className='absolute top-[3rem] right-0 z-20'>
                    <Menu/>
                </div>
            )}
            <span className='hidden md:flex'><Menu/></span>
        </header>
    )
}