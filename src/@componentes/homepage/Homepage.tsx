'use client'
import { useState } from 'react';
import { useHomepage } from '@/@hooks/useHomepage';
import { TypePerfilArtistico } from '@/types';
import ListaArtistas from './ListaArtistas';
import { FiltrarBusca } from './FiltrarBusca';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../Header';


export const Homepage = ({username} : {username: string | null} )=>{
    const {buscarArtistas} = useHomepage()
    const [janelaFiltros, setJanelaFiltros] = useState(true)
    const [loading, setLoading] = useState(false)
    const [perfis, setPerfis] = useState<null | TypePerfilArtistico[]>(null)

    async function handleBuscar(filtro: {localidade: {cidade: string, estado: string}, arte: string[]}){
        const {localidade, ...checarAreaArtistica} = filtro
        const arte = checarAreaArtistica.arte.length > 0 ?checarAreaArtistica.arte : ['todas']
        setLoading(true)
        setJanelaFiltros(false)
        try{
            const obterPerfis = await buscarArtistas({filtro: { localidade, arte }})
            setPerfis(obterPerfis)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch(error){
            toast.error("Problema durante a pesquisa de perfis, por favor tente novamente")
            setJanelaFiltros(true)
        }finally{
            setLoading(false)
        }
    }


    function limparPesquisa(){
        setPerfis(null)
        setJanelaFiltros(true)
    }

    return(
        <main className='w-screen h-screen relative flex flex-col items-center justify-center'>
            <ToastContainer/>
            {loading ? (<p>Carregando</p>) : (
                <div>
                    <Header username={username}/>
                    {janelaFiltros && (<FiltrarBusca buscar={handleBuscar}/>)}
                    {perfis && perfis.length > 0 &&(<ListaArtistas artistas={perfis}/>)}
                    {perfis?.length == 0 && (
                        <div>
                            <p>Nenhum perfil encontrado</p>
                            <button type='button' onClick={()=> limparPesquisa()}>Pesquisar novamente</button>
                        </div>)}
                </div>
            )}
        </main>
    )
}