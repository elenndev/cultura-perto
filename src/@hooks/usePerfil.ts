import { TypeEvento } from "@/types"
import axios from "axios"

const url = process.env.NEXT_PUBLIC_APP_URL

export function usePerfil(){
    interface salvarEventoParams{
        evento: TypeEvento, 
        isNovoEvento: boolean,
        perfilId: string;
    }
    async function salvarEvento(params: salvarEventoParams){
        const {evento, isNovoEvento, perfilId} = params
        console.log('evento que seria enviado pra requisicao', evento)
        return
        try{
            const req = await axios.post(`${url}/api/perfil/evento/${isNovoEvento ? 'criar' : 'editar'}`,{evento, perfilId})
            if(req.data.updated !== 200 && req.data.update){
                throw new Error(`${req.data.updated}`)
            } else {throw new Error("Erro ao tentar salvar o evento")}
        }catch(error){console.log(error)}
    }
    return{salvarEvento}
}