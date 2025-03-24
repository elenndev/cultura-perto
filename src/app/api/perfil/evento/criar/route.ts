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

        const perfil = await PerfilArtisticoDB.findOne({username: evento.username})
        const _id = perfil._id
        
        const novoEvento = await PerfilArtisticoDB.findByIdAndUpdate(
            {_id},
            { $push: { agenda: evento } }, 
            { new: true }
        );

        console.log('atualziado rou /criar', novoEvento)


        if(novoEvento){
            return NextResponse.json({updated: {novoId: novoEvento._id}}, {status: 200})
        } else {
            return NextResponse.json({updated: 'Não foi encontrado nenhum documento para ser atualizado'}, {status: 200})
        }


    }catch(error){
        console.log(error)
        return NextResponse.json({error},{status: 500})
    }

}