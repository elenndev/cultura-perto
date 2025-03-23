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

    function removerEvento(eventoId: string){
        //remove Evento da lista seja por erro na criação ou se o usuário deletou o evento
        setEventos(prev =>{
            const listaAtualizada = prev?.filter(item => item._id == eventoId)
            if (listaAtualizada){
                return listaAtualizada.length > 0 ? listaAtualizada : null
            } else {
                return  null
            }
        })
    }

    function handleSalvarEvento(evento: TypeEvento, isNovoEvento: boolean){
        // quando criado no navegador o evento terá um id temporário que será guardado aqui,
        //após a requisição no banco de dados ser feita com sucesso, ela retorna um novo id por isso guardamos o antigo para buscar pelo evento que terá o id atualizado
        const idParaSubstituir = evento._id
        setEventos(prev =>{
            if(isNovoEvento){
                if(prev){prev.push(evento)}
                else{prev = [evento]}
                return prev
            } else {
                const listaAtualizada = prev?.map(prevItem =>{
                    if(prevItem._id == evento._id){
                        return evento
                    } else {
                        return prevItem
                    }
                }) ?? prev
                return listaAtualizada
            }
        })
        
        toast.promise(()=>salvarEvento({evento, isNovoEvento, username: perfil.username, atualizarId, handleErro: removerEvento}),
        {error: `Erro ao tentar salvar evento`,
        pending: 'Salvando evento', success: 'Evento salvo com sucesso'
        })

        function atualizarId(novoId: string){
            setEventos(prev =>{
                const listaAtualizada = prev?.map(prevItem =>{
                    if(prevItem._id == idParaSubstituir){
                        return {...prevItem, _id: novoId}
                    } else {
                        return prevItem
                    }
                }) ?? prev
                return listaAtualizada
            })
        }
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