import { TypeEvento } from "@/types"
import axios from "axios"

const url = process.env.NEXT_PUBLIC_APP_URL

export function usePerfil(){
    interface salvarEventoParams{
        evento: TypeEvento, 
        isNovoEvento: boolean,
        username: string;
        atualizarId: (novoId: string) => void;
        handleErro: (eventoId: string) => void
    }
    async function salvarEvento(params: salvarEventoParams){
        const {evento, isNovoEvento, username, atualizarId} = params
        try{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {_id, ...eventoSemId} = evento

            const eventoParaRequisicao = isNovoEvento ? eventoSemId : evento

            const req = await axios.post(`${url}/api/perfil/evento/${isNovoEvento ? 'criar' : 'editar'}`,{
                evento: {...eventoParaRequisicao,
                    username
                }})
            if(req.data.updated.novoId){
                atualizarId(req.data.updated.novoId)
            }else if(req.data.updated && req.status != 500){
                throw new Error(`${req.data.updated}`)
            } else {throw new Error("Erro ana requisição")}
        }catch(error){
            if(isNovoEvento){
                params.handleErro(evento._id)
            }
            console.log(error)
            throw new Error('Erro ao tentar salvar o evento')}
    
    
    }
    return{salvarEvento}
}