'use client'
import * as S from '@/styles/Styles'
import { IconContext } from 'react-icons';
import { MdPersonSearch } from "react-icons/md";
import { BiSolidUserPin } from "react-icons/bi";
import Image from 'next/image'

interface inicioProps {
    buscar: () => void;
    cadastrarOuVerPerfil: () => void;
    isLogged: boolean;
}
export default function Inicio(props: inicioProps){
    const logoImageStyle = {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
    return(
        <div className='w-full flex flex-col items-center p-4'>
            <S.ContainerHolder className='w-[97%]'>
                <div className='container p-4'>
                    <span className='flex flex-row items-center justify-around gap-4 relative'>
                        <span className='relative w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem]'>
                            <Image
                                src='/logo.webp'
                                fill={true}
                                className='logo'
                                sizes="(max-width: 768px)"
                                alt='Logo do website Cultura Perto'
                                style={logoImageStyle}
                            />
                        </span>
                        <span className='w-min min-w-[50%]'>
                            <S.H1 className='mt-3 text-center border-b border-[#ffb162]'>Cultura Perto</S.H1>
                            <p className='text-center mt-1 whitespace-normal break-words text-[1.25rem]'>Conectando artistas locais com a comunidade</p>
                        </span>
                    </span>
                        <span className='flex flex-col items-center justify-center gap-2 mt-4'>
                            <S.Button_Principal className='flex flex-wrap gap-x-2 items-center justify-center' onClick={()=> props.buscar()}>
                                <p>Encontrar<br></br> artistas</p>
                                <IconContext.Provider value={{size: '2rem'}}>
                                    <MdPersonSearch />
                                </IconContext.Provider>
                            </S.Button_Principal>
                            <S.Button_Principal className='flex flex-wrap gap-x-2 items-center justify-center' onClick={()=> props.cadastrarOuVerPerfil()}>
                                <p>{props.isLogged ? 'Acessar Perfil Artístico' : 'Entrar como artista'}</p>
                                <IconContext.Provider value={{size: '2rem'}}>
                                    <BiSolidUserPin />
                                </IconContext.Provider>
                            </S.Button_Principal>
                        </span>
                </div>
            </S.ContainerHolder>
        </div>
    )
}