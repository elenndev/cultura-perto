import { TypePerfilArtistico } from "@/types";
import axios from "axios";

const url = process.env.APP_URL

export function useConfigurarPerfil(){
    interface salvarPerfilArtisticoParams{
        userId: string, perfil: TypePerfilArtistico, concluirRegistro: (perfilArtisticoId: string | null) => void;
    }
    async function salvarPerfilArtistico(params: salvarPerfilArtisticoParams){
        const { userId, perfil,concluirRegistro} = params
        try{
            const req = await axios.post(`${url}/api/perfis/perfil-artistico/criar`,{
                userId, perfil
            })
            if(req){
                return concluirRegistro(req.data.perfilArtisticoId)
            }
        }catch(error){console.log(error)}
    }
    return{salvarPerfilArtistico}
}