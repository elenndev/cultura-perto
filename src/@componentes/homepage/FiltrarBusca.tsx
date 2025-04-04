'use client'
import { useState } from 'react';
import DefinirLocalidade from '../criar_conta/configurar_perfil/DefinirLocalidade';
import * as S from '@/styles/Styles';
import { IconContext } from 'react-icons';
import { FaTheaterMasks } from "react-icons/fa";
import { GiMusicalNotes } from "react-icons/gi";
import { IoIosColorPalette } from "react-icons/io";

type filtrarBuscaProps = {
    buscar: (filtros: {localidade: {cidade: string, estado: string}, arte: string[]}) => void
}
export const FiltrarBusca = ({buscar} : filtrarBuscaProps)=>{
    const [localidade, setLocalidade] = useState({cidade: '', estado: ''})
    const [selecionarArte, setSelecionarArte] = useState<string[]>([])
    const opcoes = ["Artesanato/Artes Visuais", "Cênica", "Música"]
    

    function handleInformarLocalidade(local: 'cidade' | 'estado', nome: string){
        if(local == 'cidade'){
            setLocalidade(prev =>{return {...prev, cidade: nome}})
        } else{ 
            setLocalidade(prev =>{return {...prev, estado: nome}})
        }
    }
    
    const handleSelect = (option: string) => {
        const atualizarSelecao = selecionarArte.includes(option)
        ? selecionarArte.filter((item) => item !== option)
        : [...selecionarArte, option]
        setSelecionarArte(atualizarSelecao);
    }

    function handleBuscar(){
        const arte = selecionarArte.map(item => {
            return item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        })
        const filtro = {
            localidade,
            arte
        }
        buscar(filtro)
    }

    return (
    
        <div className="flex w-full items-center justify-center flex-col h-full">
            <span className='flex w-fit items-center flex-col gap-y-3 mt-3 p-5 bg-[#2c3b4d] rounded-4xl shadow-2xl'>
                    <S.H1 className='text-center border-b-2 border-[#eee9df70] py-2'>Buscar artistas</S.H1>
                <span className="localidade">
                    <S.H2>Primeiro, informe sua localidade</S.H2>
                    <DefinirLocalidade cidadeSelecionada={localidade.cidade} estadoSelecionado={localidade.estado}
                    handleInformarLocalidade={handleInformarLocalidade}/>
                </span>
                <span className='flex flex-col w-fit'>
                    <S.H2>Que tipo de arte você procura?</S.H2>
                    <p><i>Você pode <span className="border-2 border-[#ffb162] border-solid rounded-2xl p-1">selecionar</span> um ou mais de um tipo ou não marcar nenhum para buscar por todos os tipos de arte</i></p>
                    <div className="flex w-full mt-3 px-3 gap-3 flex-wrap justify-center">
                        {opcoes.map((opcao) => (
                        <S.Button
                            key={opcao}
                            onClick={() => handleSelect(opcao)}
                            className={`flex flex-row items-center justify-center px-4 py-2 gap-x-1 border rounded-md ${
                            selecionarArte.includes(opcao) ? "bg-[#ffb162] border-[#a35139]" : "bg-[#eee9df] border-[transparent]"}`}
                        >
                            {opcao}
                            <IconContext.Provider value={{size: "2rem", color: selecionarArte.includes(opcao) ?"#a35139":"#1b2632" }}>
                                {opcao == 'Artesanato/Artes Visuais' && (<IoIosColorPalette />)}
                                {opcao == 'Cênica' && (<FaTheaterMasks />)}
                                {opcao == 'Música' && (<GiMusicalNotes />)}
                            </IconContext.Provider>
                        </S.Button>
                        ))}
                    </div>
                </span>
                {localidade.cidade != '' && localidade.estado != '' && (
                    <S.Button_OK type='button' onClick={()=> handleBuscar()}>Continuar</S.Button_OK>
                )}
            </span>
        </div>
    );
}