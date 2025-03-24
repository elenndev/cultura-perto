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
    const {salvarEvento, deletarEvento} = usePerfil()
    const [eventos, setEventos] = useState<null | TypeEvento[]>(perfil.agenda)
    const [eventoSendoEditadoRegistrado, setEventoSendoEditadoRegistrado] = useState(false) 

    function removerEvento(eventoId: string){
        //remove Evento da lista seja por erro na criação ou se o usuário deletou o evento
        setEventos(prev =>{
            const listaAtualizada = prev?.filter(item => item._id !== eventoId)
            if (listaAtualizada){
                return listaAtualizada.length > 0 ? listaAtualizada : null
            } else {
                return  null
            }
        })
    }
    
    function handleDeletarEvento(eventoId: string){
        if(eventoSendoEditadoRegistrado){
            return toast.error("Uma ação em outro evento está sendo registrada, por favor aguarde alguns instantes e tente novamente")
        }
        const guardarEvento = eventos?.find(evento => evento._id == eventoId)
        if(!guardarEvento){
            return toast.error("Problemas ao acessar o item para deletar")
        }
        removerEvento(eventoId)
        
        toast.promise(()=>deletarEvento({eventoId, username: perfil.username, handleErro: adicionarEvento}),
        {error: `Erro ao tentar deletar o evento`,
            pending: 'Deletando evento', success: 'Evento deletado com sucesso'
        })

        function adicionarEvento(){
            //caso tenha algum erro na requisição para apagar o evento, 
            //adicionar ele na lista novamente para que o usuário possa tentar novamente
            setEventos(prev=> {prev?.push(guardarEvento!); return prev ?? [guardarEvento!]})
        }
    }

    function handleSalvarEvento(evento: TypeEvento, isNovoEvento: boolean){
        if(eventoSendoEditadoRegistrado){
            return toast.error("Uma ação em outro evento está sendo registrada, por favor aguarde alguns instantes e tente novamente")
        }
        // quando criado no navegador o evento terá um id temporário que será guardado aqui,
        //após a requisição no banco de dados ser feita com sucesso, ela retorna um novo id por isso guardamos o antigo para buscar pelo evento que terá o id atualizado
        setEventoSendoEditadoRegistrado(true)
        setEventos(prev =>{
            if(isNovoEvento){
                if(prev){
                    if(prev.findIndex(item => item._id == evento._id) == -1){
                        prev.push(evento)
                    }
                }
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
        
        toast.promise(()=>salvarEvento({evento, isNovoEvento, username: perfil.username, atualizarId, handleErro: removerEvento, handleSucesso: ()=>setEventoSendoEditadoRegistrado(false)}),
        {error: `Erro ao tentar salvar evento`,
        pending: 'Salvando evento', success: 'Evento salvo com sucesso'
        })

        function atualizarId(antigoId: string, novoId: string){
            console.log('funcao atualziar id, id antigo e novo', antigoId, novoId)
            setEventos(prev =>{
                const listaAtualizada = prev?.map(prevItem =>{
                    if(prevItem._id == antigoId){
                        return {...prevItem, _id: novoId}
                    } else {
                        return prevItem
                    }
                }) ?? prev
                console.log('ai a lsita atualizada: ',listaAtualizada)
                return listaAtualizada
            })
        }
    }

    return(<>
    <ContextAuthProvider isLogged={props.isLogged}>
        <main className="w-screen h-screen relative">
            <ToastContainer/>
            <p>{perfil.nome}</p>
            <p>@{perfil.username}</p>
            <p>{perfil.localidade.cidade} - {perfil.localidade.estado}</p>
            <p>{perfil.area == 'musica' ? 'Música' : perfil.area == "artesanato" ? 'Arte artesanal' : 'Arte cênica'}</p>
            <p>{perfil.descricao}</p>
            <Agenda salvarEvento={handleSalvarEvento} 
            eventos={eventos} deletarEvento={handleDeletarEvento}/>
        </main>
    </ContextAuthProvider>
    </>)
}