import { TypePerfilArtistico } from "@/types";
import axios from "axios";

const url = process.env.NEXT_PUBLIC_APP_URL

export function useConfigurarPerfil(){
    interface salvarPerfilArtisticoParams{
        userId: string, perfil: TypePerfilArtistico, 
        concluirRegistro: () => void;
        tentarNovamente: () => void
    }
    async function salvarPerfilArtistico(params: salvarPerfilArtisticoParams){
        const { userId, perfil,concluirRegistro, tentarNovamente} = params
        try{
            const req = await axios.post(`${url}/api/perfis/perfil-artistico/criar`,{
                userId, perfil
            })
            if(req){
                return concluirRegistro()
            } else{
                return tentarNovamente()
            }
        }catch(error){
            console.log(error)
            return tentarNovamente()
        }
    }
    return{salvarPerfilArtistico}
}