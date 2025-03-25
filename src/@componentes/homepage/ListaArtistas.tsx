import { TypePerfilArtistico } from "@/types";

interface listaArtistasProps{
    artistas: TypePerfilArtistico[];
}
export default function ListaArtistas(props: listaArtistasProps){
    return (
        <div className="flex flex-col">
            <h1>Resultados</h1>
            <span className="flex flex-col gap-20">
                {props.artistas.map(artista =>(<div key={artista.username} className="flex flex-col border-2 border-black">
                    <p>{artista.nome}</p>
                    <span className="flex flex-row">
                        <p>{artista.localidade.cidade}</p>
                        <p>{artista.area}</p>
                    </span>
                </div>))}
            </span>
        </div>
    )
}