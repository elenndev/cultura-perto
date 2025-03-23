import { TypeEvento } from "@/types";
import { nanoid } from "nanoid";

interface janelaEventoProps {
    evento: TypeEvento;
    fecharJanela: () => void; 
}
export default function JanelaEvento(props: janelaEventoProps){
    const {evento} = props
    return(
        <span className="janelaHolder flex flex-col bg-gray-600 absolute h-full w-full items-center justify-center">
            <div className="janelaEvento bg-white flex flex-col w-[300px] items-center justify-center">
                <div className="janelaEvento-header bg-gray-800 text-white w-full">
                    {evento.nome}
                    <button type="button" onClick={()=> props.fecharJanela()}>Fechar</button>
                    </div>
                <div className="janelaEvento-body">
                    <p>{new Date(evento.data).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                    <p>{evento.detalhes}</p>
                    {evento.linksEvento && (<>
                        <p>links do evento</p>
                        <ul>
                            {evento.linksEvento.map(link =><li key={nanoid()}>
                                <a href={link.link}>{link.nome}</a>
                            </li>)}
                        </ul>
                    </>)}
                    <a href={evento.localidade.link}
                    className='bg-purple-700 text-white'>Localização</a>
                </div>
            </div>
        </span>
    )
}