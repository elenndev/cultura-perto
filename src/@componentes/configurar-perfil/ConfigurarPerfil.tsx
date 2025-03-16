'use client'

import { TypeLinksPerfil, TypeLocalidadePerfil, TypePerfilArtistico } from "@/types"
import React, { useEffect, useState } from "react"
import Etapa_TipoENome from "./Etapa_TipoENome";

type perfilArtisticoConfigurando = Omit<TypePerfilArtistico, "linksDoPerfil" | "localidade"> & {
    linksDoPerfil: TypeLinksPerfil[] | null;
    localidade: {localidadePrincipal: TypeLocalidadePerfil} | null
}
export default function ConfigurarPerfil(){
    const [etapa, setEtapa] = useState(1)
    const [permitirProxEtapa, setPermitirProxEtapa] = useState(false)
    const [localidade, setLocalidade] = useState<{localidadePrincipal: TypeLocalidadePerfil} | null>(null)
    const [area, setArea] = useState<null  |'musica'| 'cenica' |'artesanato'>(null)
    const [artistaInfos, setArtistaInfos] = useState<perfilArtisticoConfigurando>({
        _id: '',
        icon: '',
        nome: '',
        descricao: '',
        tipo: 'individual',
        area: 'artesanato',
        linksDoPerfil: null,
        localidade: null,
        agenda: null
    })

    function handleSelecionarAreaArtistica(opcao: 'musica'| 'cenica' | 'artesanato'){
        setArea(opcao)
        setArtistaInfos(prev => {
            prev.area = opcao
            return prev
            })
        permitirProximaEtapa()
    }

    function handleResposta(resposta: 'grupo' | 'individual' | string){
        if(resposta == 'grupo'|| 'individual'){
            setArtistaInfos(prev => {
            prev.tipo = resposta as 'grupo' | 'individual'; return prev})
        } else {
            setArtistaInfos(prev => {
                prev.nome = resposta; return prev})    
        }
    }

    function permitirProximaEtapa(){
        setPermitirProxEtapa(true)
    }

    function handleProximaEtapa(){
        setPermitirProxEtapa(false)
        setEtapa(etapa => etapa + 1)
    }

    useEffect(()=> {console.log(etapa)},[etapa])

    return(<>
        <div className="flex flex-col">
        {etapa == 1 && (<>
            <h1>Vamos montar o seu perfil!</h1>
            <p>Primeiro, informe sua cidade e qual área artística é aplicavel ao seu perfil?</p>
            <span>
                <label htmlFor=''>Estado</label>
                <input type="text" name='cidade'></input>
                <label htmlFor='cidade'>Cidade</label>
                <input type="text" name='cidade'></input>

            </span>
            <ul>
                <li><button type="button" onClick={()=> handleSelecionarAreaArtistica('musica')}>Música</button></li>
                <li><button type="button" onClick={()=> handleSelecionarAreaArtistica('artesanato')}>Artesanato</button></li>
                <li><button type="button" onClick={()=> handleSelecionarAreaArtistica('cenica')}>Cênica</button></li>
            </ul>
        </>)}
        {etapa == 2 && area &&(<Etapa_TipoENome area={area} responder={handleResposta} permitirProximaEtapa={permitirProximaEtapa}/>)} 
        <button disabled={!permitirProxEtapa ? true : false}
        type='button'
        className={`${!permitirProxEtapa && 'opacity-45'}`}
        onClick={handleProximaEtapa}>Próximo</button>
        </div>
    </>)
}