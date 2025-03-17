import ConfigurarPerfil from "@/@componentes/configurar-perfil/ConfigurarPerfil";
import { getSessionData } from "@/utils/auth";

export default async function Page(){
    const session = await getSessionData()
    if (!session){
        throw new Error('Session inexistente')
    }

    const user = session.user as {_id: string}
    
    return(<><ConfigurarPerfil userId={user._id}/></>)
}