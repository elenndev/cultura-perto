'use client'
import ConfigurarPerfil from "@/@componentes/criar_conta/configurar_perfil/ConfigurarPerfil";
import CriarConta from "@/@componentes/criar_conta/CriarConta";
import { useConta } from "@/@hooks/useConta";
import Modal_Loading from "@/@componentes/modals/Modal_Loading";
import { TypePerfilArtistico } from "@/types";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Header from "@/@componentes/Header";
import { ThemeContextProvider } from "@/context/ContextTheme";

export default function Page(){
    const { registrarNovoUsuario } = useConta()
    const [modalLoadingAberto, setModalLoadingAberto] = useState<false | {content: string}>(false)
    const [novoUsuario, setNovoUsuario] = useState<null | {username: string, email: string, password: string}>(null)
    const [configurarDetalhes, setConfigurarDetalhes] = useState(false)
    
    function irParaOsDetalhes(usuario: {username: string, email: string, password: string}){
        setNovoUsuario(usuario)
        setConfigurarDetalhes(true)
    }

    async function finalizarCriarConta(perfil: TypePerfilArtistico){
        if(novoUsuario && perfil){
            try{
                const novaConta = await registrarNovoUsuario(novoUsuario.email, novoUsuario.username, novoUsuario.password, perfil)
                if(novaConta){
                    const login = await signIn("credentials", {
                        redirect: true,
                        callbackUrl: `/perfil/${novoUsuario.username}`,
                        credential: novoUsuario.email,
                        password: novoUsuario.password,
                    })
                    if(login?.error){
                        setNovoUsuario(null)
                        setConfigurarDetalhes(false)
                        setModalLoadingAberto(false)
                        toast.error('Erro ao tentar criar a conta, se o erro persistir por favor entre em contato com o suporte')
                    }
                }

            }catch(error){
                toast.error(`Erro ao tentar criar a conta:${error} | Se o erro persistir por favor entre em contato com o suporte`,)
                setNovoUsuario(null)
                setConfigurarDetalhes(false)
                setModalLoadingAberto(false)
            }
            
        }

    }

    function registrarPerfil(perfil: TypePerfilArtistico){
        setModalLoadingAberto({content: "Criando conta"})
        finalizarCriarConta(perfil)
    }

    return(
        <ThemeContextProvider>
        <main className="h-full w-full flex flex-col relative">
            <ToastContainer/>
            <Header username={null}/>
            {modalLoadingAberto && (<Modal_Loading content={modalLoadingAberto.content}/>)}
            {!configurarDetalhes && (<>
                <CriarConta irParaOsDetalhes={irParaOsDetalhes}/>
            </>)}
            {configurarDetalhes && novoUsuario && (<>
                <ConfigurarPerfil registrarPerfil={registrarPerfil} username={novoUsuario.username}/>
            </>
                )}
        </main>
        </ThemeContextProvider>
    )
}