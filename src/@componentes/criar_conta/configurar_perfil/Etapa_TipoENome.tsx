'use client'
import * as S from '@/styles/StyledLogin'

import { useState } from "react";

interface etapaProps {
    area: 'musica' | 'cenica' | 'artesanato/artes visuais'
    responder: (opcao: 'grupo' | 'individual' | string) => void;
    permitirProximaEtapa: () => void;
}
export default function Etapa_TipoENome(props: etapaProps){
    const [opcaoSelecionada, setOpcaoSelecionada] = useState<'individual' | 'grupo' | null>(null)
    const [nome, setNome] = useState("")

    function handleResposta(resposta: 'grupo' | 'individual' |string){
        if(resposta == 'grupo' || resposta =='individual'){
            setOpcaoSelecionada(resposta as 'grupo' | 'individual')
            return props.responder(resposta)
        } else {
            setNome(resposta)
            props.responder(resposta)
            props.permitirProximaEtapa()
        }
    }

    return(<>
        <S.H1 className='border-b-[rgb(255,177,98)] border-t-0 border-r-0 border-l-0 border mb-2'>Conte mais sobre você!</S.H1>
        <p>Selecione qual tipo de perfil:</p>
        <ul className='gap-y-2 flex flex-col mb-2'>
            <li><S.Button className={`flex flex-row items-center justify-center px-4 py-2 gap-x-1 border rounded-md ${ opcaoSelecionada == 'individual' ? "bg-[#ffb162] border-[#a35139]" : "bg-[#eee9df] border-[transparent]"}`} 
            type="button" onClick={()=> handleResposta('individual')}>Perfil Individual</S.Button></li>
            <li><S.Button className={`flex flex-row items-center justify-center px-4 py-2 gap-x-1 border rounded-md ${ opcaoSelecionada == 'grupo' ? "bg-[#ffb162] border-[#a35139]" : "bg-[#eee9df] border-[transparent]"}`} 
            type="button" onClick={()=> handleResposta('grupo')}>Perfil de Grupo{props.area == 'musica' && ' (Ex: Banda)'}</S.Button></li>
        </ul>
        {opcaoSelecionada && (<S.InputSpan className='mb-2'>
            <label htmlFor='nome'>{opcaoSelecionada == 'grupo' ? `Qual o nome do grupo${props.area == 'musica' ? '/banda?' : '?'}` : 'Qual o seu nome artístico?'}</label>
            <input type="text" name="nome" placeholder='Digite o nome' value={nome} className='text-black'
            onChange={(e)=> {
                setNome(e.target.value)
                if(e.target.value != ""){
                    handleResposta(e.target.value)
                }}}></input>
        </S.InputSpan>)}
        
    </>)
}