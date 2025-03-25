import { TypeEvento, TypePerfilArtistico } from "@/types"
import axios from "axios"

const url = process.env.NEXT_PUBLIC_APP_URL

export function usePerfil(){
    interface salvarEventoParams{
        evento: TypeEvento, 
        isNovoEvento: boolean,
        username: string;
        atualizarId: (antigoId: string, novoId: string) => void;
        handleErro: (eventoId: string) => void;
        handleSucesso: ()=> void;
    }
    async function salvarEvento(params: salvarEventoParams){
        const {evento, isNovoEvento, username, atualizarId} = params
        try{
            const {_id, ...eventoSemId} = evento

            const eventoParaRequisicao = isNovoEvento ? eventoSemId : {...evento, eventoId: _id}

            const req = await axios.post(`${url}/api/perfil/evento/${isNovoEvento ? 'criar' : 'editar'}`,{
                evento: {...eventoParaRequisicao,
                    username
                }})
            if(req.data.updated.novoId || req.data.updated == 200){
                params.handleSucesso()
                if(req.data.updated.novoId){atualizarId(_id,req.data.updated.novoId)}
                
            }else if(req.data.updated != 200){
                throw new Error(`Erro na requisição ${req.data.updated ?? ''}`)
            }
        }catch(error){
            if(isNovoEvento){
                params.handleErro(evento._id)
            }
            console.log(error)
            throw new Error('Erro ao tentar salvar o evento')}
    }


    interface deletarEventoParams{
        eventoId: string,
        username: string;
        handleErro: (eventoId: string) => void;
    }
    async function deletarEvento(params: deletarEventoParams){
        const {username, eventoId} = params
        try{
            const req = await axios.post(`${url}/api/perfil/evento/deletar`,{
                evento: {eventoId,
                    username
                }})
            if(req.data.agenda){
                const checarAgenda = req.data.agenda.agenda as {_id: string}[]
                if(checarAgenda.find(evento => evento._id == eventoId)){
                    params.handleErro(eventoId)
                    throw new Error("O evento não foi deletado")
                }

            }else if(req.data.updated != 200){
                throw new Error(`${req.data.updated}`)
            } else {throw new Error("Erro na requisição")}
        }catch(error){
            console.log(error)
            throw new Error('Erro ao tentar salvar o evento')}
    }

    interface editarContaParams {
        perfil: TypePerfilArtistico;
        novoUsername: boolean;
        atualizar: ()=>void;
    }
    async function editandoConta(params: editarContaParams){
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {_id, ...perfilEditado} = params.perfil
        if(params.novoUsername){
            const reqChecarUsernameEmail = await axios.get(`${url}/api/user`, { params: { username: params.novoUsername } });
            if(reqChecarUsernameEmail.data.user && ['email indisponivel','username indisponivel','email e nome de usuario indisponivel'].includes(reqChecarUsernameEmail.data.user)){
                throw new Error("Esse nome de usuário não está disponível, por favor tente outro")
            }
        } 

        try{
            const req = await axios.post(`${url}/api/perfil/editar`,{
                perfil: perfilEditado,
                username: params.perfil.username})
            if(req.data.updated == 200){
                params.atualizar()
            } else {
                throw new Error("Erro na requisição")
            }
        }catch(error){
            console.log(error)
            throw new Error('Erro ao tentar salvar as mudanças no perfil')}
    }

    return{salvarEvento, deletarEvento, editandoConta}
}