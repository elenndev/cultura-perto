'use client'
import { TypeEvento, TypePerfilArtistico } from "@/types"
import Agenda from "./Agenda";
import { ContextAuthProvider } from "../../context/ContextAuth";
import { toast, ToastContainer } from "react-toastify";
import { usePerfil } from "@/@hooks/usePerfil";
import { useState } from "react";

interface perfilProps {
    perfil: TypePerfilArtistico;
    isLogged: false | {id: string};
}
export function Perfil(props : perfilProps){
    const {perfil} = props
    const {salvarEvento} = usePerfil()
    const [eventos, setEventos] = useState<null | TypeEvento[]>(perfil.agenda)

    function handleSalvarEvento(evento: TypeEvento, isNovoEvento: boolean){
        if(isNovoEvento){
        }
        setEventos(prev =>{
            if(isNovoEvento){
                if(prev){prev.push(evento)}
                else{prev = [evento]}
                return prev
            } else {
                const listaAtualizada = prev?.map(prevItem =>{
                    if(prevItem.id == evento.id){
                        return evento
                    } else {
                        return prevItem
                    }
                }) ?? prev
                return listaAtualizada
            }
        })
        toast.promise(()=>salvarEvento({evento, isNovoEvento, perfilId: perfil._id}),
        {error: `Erro ao tentar salvar evento`,
        pending: 'Salvando evento', success: 'Evento salvo com sucesso'
        })
    }

    return(<>
    <ContextAuthProvider isLogged={props.isLogged}>
        <main className="w-screen h-screen relative">
            <ToastContainer/>
            <p>@{perfil.nome}</p>
            <p>{perfil.descricao}</p>
            <Agenda salvarEvento={handleSalvarEvento} eventos={eventos}/>
        </main>
    </ContextAuthProvider>
    </>)
}