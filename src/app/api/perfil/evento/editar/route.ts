import { NextRequest, NextResponse } from "next/server";
import PerfilArtisticoDB from "../../../../../../models/profileModel";
import { connectMongoDB } from "../../../../../../lib/db";

export async function POST(request: NextRequest){
    try {
        const {evento} = await request.json()
        if(!evento){
            throw new Error('Parâmetros necessários não encontrados na requisição')
        }

        await connectMongoDB()

        const editarEvento = await PerfilArtisticoDB.findOneAndUpdate(
            {username: evento.username, "agenda._id": evento._id},
            {$set: {"agenda.$": evento}},
            {new: true}
        )

        if(editarEvento){
            return NextResponse.json({updated: 200}, {status: 200})
        } else{
            return NextResponse.json({updated: 'Não foi encontrado nenhum documento para ser atualizado'})
        }


    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}