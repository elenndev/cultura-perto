import { TypePerfilArtistico } from "@/types"
import axios from "axios"

const url = process.env.NEXT_PUBLIC_APP_URL

export function useHomepage(){
    interface buscarArtistasParams{
        filtro: {localidade: {cidade: string, estado: string}, arte: string[]}
    }
    async function buscarArtistas(params: buscarArtistasParams){
        const {filtro} = params
        try{
            const req = await axios.get(`${url}/api/perfil/buscar`, { params: 
                {cidade: filtro.localidade.cidade,
                estado: filtro.localidade.estado,
                arte: filtro.arte
                } })

            if(req.data.perfis){
                return req.data.perfis as TypePerfilArtistico[]
            } else {
                throw new Error()
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch(error){
            throw new Error("Problemas na requisiçao para buscar os perfis")
        }
    }
    async function listarTodos(){
        try{
            const req = await axios.get(`${url}/api/perfil/todos`,)

            if(req.data.perfis){
                return req.data.perfis as TypePerfilArtistico[]
            } else {
                throw new Error()
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }catch(error){
            throw new Error("Problemas na requisiçao para buscar os perfis")
        }
    }


    return {buscarArtistas, listarTodos}
}