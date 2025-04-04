'use client'
import { TypeLinksPerfil } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify"
import * as S from '@/styles/StyledLogin'

interface etapaDetahesProps {
    nome: string;
    area: 'musica'| 'cenica' | 'artesanato/artes visuais';
    descricao: string | null;
    setDescricao: (descricao: string) => void;
    handleFinalizarConfiguracaoPerfil: (links: TypeLinksPerfil[]) => void;
}
export default function Etapa_Detalhes(props: etapaDetahesProps){
    const [error, setError] = useState<string | null>(null)
    const [links, setLinks] = useState({
        Instagram: '',
        Facebook: '',
        X: '',
        Spotify: ''
    })
    

    function finalizarDetalhes(){
        if(Object.values(links).some(link => link.trim() != '')){
            const linksFiltrados = Object.fromEntries(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                Object.entries(links).filter(([_, link]) => link.trim() !== '')
            )
            
            const linksDoPerfil: TypeLinksPerfil[] | null = Object.entries(linksFiltrados)
                .map(([nome, link]) => ({ nome: nome as TypeLinksPerfil["nome"], link }))
            

            props.handleFinalizarConfiguracaoPerfil(linksDoPerfil)
        } else {
            toast.error('Por favor disponibilize ao menos um link')
            return setError('Informar link')
        }
    }

    return (<>
        <S.H1 className='mb-2 w-[90%] mt-3'>Olá {props.nome}, boas vindas ao Cultura Perto!</S.H1>
        <span className="flex flex-col border-b border-[#ffb162] mb-3">
            <p>Conte um pouco mais sobre você e a sua história:</p>{props.descricao && props.descricao.length >1 && props.descricao.length < 11 && (<p className="opacity-40 text-[0.80rem]">{'Min. 10 caracteres'}</p>)}
            <textarea minLength={11} defaultValue={props.descricao ?? ''} placeholder="Esse texto aparecerá para os demais usuários ao acessarem o seu perfil"
            className='border mb-3'
            onChange={(e)=> props.setDescricao(e.target.value)}></textarea>
        </span>
        <S.FormInput className='gap-2'>
            <p>Adicione o link das suas redes sociais!</p>
            {props.area !== 'artesanato/artes visuais' && (
                <span className="spotify">
                    <label htmlFor="spotify">Spotify</label>
                    <input name="spotify" type="url" placeholder="Link do seu perfil do spotify"
                    onChange={(e)=>setLinks(links => {links.Spotify = e.target.value; return links})}></input>
                </span>
            )}
            <span className="instagram">
                <label htmlFor="instagram">Instagram</label>
                <input name="instagram" type="url" placeholder="Link do seu perfil do instagram"
                onChange={(e)=>setLinks(links => {links.Instagram = e.target.value; return links})}></input>
            </span>
            <span className="X">
                <label htmlFor="X">X</label>
                <input name="X" type="url" placeholder="Link do seu perfil do X"
                onChange={(e)=>setLinks(links => {links.X = e.target.value; return links})}></input>
            </span>
            <span className="facebook">
                <label htmlFor="facebook">Facebook</label>
                <input name="facebook" type="url" placeholder="Link do seu perfil do facebook"
                onChange={(e)=>setLinks(links => {links.Facebook = e.target.value; return links})}></input>
            </span>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        </S.FormInput>
        {props.descricao && props.descricao?.length > 10 && (<>
            <S.Button_Principal onClick={()=>finalizarDetalhes()}>Continuar</S.Button_Principal>
        </>)}
    </>)
}