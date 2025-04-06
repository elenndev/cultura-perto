'use client'
import { useState } from 'react';
import { useHomepage } from '@/@hooks/useHomepage';
import { TypePerfilArtistico } from '@/types';
import ListaArtistas from './ListaArtistas';
import { FiltrarBusca } from './FiltrarBusca';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../Header';
import { Button_Principal } from '@/styles/Styles';
import Loader from '../Loader';
import Inicio from './Inicio';
import { useRouter } from 'next/navigation';


export const Homepage = ({username} : {username: string | null} )=>{
    const {buscarArtistas} = useHomepage()
    const [janelaFiltros, setJanelaFiltros] = useState(true)
    const [loading, setLoading] = useState(false)
    const [perfis, setPerfis] = useState<null | TypePerfilArtistico[]>(null)
    const [inicio, setInicio] = useState(true)
    const router = useRouter()

    function buscar(){
        setInicio(false)
    }
    function cadastrarOuVerPerfil(){
        if (username){
            return router.push(`/perfil/${username}`)
        } else {
            return router.push('/login')
        }
        
    }

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
        <div className='w-screen h-screen max-w-screen relative flex flex-col items-center mt-0'>
            <ToastContainer/>
            {loading ? (
                <div className = 'h-full flex flex-col justify-center'>
                    <p>Carregando</p>
                    <Loader size={'7rem'}/>
                </div>) : (<>
                    <Header username={username}/>
                    {inicio ? (<Inicio buscar={buscar} cadastrarOuVerPerfil={cadastrarOuVerPerfil} isLogged={username ? true : false}/>) : (
                        <>
                            {janelaFiltros && (<FiltrarBusca buscar={handleBuscar}/>)}
                            {perfis && perfis.length > 0 &&(<ListaArtistas artistas={perfis}/>)}
                            {perfis?.length == 0 && (
                                <div className='h-full gap-y-2 mt-[5rem] flex flex-col justify-center items-center'>
                                    <p>Nenhum perfil encontrado</p>
                                    <Button_Principal type='button' onClick={()=> limparPesquisa()}>Fazer outra pesquisa</Button_Principal>
                                </div>)}
                        </>
                    )}</>
            )}
        </div>
    )
}