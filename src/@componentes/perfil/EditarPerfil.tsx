'use client'
import { TypeLinksPerfil, TypePerfilArtistico } from "@/types";
import { useState } from "react";
import DefinirLocalidade from "../criar_conta/configurar_perfil/DefinirLocalidade";
import { toast } from "react-toastify";
import { usePerfil } from "@/@hooks/usePerfil";
import * as S from "@/styles/StyledEditarPerfil"
import { IconContext } from "react-icons";
import { MdAccountCircle } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import IconeRedeSocial from "./IconeRedeSocial";
import { nanoid } from "nanoid";
import EditarLinkPerfil from "./EditarLinkPerfil";
import { PerfilHeader } from "@/styles/StyledPerfil";

interface editarPerfilProps {
    perfilArtistico: TypePerfilArtistico;
    fecharJanela: () => void;
    atualizarPerfil: (perfilAtualizado: TypePerfilArtistico) => void;
}
export default function EditarPerfil(props: editarPerfilProps){
    const {editandoConta} = usePerfil()
    const [tela, setTela] = useState<null | string >(null)
    const [telaLinks, setTelaLinks ] = useState<null | {nome: string, link: string}>(null)

    const [localidade, setLocalidade] = useState(props.perfilArtistico.localidade)
    const [username, setUsername] = useState(props.perfilArtistico.username)
    const [nome, setNome] = useState(props.perfilArtistico.nome)
    const [area, setArea] = useState<'musica'| 'cenica' |'artesanato/artes visuais'>(props.perfilArtistico.area)
    const [tipo, setTipo] = useState<'grupo' | 'individual'>(props.perfilArtistico.tipo)
    const [descricao, setDescricao] = useState(props.perfilArtistico.descricao)

    const {linksDoPerfil} = props.perfilArtistico
    const [links, setLinks] = useState(() => {
        return {
            Instagram: linksDoPerfil.find(item => item.nome == 'Instagram')?.link || '',
            Facebook: linksDoPerfil.find(item => item.nome == 'Facebook')?.link || '',
            X: linksDoPerfil.find(item => item.nome == 'X')?.link || '',
            Tiktok: linksDoPerfil.find(item => item.nome == 'Tiktok')?.link || '',
        };
    });
    
    const [error, setError] = useState("");
    function handleInformarLocalidade(local: 'cidade' | 'estado', nome: string){
        if(local == 'cidade'){
            setLocalidade(prev =>{return {...prev, cidade: nome}})
        } else{ 
            setLocalidade(prev =>{return {...prev, estado: nome}})
        }
    }

    async function handleSubmit(e: React.FormEvent){
            e.preventDefault();
            setError("");
            props.fecharJanela()
            
            if(Object.values(links).some(link => link.trim() != '')){
                const linksFiltrados = Object.fromEntries(
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    Object.entries(links).filter(([_, link]) => link.trim() !== '')
                )
                
                const linksDoPerfil: TypeLinksPerfil[] | null = Object.entries(linksFiltrados)
                    .map(([nome, link]) => ({ nome: nome as TypeLinksPerfil["nome"], link }))

            const perfilEditado: TypePerfilArtistico = {
                ...props.perfilArtistico, 
                area,
                descricao, linksDoPerfil,
                localidade, nome, tipo, username
            } 
            toast.promise(()=>editandoConta({
                perfil: perfilEditado, 
                novoUsername: perfilEditado.username != props.perfilArtistico.username ? true : false,
                atualizar: ()=> props.atualizarPerfil(perfilEditado)},),
                    {error: `Erro ao tentar salvar evento`,
                    pending: 'Salvando alterações no perfil', success: 'Alterações salvas com sucesso'
                    })
                    
            } else {
                toast.error('Por favor disponibilize ao menos um link')
                return setError('Informar link')
            }
    };


    return(
    <>
        <S.ModalHeader className='flex flex-row justify-center'>
            <p>Editando perfil</p>
        </S.ModalHeader>
        <S.ModalContent>
            <form onSubmit={handleSubmit} className='grid grid-col-1 w-full md:w-auto grid-rows-[auto_auto_auto] md:grid-col-2 md:grid-rows-[auto_auto] gap-1 p-4'>
                <S.AreaPreviaPerfil className='md:max-h-fit md:w-1/2'>
                    <PerfilHeader className='rounded-3xl p-2'/>
                    <p className='p-3 mt-1.5 z-20 text-center w-[90%] bg-[#0000006e] text-white rounded-3xl shadow-2xs'>Selecione a <span className='border-2 border-[#ffb162] border-solid rounded-3xl p-1'>informação</span> que você deseja editar</p>
                    <S.Tag className={`tag ${tela == 'nome' && 'editando'}`} onClick={()=> {setTelaLinks(null);setTela('nome')}}>
                            {nome}
                            <IconEditar/>
                        </S.Tag>
                    <span className='z-20 shadow-xl rounded-[50%] p-2'>
                        <IconContext.Provider value={{size: "5rem", color: "white" }}>
                            <MdAccountCircle />
                        </IconContext.Provider>
                    </span>
                    <S.Tag className={`tag ${tela == 'username' && 'editando'} z-20 mb-1`}  onClick={()=> setTela('username')}>
                        @{username}
                        <IconEditar/>
                    </S.Tag>

                    <div className='tagsEditar w-full justify-center gap-2 flex flex-wrap z-20'>
                        <S.Tag className={`tag ${tela == 'tipo' && 'editando'}`} onClick={()=> {setTelaLinks(null);setTela('tipo')}}>
                            {tipo}
                            <IconEditar/>
                        </S.Tag>

                        <S.Tag className={`tag ${tela == 'localidade' && 'editando'}`} onClick={()=> {setTelaLinks(null);setTela('localidade')}}>
                            {localidade.cidade} - {localidade.estado}
                            <IconEditar/>
                        </S.Tag>

                        <S.Tag className={`tag ${tela == 'area' && 'editando'}`} onClick={()=> {setTelaLinks(null);setTela('area')}}>
                            {area}
                            <IconEditar/>
                        </S.Tag>
                    </div>
                    <div className='links w-full justify-center flex flex-wrap md:w-[80%] z-20 gap-2 mb-2 mt-2'>
                        {Object.entries(links).map(([nome, url]) =>(
                            <S.Tag key={nanoid()} onClick={()=> {setTela('links');setTelaLinks({nome, link: url})}}>
                                <IconContext.Provider value={{size: "1rem"}}>
                                    <IconeRedeSocial nome={nome.toLowerCase()}/>
                                </IconContext.Provider>
                            </S.Tag>
                        ))}
                    </div>
                </S.AreaPreviaPerfil>

                <div className={`editarInputsArea items-center p-1 justify-center flex flex-col md:h-full md:w-full  rounded-2xl ${tela && 'border border-[#ffb162]'}`}>
                    {tela == 'nome' && (
                        <S.InputSpan>
                            <label htmlFor='nome'>Nome</label>
                            <input name='nome' placeholder="nome" defaultValue={nome}
                            onChange={(e)=> setNome(e.target.value)}></input>
                        </S.InputSpan>
                    )}

                    {tela == 'username' && (
                        <S.InputSpan>
                            <label htmlFor='username'>Nome de usuário</label>
                            <input name='username' placeholder="Nome de usuário" defaultValue={username}
                            onChange={(e)=> setUsername(e.target.value)}></input>
                        </S.InputSpan>
                    )}

                    {tela == 'tipo' &&(
                        <S.InputSpan className='mb-5 mt-5 w-full flex flex-col items-center'>
                            <p>No momento seu perfil está<br></br> marcado como um perfil {tipo == 'grupo' ? 'de grupo' : 'individual'}</p>
                            <S.Button_Principal type='button' onClick={()=> setTipo(prev => {return prev == 'grupo' ? 'individual' : 'grupo'})}>Mudar para um perfil <br></br> {tipo == 'grupo' ? 'individual' : 'de grupo'}</S.Button_Principal>
                        </S.InputSpan>
                    )}

                    {tela == 'localidade' && (
                        <DefinirLocalidade cidadeSelecionada={localidade.cidade}
                        estadoSelecionado={localidade.estado}
                        handleInformarLocalidade={handleInformarLocalidade}/>
                    )}

                    {tela == 'area' && (
                        <S.SelecionarOpcoes className='flex w-full items-center justify-center flex-col'>
                            <p>Área artística</p>
                            <ul className='gap-y-2 justify-center items-center flex flex-wrap'>
                                <li><S.Button className={`area ${area == 'musica' && 'selecionado'}`} type="button" onClick={()=> setArea('musica')}>Música</S.Button></li>
                                <li><S.Button className={`area ${area == 'artesanato/artes visuais' && 'selecionado'}`} type="button" onClick={()=> setArea('artesanato/artes visuais')}>Artesanato/Artes Visuais</S.Button></li>
                                <li><S.Button className={`area ${area == 'cenica' && 'selecionado'}`} type="button" onClick={()=> setArea('cenica')}>Cênica</S.Button></li>
                            </ul>
                        </S.SelecionarOpcoes>
                    )}

                    {tela == 'links' && telaLinks && (
                        <EditarLinkPerfil setLinks={setLinks} link={{nome: telaLinks.nome, url: telaLinks.link}} setError={setError}/>
                    )}

                    {tela == 'descricao' && (
                        <S.InputSpan>
                            <label htmlFor='descricao'>Descrição</label>
                            <input name='descricao' placeholder="Descrição" defaultValue={descricao}
                            onChange={(e)=> setDescricao(e.target.value)}></input>
                        </S.InputSpan>
                    )}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                </div>
                <span className='buttonsArea md:col-span-2 mt-1 flex justify-end flex-col h-fit items-center gap-1'>
                    <S.Button_OK>Salvar alterações</S.Button_OK>
                    <S.Button_Danger type='button' onClick={()=> props.fecharJanela()}>Cancelar</S.Button_Danger>
                </span>

            </form>
        </S.ModalContent>
    </>)
}

function IconEditar(){
    return(
        <IconContext.Provider value={{size: "1rem", className: 'icon ml-1' }}>
            <FaRegEdit/>
        </IconContext.Provider>
    )
}