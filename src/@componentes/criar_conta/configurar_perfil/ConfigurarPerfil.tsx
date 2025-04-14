'use client'
import { TypeLinksPerfil, TypeLocalidadePerfil, TypePerfilArtistico } from "@/types"
import React, { useState } from "react"
import DefinirLocalidade from "./DefinirLocalidade";
import Etapa_Detalhes from "./Etapa_Detalhes";
import Etapa_TipoENome from "./Etapa_TipoENome";
import { FaTheaterMasks } from "react-icons/fa";
import { GiMusicalNotes } from "react-icons/gi";
import { IoIosColorPalette } from "react-icons/io";
import * as S from '@/styles/StyledLogin'
import ConfirmarPasscode from "@/@componentes/ConfirmarPasscode";

interface configurarPerfilProps {
    registrarPerfil: (perfil: TypePerfilArtistico) => void;
    username: string;
    email: string;
}
export default function ConfigurarPerfil(props : configurarPerfilProps){
    const { registrarPerfil, username, email } = props

    const [passcodeConfirmado, setPasscodeConfirmado] = useState(false)
    const [etapa, setEtapa] = useState(1)
    const [permitirProxEtapa, setPermitirProxEtapa] = useState(false)
    const [localidade, setLocalidade] = useState< TypeLocalidadePerfil | null>(null)
    const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
    const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");

    const [nome, setNome] = useState<string | null>(null)
    const [area, setArea] = useState<null  |'musica'| 'cenica' |'artesanato/artes visuais'>(null)
    const [tipo, setTipo] = useState<null | 'grupo' | 'individual'>(null)
    const [descricao, setDescricao] = useState<string | null>(null)

    function handleSelecionarAreaArtistica(opcao: 'musica'| 'cenica' | 'artesanato/artes visuais'){
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
                username,
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
            setLocalidade({cidade: cidadeSelecionada, estado: estadoSelecionado})
        }
        setPermitirProxEtapa(false)
        setEtapa(etapa => etapa + 1)
    }

    function handlePasscodeConfirmado(){
        setPasscodeConfirmado(true)
    }


    return(<>
        <div className="flex flex-col relative h-full w-[90%] items-center justify-center">
        {passcodeConfirmado ? (<>
            {etapa == 1 && (<>
                <S.H1 className="border-b-[#ffb162] border-t-0 border-r-0 border-l-0 border mb-2">Vamos montar o seu perfil!</S.H1>
                <p>Primeiro, informe sua cidade e qual área artística é aplicavel ao seu perfil</p>
                <DefinirLocalidade cidadeSelecionada={cidadeSelecionada}
                estadoSelecionado={estadoSelecionado}
                handleInformarLocalidade={handleInformarLocalidade}/>
                <span className ='flex flex-col gap-2 mt-4 mb-2 items-center'>
                    <p className='border-t-[#ffb162] border-b-0 border-r-0 border-l-0 border py-1.5 px-4'>Área artística</p>
                    <ul className='flex flex-wrap gap-2.5'>
                        <li><S.Button
                        className={`flex flex-row items-center justify-center px-4 py-2 gap-x-1 border rounded-md ${
                            area == 'musica' ? "bg-[#ffb162] border-[#a35139]" : "bg-[#eee9df] border-[transparent]"}`}
                        type="button" onClick={()=> handleSelecionarAreaArtistica('musica')}>
                            Música
                            <GiMusicalNotes />
                        </S.Button></li>
                        <li><S.Button
                        className={`flex flex-row items-center justify-center px-4 py-2 gap-x-1 border rounded-md ${
                            area == 'artesanato/artes visuais' ? "bg-[#ffb162] border-[#a35139]" : "bg-[#eee9df] border-[transparent]"}`}
                        type="button" onClick={()=> handleSelecionarAreaArtistica('artesanato/artes visuais')}>
                            Artesanato/Artes Visuais
                            <IoIosColorPalette />
                        </S.Button></li>
                        <li><S.Button
                        className={`flex flex-row items-center justify-center px-4 py-2 gap-x-1 border rounded-md ${
                            area == 'cenica' ? "bg-[#ffb162] border-[#a35139]" : "bg-[#eee9df] border-[transparent]"}`}
                        type="button" onClick={()=> handleSelecionarAreaArtistica('cenica')}>
                            Cênica
                            <FaTheaterMasks />
                        </S.Button></li>
                    </ul>
                </span>
            </>)}

            {etapa == 2 && area &&(<Etapa_TipoENome area={area} responder={handleResposta} permitirProximaEtapa={permitirProximaEtapa}/>)}

            {etapa == 3 && nome && area && (<Etapa_Detalhes area={area} descricao={descricao} setDescricao={setDescricao} handleFinalizarConfiguracaoPerfil={handleFinalizarConfiguracaoPerfil} nome={nome}/>)}

            {etapa <=2 && (
                <S.Button_Principal disabled={!permitirProxEtapa ? true : false}
                type='button'
                className={`${!permitirProxEtapa && 'opacity-45'}`}
                onClick={handleProximaEtapa}>Próximo</S.Button_Principal>
            )}
        </>) : (<ConfirmarPasscode email={email}  passcodeConfirmado={handlePasscodeConfirmado} mensagem="Para continuar criando sua conta, precisamos confirmar o seu email"/>)}
        </div>
    </>)
}