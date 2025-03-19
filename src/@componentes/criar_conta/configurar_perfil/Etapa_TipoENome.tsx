'use client'

import { useState } from "react";

interface etapaProps {
    area: 'musica' | 'cenica' | 'artesanato'
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
        <h1>{'Conte mais sobre você!'}</h1>
        <p>Selecione qual tipo de perfil:</p>
        <ul>
            <li><button className={`${opcaoSelecionada == 'individual' && 'bg-amber-300 text-white'}`} 
            type="button" onClick={()=> handleResposta('individual')}>Perfil Individual</button></li>
            <li><button className={`${opcaoSelecionada == 'grupo' && 'bg-amber-300 text-white'}`} 
            type="button" onClick={()=> handleResposta('grupo')}>Perfil de Grupo{props.area == 'musica' && ' (Ex: Banda)'}</button></li>
        </ul>
        {opcaoSelecionada && (<>
            <label htmlFor='nome'>{opcaoSelecionada == 'grupo' ? `Qual o nome do grupo${props.area == 'musica' ? '/banda?' : '?'}` : 'Qual o seu nome artístico?'}</label>
            <input type="text" name="nome" placeholder='Digite o nome' value={nome}
            onChange={(e)=> {
                setNome(e.target.value)
                if(e.target.value != ""){
                    handleResposta(e.target.value)
                }}}></input>
        </>)}
        
    </>)
}