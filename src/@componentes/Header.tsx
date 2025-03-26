'use client'
import { useState } from "react";
import Modal_Loading from "./modals/Modal_Loading";
import { useConta } from "@/@hooks/useConta"
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Button_LogOut } from "./Button_LogOut";
import { toast } from "react-toastify";
import ConfirmarDeletarConta from "./homepage/ConfirmarDeletarConta";
import Link from "next/link";

export default function Header({username}: {username: string | null}){
    // caso o usuario nao esteja logado o username é null
    const [deletandoConta, setDeletandoConta] = useState(false)
    const  [modalConfirmarDeletar, setModalConfirmarDeletar] = useState(false)
    const {deletarConta} = useConta()

    const router = useRouter()
    const pathname = usePathname()

    function deletarContaConfirmado(){
        if(username){
            setDeletandoConta(true)
            deletarConta({
                username,
                handleSucesso: async () => {
                    await signOut()
                    router.push('/')
                },
                handleErro: () => {
                    setDeletandoConta(false)
                    toast.error("Erro ao tentar deletar a conta, por favor tente novamente")
                }
            })
        }
    }

    function handleConfirmarDeletar(confirmado: boolean){
        setModalConfirmarDeletar(false)
        if(confirmado){
            deletarContaConfirmado()
        }
    }

    return(
        <>
        {deletandoConta && (
            <Modal_Loading content="Deletando conta"/>
        )}
        {modalConfirmarDeletar && (
            <ConfirmarDeletarConta confirmar={handleConfirmarDeletar}/>
        )}
            <header className='w-screen flex flex-row'>
                {username && (<>
                    <button onClick={()=> setModalConfirmarDeletar(true)}>Deletar Conta</button>
                    <Button_LogOut />
                    <a href={`/perfil/username`}>Ver perfil</a>
                </>)}
                {!username && pathname === "/" && (
                    <a href='/login'>Entrar como artista</a>
                )}
                {pathname != '/' && (
                    <Link href='/' aria-label="Ir para página inicial">Página inicial</Link>
                )}
            </header>
        </>
    )
}