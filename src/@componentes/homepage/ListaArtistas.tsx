import { TypePerfilArtistico } from "@/types";
import Link from "next/link";

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
                    <div className="flex flex-col border-2 border-black">
                        <p>{artista.nome}</p>
                        <span className="flex flex-row">
                            <p>{artista.localidade.cidade}</p>
                            <p>{artista.area}</p>
                        </span>
                    </div>
                </Link>
            ))}
            </span>
        </div>
    )
}