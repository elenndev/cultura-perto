'use client'
import ConfigurarPerfil from "@/@componentes/criar_conta/configurar_perfil/ConfigurarPerfil";
import CriarConta from "@/@componentes/criar_conta/CriarConta";
import Modal_Loading from "@/@componentes/modals/Modal_Loading";
import { TypePerfilArtistico } from "@/types";
import { registrarNovoUsuario } from "@/utils/registrarUsuario";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Page(){
    const [modalLoadingAberto, setModalLoadingAberto] = useState(false)
    const [novoUsuario, setNovoUsuario] = useState<null | {username: string, email: string, password: string}>(null)
    const [configurarDetalhes, setConfigurarDetalhes] = useState(false)
    const [perfil, setPerfil] = useState<null | TypePerfilArtistico>(null)
    
    function irParaOsDetalhes(usuario: {username: string, email: string, password: string}){
        setNovoUsuario(usuario)
        setConfigurarDetalhes(true)
    }

    async function finalizarCriarConta(){
        if(novoUsuario && perfil){
            const novaConta = await registrarNovoUsuario(novoUsuario.email, novoUsuario.username, novoUsuario.password, perfil)
            if(novaConta){
                if(typeof novaConta == "string"){
                    console.log(novaConta)
                } else {
                    console.log(novaConta)
                    const login = await signIn("credentials", {
                        redirect: true,
                        callbackUrl: '/',
                        email: novoUsuario.email,
                        password: novaConta.password,
                        username: novoUsuario.username,
                    })
                    if(login?.error){
                        setNovoUsuario(null)
                        setConfigurarDetalhes(false)
                        setPerfil(null)
                        setModalLoadingAberto(false)
                        toast.error('Erro ao tentar criar a conta, se o erro persistir por favor entre em contato com o suporte')
                    }
                }
            }
            
        }

    }

    function registrarPerfil(perfil: TypePerfilArtistico){
        setPerfil(perfil)
        setModalLoadingAberto(true)
        finalizarCriarConta()
    }

    return(<main className="h-full w-full flex flex-col relative">
        <ToastContainer/>

        {modalLoadingAberto && (<Modal_Loading content="Criando sua conta, por favor aguarde"/>)}
        {!configurarDetalhes && (<>
            <CriarConta irParaOsDetalhes={irParaOsDetalhes}/>
        </>)}
        {configurarDetalhes && novoUsuario && (<>
        s    <ConfigurarPerfil registrarPerfil={registrarPerfil}/>
        </>
            )}
    </main>)
}