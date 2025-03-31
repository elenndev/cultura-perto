import { TypeEvento } from "@/types";
import { nanoid } from "nanoid";
import  * as S from '@/styles/Styles'

interface janelaEventoProps {
    evento: TypeEvento;
    fecharJanela: () => void; 
}
export default function JanelaEvento(props: janelaEventoProps){
    const {evento} = props
    return(
        <S.ModalHolder>
            <S.ModalContainer className='w-[80vw]'>
                <S.ModalHeader className='relative flex-wrap'>
                    Evento: {evento.nome}
                    <button className='absolute right-1.5' type="button" onClick={()=> props.fecharJanela()}>Fechar</button>
                    </S.ModalHeader>
                <S.ModalContent className='p-2'>
                    <p>{new Date(evento.data).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                    <p>{evento.detalhes}</p>
                    {evento.linksEvento && (<>
                        <h3 className="bold">Links do evento</h3>
                        <ul>
                            {evento.linksEvento.map(link =><li key={nanoid()}>
                                <S.Button_Secundario as='a' href={link.link}>{link.nome}</S.Button_Secundario>
                            </li>)}
                        </ul>
                    </>)}
                    <S.Button_Principal as='a' href={evento.localidade.link}
                    className='bg-purple-700 text-white'>Localização</S.Button_Principal>
                </S.ModalContent>
            </S.ModalContainer>
        </S.ModalHolder>
    )
}