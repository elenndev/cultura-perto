import { TypePerfilArtistico } from "@/types";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import { IconContext } from "react-icons";

interface listaArtistasProps{
    artistas: TypePerfilArtistico[];
}
export default function ListaArtistas(props: listaArtistasProps){
    return (
        <div className="flex flex-col">
            <h1>Resultados</h1>
            <p>Clique em um dos artistas para ser direcionado ao perfil artistico</p>
            <span className="flex flex-col gap-20">
                {props.artistas.map(artista =>(
                <Link key={artista.username} href={`/perfil/${artista.username}`}>
                    <div className="flex flex-row bg-[#eee9df] border-2 border-[#ffb162]">
                        <IconContext.Provider value={{className:'z-20', size: "10rem"}}>
                            <MdAccountCircle />
                        </IconContext.Provider>
                        <span className="grid grid-rows-2 grid-cols-2">
                            <p className='text-4xl col-span-2'>{artista.nome}</p>
                            <p className='bg-[#ffb162] rounded-3xl p-3'>{artista.localidade.cidade}</p>
                            <p className='bg-[#ffb162] rounded-3xl p-3'>{artista.area}</p>
                        </span>
                    </div>
                </Link>
            ))}
            </span>
        </div>
    )
}