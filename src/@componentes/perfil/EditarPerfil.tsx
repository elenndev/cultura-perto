'use client'
import { TypeLinksPerfil, TypePerfilArtistico } from "@/types";
import { useState } from "react";
import DefinirLocalidade from "../criar_conta/configurar_perfil/DefinirLocalidade";
import { toast } from "react-toastify";
import { usePerfil } from "@/@hooks/usePerfil";

interface editarPerfilProps {
    perfilArtistico: TypePerfilArtistico;
    fecharJanela: () => void;
    atualizarPerfil: (perfilAtualizado: TypePerfilArtistico) => void;
}
export default function EditarPerfil(props: editarPerfilProps){
    const {editandoConta} = usePerfil()
    const [localidade, setLocalidade] = useState(props.perfilArtistico.localidade)

    const [username, setUsername] = useState(props.perfilArtistico.username)
    const [nome, setNome] = useState(props.perfilArtistico.nome)
    const [area, setArea] = useState<'musica'| 'cenica' |'artesanato'>(props.perfilArtistico.area)
    const [tipo, setTipo] = useState<'grupo' | 'individual'>(props.perfilArtistico.tipo)
    const [descricao, setDescricao] = useState(props.perfilArtistico.descricao)

    const {linksDoPerfil} = props.perfilArtistico
    const [links, setLinks] = useState(() => {
        return {
            Instagram: linksDoPerfil.find(item => item.nome == 'Instagram')?.link || '',
            Facebook: linksDoPerfil.find(item => item.nome == 'Facebook')?.link || '',
            X: linksDoPerfil.find(item => item.nome == 'X')?.link || '',
            Spotify: linksDoPerfil.find(item => item.nome == 'Spotify')?.link || '',
            Soundcloud: linksDoPerfil.find(item => item.nome == 'Soundcloud')?.link || '',
            Youtube: linksDoPerfil.find(item => item.nome == 'Youtube')?.link || '',
            LinkExterno: linksDoPerfil.find(item => item.nome == 'Link externo')?.link || ''
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


    const handleSubmit = async (e: React.FormEvent) => {
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
                    pending: 'Salvando evento', success: 'Evento salvo com sucesso'
                    })
                    
            } else {
                toast.error('Por favor disponibilize ao menos um link')
                return setError('Informar link')
            }
    
    
    
        };

    return(
    <div className='flex flex-col'>
        <button type='button' onClick={()=> props.fecharJanela()}>Fechar</button>
        <form onSubmit={handleSubmit}>
            <span className='flex flex-row'>
                <label htmlFor='nome'>Nome</label>
                <input name='nome' placeholder="nome" defaultValue={nome}
                onChange={(e)=> setNome(e.target.value)}></input>
            </span>

            <span className='flex flex-row'>
                <label htmlFor='username'>Nome de usuário</label>
                <input name='username' placeholder="Nome de usuário" defaultValue={username}
                onChange={(e)=> setUsername(e.target.value)}></input>
            </span>

            <span className='flex flex-row'>
                <label htmlFor='descricao'>Descrição</label>
                <input name='descricao' placeholder="Descrição" defaultValue={descricao}
                onChange={(e)=> setDescricao(e.target.value)}></input>
            </span>

            <span className='flex flex-col'>
                <p>No momento seu perfil está marcado como um perfil {tipo == 'grupo' ? 'de grupo' : 'individual'}</p>
                <button type='button' onClick={()=> setTipo(prev => {return prev == 'grupo' ? 'individual' : 'grupo'})}>Mudar para m perfil {tipo == 'grupo' ? 'individual' : 'de grupo'}</button>
            </span>

            <DefinirLocalidade cidadeSelecionada={localidade.cidade}
            estadoSelecionado={localidade.estado}
            handleInformarLocalidade={handleInformarLocalidade}/>
            <ul>
                <li><button className={`area ${area == 'musica' ? 'bg-amber-300 text-white' : ''}`} type="button" onClick={()=> setArea('musica')}>Música</button></li>
                <li><button className={`area ${area == 'artesanato' ? 'bg-amber-300 text-white' : ''}`} type="button" onClick={()=> setArea('artesanato')}>Artesanato</button></li>
                <li><button className={`area ${area == 'cenica' ? 'bg-amber-300 text-white' : ''}`} type="button" onClick={()=> setArea('cenica')}>Cênica</button></li>
            </ul>

            <span className='flex flex-col'>
            {area !== 'artesanato' && (<>
                <span className="spotify">
                    <label htmlFor="spotify">Spotify</label>
                    <input name="spotify" type="text" placeholder="Adicionar link do seu perfil do spotify"
                    defaultValue={links.Spotify}
                    onChange={(e)=>{setError("");setLinks(links => {links.Spotify = e.target.value; return links})}}></input>
                </span>
                <span className="soundcloud">
                    <label htmlFor="soundcloud">Soundcloud</label>
                    <input name="soundcloud" type="text" placeholder="Adicionar link do seu perfil do soundcloud"
                    defaultValue={links.Soundcloud}
                    onChange={(e)=>{setError("");setLinks(links => {links.Soundcloud = e.target.value; return links})}}></input>
                </span>
            </>)}
            <span className="instagram">
                <label htmlFor="instagram">Instagram</label>
                <input name="instagram" type="text" placeholder="Adicionar link do seu perfil do instagram"
                defaultValue={links.Instagram}
                onChange={(e)=>{setError("");setLinks(links => {links.Instagram = e.target.value; return links})}}></input>
            </span>
            <span className="X">
                <label htmlFor="X">X</label>
                <input name="X" type="text" placeholder="Adicionar link do seu perfil do X"
                defaultValue={links.X}
                onChange={(e)=>{setError("");setLinks(links => {links.X = e.target.value; return links})}}></input>
            </span>
            <span className="facebook">
                <label htmlFor="facebook">Facebook</label>
                <input name="facebook" type="text" placeholder="Adicionar link do seu perfil do facebook"
                defaultValue={links.Facebook}
                onChange={(e)=>{setError("");setLinks(links => {links.Facebook = e.target.value; return links})}}></input>
            </span>
            <span className="youtube">
                <label htmlFor="youtube">Youtube</label>
                <input name="youtube" type="text" placeholder="Adicionar link do seu perfil do youtube"
                defaultValue={links.Youtube}
                onChange={(e)=>{setError("");setLinks(links => {links.Youtube = e.target.value; return links})}}></input>
            </span>
            <span className="linkExterno">
                <label htmlFor="linkExterno">Outro link</label>
                <input name="linkExterno" type="text" placeholder="Adicionar outro tipo de link do seu perfil  (Exemplo: website)"
                defaultValue={links.LinkExterno}
                onChange={(e)=>{setError("");setLinks(links => {links.LinkExterno = e.target.value; return links})}}></input>
            </span>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        </span>
                <button type='submit'>Salvar alterações</button>
        </form>

    </div>)
}