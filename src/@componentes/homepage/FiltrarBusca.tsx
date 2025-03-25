'use client'
import { useState } from 'react';
import DefinirLocalidade from '../criar_conta/configurar_perfil/DefinirLocalidade';


type filtrarBuscaProps = {
    buscar: (filtros: {localidade: {cidade: string, estado: string}, arte: string[]}) => void
}
export const FiltrarBusca = ({buscar} : filtrarBuscaProps)=>{
    const [localidade, setLocalidade] = useState({cidade: '', estado: ''})
    const [selecionarArte, setSelecionarArte] = useState<string[]>([])
    const opcoes = ["Artesanato", "Cênica", "Música"]
    

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
    
        <div className="flex flex-row">
            <DefinirLocalidade cidadeSelecionada={localidade.cidade} estadoSelecionado={localidade.estado}
            handleInformarLocalidade={handleInformarLocalidade}/>
            <span className='flex flex-col'>
                <p>Que tipo de arte você procura?<br></br><i>Você pode marcar mais de um tipo ou não marcar nenhum para buscar por todos os tipos de arte</i></p>
                <div className="flex flex-wrap">
                    {opcoes.map((opcao) => (
                    <button
                        key={opcao}
                        onClick={() => handleSelect(opcao)}
                        className={`px-4 py-2 border rounded-md ${
                        selecionarArte.includes(opcao) ? "bg-blue-500 text-white" : 
                            selecionarArte.length > 0 ? "bg-gray-200 opacity-50":"bg-gray-200"
                        }`}
                    >
                        {opcao}
                    </button>
                    ))}
                </div>
            </span>
            {localidade.cidade != '' && localidade.estado != '' && (
                <button type='button' onClick={()=> handleBuscar()}>Continuar</button>
            )}
        </div>
    );
}