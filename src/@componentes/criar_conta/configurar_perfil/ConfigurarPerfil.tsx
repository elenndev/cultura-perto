'use client'
import { TypeLinksPerfil, TypeLocalidadePerfil, TypePerfilArtistico } from "@/types"
import React, { useState } from "react"
import DefinirLocalidade from "./DefinirLocalidade";
import Etapa_Detalhes from "./Etapa_Detalhes";
import Etapa_TipoENome from "./Etapa_TipoENome";

interface configurarPerfilProps {
    registrarPerfil: (perfil: TypePerfilArtistico) => void;
}
export default function ConfigurarPerfil(props : configurarPerfilProps){
    const { registrarPerfil } = props

    const [etapa, setEtapa] = useState(1)
    const [permitirProxEtapa, setPermitirProxEtapa] = useState(false)
    const [localidade, setLocalidade] = useState<{localidadePrincipal: TypeLocalidadePerfil} | null>(null)
    const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
    const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");

    const [nome, setNome] = useState<string | null>(null)
    const [area, setArea] = useState<null  |'musica'| 'cenica' |'artesanato'>(null)
    const [tipo, setTipo] = useState<null | 'grupo' | 'individual'>(null)
    const [descricao, setDescricao] = useState<string | null>(null)

    function handleSelecionarAreaArtistica(opcao: 'musica'| 'cenica' | 'artesanato'){
        setArea(opcao)
        if(cidadeSelecionada && estadoSelecionado){
            permitirProximaEtapa()
        }
    }

    function handleResposta(resposta: | 'grupo' | 'individual' | string){
        if(resposta == 'grupo'|| resposta == 'individual'){
            setTipo(resposta as  'grupo' | 'individual')
        } else {
            setNome(resposta)  
        }
    }

    function handleInformarLocalidade(local: 'cidade' | 'estado', nome: string){
        if(local == 'cidade'){
            setCidadeSelecionada(nome)
            if(estadoSelecionado && area){
                permitirProximaEtapa()
            }
        } else{ 
            setEstadoSelecionado(nome) 
            if(cidadeSelecionada && area){
                permitirProximaEtapa()
            }
        }
    }
    function handleFinalizarConfiguracaoPerfil(links: TypeLinksPerfil[]){
        if(area && descricao && localidade && tipo && nome){
            const perfil = {
                _id: 'none',
                agenda: null,
                area,
                descricao,
                localidade,
                nome,
                tipo,
                linksDoPerfil: links
            }
            registrarPerfil(perfil)
        }
    }

    function permitirProximaEtapa(){
        setPermitirProxEtapa(true)
    }

    function handleProximaEtapa(){
        if(etapa == 1){
            setLocalidade({
                localidadePrincipal:{cidade: cidadeSelecionada, estado: estadoSelecionado}})
        }
        setPermitirProxEtapa(false)
        setEtapa(etapa => etapa + 1)
    }


    return(<>
        <div className="flex flex-col relative h-full w-full">
        {etapa == 1 && (<>
            <h1>Vamos montar o seu perfil!</h1>
            <p>Primeiro, informe sua cidade e qual área artística é aplicavel ao seu perfil?</p>
            <DefinirLocalidade cidadeSelecionada={cidadeSelecionada}
            estadoSelecionado={estadoSelecionado}
            handleInformarLocalidade={handleInformarLocalidade}/>
            <ul>
                <li><button type="button" onClick={()=> handleSelecionarAreaArtistica('musica')}>Música</button></li>
                <li><button type="button" onClick={()=> handleSelecionarAreaArtistica('artesanato')}>Artesanato</button></li>
                <li><button type="button" onClick={()=> handleSelecionarAreaArtistica('cenica')}>Cênica</button></li>
            </ul>
        </>)}

        {etapa == 2 && area &&(<Etapa_TipoENome area={area} responder={handleResposta} permitirProximaEtapa={permitirProximaEtapa}/>)}

        {etapa == 3 && nome && area && (<Etapa_Detalhes area={area} descricao={descricao} setDescricao={setDescricao} handleFinalizarConfiguracaoPerfil={handleFinalizarConfiguracaoPerfil} nome={nome}/>)}

        {etapa <=2 && (
            <button disabled={!permitirProxEtapa ? true : false}
            type='button'
            className={`${!permitirProxEtapa && 'opacity-45'}`}
            onClick={handleProximaEtapa}>Próximo</button>
        )}
        </div>
    </>)
}