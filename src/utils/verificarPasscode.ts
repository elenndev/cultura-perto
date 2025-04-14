import { connectMongoDB } from "../../lib/db"
import ValidacaoPendenteDB from "../../models/validacaoPasscode";

export async function verificarPasscodeDaSession(email: string){
    try{
        await connectMongoDB()
        const validacaoPendente = await ValidacaoPendenteDB.findOne({email})
        if(validacaoPendente && validacaoPendente.expiration < Date.now()){
            return true
        } else { return false}
        
    }catch(error){
        console.log(error)
        throw new Error()}
}