import { NextRequest, NextResponse } from "next/server";
import ValidacaoPendenteDB from "../../../../../models/validacaoPasscode";
import { connectMongoDB } from "../../../../../lib/db";

export async function POST(request: NextRequest){
    
    try {
        await connectMongoDB()
        const { email, checarCode } = await request.json()
        if (!email || !checarCode){
            throw new Error()
        }
        const validacaoPendente = await ValidacaoPendenteDB.findOne({email})

        if (validacaoPendente && validacaoPendente.expiration <= Date.now()){
            return NextResponse.json({erro: 'passcode expirado'},{status: 400})
        }

        let response
        if(validacaoPendente.code.toLowerCase() == checarCode.toLowerCase()){
            response = {checkCode: true,  mensagem:'passcode verificado com sucesso'}
            await deletandoValidacaoPendente().catch((error) =>{
                console.log(error)
                throw new Error("Erro ao tentar deletar a validaçaõ pendente do banco de dados")
            })
        } else {
            response = {checkCode: false,  mensagem:'passcode incorreto'}
        }

        return NextResponse.json(response,{status: 200})

        async function deletandoValidacaoPendente(){
            const validacaoPendenteDeletada = await ValidacaoPendenteDB.deleteOne({email})
            if (validacaoPendenteDeletada.deletedCount != 1){
                throw new Error()
            }
        }

    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}