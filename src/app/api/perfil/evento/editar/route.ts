import { NextRequest, NextResponse } from "next/server";
import PerfilArtisticoDB from "../../../../../../models/profileModel";
import { connectMongoDB } from "../../../../../../lib/db";

export async function POST(request: NextRequest){
    try {
        const {evento, perfilId} = await request.json()
        if(!evento || !perfilId){
            throw new Error('Parâmetros necessários não encontrados na requisição')
        }

        await connectMongoDB()

        const editarEvento = await PerfilArtisticoDB.updateOne(
            {_id: perfilId, "agenda.id": evento.id},
            {$set: {"agenda.$[elem]": evento}},
            {arrayFilters: [{"elem.id": evento.id}]}
        )

        if(editarEvento.modifiedCount == 1){
            return NextResponse.json({updated: 200}, {status: 200})
        } else if(editarEvento.matchedCount < 1){
            return NextResponse.json({updated: 'Não foi encontrado nenhum documento para ser atualizado'})
        } else {
            throw new Error('Erro para atualizar no banco de dados')
        }

    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}