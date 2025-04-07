import { TypeEvento } from "@/types";
import { nanoid } from "nanoid";
import  * as S from '@/styles/Styles'
import { IoClose } from "react-icons/io5";
import { IconContext } from 'react-icons';
import { FaMapLocationDot } from "react-icons/fa6";

interface janelaEventoProps {
    evento: TypeEvento;
    fecharJanela: () => void; 
}
export default function JanelaEvento(props: janelaEventoProps){
    const {evento} = props
    return(
        <S.ModalHolder>
            <S.ModalContainer className='w-[80vw] justify-center'>
                <S.ModalHeader className='relative flex-wrap'>
                    Evento: {evento.nome}
                    <S.Button_Danger className='absolute right-1.5' arial-label='Fechar janela do evento' type="button" onClick={()=> props.fecharJanela()}>
                        <IconContext.Provider value={{size: "1.5rem", color: 'white'}}>
                            <IoClose />
                        </IconContext.Provider>
                    </S.Button_Danger>
                    </S.ModalHeader>
                <S.ModalContent className='flex flex-col items-center w-[90%]'>
                    <span className= 'flex flex-col py-2 items-center gap-y-1'>
                        <p className='border border-[#ffb162] rounded p-1'>Data: {new Date(evento.data).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                        <p>{evento.detalhes}</p>
                        {evento.linksEvento && evento.linksEvento.length > 0 && (<>
                            <h3 className="bold">Links do evento</h3>
                            <ul>
                                {evento.linksEvento.map(link =><li key={nanoid()}>
                                    <S.Button_Secundario as='a' href={link.link}>{link.nome}</S.Button_Secundario>
                                </li>)}
                            </ul>
                        </>)}
                        <S.Button_Principal as='a' href={evento.localidade.link}
                        className='flex flex-row gap-1 items-center justify-center'>
                            <p>Localização</p>
                            <IconContext.Provider value={{size: "1.5rem"}}>
                                <FaMapLocationDot />
                            </IconContext.Provider>
                        </S.Button_Principal>
                    </span>
                </S.ModalContent>
            </S.ModalContainer>
        </S.ModalHolder>
    )
}