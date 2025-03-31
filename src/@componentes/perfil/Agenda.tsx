'use client'
import { TypeEvento } from "@/types";
import { useState } from "react";
import { useAuthContext } from "../../context/ContextAuth";
import CriarEditarEvento from "./CriarEditarEvento";
import * as S from "@/styles/Styles"
import { PerfilAgenda as StyledPerfilAgenda}  from "@/styles/StyledPerfil";

interface agendaProps {
    eventos: TypeEvento[] | null;
    salvarEvento: (evento: TypeEvento, isNovoEvento: boolean)=> void;
    deletarEvento: (eventoId: string) => void;
    abrirJanelaDoEvento: (eventoId: string) => void;
}
export default function Agenda(props: agendaProps){
    const {eventos} = props
    
    const [editarEvento, setEditarEvento] = useState<null | TypeEvento>(null)
    const [criarEvento, setCriarEvento] = useState(false)
    const context = useAuthContext()
    const isLogged = context?.isLogged ?? false

    function handleSalvarEvento(evento: TypeEvento, isNovoEvento: boolean){
        setCriarEvento(false)
        setEditarEvento(null)
        props.salvarEvento(evento, isNovoEvento)
    }

    function cancelarCriacaoEdicaoEvento(){
        setCriarEvento(false)
        setEditarEvento(null)
    }


    return(
    <>
    <StyledPerfilAgenda className="agenda min-w-[90%] md:w-auto flex flex-col mt-[3rem] py-4 gap-y-2.5 items-center">
        <S.H2>Agenda</S.H2>
        {eventos ? (<>
            <table className='w-[95%]'>
                <thead>
                    <tr>
                        <S.TH>Evento</S.TH>
                        <S.TH>Data</S.TH>
                        <S.TH>Local</S.TH>
                        <S.TH>Ações</S.TH>
                    </tr>
                </thead>
                <S.TBody>
                    {eventos.map(evento => (
                        <S.TR key={evento._id}>
                            <S.TD>{evento.nome}</S.TD>
                            <S.TD>{new Date(evento.data).toLocaleDateString('pt-BR', {month: '2-digit', day: '2-digit' })}</S.TD>
                            <S.TD>{evento.localidade.nomeLocal}</S.TD>
                            <S.TD>
                                <span className="flex flex-col md:flex-wrap gap-y-2.5 gap-x-1 justify-center items-center">
                                    <S.Button_Principal type="button" onClick={()=> props.abrirJanelaDoEvento(evento._id)}>Ver evento</S.Button_Principal>
                                    {isLogged && (<>
                                        <S.Button_Secundario type="button"
                                        onClick={()=> setEditarEvento(evento)}>Editar</S.Button_Secundario>
                                        <S.Button_Danger type='button'
                                        onClick={()=> props.deletarEvento(evento._id)}>Deletar</S.Button_Danger>
                                        </>)}
                                </span>
                            </S.TD>
                        </S.TR>
                    ))}
                </S.TBody>
            </table>
            
        </>) : (<p>Nenhum evento no momento</p>)}
            {isLogged && (
                <S.Button_Principal type='button' onClick={()=> setCriarEvento(true)}>Adicionar novo evento</S.Button_Principal>)}
    </StyledPerfilAgenda>
    {isLogged && (criarEvento || editarEvento) && (
        <CriarEditarEvento 
        editarEvento={editarEvento} 
        salvarEvento={handleSalvarEvento}
        cancelar={cancelarCriacaoEdicaoEvento}/>)}
    </>
)
}