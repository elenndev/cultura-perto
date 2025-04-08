'use client'
import { TypeEvento, TypePerfilArtistico } from "@/types"
import Agenda from "./Agenda";
import { ContextAuthProvider } from "../../context/ContextAuth";
import { toast, ToastContainer } from "react-toastify";
import { usePerfil } from "@/@hooks/usePerfil";
import { useState } from "react";
import EditarPerfil from "./EditarPerfil";
import Header from "../Header";
import * as S from "@/styles/Styles"
import { nanoid } from "nanoid";
import { useConta } from "@/@hooks/useConta";
import Modal_Loading from "../modals/Modal_Loading";
import ConfirmarDeletarConta from "../homepage/ConfirmarDeletarConta";
import { Button_LogOut } from "../Button_LogOut";
import { signOut } from "next-auth/react";
import { PerfilHeader as StyledPerfilHeader}  from "@/styles/StyledPerfil";
import JanelaEvento from "./JanelaEvento";
import { MdAccountCircle } from "react-icons/md";
import { IconContext } from "react-icons";
import IconeRedeSocial from "./IconeRedeSocial";

interface perfilProps {
    perfil: TypePerfilArtistico;
    isLogged: false | {id: string, username: string};
}
export function Perfil(props : perfilProps){
    const {salvarEvento, deletarEvento} = usePerfil()
    const {deletarConta} = useConta()
    
    const [perfil, setPerfil] = useState(props.perfil)
    const [eventos, setEventos] = useState<null | TypeEvento[]>(perfil.agenda && perfil.agenda.length > 0 ? perfil.agenda : null)
    const [eventoAberto, setEventoAberto] = useState<false | TypeEvento>(false)
    const [eventoSendoEditadoRegistrado, setEventoSendoEditadoRegistrado] = useState(false) 
    const [editarPerfil, setEditarPerfil] = useState<false | TypePerfilArtistico>(false)
    const [menu, setMenu] = useState(false)
    const [deletandoConta, setDeletandoConta] = useState(false)
    const  [modalConfirmarDeletar, setModalConfirmarDeletar] = useState(false)

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
            setEventos(prev =>{
                const listaAtualizada = prev?.map(prevItem =>{
                    if(prevItem._id == antigoId){
                        return {...prevItem, _id: novoId}
                    } else {
                        return prevItem
                    }
                }) ?? prev
                return listaAtualizada
            })
        }
    }
    function fecharEditarPerfil(){
        setEditarPerfil(false)
    }

    function atualizarPerfil(perfilAtualizado: TypePerfilArtistico){
        setPerfil(perfilAtualizado)
    }

    function handleConfirmarDeletar(confirmado: boolean){
        setModalConfirmarDeletar(false)
        if(confirmado){
            deletarContaConfirmado()
        }
    }

    function deletarContaConfirmado(){
        if(props.isLogged){
            const {username} = props.isLogged
            setDeletandoConta(true)
            deletarConta({
                username,
                handleSucesso: async () => {
                    await signOut({callbackUrl: '/'})
                },
                handleErro: () => {
                    setDeletandoConta(false)
                    toast.error("Erro ao tentar deletar a conta, por favor tente novamente")
                }
            })
        }
    }

    function abrirJanelaDoEvento(eventoId: string){
        const buscarEvento = eventos?.find(evento => evento._id == eventoId)
        if(buscarEvento){
            setEventoAberto(buscarEvento)
        }
    }
    function fecharJanelaEvento(){
        setEventoAberto(false)
    }

    function copiarLinkUsername(e: React.MouseEvent<HTMLParagraphElement>){
        const texto = e.currentTarget.innerText
        navigator.clipboard.writeText(texto).then(()=>{toast.info(`Copiado para área de transferência ${texto}`)})
    }

    return(<>
    <ContextAuthProvider isLogged={props.isLogged}>
        <div className="w-screen relative flex flex-col items-center mt-0">
        {deletandoConta && (
            <Modal_Loading content="Deletando conta"/>
        )}
        {modalConfirmarDeletar && (
            <ConfirmarDeletarConta confirmar={handleConfirmarDeletar}/>
        )}
            <Header username={props.isLogged ? props.isLogged.username : null}/>
        {eventoAberto && (<JanelaEvento evento={eventoAberto} fecharJanela={fecharJanelaEvento}/>)}
        <ToastContainer/>
        {editarPerfil && (
            <S.ModalHolder>
                <S.ModalContainer className='w-[85vw] md:w-[70vw]'>
                    <EditarPerfil perfilArtistico={perfil} fecharJanela={fecharEditarPerfil} atualizarPerfil={atualizarPerfil}/>
                </S.ModalContainer>
            </S.ModalHolder>
        )}
        <div className="h-full w-screen flex flex-col items-center mt-0 relative gap-y-3">
                <div className="flex flex-col items-center gap-0.5 relative w-full">
                <StyledPerfilHeader/>
                <span className='z-20 shadow-xl rounded-[50%] p-2'>
                    <IconContext.Provider value={{size: "10rem" }}>
                        <MdAccountCircle />
                    </IconContext.Provider>
                </span>
                    {props.isLogged && (<>
                        {menu ? (<div className='menu flex flex-col items-center rounded-b-3xl shadow-md gap-2 px-6 py-4 bg-[#2c3b4d] absolute z-20 right-0 top-0'>
                            <S.Button_Secundario type="button" onClick={()=> {setEditarPerfil(perfil);setMenu(false)}}>Editar perfil</S.Button_Secundario>
                            <S.Button_Danger onClick={()=> {setModalConfirmarDeletar(true);setMenu(false)}}>Deletar Conta</S.Button_Danger>
                            <Button_LogOut />
                            <button className='text-[#ee9df]' type='button' onClick={()=> {setMenu(false);setMenu(false)}}>Fechar</button>
                        </div>) : 
                        (<S.Button_Principal className='absolute shadow-md z-30 right-7 top-1' type='button' onClick={()=>setMenu(true)}>Menu</S.Button_Principal>)
                        }
                    </>)}
                    <span className='flex flex-col items-center w-full z-10 gap-y-2 mt-3'>
                        <h1 className="text-5xl">{perfil.nome}</h1>
                        <p className="italic">@{perfil.username}</p>
                        <p className="px-4 rounded-2xl w-fit bg-[#ffb162] text-[#0a2538]">{perfil.localidade.cidade} - {perfil.localidade.estado}</p>
                        <p className="px-4 rounded-2xl w-fit bg-[#ffb162] text-[#0a2538]">{perfil.area == 'musica' ? 'Música' : perfil.area == "artesanato/artes visuais" ? 'Arte artesanal' : 'Arte cênica'}</p>
                        {perfil.linksDoPerfil?.map(link =>(
                            <span className="bg-[#A35139] text-white px-4 rounded-2xl flex flex-row items-center gap-x-2 w-fit cursor-pointer" key={nanoid()}>
                                <IconContext.Provider value={{size: "1rem" }}>
                                    <IconeRedeSocial nome={link.nome.toLowerCase()}/>
                                </IconContext.Provider>
                                <p className='cursor-pointer' onClick={copiarLinkUsername}>{link.link}</p>
                            </span>
                            ))}
                    </span>
                </div>
            <Agenda salvarEvento={handleSalvarEvento} 
            eventos={eventos} deletarEvento={handleDeletarEvento}
            abrirJanelaDoEvento={abrirJanelaDoEvento}/>
            <span className="flex flex-col items-center max-w-[95%]">
                <S.H2>Sobre</S.H2>
                <p className='break-words whitespace-normal'>{perfil.descricao}</p>
            </span>
        </div>
    
        </div>
    </ContextAuthProvider>
    </>)
}