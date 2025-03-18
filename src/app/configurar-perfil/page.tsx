import ConfigurarPerfil from "@/@componentes/configurar-perfil/ConfigurarPerfil";
import { getSessionData } from "@/utils/auth";
import { obterPerfilArtistaId } from "@/utils/obterPerfilArtistaId";
import { redirect } from "next/navigation";

export default async function Page(){
    const session = await getSessionData()
    if (!session){
        throw new Error('Session inexistente')
    }

    const user = session.user as {id: string, email: string}
    const checkId = await obterPerfilArtistaId(user.email)
    if(checkId){
        redirect('/')
    }
    
    return(<><ConfigurarPerfil userId={user.id}/></>)
}