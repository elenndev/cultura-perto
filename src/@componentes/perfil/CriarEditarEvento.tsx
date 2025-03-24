'use client'
import { TypeEvento, TypeLinkEvento, TypeLocalidadeEvento } from "@/types";
import { useState } from "react";
import NewLinkDoEvento from "./NewLinkDoEvento";
import { nanoid } from "nanoid";
import * as S from '@/styles/Styles'

interface criarEventoProps {
    editarEvento: TypeEvento | null;
    salvarEvento: (evento: TypeEvento, isNovoEvento: boolean)=> void;
    cancelar: ()=> void;
}
export default function CriarEditarEvento(props : criarEventoProps){
    const { editarEvento, salvarEvento, cancelar} = props
    const eventoId = editarEvento?._id ?? nanoid()
    const [nome, setNome] = useState<null | string>(editarEvento?.nome ?? null)
    const [detalhes, setDetalhes] = useState<null | string>(editarEvento?.detalhes ?? null)
    const [data, setData] = useState<null | Date>(editarEvento?.data ?? null)
    const [localidade, setLocalidade] = useState<TypeLocalidadeEvento>(editarEvento?.localidade ?? {
        bairro: '',
        nomeLocal: '',
        rua: '',
        link: ''
    })



    const [editarCriarLink,setEditarCriarLink] =useState<null | TypeLinkEvento>(null)

    const [linksEvento, setLinksEvento] = useState<null | TypeLinkEvento[]>(
        editarEvento?.linksEvento ? 
            editarEvento.linksEvento.map(link => {const linkFormatado = {...link, id: nanoid()} as TypeLinkEvento & {id: string}; return linkFormatado }) 
        : null)

    function adicionarData(dataString: string){
        const data = new Date(dataString)
        setData(data)
    }

    function salvarLink(link: TypeLinkEvento){
        setEditarCriarLink(null)
        setLinksEvento(prev =>{
            const listaAtualizada = prev?.map(item => {
                if(item._id == link._id){
                    return link
                } else { return item}
            }) ?? prev
            return listaAtualizada
        })
    }

    function editarLink(link: TypeLinkEvento){
        setEditarCriarLink(link)
    }

    function cancelarEditarCriarLink(){
        setEditarCriarLink(null)
    }

    function deletarLink(link: TypeLinkEvento){
        setLinksEvento(prev => {
            prev?.filter(item => item._id == link._id)
            if(prev?.length == 0){ prev = null}
            return prev
        })
    }
    
    function adicionarMaisLinks(){
        setEditarCriarLink({
            nome: '',
            link: '',
            _id: nanoid()})
    }

    function handleSalvarEvento(e: React.FormEvent){
        e.preventDefault()
        if(nome && detalhes && data  && Object.values(localidade).some(localInfo => localInfo.trim() != '')){
            let evento: TypeEvento = {
                nome, detalhes, data, localidade, _id: eventoId
            }

            if (linksEvento && Object.values(localidade).some(localInfo => typeof localInfo === 'string' && localInfo.trim() !== '')){
                const links = Object.values(linksEvento).filter(linkObj => typeof linkObj.link === 'string' && linkObj.link.trim() !== '')
                evento = { ...evento, linksEvento: links }
            }
            
            salvarEvento(evento, editarEvento ? false : true)
        }
    }

    return(
        <S.ModalHolder>
            <S.ModalContainer>
                <button type="button" onClick={()=>cancelar()}>Cancelar</button>
                <form onSubmit={(e)=> handleSalvarEvento(e)}>
                    <label htmlFor='nome'>{editarEvento ? 'Mudar nome do evento' : 'Informe o nome do evento'}</label>
                    <input name='nome' placeholder='Nome do evento' type='text' defaultValue={nome ?? ''}
                    onChange={(e)=> setNome(e.target.value)}></input>

                    <label htmlFor='detalhes'>{editarEvento ? 'Editar detalhes doe vento' : 'Informe os detalhes do evento'}</label>
                    <input name='detalhes' placeholder='Detalhes do evento' type='text' defaultValue={detalhes ?? ''}
                    onChange={(e)=> setDetalhes(e.target.value)}></input>

                    <label htmlFor='data'>{editarEvento ? 'Editar data do evento' : 'Informe a data do evento'}</label>
                    <input name='data' type="date" defaultValue={data ? new Date(data).toISOString().split("T")[0] : ''}
                    onChange={(e)=>adicionarData(e.target.value)}></input>

                    <span className='localDoEvento flex flex-col'>
                        <label htmlFor='nomeLocal'>Qual o nome do local em que vai acontecer o evento? <i>Exemplo: Nome da praça, nome do espaço de eventos...</i></label>
                        <input type="text" name='nomeLocal' placeholder='Nome do local'
                        value={localidade.nomeLocal}
                        onChange={(e)=> setLocalidade(prev =>{ return {...prev, nomeLocal: e.target.value}})}></input>

                        <label htmlFor='bairro'>Bairro</label>
                        <input type='text' name='bairro' placeholder='bairro'
                        value={localidade.bairro}
                        onChange={(e)=> setLocalidade(prev =>{ return {...prev, bairro: e.target.value}})}></input>

                        <label htmlFor='rua'>Rua</label>
                        <input type='text' name='rua' placeholder='Rua'
                        value={localidade.rua}
                        onChange={(e)=> setLocalidade(prev =>{ return {...prev, rua: e.target.value}})}></input>

                        <label htmlFor='link'>Link da localização do local</label>
                        <input type='text' name='link' placeholder='Link da localização'
                        defaultValue={localidade.link}
                        onChange={(e)=> setLocalidade(prev =>{ return {...prev, link: e.target.value}})}></input>
                    </span>

                    <span className='linksDoEvento flex flex-col'>
                        <span className="flex flex-col items-center">
                            {!linksEvento ? (
                                <p>Adicione também os links relacionados ao evento, por exemplo link para formulário de confirmação de presença, um website sobre o evento, post sobre evento nas redes sociais, etc... <i className="text-gray-700">{'(Opcional)'}</i></p>
                            ) : (<p>Lista de links</p>)}
                            {linksEvento?.map(link =>(
                                <span key={link._id}
                                className="flex flex-row">
                                    <p>{link.nome}</p>
                                    <button type='button' onClick={()=> editarLink(link)}>Editar</button>
                                    <button type='button' onClick={()=> deletarLink(link)}>Deletar</button>
                                </span>
                            ))}
                            {editarCriarLink ? (
                                <NewLinkDoEvento salvarLink={salvarLink} linkEvento={editarCriarLink}
                                cancelar={cancelarEditarCriarLink}/>
                            ):(
                                <button type="button" onClick={adicionarMaisLinks}>{linksEvento ? 'Adicionar mais links' : 'Adicionar links'}</button>
                            )}
                        </span>
                    </span>
                    <button type="submit">Salvar evento</button>
                </form>
            </S.ModalContainer>
        </S.ModalHolder>
)
}