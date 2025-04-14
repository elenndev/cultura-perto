import { TypePerfilArtistico } from "@/types";
import Link from "next/link";
import { H1 } from "@/styles/Styles";
import { MdAccountCircle } from "react-icons/md";
import { IconContext } from "react-icons";
import { FaTheaterMasks } from "react-icons/fa";
import { GiMusicalNotes } from "react-icons/gi";
import { IoIosColorPalette } from "react-icons/io";
import { CardPerfil, DegradeCardPerfil } from "@/styles/StyledPerfil";

interface listaArtistasProps{
    artistas: TypePerfilArtistico[];
}
export default function ListaArtistas(props: listaArtistasProps){
    return (
        <div className="flex flex-col max-w-[97vw] items-center">
            <H1>Resultados</H1>
            <p className='bg-[#00000069] w-fit px-3 rounded-3xl'>Clique em um dos artistas para ser direcionado ao perfil artistico</p>
            <span className=" w-fit flex flex-col mt-4 gap-5">
                {props.artistas.map(artista =>(
                <Link key={artista.username} href={`/perfil/${artista.username}`}>
                    <CardPerfil className="flex relative flex-row items-center hover:shadow-xl bg-[#2c3b4d] rounded-3xl border-2 border-[#ffb162] gap-x-3 p-3">
                        <DegradeCardPerfil className='cardPerfilDegrade absolute left-0 w-[35%] h-full z-10'/>
                            <span className='rounded-[50%] relative w-[5rem] md:w-[8rem] h-[5rem] md:h-[8rem] shadow-xl z-20 bg-[#2c3b4d]'>
                                <IconContext.Provider value={{className: "w-[100%] h-[100%]"}}>
                                    <MdAccountCircle />
                                </IconContext.Provider>
                            </span>
                        <span className="z-20 flex flex-col justify-center">
                            <p className='text-[1.25rem] col-span-2'>{artista.nome}</p>
                            <span className="flex flex-wrap gap-2">
                                <p className='bg-[#ffb162] rounded-3xl w-fit py-1 px-2 flex flex-wrap justify-center items-center'>{artista.localidade.cidade} - {artista.localidade.estado}</p>
                                <span className='bg-[#ffb162] rounded-3xl py-1 px-2 flex flex-row items-center'>
                                    <p>{artista.area}</p>
                                    <IconContext.Provider value={{size: "2rem", color: "#a35139"}}>
                                        {artista.area == 'artesanato/artes visuais' && (<IoIosColorPalette />)}
                                        {artista.area == 'cenica' && (<FaTheaterMasks />)}
                                        {artista.area == 'musica' && (<GiMusicalNotes />)}
                                    </IconContext.Provider>
                                </span>
                            </span>
                        </span>
                    </CardPerfil>
                </Link>
                ))}
            </span>
        </div>
    )
}