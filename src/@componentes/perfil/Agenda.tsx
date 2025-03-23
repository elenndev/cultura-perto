'use client'
import { TypeEvento } from "@/types";
import { useState } from "react";
import JanelaEvento from "./JanelaEvento";
import { useAuthContext } from "../../context/ContextAuth";
import CriarEditarEvento from "./CriarEditarEvento";

interface agendaProps {
    eventos: TypeEvento[] | null;
    salvarEvento: (evento: TypeEvento, isNovoEvento: boolean)=> void;
}
export default function Agenda(props: agendaProps){
    const {eventos} = props
    const [eventoAberto, setEventoAberto] = useState<false | TypeEvento>(false)
    const [editarEvento, setEditarEvento] = useState<null | TypeEvento>(null)
    const [criarEvento, setCriarEvento] = useState(false)
    const context = useAuthContext()
    const isLogged = context? true : false
    
    function abrirJanelaDoEvento(eventoId: string){
        const buscarEvento = eventos?.find(evento => evento._id == eventoId)
        if(buscarEvento){
            setEventoAberto(buscarEvento)
        }
    }

    function fecharJanelaEvento(){
        setEventoAberto(false)
    }

    function handleSalvarEvento(evento: TypeEvento, isNovoEvento: boolean){
        setCriarEvento(false)
        props.salvarEvento(evento, isNovoEvento)
    }

    function cancelarCriacaoEdicaoEvento(){
        setCriarEvento(false)
        setEditarEvento(null)
    }

    return(<div className="agenda flex flex-col">
        <p>Agenda</p>
        {eventos ? (<>
            <table>
                <thead>
                    <tr>
                        <th>Evento</th>
                        <th>Data</th>
                        <th>Local</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {eventos.map(evento => (
                        <tr key={evento._id}>
                            <td>{evento.nome}</td>
                            <td>{new Date(evento.data).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })
                        }</td>
                            <td>{evento.localidade.nomeLocal}</td>
                            <td>
                                <button type="button" onClick={()=> abrirJanelaDoEvento(evento._id)}>Ver detalhes</button>
                                {isLogged && (<button type="button"
                                onClick={()=> setEditarEvento(evento)}>Editar</button>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {eventoAberto && (
                <JanelaEvento evento={eventoAberto} fecharJanela={fecharJanelaEvento}/>)}
        </>) : (<p>Nenhum evento no momento</p>)}
            {isLogged && (<button type='button' onClick={()=> setCriarEvento(true)}>Adicionar novo evento</button>)}
            {isLogged && (criarEvento || editarEvento) && (
                <CriarEditarEvento 
                editarEvento={editarEvento} 
                salvarEvento={handleSalvarEvento}
                cancelar={cancelarCriacaoEdicaoEvento}/>)}
    </div>)
}