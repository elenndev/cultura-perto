'use client'
import { TypeEvento, TypeLinkEvento, TypeLocalidadeEvento } from "@/types";
import { useState } from "react";
import NewLinkDoEvento from "./NewLinkDoEvento";
import { nanoid } from "nanoid";
import * as S from '@/styles/Styles'
import { toast } from "react-toastify";

interface criarEventoProps {
    editarEvento: TypeEvento | null;
    salvarEvento: (evento: TypeEvento, isNovoEvento: boolean)=> void;
    cancelar: ()=> void;
}
export default function CriarEditarEvento(props : criarEventoProps){
    const { editarEvento, salvarEvento, cancelar} = props

    const [tela, setTela] = useState(1)


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

    const [linksEvento, setLinksEvento] = useState<TypeLinkEvento[]>(
        editarEvento?.linksEvento && editarEvento?.linksEvento.length > 0 ? editarEvento.linksEvento
        : [{nome: "", link: "", _id: nanoid()}])


    function adicionarData(dataString: string){
        const data = new Date(dataString)
        setData(data)
    }
    
    function adicionarMaisLinks(){
        setLinksEvento(prev =>{
            const novoLink = {nome: "", link: "", _id:nanoid()}
            if(prev){
                prev.push(novoLink)
                return prev
            } else {
                return [novoLink]}
        })
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
        } else{
            toast.error("Por favor preencha todos os campos")
        }
    }

    return(
        <S.ModalHolder>
            <S.ModalContainer className='w-[80vw]'>
                <S.ModalHeader>
                    <p>{editarEvento ? `Editando evento: ${editarEvento.nome}` : 'Criando novo evento'}</p>
                </S.ModalHeader>
                <S.ModalContent className='w-[90%]'>
                    <form onSubmit={(e)=> handleSalvarEvento(e)} className='flex flex-col gap-4 justify-center px-4 py-3'>
                        {tela == 1 && (<>
                            <S.InputSpan>
                                <label htmlFor='nome'>{editarEvento ? 'Mudar nome do evento' : 'Informe o nome do evento'}:</label>
                                <input name='nome' placeholder='Nome do evento' type='text' defaultValue={nome ?? ''}
                                onChange={(e)=> setNome(e.target.value)}></input>
                            </S.InputSpan>

                            <S.InputSpan>
                                <label htmlFor='detalhes'>{editarEvento ? 'Editar detalhes do evento' : 'Informe os detalhes do evento'}</label>
                                <input name='detalhes' placeholder='Detalhes do evento' type='text' defaultValue={detalhes ?? ''}
                                onChange={(e)=> setDetalhes(e.target.value)}></input>
                            </S.InputSpan>

                            <S.InputSpan>
                                <label htmlFor='data'>{editarEvento ? 'Editar data do evento' : 'Informe a data do evento'}</label>
                                <input name='data' type="date" defaultValue={data ? new Date(data).toISOString().split("T")[0] : ''}
                                onChange={(e)=>adicionarData(e.target.value)}></input>
                            </S.InputSpan>
                        </>)}

                        {tela == 2 && (<>
                            <span className='localDoEvento flex flex-col gap-4'>
                                <S.InputSpan>
                                    <label htmlFor='nomeLocal'>Qual o nome do local em que vai acontecer o evento?<br></br><p className='opacity-50 italic'>Exemplo: Nome da praça, nome do espaço de eventos...</p></label>
                                    <input type="text" name='nomeLocal' placeholder='Nome do local'
                                    value={localidade.nomeLocal}
                                    onChange={(e)=> setLocalidade(prev =>{ return {...prev, nomeLocal: e.target.value}})}></input>
                                </S.InputSpan>

                                <S.InputSpan>
                                    <label htmlFor='bairro'>Bairro:</label>
                                    <input type='text' name='bairro' placeholder='bairro'
                                    value={localidade.bairro}
                                    onChange={(e)=> setLocalidade(prev =>{ return {...prev, bairro: e.target.value}})}></input>
                                </S.InputSpan>

                                <S.InputSpan>
                                    <label htmlFor='rua'>Rua:</label>
                                    <input type='text' name='rua' placeholder='Rua'
                                    value={localidade.rua}
                                    onChange={(e)=> setLocalidade(prev =>{ return {...prev, rua: e.target.value}})}></input>
                                </S.InputSpan>

                                <S.InputSpan>
                                    <label htmlFor='link'>Link da localização do local:</label>
                                    <input type='text' name='link' placeholder='Link da localização'
                                    defaultValue={localidade.link}
                                    onChange={(e)=> setLocalidade(prev =>{ return {...prev, link: e.target.value}})}></input>
                                </S.InputSpan>

                            </span>

                            <span className='linksDoEvento flex flex-col gap-4'>
                                <span className="flex flex-col items-center overflow-y-scroll">
                                    <p>Adicione também os links relacionados ao evento, por exemplo link para formulário de confirmação de presença, um website sobre o evento, post sobre evento nas redes sociais, etc... <i className="text-gray-700">{'(Opcional)'}</i></p>
                                    {linksEvento.map(link =>(<>
                                            <NewLinkDoEvento key={link._id} linkEvento={link} setLinksEvento={setLinksEvento}/>
                                                    </>))}
                                    {linksEvento.length < 5 ? (
                                        <S.Button_Secundario className='mt-2' type="button" onClick={()=>adicionarMaisLinks()}>{linksEvento ? 'Adicionar mais links' : 'Adicionar links'}</S.Button_Secundario>
                                    ): (<p>{'Atingiu a quantidade máxima de links (4)'}</p>)}
                                </span>
                            </span>
                        </>)}
                        <span className='w-full flex flwx-row justify-center gap-x-2'>
                            <S.MultiplastTelasIndicador $tela={tela == 1 ? "on" : "off"}/>
                            <S.MultiplastTelasIndicador $tela={tela == 2 ? "on" : 'off'}/>
                        </span>
                        {tela == 1 && (
                            <S.Button_Secundario type='button' onClick={()=>setTela(2)}>Próximo</S.Button_Secundario>
                        )}
                        {tela == 2 && (<>
                            <S.Button_Secundario type='button' onClick={()=>setTela(1)}>Voltar</S.Button_Secundario>
                            <S.Button_Principal type="submit">Salvar evento</S.Button_Principal>
                        </>
                        )}
                        <S.Button_Danger type="button" onClick={()=>cancelar()}>Cancelar</S.Button_Danger>
                    </form>

                </S.ModalContent>
            </S.ModalContainer>
        </S.ModalHolder>
)
}