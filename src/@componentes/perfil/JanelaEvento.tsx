import { TypeEvento } from "@/types";
import { nanoid } from "nanoid";

interface janelaEventoProps {
    evento: TypeEvento;
    fecharJanela: () => void; 
}
export default function JanelaEvento(props: janelaEventoProps){
    const {evento} = props
    const linkLocalizacaoEvento = evento.linksEvento.find(link => link.nome == 'localizacao')
    let outrosLinks: {nome:string, link: string}[] | null = evento.linksEvento.filter(link => link.nome != 'localizacao')
    outrosLinks = outrosLinks.length == 0 ? null : outrosLinks
    return(
        <span className="janelaHolder flex flex-col bg-gray-600 absolute h-full w-full items-center justify-center">
            <div className="janelaEvento bg-white flex flex-col w-[300px] items-center justify-center">
                <div className="janelaEvento-header bg-gray-800 text-white w-full">
                    {evento.nome}
                    <button type="button" onClick={()=> props.fecharJanela()}>Fechar</button>
                    </div>
                <div className="janelaEvento-body">
                    <p>{evento.datas[0].toLocaleDateString()}</p>
                    <p>{evento.detalhes}</p>
                    {outrosLinks && (<>
                        <p>links do evento</p>
                        <ul>
                            {outrosLinks.map(link =><li key={nanoid()}>
                                <a href={link.link}>{link.nome}</a>
                            </li>)}
                        </ul>
                    </>)}
                    {linkLocalizacaoEvento && (
                        <a href={linkLocalizacaoEvento.link}
                        className='bg-purple-700 text-white'>Localização</a>
                    )}
                </div>
            </div>
        </span>
    )
}