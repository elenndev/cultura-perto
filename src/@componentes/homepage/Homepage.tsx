'use client'
import { darkTheme, GlobalStyles, lightTheme } from '@/styles/themeConfig';
import { ThemeProvider} from 'styled-components';
import { Button_LogOut } from '../Button_LogOut';
import { useThemeContext } from '@/context/ContextTheme';
import { ThemeToggleButton } from '../ThemeToggleButton';
import { useState } from 'react';
import { useHomepage } from '@/@hooks/useHomepage';
import { TypePerfilArtistico } from '@/types';
import ListaArtistas from './ListaArtistas';
import { FiltrarBusca } from './FiltrarBusca';
import { toast, ToastContainer } from 'react-toastify';
type homepageProps<S> = {
    userSession: S | null;
}
export const Homepage = <S,>({userSession} : homepageProps<S> )=>{
    const {buscarArtistas} = useHomepage()
    console.log(userSession)
    const { theme } = useThemeContext();
    const [janelaFiltros, setJanelaFiltros] = useState(true)
    const [loading, setLoading] = useState(false)
    const [perfis, setPerfis] = useState<null | TypePerfilArtistico[]>(null)

    const currentTheme = theme === 'light' ? lightTheme : darkTheme;
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
        <ThemeProvider theme={currentTheme}>
                <GlobalStyles/>
                <main className='w-screen h-screen relative'>
                    <ToastContainer/>
                    {loading ? (<p>Carregando</p>) : (
                        <div>
                            <ThemeToggleButton />
                            <Button_LogOut />
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
            </ThemeProvider>
    )
}